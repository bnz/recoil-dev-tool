import cx from "cx"
import { CSSProperties } from "react"

interface InputRadioProps {
    name: string
    value: string | number
    defaultChecked?: boolean
    className?: string | undefined
    style?: CSSProperties | undefined
    onClick?(): void
}

export function InputRadio({ name, value, onClick, className, defaultChecked, style }: InputRadioProps) {
    return (
        <label onClick={onClick}>
            <input
                className={cx(
                    "hidden",
                    "[&+div]:checked:bg-[var(--text-color-selected)]",
                    "[&+div]:checked:border-transparent",
                    "[&+div]:checked:text-[var(--background-color)]",
                )}
                type="radio"
                name={name}
                defaultChecked={defaultChecked}
            />
            <div style={style} className={cx(
                "border border-[var(--line-color-focus)]",
                "py-1 px-2 rounded cursor-pointer",
                "text-center",
                className,
            )}>
                {value}
            </div>
        </label>
    )
}
