import cx from "cx"
import { useBgImage } from "../useBgImage"
import { useRecoilState } from "recoil"
import { settingsVisibility } from "../recoiljs/settingsVisibility"
import { useCallback } from "react"

export function SettingsButton() {
    const [settings, setSettings] = useRecoilState(settingsVisibility)
    const toggleSettings = useCallback(function toggleSettings() {
        setSettings(function Updater(prev) {
            return !prev
        })
    }, [setSettings])

    return (
        <button
            className={cx(settings && "bg-black/5 rounded shadow-inner")}
            onClick={toggleSettings}
            style={useBgImage(settings ? "settings-violet" : "settings")}
            title="Settings"
        />
    )
}
