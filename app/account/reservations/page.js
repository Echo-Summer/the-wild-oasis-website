import ReservationList from '@/app/_components/ReservationList'
import { getBookings } from '@/app/_lib/data-service'
import { auth } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link'

export default async function Page() {
  const session = await auth()

  const bookings = await getBookings(session.user.guestId)
  console.log(bookings)
  return (
    <div>
      <h2 className='font-semibold text-2xl text-accent-400 mb-7'>你的订单</h2>

      {bookings.length === 0 ? (
        <p className='text-lg'>
          你目前还没有任何预订，请查看我们的{' '}
          <Link className='underline text-accent-500' href='/cabins'>
            小屋 &rarr;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  )
}
