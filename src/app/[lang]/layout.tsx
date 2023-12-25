import { PropsWithChildren } from 'react'
import { Params } from './type'
import locales from '@/locale/locales'

export async function generateStaticParams(): Promise<Params[]> {
  return locales.map(v => ({ lang: v }))
}

export default function Layout({
  children,
  params,
}: PropsWithChildren & { params: Params }) {
  return (
    <html lang={params.lang}>
      <body className="bg-primary text-primary">{children}</body>
    </html>
  )
}
