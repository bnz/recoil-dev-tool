import type { FC } from 'react'
import { atomFamily, useRecoilState } from 'recoil'
import { Cell } from './Cell'

const boolAtomFamily = atomFamily<boolean, string>({
    key: "bools",
    default: false,
})

export const TestAtomFamily: FC = () => {
    const [bools, setBools] = useRecoilState(boolAtomFamily("bonez"))
    // const [bools2, setBools2] =
    useRecoilState(boolAtomFamily("0001"))

    return (
        <>
            <Cell
                value={bools}
                onClick={() => setBools((prev) => !prev)}
            />
        </>
    )
}
