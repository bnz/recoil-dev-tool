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
        <header className="flex items-center px-1 gap-1 py-1 shadow-sm">
            <div className="flex-1">
                <Logo />
            </div>
            <FilterInput target={target} />
            <FavouritesButton />
            <SettingsButton />
            <div className="w-[1px] h-6 bg-[var(--line-color)]" />
            <DebugVisibilityButton />
        </header>
    )
}
