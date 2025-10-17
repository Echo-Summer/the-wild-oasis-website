'use client'

import Image from 'next/image'
import { useFormStatus } from 'react-dom'
import { updateGuest } from '../_lib/action'
import SbumitButton from './SubmitButton'

function UpdateProfileForm({ guest, children }) {
  const { fullName, email, nationality, nationalID, countryFlag } = guest

  return (
    <form
      action={updateGuest}
      className='bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col'
    >
      <div className='space-y-2'>
        <label>姓名</label>
        <input
          defaultValue={fullName}
          disabled
          name='fullName'
          className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400'
        />
      </div>

      <div className='space-y-2'>
        <label>邮箱</label>
        <input
          defaultValue={email}
          disabled
          name='email'
          className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400'
        />
      </div>

      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <label htmlFor='nationality'>你来自哪里?</label>
          {countryFlag ? (
            <Image
              src={countryFlag}
              width={32}
              height={32}
              alt='Country flag'
              className='h-5 rounded-sm'
            />
          ) : null}
        </div>

        {children}
      </div>

      <div className='space-y-2'>
        <label htmlFor='nationalID'>身份证号码</label>
        <input
          name='nationalID'
          defaultValue={nationalID}
          className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
        />
      </div>

      <div className='flex justify-end items-center gap-6'>
        <SbumitButton>更新资料</SbumitButton>
      </div>
    </form>
  )
}

export default UpdateProfileForm
