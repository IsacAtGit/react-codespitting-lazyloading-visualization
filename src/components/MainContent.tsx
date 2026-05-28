import { useState } from 'react'

export default function MainContent() {
  const [count, setCount] = useState(0)

  return (
    <main className="main-content">
      <h1>Dashboard</h1>
      <p className="subtitle">
        This area is lightweight. The slow part is the analytics sidebar on the
        right — it is imported synchronously (no code splitting yet).
      </p>

      <section className="card">
        <h2>Quick actions</h2>
        <p>Try clicking the counter while the page is still loading — you may notice lag.</p>
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          Counter: {count}
        </button>
      </section>

      <section className="card">
        <h2>What you will fix later</h2>
        <ul>
          <li>
            <code>React.lazy</code> + <code>Suspense</code> for the sidebar
          </li>
          <li>Route-level or component-level code splitting</li>
          <li>Deferring non-critical data until the sidebar is opened</li>
        </ul>
      </section>
    </main>
  )
}
