import { useBgImage } from "../useBgImage"
import { useCallback } from "react"
import { useData } from "../DataProvider"

export function DebugVisibilityButton() {
    const { setFlags } = useData()

    return (
        <button
            onClick={useCallback(function toggle() {
                setFlags("debug")
            }, [setFlags])}
            style={useBgImage("close")}
            title="Hide"
        />
    )
}
