import cx from "cx"
import ArrowBottomIcon from "./assets/arrow-bottom.svg"
import ArrowRightIcon from "./assets/arrow-right.svg"
import { useRecoilValue } from "recoil"

import { fontSize } from "./recoiljs/fontSize"

interface RenderKeyProps {
    theKey: string
    toggle: boolean
    hover: boolean
    type: any
    onClick?(): void
}

export function RenderKey({ toggle, theKey, hover, type, onClick }: RenderKeyProps) {
    const size = useRecoilValue(fontSize)

    return (
        <>
            <div
                onClick={onClick}
                className={cx(
                    "w-4 h-6 before:content-['_'] before:w-4 before:block",
                    hover && "bg-no-repeat bg-center cursor-pointer",
                )}
                style={hover ? {
                    backgroundImage: `url('${toggle ? ArrowBottomIcon : ArrowRightIcon}')`,
                } : {}}
            />
            <div
                onClick={onClick}
                className={cx(
                    size,
                    "text-blue-500 mr-1 after:content-[':'] relative",
                    hover && "cursor-pointer",
                    type === "Selector" && "underline underline-offset-2",
                )}
            >
                {theKey}
            </div>
        </>
    )
}
