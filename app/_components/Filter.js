'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

function Filter() {
  //当前 URL 的查询参数
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const activeFilter = searchParams.get('capacity') ?? 'all'

  function handleFilter(filter) {
    //创建一个可修改的参数对象（原 searchParams 是只读的）
    const params = new URLSearchParams(searchParams)
    //修改/新增 capacity 参数
    params.set('capacity', filter)
    //更新当前 URL（不会整页刷新）
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className='border border-primary-800 flex'>
      <Button
        filter='all'
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        全部
      </Button>

      <Button
        filter='small'
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 客人
      </Button>

      <Button
        filter='medium'
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 客人
      </Button>

      <Button
        filter='large'
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 客人
      </Button>
    </div>
  )
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? 'bg-primary-700 text-primary-50' : ''
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  )
}

export default Filter
