import { atom } from "recoil"
import { keyPrefix } from "../useTheme"
import { Item } from "../DebugObserver"

export const allData = atom<Record<string, Item>>({
    key: `${keyPrefix}allData`,
    default: {},
})
