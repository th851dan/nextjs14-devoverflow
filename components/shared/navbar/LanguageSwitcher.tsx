'use client'

import * as React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

const languages = [
    { code: 'en', name: 'EN', flag: '🇬🇧' },
    { code: 'de', name: 'DE', flag: '🇩🇪' },
]

export default function LanguageSwitcher() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()
    const [open, setOpen] = React.useState(false)

    const currentLanguage = languages.find(lang => lang.code === locale) || languages[0]

    const changeLanguage = React.useCallback((code: string) => {
        if (pathname) {
            const segments = pathname.split('/')
            segments[1] = code
            const newPathname = segments.join('/')
            router.push(newPathname)
        }
        setOpen(false)
    }, [pathname, router])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    role="combobox"
                    aria-expanded={open}
                    className="w-20 justify-between text-primary-500 font-bold"
                >
                    <span className="flex items-center">
                        <span className="mr-2 text-xl" aria-hidden="true">{currentLanguage.flag}</span>
                        {currentLanguage.name}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 font-bold" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 dark:border-dark-400">
                <Command className="bg-white dark:bg-dark-300 text-primary-500 font-bold">
                    <CommandList>
                        <CommandGroup>
                            {languages.map((language) => (
                                <CommandItem
                                    key={language.code}
                                    onSelect={() => changeLanguage(language.code)}
                                    className="cursor-pointer"
                                >
                                    <span className="mr-2 text-xl" aria-hidden="true">{language.flag}</span>
                                    {language.name}
                                    <Check
                                        className={cn(
                                            "ml-2 h-4 w-4 text-primary-500",
                                            locale === language.code ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}