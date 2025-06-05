import { decodeFromCompressedBase64 } from 'hdr-histogram-js';
import { addPercentiles, histAsObj } from 'hdr-histogram-percentiles-obj';

export interface HistogramStats {
  min: number
  max: number
  average: number
  stddev: number
  p2_5: number
  p50: number
  p75: number
  p90: number
  p97_5: number
  p99: number
  p99_9: number
  p99_99: number
  p99_999: number
}

export function decodeHistogram(base64: string) {
  const histogram = decodeFromCompressedBase64(base64);
  const base = histAsObj(histogram);
  const withPercentiles = addPercentiles(histogram, base);
  return withPercentiles;
}

export function parseAutocannonHistograms(encoded: {
  latencies: string
  requests: string
  throughput: string
}) {
  return {
    latencies: decodeHistogram(encoded.latencies),
    requests: decodeHistogram(encoded.requests),
    throughput: decodeHistogram(encoded.throughput),
  };
}


export function calculateSummaryStats(
  latencies: HistogramStats,
  requests: HistogramStats,
  throughput: HistogramStats
) {
  return {
    totalAverageLatency: latencies.average,
    totalRequestsPerSecond: requests.p50,
    totalThroughputPerSecond: throughput.p50,
    estimatedDataPerRequest: throughput.p50 / requests.p50, // bytes/request
    totalVolumeOver10s: throughput.p50 * 10 // 예: 10초간 데이터 총량 (bytes)
  }
}
