import { PropsWithChildren } from 'react'

export default function Template({ children }: PropsWithChildren) {
  return (
    <>
      <header>
        <nav className="border-blue-900">
          <ol>
            <li>Home</li>
          </ol>
          <ol>
            <li>Blog</li>
            <li>Github</li>
          </ol>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}
