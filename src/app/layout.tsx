import { PropsWithChildren } from 'react'
import './globals.css'
import Localizer from './i18n'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Localizer />
      {children}
    </>
  )
}
