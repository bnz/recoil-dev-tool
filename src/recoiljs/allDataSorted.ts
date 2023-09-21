import { selector } from "recoil"
import { keyPrefix } from "../useTheme"
import { allData } from "./allData"
import { Item } from "../DebugObserver"

export const allDataSorted = selector({
    key: `${keyPrefix}allDataSorted`,
    get({ get }) {
        const data = get(allData)
        const atomFamiliesKeys: Record<string, Item[]> = {}

        const res = Object.keys(data).reduce(function Fn(previousValue, currentValue) {
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

        return res
    },
})
