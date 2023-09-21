import { atom } from "recoil"
import { keyPrefix } from "../useTheme"

export const debugVisibility = atom({
    key: `${keyPrefix}debugVisibility`,
    default: true,
})
