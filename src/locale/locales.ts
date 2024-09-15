export const locales = [`en-US`, `zh-CN`] as const
export const defaultLocale = locales[0]
export const localizedLocale: Record<Locale, string> = {
    'en-US': 'English',
    'zh-CN': '简体中文',
}

export type Locale=typeof locales[number]