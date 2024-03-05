'use client'

import Button from '@/component/button'
import Dropdown from '@/component/dropdown'
import locales from '@/locale/locales'
import LocalizedLink from '@/locale/localized_link'
import useDefaultLocale from '@/locale/use_default_locale'
import useLocale from '@/locale/use_locale'
import useUnlocalizedPath from '@/locale/use_unlocalized_path'
import {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { IoLogoGithub, IoIosArrowDown } from 'react-icons/io'

export default function Navbar() {
  const allSections = [
    { matcher: /^\/$/, name: `home` },
    { matcher: /^\/blog/, name: `blog` },
    { matcher: /^\/resume/, name: `resume` },
  ] as const
  const [section, setSection] =
    useState<(typeof allSections)[number]['name']>('home')
  const unlocalizedPath = useUnlocalizedPath()
  useEffect(() => {
    allSections.forEach(sec => {
      if (sec.matcher.test(unlocalizedPath)) setSection(sec.name)
    })
  }, [unlocalizedPath])
  return (
    <nav className=" flex justify-between h-16 ">
      <NavbarSection>{/** TODO: search bar */}</NavbarSection>
      <NavbarSection>
        <NavbarSectionItem>
          <LocalizedLink
            href="/"
            className={section === 'home' ? `font-bold` : ``}
          >
            Home
          </LocalizedLink>
        </NavbarSectionItem>
        <NavbarSectionItem>
          <LocalizedLink
            href="/blog"
            className={section === 'blog' ? `font-bold` : ``}
          >
            Blog
          </LocalizedLink>
        </NavbarSectionItem>
        <NavbarSectionItem>
          <LocalizedLink
            href="/resume"
            className={section === 'resume' ? `font-bold` : ``}
          >
            Résumé
          </LocalizedLink>
        </NavbarSectionItem>
        <NavbarSectionItem>
          <a href="https://github.com/onichandame" className="text-xl">
            <IoLogoGithub />
          </a>
        </NavbarSectionItem>
        <NavbarSectionItem>
          <LocaleSelector />
        </NavbarSectionItem>
        <NavbarSectionItem>
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src="https://res.cloudinary.com/onichandame/image/upload/w_64/v1654698901/pic/20220608222820_10_oaxmjm.png"
              alt="avatar"
            />
          </div>
        </NavbarSectionItem>
      </NavbarSection>
    </nav>
  )
}

function NavbarSection({ children }: PropsWithChildren) {
  const normalizedChildren = Array.isArray(children) ? children : [children]
  return <ul className="flex items-center space-x-10">{normalizedChildren}</ul>
}

function NavbarSectionItem({ children }: PropsWithChildren) {
  return <li className="text-base">{children}</li>
}

function LocaleSelector() {
  const id = 'language-selector'
  const locale = useLocale()
  const [isOpen, toggleOpen] = useReducer(v => !v, false)
  const { setDefaultLocale } = useDefaultLocale()
  return (
    <>
      <LocaleButton
        locale={locale}
        onClick={() => toggleOpen()}
        id={id}
        type="button"
        aria-expanded={isOpen}
      >
        <IoIosArrowDown />
      </LocaleButton>
      {isOpen && (
        <Dropdown
          role="menu"
          aria-labelledby={id}
          aria-orientation="vertical"
          className="w-32"
          onClose={() => toggleOpen()}
        >
          <div className="py-1 flex flex-col">
            {locales.map(loc => (
              <LocalizedLink locale={loc}>
                <LocaleButton
                  locale={loc}
                  className={`${loc === locale ? `bg-button-hover` : `bg-button`
                    }`}
                  onClick={() => {
                    setDefaultLocale(loc)
                  }}
                />
              </LocalizedLink>
            ))}
          </div>
        </Dropdown>
      )}
    </>
  )
}

function LocaleButton({
  locale,
  children,
  className,
  ...other
}: { locale: (typeof locales)[number] } & ComponentPropsWithoutRef<
  typeof Button
>) {
  return (
    <Button
      {...other}
      className={[
        'inline-flex space-x-2 items-center justify-center',
        className,
      ].join(` `)}
    >
      <LocaleIcon locale={locale} />
      <div>{locale}</div>
      {children}
    </Button>
  )
}

function LocaleIcon({ locale }: { locale: (typeof locales)[number] }) {
  return (
    <img
      className="h-4"
      alt={locale}
      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${locale.split(`-`)[1]
        }.svg`}
    />
  )
}
