import type { FC } from 'react'
import { atom, selector, useRecoilState } from 'recoil';
import { Cell } from './Cell';

const randRange = (min = 1, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min

const boolAtom = atom<boolean>({
  key: "boolFlag",
  default: false,
})

const stringAtom = atom<string>({
  key: "fooString",
  default: "foo",
})

const numberAtom = atom<number>({
  key: "countNumber",
  default: randRange(),
})

const nullUndefinedAtom = atom<null | undefined>({
  key: "notExist",
  default: null,
})

const objectAtom = atom<Record<string, any>>({
  key: "objectItem",
  default: {},
})

const arrayAtom = atom<any[]>({
  key: "arrayItem",
  default: [],
})

const sel = selector({
  key: "sel",
  get({ get }) {
    return get(arrayAtom).map((item) => `${item} (!!!)`)
  },
})

export const TestAtom: FC = () => {
  const [bool, setBool] = useRecoilState(boolAtom)
  const [str, setStr] = useRecoilState(stringAtom)
  const [num, setNum] = useRecoilState(numberAtom)
  const [exist, setExist] = useRecoilState(nullUndefinedAtom)
  const [item, setItem] = useRecoilState(objectAtom)
  const [arr, setArr] = useRecoilState(arrayAtom)

  return (
    <>
      <Cell
        value={bool ? "true" : "false"}
        onClick={() => setBool((prev) => !prev)}
      />
      <Cell
        value={str}
        onClick={() => setStr((prev) => prev === "foo" ? "bar and baz ;)" : "foo")}
      />
      <Cell
        value={num}
        onClick={() => setNum(randRange())}
      />
      <Cell
        value={exist === null ? "null" : "undefined"}
        onClick={() => setExist((prev) => prev === null ? undefined : null)}
      />
      <Cell
        value={<pre>{JSON.stringify(item, null, 2)}</pre>}
        onClick={() => setItem((prev) => {
          return JSON.stringify(prev) === "{}" ? {
            foo: "bar",
            cypress: ["hill"],
            alpha: 42,
          } : {}
        })}
      />
      <Cell
        value={arr}
        onClick={() => {
          setArr((prev) => prev.length ? [] : ["one", "two", "three", 124])
        }}
      />
    </>
  )
}
