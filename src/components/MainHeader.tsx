import { Logo } from "./Logo"
import { FilterInput } from "./FilterInput"
import { SettingsButton } from "./SettingsButton"
import { DebugVisibilityButton } from "./DebugVisibilityButton"
import { FavouritesButton } from "./FavouritesButton"

interface MainHeaderProps {
    target: HTMLDivElement | null
}

export function MainHeader({ target }: MainHeaderProps) {
    return (
        <header className="border-b border-[var(--line-color)] flex items-center px-1 gap-2 py-1">
            <div className="flex-1">
                <Logo />
            </div>
            <FilterInput target={target} />
            <FavouritesButton />
            <SettingsButton />
            <DebugVisibilityButton />
        </header>
    )
}
