import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import LabsListPage from './pages/LabsListPage'
import TitrationPage from './pages/labs/TitrationPage'
import ElectrolysisPage from './pages/labs/ElectrolysisPage'
import FlameTestPage from './pages/labs/FlameTestPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="labs" element={<LabsListPage />} />
          <Route path="labs/titration" element={<TitrationPage />} />
          <Route path="labs/electrolysis" element={<ElectrolysisPage />} />
          <Route path="labs/flame-test" element={<FlameTestPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
