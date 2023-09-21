import cx from "cx"
import { FontSize } from "./options/FontSize"
import { Positions } from "./options/Positions"

export function Settings() {
    return (
        <section className={cx(
            "p-5 border-b border-[var(--line-color)] [&>div]:px-3",
            "bg-black/5",
            "shadow-inner",
        )}>
            <div className="">
                filter by type
            </div>
            <div className="">
                reset favourites
            </div>
            <div className="p-1 flex items-center gap-2">
                <h6 className="text-xs">position:</h6>
                <Positions />
            </div>
            <div className="p-1 flex items-center gap-2">
                <h6 className="text-xs">font size:</h6>
                <FontSize />
            </div>
        </section>
    )
}
