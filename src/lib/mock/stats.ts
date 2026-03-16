export interface Stats {
  briefsThisMonth: number
  briefsDelta: number
  timeSavedHours: number
  timeSavedDelta: number
  connectedSources: number
  accuracyRate: number
}

export function getStats(): Stats {
  return {
    briefsThisMonth: 47,
    briefsDelta: 12,
    timeSavedHours: 28,
    timeSavedDelta: 8,
    connectedSources: 2,
    accuracyRate: 94,
  }
}
