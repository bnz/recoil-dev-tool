import { useRecoilCallback, useRecoilSnapshot, useRecoilState, useRecoilValue } from 'recoil'
import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import cx from "cx"
import { paddings } from "./recoiljs/paddings"
import { allData } from "./recoiljs/allData"
import { allDataSorted } from "./recoiljs/allDataSorted"
import { MainHeader } from "./components/MainHeader"
import { settingsVisibility } from "./recoiljs/settingsVisibility"
import { RenderKey } from "./RenderKey"
import { RenderValue } from "./RenderValue"
import { Settings } from "./components/Settings"
import { createContext, PropsWithChildren } from "react"

type Data = Record<string, Item>

const DataContext = createContext<[
    data: Record<string, Item>,
    setData: Dispatch<SetStateAction<Data>>
]>([{}, function SetData() {
}])

export function DataProvider({ children }: PropsWithChildren) {
    return (
        <DataContext.Provider value={useState<Data>({})}>
            {children}
        </DataContext.Provider>
    )
}

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
    const [data, setData] = useContext(DataContext)
    const [toggle, setToggle] = useState<Record<string, any>>({})
    const [settingsVisible, setSettingsVisible] = useRecoilState(settingsVisibility)

    console.log(data)

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
        for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
            // console.debug(node.key, snapshot.getLoadable(node))

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

    const [atoms, selectors, atomFamilies] = useRecoilValue(allDataSorted)

    // console.log({ atomFamilies })
    console.log("!")

    const ref = useRef<HTMLDivElement | null>(null)

    const p = useRecoilValue(paddings)

    return (
        <div tabIndex={0} ref={ref} className={cx(
            !settingsVisible && "border border-[var(--line-color)]",
            "fixed bottom-10 left-2 right-2",
            "rounded-xl shadow-2xl z-40 bg-[var(--background-color)]",
            "overflow-hidden",

            "max-h-[50vh]",

            "focus-within:outline",
            "focus-within:outline-4",
            "focus-within:outline-[var(--line-color-focus)]",
            "focus-within:outline-offset-4",
        )}>
            <MainHeader target={ref.current} />
            {settingsVisible && (
                <Settings />
            )}
            <pre className="p-2">
                {[...atoms, ...selectors].map(function AtomsMap(key) {
                    const { value, type } = data[key]
                    const hover = typeof value === "object" && value !== null && Object.keys(value).length > 0

                    function onClick() {
                        setToggle(function Updater(prev) {
                            return {
                                ...prev,
                                [key]: !prev[key],
                            }
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
