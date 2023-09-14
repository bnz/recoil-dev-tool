import type { FC } from 'react'
import { atomFamily, useRecoilState } from 'recoil';
import { Cell } from './Cell';

const boolAtomFamily = atomFamily<boolean, string>({
  key: "bools",
  default: false,
})

export const TestAtomFamily: FC = () => {
  const [bools, setBools] = useRecoilState(boolAtomFamily("001"))

  return (
    <>
      <Cell
        value={bools}
        onClick={() => setBools((prev) => !prev)}
      />
    </>
  )
}
