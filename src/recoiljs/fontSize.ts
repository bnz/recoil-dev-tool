import { atom } from "recoil"
import { keyPrefix } from "../useTheme"

export enum FontSizeEnum {
    textXs = "text-xs",
    textSm = "text-sm",
    textBase = "text-base",
    textLg = "text-lg",
    textXl = "text-2xl",
}

export const fontSize = atom<FontSizeEnum>({
    key: `${keyPrefix}fontSize`,
    default: FontSizeEnum.textBase,
})
