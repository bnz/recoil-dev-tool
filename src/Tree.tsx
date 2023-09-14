import type { FC } from 'react'
// @ts-ignore
// import treeify from "object-treeify"

import { treeify } from "json-toy"

export const Tree: FC = () => {

  const tree = treeify([
    {
      foo: "bar",
      num: 2,
      arr: ["one", 2, "III"],
    },
    {
      foo: "bar 2",
      num: 10,
      arr: ["one", 2, "III"],
    },
  ])

  console.log(tree)


  return (
    <pre>{tree}</pre>
  )
}
