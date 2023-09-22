import { useRecoilCallback, useRecoilSnapshot } from 'recoil'
import { useEffect, useMemo, useRef, useState } from 'react'
import cx from "cx"
import { MainHeader } from "./components/MainHeader"
import { RenderKey } from "./components/RenderKey"
import { RenderValue } from "./components/RenderValue"
import { Settings } from "./components/Settings"
import { useData } from "./DataProvider"
import { PositionEnum } from "./components/options/Positions"

export interface Item {
    type: any
    value: any
}

// positions
//      top-left
//      top-right
//      bottom-left
//      bottom-right

export function DebugObserver() {
    const {
        data,
        setData,
        sortedKeys: [atoms, selectors],
        flags: { settings, sticky },
        flags,
        paddings: p,
        position,
    } = useData()
    const [toggle, setToggle] = useState<Record<string, any>>({})

    const onClick = useRecoilCallback(function fn({ snapshot }) {
        return async function Async() {
            const res: Record<string, Item> = {}
            // @ts-ignore
            for (const node of snapshot.getNodes_UNSTABLE()) {
                if (!/^bnz__/igm.test(node.key)) {
                    res[node.key] = {
                        type: node.constructor.name === "RecoilState"
                            ? "Atom"
                            : node.constructor.name === "RecoilValueReadOnly"
                                ? "Selector"
                                : "",
                        value: await snapshot.getPromise(node),
                    }
                }
            }
            setData(res)
        }
    }, [setData])

    useEffect(function UseEffect() {
        void onClick()
    }, [onClick])

    const snapshot = useRecoilSnapshot()
    useEffect(function UseEffect() {
        const res: Record<string, Item> = {}
        // @ts-ignore
        for (const node of snapshot.getNodes_UNSTABLE({ /* isModified: true */ })) {
            if (!/^bnz__/igm.test(node.key)) {
                res[node.key] = {
                    type: node.constructor.name === "RecoilState"
                        ? "Atom"
                        : node.constructor.name === "RecoilValueReadOnly"
                            ? "Selector"
                            : "",
                    value: snapshot.getLoadable(node).contents,
                }
            }
        }
        setData(res)
    }, [snapshot, setData])

    const ref = useRef<HTMLDivElement | null>(null)

    const stylesMap = useMemo<Record<PositionEnum, string>>(function StylesMap(){
        return {
            [PositionEnum.topRight]: cx(
                sticky ? "top-0 right-0 rounded-tr-none rounded-tl-none rounded-br-none" : "top-5 right-5",
                "w-1/2 h-1/2",
            ),
            [PositionEnum.topLeft]: cx(
                sticky ? "top-0 left-0 rounded-tr-none rounded-tl-none rounded-bl-none" : "top-5 left-5",
                "w-1/2 h-1/2",
            ),
            [PositionEnum.bottomRight]: cx(
                sticky ? "bottom-0 right-0 rounded-tr-none rounded-br-none rounded-bl-none" : "bottom-5 right-5",
                "w-1/2 h-1/2",
            ),
            [PositionEnum.bottomLeft]: cx(
                sticky ? "bottom-0 left-0 rounded-tl-none rounded-bl-none rounded-br-none" : "bottom-5 left-5",
                "w-1/2 h-1/2",
            ),
        }
    }, [sticky])

    return (
        <div tabIndex={0} ref={ref} className={cx(
            "text-[var(--text-color)] bg-[var(--background-color)]",
            "fixed",
            stylesMap[position],

            "rounded-xl shadow-2xl z-40",
            "overflow-hidden",

            "transition-all", // <- REMOVE ME !!!

            // "focus-within:outline",
            // "focus-within:outline-4",
            // "focus-within:outline-[var(--line-color-focus)]",
            // "focus-within:outline-offset-4",

            "grid", settings ? "grid-rows-[30px_90px_1fr]" : "grid-rows-[30px_0_1fr]",
        )}>
            <MainHeader target={ref.current} />
            <section className={cx(
                "border-b border-[var(--line-color)]",
                "bg-black/5",
                "overflow-hidden",
                "transition-all",
                "shadow-sm",
            )}>
                {settings && (
                    <Settings />
                )}
            </section>
            <pre className="p-2 overflow-auto">
                {[...atoms, ...selectors].map(function AtomsMap(key) {
                    const { value, type } = data[key]
                    const hover = typeof value === "object" && value !== null && Object.keys(value).length > 0

                    function onClick() {
                        setToggle(function Updater(prev) {
                            return { ...prev, [key]: !prev[key] }
                        })
                    }

                    const props = hover ? { onClick } : {}

                    return (
                        <div key={key} className={cx(
                            p,
                            "hover:bg-black/5 dark:hover:bg-black/10 rounded transition-colors duration-75",
                            toggle[key] ? "grid grid-cols-[16px_1fr]" : "flex items-center",
                        )}>
                            <RenderKey
                                theKey={key}
                                toggle={toggle[key]}
                                hover={hover}
                                type={type}
                                {...props}
                            />
                            <RenderValue
                                type={type}
                                value={value}
                                toggle={toggle[key]}
                                setToggle={onClick}
                            />
                        </div>
                    )
                })}
            </pre>
        </div>
    )

}
