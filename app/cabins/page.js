import { Suspense } from 'react'
import CabinList from '../_components/CabinList'
import Spinner from '../_components/Spinner'
import Filter from '../_components/Filter'

export const revalidate = 3600

export const metadata = {
  title: 'Cabins',
}

export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? 'all'
  console.log(searchParams)

  return (
    <div>
      <h1 className='text-4xl mb-5 text-accent-400 font-medium'>
        我们的宁静小屋
      </h1>
      <p className='text-primary-200 text-lg mb-10'>
        舒适而豪华的小屋，坐落在中国浙江莫干山的中心地带。想象一下，清晨醒来便能欣赏到壮丽的山景，白天探索周围幽深的森林，或是在星空下的私人热水浴缸中放松身心。在这个远离喧嚣的温馨小家中，尽享大自然的美景。这里是宁静祥和假期的完美之选。欢迎来到天堂。
      </p>

      <div className='flex justify-end mb-8'>
        <Filter />
      </div>

      <Suspense
        fallback={
          <div className='grid items-center justify-center'>
            <Spinner />{' '}
            <p className='text-xl text-primary-200'>Loading cabin data...</p>
          </div>
        }
        key={filter}
      >
        <CabinList filter={filter} />
      </Suspense>
    </div>
  )
}
