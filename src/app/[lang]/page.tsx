import PersonalInfo from './personal_info'

export default function Home() {
  return (
    <div>
        <div className="overflow-hidden flex">
        <div className='relative'>
          <img
            className='h-80 w-auto object-cover object-left'
            src="https://res.cloudinary.com/onichandame/image/upload/v1703598157/pic/017c065e2d7d06a80121651814bcca.jpg_3000w_1l_0o_100sh_uzxxlb.jpg"
            alt="background"
          />
          <div className='absolute inset-0 bg-gradient-to-r from-transparent to-[#161616]' />
        </div>
        </div>
      <div className="absolute top-16 px-page">
        <PersonalInfo className="mt-32" />
      </div>
    </div>
  )
}
