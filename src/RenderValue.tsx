import type { Dispatch, SetStateAction } from "react"
import { Fragment } from "react"
import { useRecoilValue } from "recoil"
import cxx from "cx"
import { fontSize } from "./recoiljs/fontSize"

interface RenderValueProps {
    type: any
    value: any
    toggle: boolean
    setToggle: Dispatch<SetStateAction<Record<string, any>>>
}

export function RenderValue({ value, toggle, setToggle, type }: RenderValueProps) {
    const size = useRecoilValue(fontSize)

    function cx(...props: string[]): string {
        return cxx(size, ...props)
    }

    switch (typeof value) {
        case 'boolean':
            return (
                <span className={cx("text-orange-500")}>
                    {value ? "true" : "false"}
                </span>
            )
        case 'string':
            return (
                <span className={cx("text-green-500")}>"{value}"</span>
            )
        case 'number':
            return (
                <span className={cx("text-orange-400")}>{value}</span>
            )
        case 'undefined':
            return (
                <span className={cx("text-gray-500")}>undefined</span>
            )
        case 'object':
            if (value === null) {
                return (
                    <span className={cx("text-gray-500")}>null</span>
                )
            } else {
                if (toggle) {
                    if (Array.isArray(value)) {
                        return (
                            <span
                                className="text-[#d9864e] dark:text-[rgba(222,175,143,.9)] col-span-2 grid grid-cols-[52px_1fr]">
                                {value.map(function ValueMap(item, index) {
                                    return (
                                        <Fragment key={index}>
                                            <span className={cx(
                                                "text-right text-blue-500 after:content-[':'] after:mr-1",
                                            )}>
                                                {index}
                                            </span>
                                            <RenderValue value={item} type="" toggle={false} setToggle={function () {
                                            }} />
                                        </Fragment>
                                    )
                                })}
                            </span>
                        )
                    } else {
                        return (
                            <span className={cx(
                                "text-[#d9864e] dark:text-[rgba(222,175,143,.9)] col-span-2 ml-8",
                            )}>
                                {JSON.stringify(value, null, 2)}
                                {/*<RenderValue value={value} type="" toggle={false} setToggle={() => {*/}
                                {/*}} />*/}
                            </span>
                        )
                    }
                } else if (!Object.keys(value).length) {
                    return (
                        <pre className={cx("text-[#d9864e] dark:text-[rgba(222,175,143,.9)]")}>
                            {JSON.stringify(value, null, 2)}
                        </pre>
                    )
                } else {
                    return (
                        <pre
                            className={cx(
                                "text-[#d9864e] dark:text-[rgba(222,175,143,.9)] text-ellipsis",
                                "overflow-hidden cursor-pointer",
                            )}
                            title={JSON.stringify(value, null, 2)}
                            onClick={setToggle}
                        >
                            {JSON.stringify(value)}
                        </pre>
                    )
                }
            }
        default:
            return null
    }
}
