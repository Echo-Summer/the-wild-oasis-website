import Link from 'next/link'

function LoginMessage() {
  return (
    <div className='grid bg-primary-800 '>
      <p className='text-center text-xl py-12 self-center'>
        请立即{' '}
        <Link href='/login' className='underline text-accent-500'>
          登录
        </Link>{' '}
        预订这间小屋
        <br />
      </p>
    </div>
  )
}

export default LoginMessage
