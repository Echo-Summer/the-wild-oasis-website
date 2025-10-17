'use client'

import Image from 'next/image'
import { useReservation } from './ReservationContext'
import { differenceInDays } from 'date-fns'
import { createReservation } from '../_lib/action'
import SbumitButton from './SubmitButton'

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation()

  const { maxCapacity, regularPrice, discount, id } = cabin

  const startDate = range?.from
  const endDate = range?.to

  const numNights = differenceInDays(endDate, startDate)
  const cabinPrice = numNights * (regularPrice - discount)

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  }

  const createReservationWithData = createReservation.bind(null, bookingData)

  return (
    <div className='scale-[1.01]'>
      <div className='bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center'>
        <p>当前登录用户</p>

        <div className='flex gap-4 items-center'>
          <Image
            // Important to display google profile images
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            width={32}
            height={32}
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        // action={createReservationWithData}
        action={async (formData) => {
          await createReservationWithData(formData)
          resetRange()
        }}
        className='bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col'
      >
        <div className='space-y-2'>
          <label htmlFor='numGuests'>客人数量?</label>
          <select
            name='numGuests'
            id='numGuests'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            required
          >
            <option value='' key=''>
              选择客人数量...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} 位
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='observations'>
            关于您的入住有什么需要我们了解的吗?
          </label>
          <textarea
            name='observations'
            id='observations'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            placeholder='是否携带宠物、有过敏史或特殊需求等?'
          />
        </div>

        <div className='flex justify-end items-center gap-6'>
          {!(startDate && endDate) ? null : (
            <>
              <p className='text-primary-300 text-base'>请先选择日期</p>
              <SbumitButton>现在预定</SbumitButton>
            </>
          )}
        </div>
      </form>
    </div>
  )
}

export default ReservationForm
