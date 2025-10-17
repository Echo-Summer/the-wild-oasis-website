import { auth } from '../api/auth/[...nextauth]/route'

export const metadata = {
  title: 'Account',
}

async function Page() {
  const session = await auth()
  const firstName = session.user.name.split(' ').at(0)
  return <h1 className='text-xl text-purple-300'>Welcome, {firstName}😊</h1>
}

export default Page
