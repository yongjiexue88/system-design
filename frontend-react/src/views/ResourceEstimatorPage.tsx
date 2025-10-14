'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'

const formatBytes = (bytes: number, precisionMode: boolean): string => {
  if (!bytes) {
    return '0 B'
  }

  const base = precisionMode ? 1024 : 1000
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] as const
  const index = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(base)))
  const value = parseFloat((bytes / Math.pow(base, index)).toFixed(2))

  if (Number.isInteger(value)) {
    return `${Math.round(value)} ${units[index]}`
  }

  return `${value} ${units[index]}`
}

type ReferenceTableProps = {
  title: string
  headers: string[]
  data: Array<Array<string | number>>
}

const Card = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={`estimator-card ${className ?? ''}`.trim()}>{children}</div>
}

const ReferenceTable = ({ title, headers, data }: ReferenceTableProps) => {
  return (
    <div className="estimator-table">
      <h3>{title}</h3>
      <div className="estimator-table-scroll">
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={`${title}-${index}`}>
                {row.map((cell, cellIndex) => (
                  <td key={`${title}-${index}-${cellIndex}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const tableContent: ReferenceTableProps[] = [
  {
    title: 'Images',
    headers: ['Quality', 'Size', 'Example'],
    data: [
      ['Low', '10 KB', 'Thumbnail, small website images'],
      ['Medium', '100 KB', 'Website photos'],
      ['High', '2 MB', 'Phone camera photo'],
      ['Very High', '20 MB', 'RAW photographer image'],
    ],
  },
  {
    title: 'Videos',
    headers: ['Quality', 'Size', 'Example'],
    data: [
      ['Low', '2 MB/min', '480p video'],
      ['Medium', '20 MB/min', '1080p video'],
      ['High', '80 MB/min', '4k video'],
    ],
  },
  {
    title: 'Audio',
    headers: ['Quality', 'Size', 'Example'],
    data: [
      ['Low', '700 KB', 'Low quality MP3'],
      ['High', '3 MB', 'High quality MP3'],
    ],
  },
]

const infrastructureTableContent: ReferenceTableProps[] = [
  {
    title: 'Bandwidth',
    headers: ['Bandwidth', 'Application'],
    data: [
      ['80 Kbps', 'VoIP calling'],
      ['150 Kbps', 'Screen sharing'],
      ['0.5 Mbps', 'Live streaming webinars'],
      ['3 Mbps', '720p video / Zoom meetings'],
      ['5 Mbps', 'HD 1080p video streaming'],
      ['25 Mbps', '4k Ultra HD video'],
    ],
  },
  {
    title: 'Datastore Latency',
    headers: ['Storage', 'Latency'],
    data: [
      ['Disk', '3 ms'],
      ['SSD', '0.2 ms (15x faster)'],
      ['Memory', '0.01 ms (300x faster)'],
    ],
  },
]

type Ratio = `${number}:${number}`

const ratioToParts = (ratio: string): [number, number] => {
  const parts = ratio
    .split(':')
    .map((part) => Number.parseInt(part.trim(), 10))
    .filter((value) => !Number.isNaN(value))

  if (parts.length === 2 && parts[1] !== 0) {
    return [parts[0], parts[1]]
  }

  return [1, 1]
}

const EstimatorCalculator = () => {
  const [dau, setDau] = useState(1_000_000)
  const [readWriteRatio, setReadWriteRatio] = useState<Ratio>('100:1')
  const [writesPerUser, setWritesPerUser] = useState(1)
  const [retentionMonths, setRetentionMonths] = useState(1)
  const [dataPerWrite, setDataPerWrite] = useState(1)
  const [dataUnit, setDataUnit] = useState<'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB'>('KB')
  const [isPrecisionMode, setIsPrecisionMode] = useState(false)

  const [readRps, setReadRps] = useState('0')
  const [writeRps, setWriteRps] = useState('0')
  const [dailyStorage, setDailyStorage] = useState('0 B')
  const [monthlyStorage, setMonthlyStorage] = useState('0 B')
  const [totalStorage, setTotalStorage] = useState('0 B')

  const unitMultiplier = useMemo(() => {
    const base = isPrecisionMode ? 1024 : 1000
    return {
      B: 1,
      KB: Math.pow(base, 1),
      MB: Math.pow(base, 2),
      GB: Math.pow(base, 3),
      TB: Math.pow(base, 4),
      PB: Math.pow(base, 5),
    } as const
  }, [isPrecisionMode])

  useEffect(() => {
    const [readRatio, writeRatio] = ratioToParts(readWriteRatio)
    const secondsPerDay = isPrecisionMode ? 86_400 : 100_000
    const daysPerMonth = 30.44

    const safeDau = Number.isFinite(dau) ? dau : 0
    const safeWrites = Number.isFinite(writesPerUser) ? writesPerUser : 0
    const safeRetention = Number.isFinite(retentionMonths) ? retentionMonths : 0
    const safeDataAmount = Number.isFinite(dataPerWrite) ? dataPerWrite : 0

    const writesPerDay = safeDau * safeWrites
    const derivedWriteRps = writesPerDay / secondsPerDay
    const readsPerDay = writeRatio ? (writesPerDay * readRatio) / writeRatio : writesPerDay
    const derivedReadRps = readsPerDay / secondsPerDay

    const bytesPerWrite = safeDataAmount * unitMultiplier[dataUnit]
    const dailyBytes = writesPerDay * bytesPerWrite
    const monthlyBytes = dailyBytes * daysPerMonth
    const totalBytes = dailyBytes * safeRetention * daysPerMonth

    setWriteRps(derivedWriteRps.toFixed(2).replace(/\.00$/, ''))
    setReadRps(derivedReadRps.toFixed(2).replace(/\.00$/, ''))
    setDailyStorage(formatBytes(dailyBytes, isPrecisionMode))
    setMonthlyStorage(formatBytes(monthlyBytes, isPrecisionMode))
    setTotalStorage(formatBytes(totalBytes, isPrecisionMode))
  }, [
    dataPerWrite,
    dataUnit,
    dau,
    isPrecisionMode,
    readWriteRatio,
    retentionMonths,
    unitMultiplier,
    writesPerUser,
  ])

  const handleShare = () => {
    const params = new URLSearchParams({
      dau: dau.toString(),
      ratio: readWriteRatio,
      writes: writesPerUser.toString(),
      retention: retentionMonths.toString(),
      data: dataPerWrite.toString(),
      unit: dataUnit,
      precision: isPrecisionMode.toString(),
    })

    const shareUrl = `${window.location.origin}/resource-estimator?${params.toString()}`

    navigator.clipboard
      .writeText(shareUrl)
      .then(() => window.alert('Shareable link copied to clipboard.'))
      .catch((error) => window.console.error('Failed to copy link', error))
  }

  const handleRatioChange = (value: string) => {
    setReadWriteRatio(value as Ratio)
  }

  return (
    <Card className="estimator-calculator">
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="estimator-form">
          <div className="estimator-form-row">
            <label htmlFor="dau">Daily active users</label>
            <input
              id="dau"
              type="number"
              inputMode="numeric"
              value={dau}
              onChange={(event) => setDau(Number.parseInt(event.target.value, 10) || 0)}
            />
          </div>

          <div className="estimator-form-row">
            <label htmlFor="ratio">Read : Write ratio</label>
            <input
              id="ratio"
              type="text"
              value={readWriteRatio}
              onChange={(event) => handleRatioChange(event.target.value)}
            />
          </div>

          <div className="estimator-form-row">
            <label htmlFor="writes">Write operations per user each day</label>
            <input
              id="writes"
              type="number"
              inputMode="numeric"
              value={writesPerUser}
              onChange={(event) => setWritesPerUser(Number.parseInt(event.target.value, 10) || 0)}
            />
          </div>

          <div className="estimator-form-row">
            <label htmlFor="retention">Data retention (months)</label>
            <input
              id="retention"
              type="number"
              inputMode="numeric"
              value={retentionMonths}
              onChange={(event) => setRetentionMonths(Number.parseInt(event.target.value, 10) || 0)}
            />
          </div>

          <div className="estimator-form-row estimator-form-row-split">
            <label htmlFor="data">Data per write request</label>
            <div className="estimator-dual-input">
              <input
                id="data"
                type="number"
                inputMode="numeric"
                value={dataPerWrite}
                onChange={(event) => setDataPerWrite(Number.parseFloat(event.target.value) || 0)}
              />
              <select value={dataUnit} onChange={(event) => setDataUnit(event.target.value as typeof dataUnit)}>
                {(['B', 'KB', 'MB', 'GB', 'TB', 'PB'] as const).map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="estimator-divider">
          <span>Results</span>
          <label className="estimator-precision">
            <input
              type="checkbox"
              checked={isPrecisionMode}
              onChange={(event) => setIsPrecisionMode(event.target.checked)}
            />
            <span>Precision mode</span>
          </label>
        </div>

        <div className="estimator-results">
          <div>
            <span>Read RPS</span>
            <output>{readRps}</output>
          </div>
          <div>
            <span>Write RPS</span>
            <output>{writeRps}</output>
          </div>
        </div>

        <p className="estimator-storage">
          Storage:{' '}
          <strong>
            {dailyStorage}
          </strong>{' '}
          added per day, roughly{' '}
          <strong>
            {monthlyStorage}
          </strong>{' '}
          each month. Total retained storage:{' '}
          <strong>
            {totalStorage}
          </strong>
          .
        </p>

        <div className="estimator-actions">
          <button type="button" onClick={handleShare}>
            Copy shareable link
          </button>
        </div>
      </form>
    </Card>
  )
}

const ResourceEstimatorPage = () => {
  return (
    <div className="estimator-page">
      <section className="section-container">
        <div className="page-heading">
          <p className="page-eyebrow">Tools</p>
          <h1 className="page-title">Back-of-the-envelope Resource Estimator</h1>
          <p className="text-tertiary">
            Translate key load parameters into throughput and storage estimates. Use the calculator to sanity check
            interview answers or plan capacity for your own systems.
          </p>
        </div>

        <div className="estimator-layout">
          <div className="estimator-column">
            <Card>
              <div className="estimator-copy">
                <h2>Why quick estimates matter</h2>
                <p>
                  Estimating resources helps you identify bottlenecks early and makes it easier to communicate trade-offs
                  with your interviewer or teammates. Start with daily active users, derive requests per second, and work
                  backwards into data footprints.
                </p>
                <h3>Key load parameters</h3>
                <ul>
                  <li>
                    <strong>Daily active users (DAU)</strong> tells you how many unique sessions might hit your system.
                  </li>
                  <li>
                    <strong>Requests per second (RPS)</strong> converts DAU into infrastructure requirements.
                  </li>
                  <li>
                    <strong>Read / write ratios</strong> shape caching, replication, and datastore choices.
                  </li>
                  <li>
                    <strong>Data retention</strong> influences storage growth and archiving strategies.
                  </li>
                </ul>
                <h3>Precision toggle</h3>
                <p>
                  Keep the default mode for back-of-the-napkin math. Switch on precision mode to use 86,400 seconds per
                  day and powers-of-two storage units when you need tighter bounds.
                </p>
              </div>
            </Card>
          </div>

          <div className="estimator-column estimator-column-narrow">
            <EstimatorCalculator />

            <Card className="estimator-reference">
              {tableContent.map((table) => (
                <ReferenceTable key={table.title} {...table} />
              ))}
            </Card>

            <Card className="estimator-reference">
              {infrastructureTableContent.map((table) => (
                <ReferenceTable key={table.title} {...table} />
              ))}
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ResourceEstimatorPage
