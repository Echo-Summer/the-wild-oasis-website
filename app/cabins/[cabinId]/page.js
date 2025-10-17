import Cabin from '@/app/_components/Cabin'
import Reservation from '@/app/_components/Reservation'
import ReservationReminder from '@/app/_components/ReservationReminder'
import Spinner from '@/app/_components/Spinner'
import { getCabin, getCabins } from '@/app/_lib/data-service'
import { Suspense } from 'react'

// 动态 metadata
export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId)
  return { title: `Cabin: ${name}` }
}

// 把动态渲染改成静态渲染
// 告诉 Next.js 哪些路径要预渲染
export async function generateStaticParams() {
  const cabins = await getCabins()
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }))

  return ids
}

// 正常获取数据
export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId)

  // const settings = await getSettings()
  // const bookedDates = await getBookedDatesByCabinId(params.cabinId)

  // const { id, name, maxCapacity, regularPrice, discount, image, description } =
  //   cabin

  return (
    <div className='max-w-6xl mx-auto mt-8'>
      <Cabin cabin={cabin} />

      <div>
        <h2 className='text-5xl font-semibold text-center mb-10 text-accent-400'>
          立即预订{cabin.name}号小屋，到店付款
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
          <ReservationReminder />
        </Suspense>
      </div>
    </div>
  )
}
