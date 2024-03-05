import { ComponentPropsWithoutRef } from 'react'

export default function PersonalInfo({
  className,
  ...other
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...other}
      className={[
        'flex flex-col space-y-4 p-8 rounded-md bg-secondary w-80 items-center',
        className,
      ].join(` `)}
    >
      <div className="w-32 h-32 rounded-full overflow-hidden">
        <img
          src="https://res.cloudinary.com/onichandame/image/upload/v1654698901/pic/20220608222820_10_oaxmjm.png"
          alt="avatar"
        />
      </div>
      <h3 className="text-xl font-bold">Xiao Zhang</h3>
      <div>
        <p>
          I'm an innovation driven developer who always try new stuff. From
          frontend to backend, from architecture to implementation, I am
          experienced in almost every field in the web dev. I am also keen on
          the most cutting-edge technologies, especially something not so mature
          but has tremendous potential. IPFS, web3 and Rust are a few examples.
          Recently I am into data science.
        </p>
      </div>
    </div>
  )
}
