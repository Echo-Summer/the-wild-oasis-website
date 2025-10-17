import { getBookedDatesByCabinId, getSettings } from '../_lib/data-service'
import { auth } from '../api/auth/[...nextauth]/route'
import DateSelector from './DateSelector'
import LoginMessage from './LoginMessage'
import ReservationForm from './ReservationForm'

async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ])

  const session = await auth()

  return (
    <div className='grid grid-cols-[1.3fr,1fr] border border-primary-800 min-h-[200px]'>
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  )
}

export default Reservation
