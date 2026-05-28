import { ANALYTICS_DATASET, type AnalyticsRow } from '../data/generateAnalyticsData'
import { FixedSizeList as List } from "react-window";

import './HeavySidebar.css'

const VISIBLE_ROWS = 4_000

const Row = ({ index, style }) =>{
  return (
    <div  style={{
      ...style,
    }}>
      <SidebarRow row={ANALYTICS_DATASET[index]} />
    </div>
  )
}

function trendSymbol(trend: AnalyticsRow['trend']) {
  if (trend === 'up') return '▲'
  if (trend === 'down') return '▼'
  return '■'
}

function SidebarRow({ row }: { row: AnalyticsRow }) {
  const spark = Array.from({ length: 12 }, (_, i) =>
    Math.abs(Math.sin((row.id + i) * 0.31)) > 0.5 ? '█' : '░',
  ).join('')

  return (
    <article className="sidebar-row" data-id={row.id}>
      <header>
        <span className="row-id">#{row.id}</span>
        <span className={`trend trend-${row.trend}`}>{trendSymbol(row.trend)}</span>
      </header>
      <p className="product">{row.product}</p>
      <p className="region">{row.region}</p>
      <div className="metrics">
        <span>${row.revenue.toLocaleString()}</span>
        <span>{row.units} units</span>
        <span>{row.margin}% margin</span>
      </div>
      <pre className="spark" aria-hidden="true">
        {spark}
      </pre>
      <ul className="tags">
        {row.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </article>
  )
}

function SummaryPanel({ rows }: { rows: AnalyticsRow[] }) {
  let totalRevenue = 0
  let totalUnits = 0
  const byRegion: Record<string, number> = {}

  for (const row of rows) {
    totalRevenue += row.revenue
    totalUnits += row.units
    byRegion[row.region] = (byRegion[row.region] ?? 0) + row.revenue
  }

  return (
    <section className="summary-panel">
      <h3>Dataset summary</h3>
      <p>Rows loaded: {rows.length.toLocaleString()}</p>
      <p>Total revenue: ${totalRevenue.toLocaleString()}</p>
      <p>Total units: {totalUnits.toLocaleString()}</p>
      <ul>
        {Object.entries(byRegion).map(([region, revenue]) => (
          <li key={region}>
            {region}: ${revenue.toLocaleString()}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function HeavySidebar() {
  const rows = ANALYTICS_DATASET.slice(0, VISIBLE_ROWS)

  return (
    <aside className="heavy-sidebar" aria-label="Analytics sidebar (heavy)">
      <header className="sidebar-header">
        <h2>Analytics explorer</h2>
        <p>
          Not part of main content — this panel loads {VISIBLE_ROWS.toLocaleString()}{' '}
          rows synchronously on every page load.
        </p>
      </header>

      <SummaryPanel rows={ANALYTICS_DATASET} />

      <div className="sidebar-list">
        {/* {rows.map((row) => (
          <SidebarRow key={row.id} row={row} />
        ))} */}
         <List
        height={window.innerHeight - 140}
        itemCount={rows.length}
        itemSize={120}
        width={"100%"}
      >
        {Row}
      </List>
      </div>
    </aside>
  )
}
