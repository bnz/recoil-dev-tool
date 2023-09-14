import { useRecoilCallback } from 'recoil';

export function DebugButton() {
  const onClick = useRecoilCallback(({snapshot}) => async () => {
    // @ts-ignore
    for (const node of snapshot.getNodes_UNSTABLE()) {
      const value = await snapshot.getPromise(node);
      console.debug(node.key, value);
    }
  }, []);

  return <button onClick={onClick} className="border rounded px-5 py-3 mb-3">Dump State</button>
}