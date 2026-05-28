import { useEffect, useState } from 'react'
import MainContent from './components/MainContent'
import {Suspense} from 'react'
import React from "react";
import './App.css'
const BigSidebar = React.lazy(() => import('./components/HeavySidebar'))
export default function App() {
  const [mountedAt, setMountedAt] = useState<number | null>(null)

  useEffect(() => {
    setMountedAt(performance.now())
  }, [])

  return (
    <div className="app-layout">
      <div className="app-main">
        {mountedAt !== null && (
          <p className="timing-banner">
            App committed to DOM at ~{Math.round(mountedAt)}ms after navigation start
            (open DevTools Performance to see the long task).
          </p>
        )}
        <MainContent />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <BigSidebar />
      </Suspense>
    </div>
  )
}
