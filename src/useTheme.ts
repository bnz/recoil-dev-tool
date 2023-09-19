import { atom, useRecoilValue, useSetRecoilState } from "recoil"
import { FC, useEffect } from "react"

export type Themes = "dark" | "light"

const fn = (e: any): Themes => e.matches ? "dark" : "light"

export const themeKey = "bnz__theme"

const theme = atom<Themes>({
    key: themeKey,
    default: window.matchMedia ? fn(window.matchMedia("(prefers-color-scheme: dark)")) : "light",
})

export const InitThemeChangeWatch: FC = () => {
    const setState = useSetRecoilState(theme)

    useEffect(() => {
        const MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')

        if (MediaQueryList.matches) {
            setState("dark")
        }

        MediaQueryList.addEventListener('change', (event) => {
            setState(fn(event))
        })
    }, [setState])

    return null
}

export const useTheme = (isDark?: boolean) => {
    const t = useRecoilValue(theme)

    if (isDark) {
        return t === "dark"
    }
    return t
}
