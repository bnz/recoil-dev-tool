import { useData } from "../DataProvider"
import { useCallback } from "react"

interface StickyButtonProps {

}

export function StickyButton({}: StickyButtonProps) {
    const { flags: { sticky }, setFlags } = useData()

    return (
        <label className="cursor-pointer">
            <input
                type="checkbox"
                defaultChecked={sticky}
                onChange={useCallback(function OnChange() {
                    setFlags("sticky")
                }, [setFlags])}
            />
            sticky
        </label>
    )
}
