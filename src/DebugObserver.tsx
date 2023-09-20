import { useRecoilCallback, useRecoilSnapshot } from 'recoil'
import { CSSProperties, useEffect, useRef, useState } from 'react'
import cx from "classnames"
import { RenderValue } from "./RenderValue"
import { themeKey, useTheme } from "./useTheme"
import { RenderKey } from "./RenderKey"
import { KeyboardActions } from "./KeyboardActions"

function useBgImage(name: string, asIcon = true): CSSProperties {
    const isDark = useTheme(true)
    const url = require(`./assets/${name}${isDark ? "-white" : ""}.svg`)
    return {
        backgroundImage: `url(${url})`,
        ...(asIcon ? {
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "20px 20px",
            width: 6 * 4,
            height: 6 * 4,
        } : {}),
    }
}

export function DebugObserver() {
    const snapshot = useRecoilSnapshot()
    const [data, setData] = useState<Record<any, { type: any, value: any }>>({})
    const [toggle, setToggle] = useState<Record<string, any>>({})
    const [debugVisible, setDebugVisible] = useState(true)
    const [settingsVisible, setSettingsVisible] = useState(false)

    const [favoriteOnly, setFavoriteOnly] = useState(false)

    const onClick = useRecoilCallback(({ snapshot }) => async () => {
        const res: Record<any, { type: any, value: any }> = {}
        // @ts-ignore
        for (const node of snapshot.getNodes_UNSTABLE()) {
            if (node.key !== themeKey) {
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
    }, [setData])

    useEffect(() => {
        void onClick()
    }, [onClick])

    useEffect(() => {
        void onClick()
    }, [snapshot, onClick])

    const atomFamiliesKeys: Record<string, { type: any, value: any }[]> = {}

    const [atoms, selectors, atomFamilies] = Object.keys(data).reduce((previousValue, currentValue) => {
        if (/([A-Za-z0-9].*)(_{2})"([A-Za-z0-9].*)"/.test(currentValue)) {
            const [name] = currentValue.split("__")
            if (previousValue[2].indexOf(name) === -1) {
                previousValue[2].push(name)
            }
            if (!atomFamiliesKeys[name]) {
                atomFamiliesKeys[name] = [{ type: "AtomFamily", value: data[currentValue].value }]
            } else {
                atomFamiliesKeys[name].push({ type: "AtomFamily", value: data[currentValue].value })
            }
        } else {
            if (data[currentValue].type === "Selector") {
                previousValue[1].push(currentValue)
            }
            if (data[currentValue].type === "Atom") {
                previousValue[0].push(currentValue)
            }
        }
        return previousValue
    }, [[], [], []] as [string[], string[], string[]])

    // console.log({ atomFamilies, atomFamiliesKeys })

    const ref = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const closeButtonStyles = useBgImage("close")

    return (
        <div tabIndex={0} ref={ref} className={cx(
            !settingsVisible && "border border-[var(--line-color)]",
            "fixed bottom-10 left-1",
            "rounded-xl shadow-2xl max-w-fit min-w-[50%] z-40 bg-[var(--background-color)]",
            "overflow-hidden",
            "focus-within:outline focus-within:outline-4 focus-within:outline-[var(--line-color-focus)] focus-within:outline-offset-8",
        )}>
            <header className="border-b border-[var(--line-color)] flex items-center">
                <div
                    className="italic flex items-center px-1 bg-[linear-gradient(to_right,orange,violet)]"
                    // @ts-ignore
                    style={{ "-webkit-background-clip": "text", "-webkit-text-fill-color": "transparent" }}
                >
                    recoil.js?DevTools ツ
                </div>
                <div
                    className="ml-3 bg-no-repeat bg-[4px_center] bg-[length:20px_20px]"
                    style={useBgImage("search", false)}
                >
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Filter (press F key)"
                        className={cx(
                            "pr-2 pl-6 my-1 rounded border border-[var(--line-color)] bg-transparent box-content",
                            "outline-none",
                            "focus:border-[var(--line-color-focus)]",
                            "focus:placeholder:text-[var(--text-color-disabled)]",
                        )}
                    />
                    {ref.current !== null && inputRef.current && (
                        <KeyboardActions target={ref.current} actions={{
                            Escape() {
                                if (inputRef.current) {
                                    inputRef.current.value = ""
                                }
                            },
                            KeyF() {
                                if (inputRef.current && document.activeElement !== inputRef.current) {
                                    inputRef.current.focus()
                                }
                            },
                        }} />
                    )}
                </div>
                <button
                    style={useBgImage(favoriteOnly ? "star-fill" : "star")}
                    onClick={() => setFavoriteOnly((prev) => !prev)}
                />
                <button
                    // className="px-2"
                    onClick={() => setSettingsVisible(true)}
                    style={useBgImage("settings")}
                    title="Settings"
                />
                <button
                    className="text-gray-500 border-0 border-l border-l-[var(--line-color)] px-2"
                    onClick={() => setDebugVisible((prev) => !prev)}
                >
                    {debugVisible ? "hide" : "show"}
                </button>
            </header>
            <pre className="p-2">
                {[...atoms, ...selectors].map((key) => {
                    const { value, type } = data[key]
                    const hover = typeof value === "object" && value !== null && Object.keys(value).length > 0
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
            {settingsVisible && (
                <>
                    <KeyboardActions actions={{
                        Escape: () => {
                            setSettingsVisible(false)
                            ref.current?.focus()
                        },
                    }} />
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm">
                        <div className="absolute inset-5 bg-[var(--background-color)] rounded-xl shadow">
                            <header className="flex border-b border-b-[var(--line-color)] p-2">
                                <div className="flex-1">
                                    Settings
                                </div>
                                <button
                                    className="w-6 h-6"
                                    style={{ ...closeButtonStyles }}
                                    onClick={() => {
                                        setSettingsVisible(false)
                                        ref.current?.focus()
                                    }}
                                />
                            </header>
                            <div className="p-2">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae consequatur cum
                                distinctio excepturi facilis fugiat harum id inventore ipsam magnam maiores nesciunt
                                nisi quibusdam, quod rem, repellendus vitae voluptatem.
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
