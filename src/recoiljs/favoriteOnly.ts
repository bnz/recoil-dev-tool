import { atom } from "recoil"
import { keyPrefix } from "../useTheme"

export const favoriteOnly = atom({
    key: `${keyPrefix}favoriteOnly`,
    default: false,
})
