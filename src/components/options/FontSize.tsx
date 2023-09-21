import { useRecoilState } from "recoil"
import { fontSize, FontSizeEnum } from "../../recoiljs/fontSize"
import { InputRadio } from "../InputRadio"

const sizes = Object.values(FontSizeEnum)

export function FontSize() {
    const [size, setSize] = useRecoilState(fontSize)

    return (
        <div className="flex gap-1 select-none items-center">
            {sizes.map(function SizesMapper(key, index) {
                return (
                    <InputRadio
                        key={key}
                        name="fontSize"
                        value={++index}
                        defaultChecked={key === size}
                        className={key}
                        onClick={function onClick() {
                            setSize(key as FontSizeEnum)
                        }}
                    />
                )
            })}
        </div>
    )
}
