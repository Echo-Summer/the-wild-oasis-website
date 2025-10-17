import SignInButton from '../_components/SignInButton'

export const metadata = {
  title: 'sign in',
}

export default function Page() {
  return (
    <div className='flex flex-col gap-10 mt-10 items-center'>
      <h2 className='text-3xl font-semibold'>登录以访问用户页面</h2>

      <SignInButton />
    </div>
  )
}
