import cx from "cx"
import { useBgImage } from "../useBgImage"
import { useCallback } from "react"
import { useData } from "../DataProvider"

export function SettingsButton() {
    const { flags: { settings }, setFlags } = useData()
    const toggleSettings = useCallback(function toggleSettings() {
        setFlags("settings")
    }, [setFlags])

    return (
        <button
            className={cx(settings && "bg-black/5 rounded shadow-inner")}
            style={useBgImage(settings ? "settings-violet" : "settings")}
            onClick={toggleSettings}
            title="Settings"
        />
    )
}
