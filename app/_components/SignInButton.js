import Image from 'next/image'
import { signInAction } from '../_lib/action'

function SignInButton() {
  return (
    <form action={signInAction}>
      <button className='flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium bg-primary-50 rounded-lg'>
        <Image
          src='https://authjs.dev/img/providers/github.svg'
          alt='GitHub logo'
          height='28'
          width='28'
        />
        <span className='text-primary-900'>使用GitHub登录</span>
      </button>
    </form>
  )
}

export default SignInButton
