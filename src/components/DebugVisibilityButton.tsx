import { useBgImage } from "../useBgImage"
import { useSetRecoilState } from "recoil"
import { debugVisibility } from "../recoiljs/debugVisibility"
import { useCallback } from "react"

export function DebugVisibilityButton() {
    const setVisibility = useSetRecoilState(debugVisibility)

    return (
        <button
            onClick={useCallback(function toggle() {
                setVisibility(false)
            }, [setVisibility])}
            style={useBgImage("close")}
            title="Hide"
        />
    )
}
