import { useRecoilCallback } from 'recoil'

export function DebugButton() {
    return (
        <button
            className="border rounded px-5 py-3 mb-3"
            onClick={useRecoilCallback(function fn({ snapshot }) {
                return async function Async() {
                    // @ts-ignore
                    for (const node of snapshot.getNodes_UNSTABLE()) {
                        const value = await snapshot.getPromise(node)
                        console.debug(node.key, value)
                    }
                }
            }, [])}
        >
            Dump State
        </button>
    )
}
