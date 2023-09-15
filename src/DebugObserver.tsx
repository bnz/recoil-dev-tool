import { useRecoilCallback, useRecoilSnapshot } from 'recoil'
import { Fragment, useCallback, useEffect, useState } from 'react'
import cx from "classnames"
// @ts-ignore
// import { treeify } from "json-toy"

import ArrowRightIcon from "./assets/arrow-right.svg"
import ArrowBottomIcon from "./assets/arrow-bottom.svg"
import { RenderValue } from "./RenderValue"

export function DebugObserver() {
    const snapshot = useRecoilSnapshot()
    const [data, setData] = useState<Record<any, { type: any, value: any }>>({})

    const [toggle, setToggle] = useState<Record<string, any>>({})

    const onClick = useRecoilCallback(({ snapshot }) => async () => {
        const res: Record<any, { type: any, value: any }> = {}
        // @ts-ignore
        for (const node of snapshot.getNodes_UNSTABLE()) {
            res[node.key] = {
                type: node.constructor.name === "RecoilState"
                    ? "Atom"
                    : node.constructor.name === "RecoilValueReadOnly"
                        ? "Selector"
                        : "",
                value: await snapshot.getPromise(node),
            }
        }
        setData(res)
    }, [setData])

    useEffect(() => {
        void onClick()
    }, [onClick])

    useEffect(() => {
        void onClick()
    }, [snapshot, onClick])

    return (
        <div className={cx(
            "border border-[var(--line-color)]",
            "fixed bottom-10 left-1",
            "rounded shadow-2xl max-w-fit min-w-[50%] z-40 bg-[var(--background-color)]",
        )}>
            <div className="border-b border-[var(--line-color)]">asd</div>
            <pre className="p-2">
                {Object.keys(data).map((key) => {
                    const { value, type } = data[key]
                    const hover = typeof value === "object" && value !== null && Object.keys(value).length
                    const onClick = () => {
                        setToggle((prev) => ({
                            ...prev,
                            [key]: !prev[key],
                        }))
                    }

                    const props = hover ? { onClick } : {}

                    return (
                        <div key={key} className={cx(
                            "p-1 hover:bg-black/5 dark:hover:bg-black/10 rounded transition-colors duration-75",
                            toggle[key] ? "grid grid-cols-[16px_1fr]" : "flex items-center",
                        )}>
                            <div {...props} className={cx(
                                "w-4 h-6 before:content-['_'] before:w-4 before:block",
                                hover && "bg-no-repeat bg-center cursor-pointer",
                            )}
                                style={hover ? {
                                    backgroundImage: `url('${toggle[key] ? ArrowBottomIcon : ArrowRightIcon}')`,
                                } : {}}
                            />
                            <div
                                className={cx(
                                    "text-blue-500 mr-1 after:content-[':'] relative",
                                    hover && "cursor-pointer",
                                    type === "Selector" && "underline underline-offset-2",
                                )}
                                {...props}
                            >
                                {key}
                            </div>
                            <RenderValue type={type} value={value} toggle={toggle[key]} setToggle={onClick} />
                        </div>
                    )
                })}
            </pre>
        </div>
    )
}
