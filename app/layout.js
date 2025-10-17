import '@/app/_styles/globals.css'

// 导入谷歌字体
import { Josefin_Sans } from 'next/font/google'
// import { Noto_Sans_SC } from 'next/font/google'
import Header from './_components/Header'
import { ReservationProvider } from './_components/ReservationContext'

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
})

// const notoSansSC = Noto_Sans_SC({
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '700'],
//   display: 'swap',
// })

// 页面标题
export const metadata = {
  // title: 'The Wild Oasis',
  title: {
    template: '%s / The Wild Oasis',
    default: 'Welcome / The Wild Oasis',
  },
  description:
    'A beautiful cabin hotel, surrounded by amazing mountains and forests',
}

function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${josefin.className} relative antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        <Header />
        <div className='flex-1 px-8 py-12 grid'>
          <main className='max-w-7xl mx-auto  w-full'>
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
