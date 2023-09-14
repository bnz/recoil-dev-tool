import { FC } from 'react';

export const Cell: FC<{ value: any, onClick: VoidFunction }> = ({ value, onClick }) => (
  <div className="border-t border-gray-200 grid grid-cols-2">
    <div className="flex items-center pl-5 text-xs">{value}</div>
    <button className="p-1" onClick={onClick}>
      toggle
    </button>
  </div>
)
