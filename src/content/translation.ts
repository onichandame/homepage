import locales from "@/locale/locales";

/** short texts */
export const translation = {
  'metadata.description': {
    'en-US': `onichandame's Homepage`,
    'zh-CN': `onichandame的主页`,
  },
} as const satisfies Record<string, Record<(typeof locales)[number], string>>

