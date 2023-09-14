import { useRecoilCallback, useRecoilSnapshot } from 'recoil';
import { Fragment, useEffect, useState } from 'react';
import cx from "classnames"
// @ts-ignore
// import { treeify } from "json-toy"

import ArrowRightIcon from "./assets/arrow-right.svg"
import ArrowBottomIcon from "./assets/arrow-bottom.svg"

export function DebugObserver() {
  const snapshot = useRecoilSnapshot()
  const [data, setData] = useState<Record<any, { type: any, value: any }>>({})

  const [toggle, setToggle] = useState<Record<string, any>>({})

  const onClick = useRecoilCallback(({ snapshot }) => async () => {
    const res: Record<any, { type: any, value: any }> = {}
    // @ts-ignore
    for (const node of snapshot.getNodes_UNSTABLE()) {
      res[node.key] = {
        type: node.constructor.name === "RecoilState"
          ? "Atom"
          : node.constructor.name === "RecoilValueReadOnly"
            ? "Selector"
            : "",
        value: await snapshot.getPromise(node),
      };
    }
    setData(res)
  }, [setData]);

  useEffect(() => {
    void onClick()
  }, [onClick])

  useEffect(() => {
    void onClick()
  }, [snapshot, onClick]);

  return (
    <pre className={cx(
      "border border-[var(--line-color)]",
      "fixed bottom-10 left-1",
      "rounded shadow-2xl max-w-fit min-w-[50%] p-2 z-40 bg-[var(--background-color)]",
    )}>
      {Object.keys(data).map((key) => {
        let hover = false
        let valComponent = <span />
        const value = data[key].value

        switch (typeof value) {
          case 'boolean':
            valComponent = (
              <span className="text-orange-500">{value ? "true" : "false"}</span>
            )
            break
          case 'string':
            valComponent = (
              <span className="text-green-500">"{value}"</span>
            )
            break
          case 'number':
            valComponent = (
              <span className="text-orange-400">{value}</span>
            )
            break
          case 'undefined':
            valComponent = (
              <span className="text-gray-500">undefined</span>
            )
            break
          case 'object':
            if (value === null) {
              valComponent = (
                <span className="text-gray-500">null</span>
              )
            } else {
              if (Object.keys(value).length) {
                hover = true
              }

              if (toggle[key]) {
                if (Array.isArray(value)) {
                  valComponent = (
                    <span className="text-[rgba(222,175,143,.9)] col-span-2 grid grid-cols-[52px_1fr]">
                      {value.map((item, index) => (
                        <Fragment key={index}>
                          <span className="text-right text-blue-500 after:content-[':'] after:mr-1">{index}</span>
                          <span>{item}</span>
                        </Fragment>
                      ))}
                    </span>
                  )
                } else {
                  valComponent = (
                    <span className="text-[rgba(222,175,143,.9)] col-span-2 ml-8">
                      {JSON.stringify(value, null, 2)}
                    </span>
                  )
                }

              } else if (!Object.keys(value).length) {
                valComponent = (
                  <pre className="text-[rgba(222,175,143,.9)]">
                    {JSON.stringify(value, null, 2)}
                  </pre>
                )
              } else {
                valComponent = (
                  <pre
                    className="text-[rgba(222,175,143,.9)] text-ellipsis overflow-hidden cursor-pointer"
                    title={JSON.stringify(value, null, 2)}
                    onClick={() => setToggle((prev) => ({
                      ...prev,
                      [key]: !prev[key],
                    }))}
                  >
                    {JSON.stringify(value)}
                  </pre>
                )
              }
            }
            break
        }

        const props = hover ? {
          onClick() {
            setToggle((prev) => ({
              ...prev,
              [key]: !prev[key],
            }))
          },
        } : {}

        return (
          <div key={key} className={cx(
            "p-1 hover:bg-black/10 rounded transition-colors duration-75",
            toggle[key] ? "grid grid-cols-[16px_1fr]" : "flex items-center",
          )}>
            <span
              className={cx(
                "w-4 h-6 before:content-['_'] before:w-4 before:block",
                hover && "bg-no-repeat bg-center cursor-pointer",
              )}
              {...props}
              style={hover ? {
                backgroundImage: `url('${toggle[key] ? ArrowBottomIcon : ArrowRightIcon}')`,
              } : {}}
            />
            <span
              className={cx("text-blue-500 mr-1 after:content-[':']", hover && "cursor-pointer")}
              {...props}
            >
              {key}
            </span>
            {valComponent}
          </div>
        )
      })}
    </pre>
  );
}