'use server'

import { revalidatePath } from 'next/cache'
import { auth, signIn, signOut } from '../api/auth/[...nextauth]/route'
import { supabase } from './supabase'
import { getBookings } from './data-service'
import { redirect } from 'next/navigation'

export async function updateGuest(formData) {
  console.log(formData)

  const session = await auth()
  if (!session) throw new Error('You must be logged in')

  const nationalID = formData.get('nationalID')
  const [nationality, countryFlag] = formData.get('nationality').split('%')

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error('Please provide a valid national ID')
  }

  const updateData = { nationality, countryFlag, nationalID }

  console.log(updateData)

  const { error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId)

  if (error) {
    throw new Error('Guest could not be updated')
  }

  //清理缓存，立即更新数据
  revalidatePath('/account/profile')
}

// 创建新的 reservation
export async function createReservation(bookingData, formData) {
  const session = await auth()
  if (!session) throw new Error('You must be logged in')

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations'),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: 'unconfirmed',
  }

  const { error } = await supabase.from('bookings').insert([newBooking])

  if (error) {
    console.error('Error message:', error.message)
    throw new Error('Booking could not be created')
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`)

  redirect('/cabins/thankyou')
}

// 带权限控制的安全删除操作
export async function deleteReservation(bookingId) {
  const session = await auth()
  if (!session) throw new Error('You must be logged in')

  const guestBookings = await getBookings(session.user.guestId)
  const guestBookingIds = guestBookings.map((booking) => booking.id)

  //权限保护：验证预订归属
  if (!guestBookingIds.includes(bookingId))
    throw new Error('You are not allowed to delete this booking')

  const { error } = await supabase.from('bookings').delete().eq('id', bookingId)

  if (error) {
    console.error(error)
    throw new Error('Booking could not be deleted')
  }

  revalidatePath('/account/reservations')
}

// 更新 booking/reservation
export async function updateReservation(formData) {
  const bookingId = Number(formData.get('bookingId'))

  //1) 身份验证
  const session = await auth()
  if (!session) throw new Error('You must be logged in')

  //2)授权，即权限保护：验证预订归属
  const guestBookings = await getBookings(session.user.guestId)
  const guestBookingIds = guestBookings.map((booking) => booking.id)
  if (!guestBookingIds.includes(bookingId))
    throw new Error('You are not allowed to update this booking')

  //3) 更新数据
  const numGuests = Number(formData.get('numGuests'))
  const observations = formData.get('observations').slice(0, 1000)
  const updateData = { numGuests, observations }

  //4) 在数据库更新修改数据
  const { error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', bookingId)
    .select()
    .single()

  //5) 错误处理
  if (error) {
    console.error(error)
    throw new Error('Booking could not be updated')
  }

  //6) 清理缓存和重定向
  revalidatePath(`/account/reservations/edit/${bookingId}`)
  redirect('/account/reservations')
}

export async function signInAction() {
  await signIn('github', { redirectTo: '/account' })
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' })
}
