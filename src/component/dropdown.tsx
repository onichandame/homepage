import { ComponentPropsWithoutRef, useEffect, useRef, } from 'react'

export default function Dropdown({
  children,
  className,
  onClose ,
  ...other
}: ComponentPropsWithoutRef<'div'> & { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClickOutside: Parameters<typeof document['addEventListener']>[1] = (ev) => {
      if (ref.current) {
        if (!ref.current.contains(ev.target as Node))
          onClose()
      }
    }
    document.addEventListener(`mouseup`, handleClickOutside)
    return () => { document.removeEventListener(`mouseup`, handleClickOutside) }
  }, [onClose])
  return (
    <div
      ref={ref}
      {...other}
      role="menu"
      className={[
        'origin-center absolute ring-1 ring-opacity-5 rounded-md shadow-lg bg-button',
        className,
      ].join(` `)}
    >
      {children}
    </div>
  )
}
