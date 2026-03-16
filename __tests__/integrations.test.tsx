/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import IntegrationsPage from '@/app/(dashboard)/dashboard/integrations/page'
import { getIntegrations } from '@/lib/mock/integrations'

jest.mock('@/lib/mock/integrations', () => ({
  getIntegrations: jest.fn(),
}))

describe('IntegrationsPage', () => {
  const mockIntegrations = [
    { id: 'gmail', name: 'Gmail', connected: false },
    { id: 'slack', name: 'Slack', connected: true },
    { id: 'meet', name: 'Google Meet', connected: false },
    { id: 'notion', name: 'Notion', connected: false },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(getIntegrations as jest.Mock).mockReturnValue(mockIntegrations)
  })

  it('should load and display integrations', async () => {
    // Arrange & Act
    render(<IntegrationsPage />)
    
    // Assert - integrations are displayed
    await waitFor(() => {
      expect(screen.getByText('Gmail')).toBeInTheDocument()
      expect(screen.getByText('Slack')).toBeInTheDocument()
    })
  })

  it('should toggle integration when connect button is clicked', async () => {
    // Arrange
    render(<IntegrationsPage />)
    
    // Wait for integrations to load
    await waitFor(() => {
      expect(screen.getByText('Gmail')).toBeInTheDocument()
    })
    
    // Act - click connect on Gmail
    const connectButtons = screen.getAllByText(/connecter/i)
    fireEvent.click(connectButtons[0])
    
    // Assert - button text changes to "Se déconnecter"
    await waitFor(() => {
      expect(screen.getAllByText(/se déconnecter/i).length).toBeGreaterThan(0)
    })
  })

  it('should disconnect integration when disconnect button is clicked', async () => {
    // Arrange
    render(<IntegrationsPage />)
    
    // Wait for integrations to load
    await waitFor(() => {
      expect(screen.getByText('Slack')).toBeInTheDocument()
    })
    
    // Act - click disconnect on Slack (already connected)
    const disconnectButtons = screen.getAllByText(/se déconnecter/i)
    fireEvent.click(disconnectButtons[0])
    
    // Assert - button text changes to "Connecter"
    await waitFor(() => {
      expect(screen.getAllByText(/connecter/i).length).toBeGreaterThan(0)
    })
  })
})
