import { atom } from "recoil"
import { keyPrefix } from "../useTheme"

export const settingsVisibility = atom({
    key: `${keyPrefix}settingsVisibility`,
    default: true,
})
