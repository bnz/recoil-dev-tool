import { InputRadio } from "../InputRadio"
import { useData } from "../../DataProvider"

export enum FontSizeEnum {
    textXs = "text-xs",
    textSm = "text-sm",
    textBase = "text-base",
    textLg = "text-lg",
    textXl = "text-2xl",
}

const sizes = Object.values(FontSizeEnum)

export function FontSize() {
    const { fontSize, setFontSize } = useData()

    return (
        <div className="flex gap-1 select-none items-center">
            {sizes.map(function SizesMapper(key, index) {
                return (
                    <InputRadio
                        key={key}
                        name="fontSize"
                        value={++index}
                        defaultChecked={key === fontSize}
                        className={key}
                        onClick={function onClick() {
                            setFontSize(key)
                        }}
                    />
                )
            })}
        </div>
    )
}
