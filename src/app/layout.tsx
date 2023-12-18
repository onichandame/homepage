import { PropsWithChildren } from 'react'
import './globals.css'
import I18n from './i18n'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <I18n>{children}</I18n>
    </>
  )
}
