import { InputRadio } from "../InputRadio"

const positions = [
    "top",
    "bottom",
    "left",
    "right",
]

export function Positions() {
    return (
        <div className="flex gap-1 select-none items-center">
            {positions.map(function PositionsMap(position) {
                return (
                    <InputRadio
                        key={position}
                        name="position"
                        value={position}
                    />
                )
            })}
        </div>
    )
}
