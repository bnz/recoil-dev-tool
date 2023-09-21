import cx from "cx"

interface InputRadioProps {
    name: string
    value: string | number
    defaultChecked?: boolean
    className?: string | undefined
    onClick?(): void
}

export function InputRadio({ name, value, onClick, className, defaultChecked }: InputRadioProps) {
    return (
        <label onClick={onClick}>
            <input
                className={cx(
                    "hidden",
                    "[&+div]:checked:bg-[var(--text-color-disabled)]",
                    "[&+div]:checked:text-[var(--background-color)]",
                )}
                type="radio"
                name={name}
                defaultChecked={defaultChecked}
            />
            <div className={cx(
                "border border-[var(--line-color-focus)]",
                "py-1 px-2  rounded cursor-pointer",
                "text-center",
                className,
            )}>
                {value}
            </div>
        </label>
    )
}
