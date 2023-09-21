import { CSSProperties } from "react"
import { useTheme } from "./useTheme"

export function useBgImage(name: string, asIcon = true): CSSProperties {
    const isDark = useTheme(true)
    const url = require(`./assets/${name}${isDark ? "-white" : ""}.svg`)
    return {
        backgroundImage: `url(${url})`,
        ...(asIcon ? {
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "20px 20px",
            width: 6 * 4,
            height: 6 * 4,
        } : {}),
    }
}
