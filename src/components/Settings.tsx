import cx from "cx"
import { FontSize } from "./options/FontSize"
import { Positions } from "./options/Positions"
import { StickyButton } from "./StickyButton"

export function Settings() {
    return (
        <div className={cx("shadow-inner p-3 flex gap-3")}>
            <div className="p-1 flex items-center gap-2 shadow rounded">
                <h6 className="text-xs">filter by type:</h6>
            </div>
            <div className="p-1 flex items-center gap-2 shadow rounded">
                <h6 className="text-xs">reset favourites:</h6>
            </div>
            <div className="p-1 flex items-center gap-2 shadow rounded">
                <h6 className="text-xs">position:</h6>
                <Positions />
            </div>
            <div className="p-1 flex items-center gap-2 shadow rounded">
                <h6 className="text-xs">font size:</h6>
                <FontSize />
            </div>
            <div className="p-1 flex items-center gap-2 shadow rounded">
                <StickyButton />
            </div>
        </div>
    )
}
