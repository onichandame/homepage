import { PropsWithChildren } from 'react'
import Navbar from './navbar'

export default function Template({ children }: PropsWithChildren) {
  return (
    <>
      <header className="bg-secondary px-page">
        <Navbar />
      </header>
      <main>{children}</main>
    </>
  )
}
