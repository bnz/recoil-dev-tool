import { InputRadio } from "../InputRadio"
import { useBgImage } from "../../useBgImage"
import { useData } from "../../DataProvider"

export enum PositionEnum {
    topLeft = "top-left",
    topRight = "top-right",
    bottomLeft = "bottom-left",
    bottomRight = "bottom-right",
}

const keys = Object.values(PositionEnum)

export function Positions() {
    const { position, setPosition } = useData()

    return (
        <div className="grid grid-cols-2 gap-1 select-none">
            {keys.map(function PositionsMap(pos) {
                return (
                    <InputRadio
                        key={pos}
                        name="position"
                        value={""}
                        defaultChecked={position === pos}
                        style={useBgImage(position === pos ? `${pos}-selected` : pos)}
                        onClick={function OnClick() {
                            setPosition(pos)
                        }}
                    />
                )
            })}
        </div>
    )
}
