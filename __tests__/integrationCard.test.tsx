/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react'
import { IntegrationCard } from '@/components/dashboard/IntegrationCard'
import { Integration } from '@/lib/mock/integrations'

jest.mock('@/lib/mock/integrations', () => ({
  Integration: {} as any,
}))

describe('IntegrationCard', () => {
  const mockIntegration: Integration = {
    id: 'gmail',
    name: 'Gmail',
    connected: false,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should display integration name and disconnected status', () => {
    // Arrange & Act
    render(<IntegrationCard integration={mockIntegration} onToggle={jest.fn()} />)
    
    // Assert
    expect(screen.getByText('Gmail')).toBeInTheDocument()
    expect(screen.getByText('Non connecté')).toBeInTheDocument()
  })

  it('should show connected status when integration is connected', () => {
    // Arrange
    const connectedIntegration = { ...mockIntegration, connected: true }
    
    // Act
    render(<IntegrationCard integration={connectedIntegration} onToggle={jest.fn()} />)
    
    // Assert
    expect(screen.getByText('Connecté')).toBeInTheDocument()
  })

  it('should call onToggle when connect button is clicked', () => {
    // Arrange
    const mockOnToggle = jest.fn()
    render(<IntegrationCard integration={mockIntegration} onToggle={mockOnToggle} />)
    
    // Act
    const connectButton = screen.getByRole('button', { name: /connecter/i })
    fireEvent.click(connectButton)
    
    // Assert
    expect(mockOnToggle).toHaveBeenCalled()
  })

  it('should show disconnect button when connected', () => {
    // Arrange
    const connectedIntegration = { ...mockIntegration, connected: true }
    
    // Act
    render(<IntegrationCard integration={connectedIntegration} onToggle={jest.fn()} />)
    
    // Assert
    expect(screen.getByRole('button', { name: /se déconnecter/i })).toBeInTheDocument()
  })
})
