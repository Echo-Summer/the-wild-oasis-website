import Link from 'next/link'

function NotFound() {
  return (
    <main className='text-center space-y-6 mt-4'>
      <h1 className='text-3xl font-semibold'>找不到这个小屋 :(</h1>
      <Link
        href='/cabins'
        className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg'
      >
        返回所有小屋页面
      </Link>
    </main>
  )
}

export default NotFound
