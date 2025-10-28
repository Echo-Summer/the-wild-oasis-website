import SkeletonCabinCard from './SkeletonCabinCard'

export default function SkeletonCabinList({ count = 4 }) {
  // count 控制显示几个骨架卡片
  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonCabinCard key={idx} />
      ))}
    </div>
  )
}
