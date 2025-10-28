export default function SkeletonCabinCard() {
  return (
    <div className='relative flex border-primary-800 border'>
      {/* 图片占位 */}
      <div className='flex-1 relative bg-gray-700 animate-pulse'>
        <div className='h-60 w-full' />
      </div>

      <div className='flex-grow'>
        {/* 文本占位 */}
        <div className='pt-5 pb-4 px-7 bg-primary-950 space-y-3'>
          <div className='h-8 w-3/4 bg-gray-600 rounded animate-pulse'></div>{' '}
          {/* 小屋名称 */}
          <div className='flex gap-3 items-center'>
            <div className='h-5 w-5 bg-gray-600 rounded-full animate-pulse'></div>
            <div className='h-4 w-1/2 bg-gray-600 rounded animate-pulse'></div>
          </div>
          <div className='flex justify-end gap-3 items-baseline'>
            <div className='h-6 w-16 bg-gray-600 rounded animate-pulse'></div>
            <div className='h-4 w-8 bg-gray-600 rounded animate-pulse'></div>
          </div>
        </div>

        {/* 按钮占位 */}
        <div className='bg-primary-950 border-t border-t-primary-800 text-right'>
          <div className='inline-block py-4 px-6 bg-gray-600 animate-pulse rounded'>
            &nbsp;
          </div>
        </div>
      </div>
    </div>
  )
}
