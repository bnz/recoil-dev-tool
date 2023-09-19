// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
// import { Tree } from './Tree';
import './index.css'
import reportWebVitals from './reportWebVitals'
import { RecoilRoot } from 'recoil'
import { DebugObserver } from './DebugObserver'
import { TestAtom } from './TestAtom'
import { DebugButton } from './DebugButton'
import { TestAtomFamily } from './TestAtomFamily'
import { InitThemeChangeWatch } from "./useTheme"

createRoot(
    document.getElementById('root') as HTMLElement,
).render(
    <>
        <RecoilRoot>
            <DebugButton />
            {/*<Tree />*/}
            <div className="flex flex-col gap-2">
                <TestAtom />
                <TestAtomFamily />
            </div>
            <InitThemeChangeWatch />
            <DebugObserver />
        </RecoilRoot>
    </>,
)

reportWebVitals()
