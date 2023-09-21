import { useBgImage } from "../useBgImage"
import { useRecoilState } from "recoil"
import { favoriteOnly } from "../recoiljs/favoriteOnly"
import { useCallback } from "react"

export function FavouritesButton() {
    const [favorite, setFavorite] = useRecoilState(favoriteOnly)
    const toggle = useCallback(function toggle() {
        setFavorite(function (prev) {
            return !prev
        })
    }, [setFavorite])

    return (
        <button style={useBgImage(favorite ? "star-fill" : "star")} onClick={toggle} />
    )
}
