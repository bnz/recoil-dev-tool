import { FontSizeEnum } from "./components/options/FontSize"

export function calcPaddings(fontSize: FontSizeEnum) {
    switch (fontSize) {
        case FontSizeEnum.textXs:
        case FontSizeEnum.textSm:
            return ""
        case FontSizeEnum.textXl:
            return "p-2"
        default:
            return "p-1"
    }
}
