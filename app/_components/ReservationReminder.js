'use client'

import { XMarkIcon } from '@heroicons/react/24/solid'
import { format } from 'date-fns'
import { useReservation } from './ReservationContext'
import { zhCN } from 'date-fns/locale'

function ReservationReminder() {
  const { range, resetRange } = useReservation()

  if (!range?.from || !range?.to) return null

  return (
    <div className='fixed top-6 left-1/2 -translate-x-1/2 py-5 px-8 rounded-full bg-accent-500 text-primary-800 text  font-semibold shadow-xl shadow-slate-900 flex gap-8 items-center'>
      <p>
        <span>👋</span> 不要忘记你的预订日期是 <br /> 从{' '}
        {format(new Date(range.from), 'yyyy年M月d日 EEE', { locale: zhCN })} 到{' '}
        {format(new Date(range.to), 'yyyy年M月d日 EEE', { locale: zhCN })}
      </p>
      <button
        className='rounded-full p-1 hover:bg-accent-600 transition-all'
        onClick={resetRange}
      >
        <XMarkIcon className='h-5 w-5' />
      </button>
    </div>
  )
}

export default ReservationReminder
