import { selector } from "recoil"
import { keyPrefix } from "../useTheme"
import { fontSize, FontSizeEnum } from "./fontSize"

export const paddings = selector({
    key: `${keyPrefix}paddings`,
    get({ get }) {
        switch (get(fontSize)) {
            case FontSizeEnum.textXs:
            case FontSizeEnum.textSm:
                return ""
            case FontSizeEnum.textXl:
                return "p-2"
            default:
                return "p-1"
        }
    },
})
