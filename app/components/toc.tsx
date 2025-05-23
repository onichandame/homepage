import { useState, useEffect } from 'react'
import { useLocation } from '@remix-run/react'

export function Toc({ headings }: { headings: Array<{ id: string, text: string, depth: number }> }) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            // Update URL without page reload
            window.history.replaceState(null, '', `${location.pathname}#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '0px 0px -80% 0px' }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    // Set initial activeId from URL hash
    if (location.hash) {
      const id = location.hash.substring(1)
      if (headings.some(h => h.id === id)) {
        setActiveId(id)
      }
    }

    return () => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id)
        if (element) observer.unobserve(element)
      })
    }
  }, [headings, location.pathname, location.hash])

  if (headings.length === 0) return null

  return (
    <div className="hidden lg:block sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto py-4 pl-8 border-l border-gray-200 bg-white/50 backdrop-blur-sm rounded-lg p-4">
      <div className="text-sm font-medium text-gray-500 mb-4">ON THIS PAGE</div>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(heading.id)?.scrollIntoView({
                behavior: 'smooth'
              })
              // Update URL without page reload
              window.history.replaceState(null, '', `${location.pathname}#${heading.id}`)
              setActiveId(heading.id)
            }}
            className={`block transition-colors hover:text-gray-900 ${activeId === heading.id ? 'text-blue-600 font-medium' : 'text-gray-500'
              } ${heading.depth === 1 ? 'pl-0' : heading.depth === 2 ? 'pl-2' : 'pl-4'}`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  )
}