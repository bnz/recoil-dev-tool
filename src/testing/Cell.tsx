interface CellProps {
    value: any
    onClick: VoidFunction
}

export function Cell({ value, onClick }: CellProps) {
    return (
        <div
            className="flex items-center p-2 cursor-pointer text-xs border-t border-gray-200 dark:border-gray-600"
            onClick={onClick}
        >
            {value}
        </div>
    )
}
