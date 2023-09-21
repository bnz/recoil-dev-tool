import { selector } from "recoil"
import { keyPrefix } from "../useTheme"

export const currentDataTypes = selector({
    key: `${keyPrefix}currentDataTypes`,
    get() {

    },
})
