import type { Metadata } from 'next'
import ResourceEstimatorPage from '@/views/ResourceEstimatorPage'

export const metadata: Metadata = {
  title: 'Resource Estimator | System Design School',
  description:
    'Estimate read/write throughput and storage growth with an interactive calculator designed for system design interviews.',
}

export default function ResourceEstimatorRoute() {
  return <ResourceEstimatorPage />
}
