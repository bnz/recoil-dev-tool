import type { Dispatch, FC, SetStateAction } from "react"
import { Fragment } from "react"

interface RenderValueProps {
    type: any
    value: any
    toggle: boolean
    setToggle: Dispatch<SetStateAction<Record<string, any>>>
}

export const RenderValue: FC<RenderValueProps> = ({ value, toggle, setToggle, type }) => {
    switch (typeof value) {
        case 'boolean':
            return (
                <span className="text-orange-500">
                    {value ? "true" : "false"}
                </span>
            )
        case 'string':
            return (
                <span className="text-green-500">"{value}"</span>
            )
        case 'number':
            return (
                <span className="text-orange-400">{value}</span>
            )
        case 'undefined':
            return (
                <span className="text-gray-500">undefined</span>
            )
        case 'object':
            if (value === null) {
                return (
                    <span className="text-gray-500">null</span>
                )
            } else {
                if (toggle) {
                    if (Array.isArray(value)) {
                        return (
                            <span
                                className="text-[#d9864e] dark:text-[rgba(222,175,143,.9)] col-span-2 grid grid-cols-[52px_1fr]">
                                {value.map((item, index) => (
                                    <Fragment key={index}>
                                        <span className="text-right text-blue-500 after:content-[':'] after:mr-1">
                                            {index}
                                        </span>
                                        <RenderValue value={item} type="" toggle={false} setToggle={() => {
                                        }} />
                                    </Fragment>
                                ))}
                            </span>
                        )
                    } else {

                        console.log(value)

                        return (
                            <span className="text-[#d9864e] dark:text-[rgba(222,175,143,.9)] col-span-2 ml-8">
                                {JSON.stringify(value, null, 2)}
                                {/*<RenderValue value={value} type="" toggle={false} setToggle={() => {*/}
                                {/*}} />*/}
                            </span>
                        )
                    }
                } else if (!Object.keys(value).length) {
                    return (
                        <pre className="text-[#d9864e] dark:text-[rgba(222,175,143,.9)]">
                            {JSON.stringify(value, null, 2)}
                        </pre>
                    )
                } else {
                    return (
                        <pre
                            className="text-[#d9864e] dark:text-[rgba(222,175,143,.9)] text-ellipsis overflow-hidden cursor-pointer"
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
