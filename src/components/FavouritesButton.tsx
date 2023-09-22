import { useBgImage } from "../useBgImage"
import { useCallback } from "react"
import { useData } from "../DataProvider"
import cx from "cx"

export function FavouritesButton() {
    const { flags: { favourites }, setFlags } = useData()
    const toggle = useCallback(function toggle() {
        setFlags("favourites")
    }, [setFlags])

    return (
        <button
            className={cx(favourites && "bg-black/5 rounded shadow-inner")}
            style={useBgImage(favourites ? "star-fill" : "star")}
            onClick={toggle}
        />
    )
}
