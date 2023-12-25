import { PropsWithChildren } from 'react'
import Navbar from './navbar'

export default function Template({ children }: PropsWithChildren) {
  return (
    <>
      <header className="bg-secondary px-12">
        <Navbar />
      </header>
      <main className="p-12">{children}</main>
    </>
  )
}
