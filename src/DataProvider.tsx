import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react"
import { Item } from "./DebugObserver"
import { FontSizeEnum } from "./components/options/FontSize"
import { calcPaddings } from "./calcPaddings"
import { PositionEnum } from "./components/options/Positions"

type Data = Record<string, Item>

type Flags = Record<"settings" | "debug" | "favourites" | "sticky", boolean>

interface Store {
    data: Data,
    setData: Dispatch<SetStateAction<Data>>,
    sortedKeys: [string[], string[], string[]],

    flags: Flags
    setFlags(name: keyof Flags, value?: boolean): void,

    fontSize: FontSizeEnum
    paddings: string
    setFontSize(value: FontSizeEnum): void

    position: PositionEnum
    setPosition(value: PositionEnum): void
}

const defaultValue: Store = {
    data: {},
    setData() {
    },
    sortedKeys: [[], [], []],
    flags: {
        settings: false,
        debug: true,
        favourites: false,
        sticky: true,
    },
    setFlags() {
    },
    fontSize: FontSizeEnum.textBase,
    paddings: "",
    setFontSize() {
    },
    position: PositionEnum.topRight,
    setPosition() {
    },
}

const DataContext = createContext<Store>(defaultValue)

export const useData = () => {
    const store = useContext(DataContext)
    if (!store) {
        throw new Error('hook must be used within a Provider')
    }
    return store
}

export function DataProvider({ children, storageName }: PropsWithChildren<{ storageName?: string }>) {
    const flagsStorageName = `${storageName}__flags`
    const fontSizeStorageName = `${storageName}__font-size`
    const positionStorageName = `${storageName}__position`

    const [data, setData] = useState<Data>(defaultValue.data)
    const [flags, setFlags] = useState(defaultValue.flags)
    const [fontSize, setFontSize] = useState(defaultValue.fontSize)
    const [paddings, setPaddings] = useState(calcPaddings(defaultValue.fontSize))
    const [position, setPosition] = useState(defaultValue.position)

    useEffect(function UseEffect() {
        try {
            setFlags(JSON.parse(localStorage.getItem(flagsStorageName) || JSON.stringify(defaultValue.flags)))

            const size = JSON.parse(localStorage.getItem(fontSizeStorageName) || JSON.stringify(defaultValue.fontSize))
            setFontSize(size)
            setPaddings(calcPaddings(size))
            setPosition(JSON.parse(localStorage.getItem(positionStorageName) || JSON.stringify(defaultValue.position)))
        } catch (e) {
        }
    }, [flagsStorageName, fontSizeStorageName, positionStorageName, setFlags, setFontSize, setPaddings, setPosition])

    const sortedKeys = useMemo(function () {
        const atomFamiliesKeys: Record<string, Item[]> = {}

        return Object.keys(data).reduce(function Fn(previousValue, currentValue) {
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

    }, [data])

    return (
        <DataContext.Provider value={{
            data,
            setData,
            sortedKeys,
            flags,
            setFlags: useCallback(function SetFlags(name, value) {
                setFlags(function Set(prev) {
                    const res = { ...prev, [name]: value || !prev[name] }
                    if (storageName) {
                        window.localStorage.setItem(flagsStorageName, JSON.stringify(res))
                    }
                    return res
                })
            }, [storageName, setFlags, flagsStorageName]),
            fontSize,
            paddings,
            setFontSize: useCallback(function SetFontSize(value) {
                setFontSize(value)
                setPaddings(calcPaddings(value))
                if (storageName) {
                    window.localStorage.setItem(fontSizeStorageName, JSON.stringify(value))
                }
            }, [storageName, setFontSize, setPaddings, fontSizeStorageName]),
            position,
            setPosition: useCallback(function SetPosition(value) {
                setPosition(value)
                if (storageName) {
                    window.localStorage.setItem(positionStorageName, JSON.stringify(value))
                }
            }, [storageName, setPosition, positionStorageName]),
        }}>
            {children}
        </DataContext.Provider>
    )
}
