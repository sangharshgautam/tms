export interface Project {
    id: number
    name: string
    suite: string
    environment: string
    datetime: string
    durationSeconds: number
    total: number
    passed: number
    failed: number
    broken: number
    skipped: number
    passRate?: number
}