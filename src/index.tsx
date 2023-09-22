import { createRoot } from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { RecoilRoot } from 'recoil'
import { DebugObserver } from './DebugObserver'
import { TestAtom } from './TestAtom'
import { DebugButton } from './DebugButton'
import { TestAtomFamily } from './TestAtomFamily'
import { InitThemeChangeWatch } from "./useTheme"
import { DataProvider } from "./DataProvider"

createRoot(
    document.getElementById('root') as HTMLElement,
).render(
    <>
        <RecoilRoot>
            <DebugButton />
            <div className="flex flex-col gap-2">
                <TestAtom />
                <TestAtomFamily />
            </div>
            <InitThemeChangeWatch />
            <DataProvider storageName="dev-tools">
                <DebugObserver />
            </DataProvider>
        </RecoilRoot>
    </>,
)

reportWebVitals()
