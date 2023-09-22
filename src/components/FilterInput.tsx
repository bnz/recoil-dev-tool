import { useBgImage } from "../useBgImage"
import cx from "cx"
import { KeyboardActions } from "./KeyboardActions"
import { useCallback, useRef } from "react"

interface FilterInputProps {
    target: HTMLDivElement | null
}

export function FilterInput({ target }: FilterInputProps) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const onClick = useCallback(function OnClick() {
        if (inputRef.current) {
            inputRef.current.value = ""
            inputRef.current.focus()
        }
    }, [inputRef])

    return (
        <div
            className="h-6 relative bg-no-repeat bg-[4px_center] bg-[length:20px_20px]"
            style={useBgImage("search", false)}
        >
            <input
                ref={inputRef}
                type="text"
                placeholder="Filter (press F key)"
                className={cx(
                    "peer",
                    "rounded box-border",
                    "pl-6",
                    "outline-none",
                    "transition-all",

                    "w-48 placeholder-shown:w-6 focus:w-48",

                    "placeholder:text-transparent placeholder:italic",

                    "focus:placeholder:text-[var(--text-color-disabled)]",
                    "placeholder-shown:cursor-pointer cursor-auto focus:cursor-auto",
                    "placeholder-shown:bg-transparent bg-[var(--line-color-focus)] focus:bg-[var(--line-color-focus)]",
                    "placeholder-shown:shadow-none shadow-inner focus:shadow-inner",
                    "pr-6 placeholder-shown:pr-0 focus:pr-6",
                )}
            />
            {target !== null && inputRef.current && (
                <KeyboardActions target={target} actions={{
                    Escape(e) {
                        e.preventDefault()
                        if (inputRef.current) {
                            inputRef.current.value = ""
                            inputRef.current.focus()
                        }
                    },
                    KeyF(e) {
                        e.preventDefault()
                        if (inputRef.current && document.activeElement !== inputRef.current) {
                            inputRef.current.focus()
                        }
                    },
                }} />
            )}
            <button
                className={cx(
                    "absolute top-1/2 -translate-y-1/2 right-1",
                    "rounded",
                    "w-4 h-4",
                    "block peer-placeholder-shown:hidden",
                    "bg-no-repeat bg-center bg-[length:16px_16px]",
                )}
                style={useBgImage("close", false)}
                onClick={onClick}
            />
        </div>
    )
}
