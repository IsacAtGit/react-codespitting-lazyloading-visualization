export type AnalyticsRow = {
  id: number
  region: string
  product: string
  revenue: number
  units: number
  margin: number
  trend: 'up' | 'down' | 'flat'
  updatedAt: string
  tags: string[]
  notes: string
}

const REGIONS = ['North America', 'Europe', 'APAC', 'LATAM', 'MEA'] as const
const PRODUCTS = [
  'Widget Pro',
  'Widget Lite',
  'Gadget X',
  'Gadget Plus',
  'Service Pack A',
  'Service Pack B',
  'Bundle Alpha',
  'Bundle Beta',
] as const

/** Intentionally expensive: runs at module import, blocks the main thread. */
function expensiveSortAndAggregate(rows: AnalyticsRow[]): AnalyticsRow[] {
  const copy = [...rows]
  copy.sort((a, b) => b.revenue - a.revenue)
  for (let pass = 0; pass < 3; pass++) {
    copy.sort((a, b) => a.region.localeCompare(b.region) || b.units - a.units)
  }
  return copy
}

export function generateAnalyticsData(count = 12_000): AnalyticsRow[] {
  const rows: AnalyticsRow[] = []
  for (let i = 0; i < count; i++) {
    const revenue = Math.round((Math.sin(i * 0.017) + 1.2) * 50_000 + i * 3)
    const units = Math.floor(revenue / (80 + (i % 40)))
    rows.push({
      id: i + 1,
      region: REGIONS[i % REGIONS.length],
      product: PRODUCTS[i % PRODUCTS.length],
      revenue,
      units,
      margin: Math.round((revenue / (units || 1)) * 0.12 * 100) / 100,
      trend: i % 3 === 0 ? 'up' : i % 3 === 1 ? 'down' : 'flat',
      updatedAt: new Date(2024, i % 12, (i % 28) + 1).toISOString(),
      tags: [`tag-${i % 7}`, `segment-${i % 11}`, `cohort-${i % 5}`],
      notes: `Row ${i + 1}: synthetic analytics record for demo purposes with extra text to inflate bundle size.`,
    })
  }
  return expensiveSortAndAggregate(rows)
}

/** Eagerly generated at import — part of what makes first paint slow. */
export const ANALYTICS_DATASET = generateAnalyticsData(12_000)
