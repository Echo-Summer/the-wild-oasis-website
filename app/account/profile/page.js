import SelectCountry from '@/app/_components/SelectCountry'
import UpdateProfileForm from '@/app/_components/UpdateProfileForm'
import { getGuest } from '@/app/_lib/data-service'
import { auth } from '@/app/api/auth/[...nextauth]/route'

export const metadata = {
  title: 'Update Profile',
}

export default async function Page() {
  const session = await auth()
  const guest = await getGuest(session.user.email)

  return (
    <div>
      <h2 className='font-semibold text-2xl text-accent-400 mb-4'>
        更新你的个人信息
      </h2>

      <p className='text-lg mb-8 text-primary-200'>
        提供以下信息将使您的入住过程更快、更顺畅。很快见！
      </p>

      <UpdateProfileForm guest={guest} key={guest.nationality}>
        <SelectCountry
          name='nationality'
          id='nationality'
          className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
          defaultCountry={guest.nationality}
        />
      </UpdateProfileForm>
    </div>
  )
}
