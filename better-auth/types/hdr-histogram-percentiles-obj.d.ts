// types/hdr-histogram-percentiles-obj.d.ts
declare module 'hdr-histogram-percentiles-obj' {
  export function histAsObj(hist: any, total?: number): Record<string, number>;
  export function addPercentiles(hist: any, result: Record<string, number>): Record<string, number>;
}
