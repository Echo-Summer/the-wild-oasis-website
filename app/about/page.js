import Image from 'next/image'
import about1 from '@/public/about-1.jpg'
import Link from 'next/link'
import { getCabins } from '../_lib/data-service'

// 以秒为单位，每一天都会更新数据
export const revalidate = 86400

export const metadata = {
  title: 'About',
}

async function Page() {
  const cabins = await getCabins()
  console.log(cabins)

  return (
    <div className='grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center'>
      <div className='col-span-3'>
        <h1 className='text-4xl mb-10 text-accent-400 font-medium'>
          Welcome to The Wild Oasis
        </h1>

        <div className='space-y-8'>
          <p>
            在这里，自然之美与舒适生活完美融合。隐匿于浙江莫干山深处，这里是您远离尘嚣的天堂。但这并不仅仅是奢华小屋的故事。它关乎与自然的重新连接，与家人共享简单的快乐。
          </p>
          <p>
            我们的{cabins.length}
            间奢华小屋提供了一个温馨的基地，但您在周围群山中所能找到的真实自由与宁静才是真正的体验。漫步于茂密的森林中，呼吸新鲜空气，在篝火的温暖或您的温泉浴缸上方仰望闪烁的星空。
          </p>
          <p>
            这里是难忘时刻的诞生之地，被自然之美所环绕。这是一个可以放慢脚步、放松身心，感受在美丽环境中相聚之乐的地方。
          </p>
        </div>
      </div>

      <div className='col-span-2'>
        <Image
          src={about1}
          alt='Family sitting around a fire pit in front of cabin'
        />
      </div>

      <div className='relative aspect-square col-span-2'>
        <Image
          src='/about-2.jpg'
          fill
          className='object-cover'
          alt='Family that manages The Wild Oasis'
        />
      </div>

      <div className='col-span-3'>
        <h1 className='text-4xl mb-10 text-accent-400 font-medium'>
          创办于2018年
        </h1>

        <div className='space-y-8'>
          <p>
            自2018年以来，The Wild
            Oasis一直是一个备受珍视的家庭式度假胜地。由我们的祖父母创办，这个避难所一直沐浴在爱与关怀之中，通过我们的家族传承，见证了我们致力于创造一个温暖、欢迎的环境的承诺。
          </p>
          <p>
            多年来，我们一直保持着The Wild
            Oasis的精髓，将山川的永恒之美与只有家族企业才能提供的个人触感相结合。在这里，你不仅仅是一位客人；你是我们大家庭的一员。所以，尽快加入我们，来到The
            Wild Oasis，在这里传统与宁静相遇，每一次访问都如同回家。
          </p>

          <div>
            <Link
              href='/cabins'
              className='inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all'
            >
              探索我们的小屋
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
