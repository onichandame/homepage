import { PropsWithChildren } from 'react'
import './globals.css'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
    </>
  )
}
