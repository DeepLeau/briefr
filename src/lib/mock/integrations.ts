export interface Integration {
  id: string
  name: string
  connected: boolean
}

let mockIntegrations: Integration[] = [
  { id: 'gmail', name: 'Gmail', connected: true },
  { id: 'slack', name: 'Slack', connected: true },
  { id: 'meet', name: 'Google Meet', connected: false },
  { id: 'notion', name: 'Notion', connected: false },
]

export function getIntegrations(): Integration[] {
  return mockIntegrations
}

export function toggleIntegration(id: string, connect: boolean): Integration | undefined {
  const index = mockIntegrations.findIndex(i => i.id === id)
  if (index !== -1) {
    mockIntegrations[index].connected = connect
    return mockIntegrations[index]
  }
  return undefined
}
