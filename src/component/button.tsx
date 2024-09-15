import { ComponentPropsWithoutRef } from 'react'

export default function Button({
  className,
  children,
  outlined,
  ...other
}: ComponentPropsWithoutRef<'button'>&{outlined?:boolean}) {
  return (
    <button
      {...other}
      className={[
        'border w-full rounded-md border-solid border-gray-300 shadow-sm px-4 py-2 bg-button hover:bg-button-hover',
        outlined?``:`border-0`,
        className,
      ].join(` `)}
    >
      {children}
    </button>
  )
}
