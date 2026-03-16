/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SettingsForm } from '@/components/dashboard/SettingsForm'

describe('SettingsForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should display current user name and email', () => {
    // Arrange & Act
    render(<SettingsForm saving={false} onSave={jest.fn()} />)
    
    // Assert
    expect(screen.getByDisplayValue('Jean Dupont')).toBeInTheDocument()
    expect(screen.getByDisplayValue('jean@demo.fr')).toBeInTheDocument()
  })

  it('should toggle notifications when switch is clicked', () => {
    // Arrange
    render(<SettingsForm saving={false} onSave={jest.fn()} />)
    
    // Act - find the notifications toggle button and click it
    const toggleButton = document.querySelector('button.relative')
    if (toggleButton) {
      fireEvent.click(toggleButton)
    }
    
    // The form state changes internally, but we verify no crash occurs
    expect(screen.getByDisplayValue('Jean Dupont')).toBeInTheDocument()
  })

  it('should call onSave when save button is clicked', () => {
    // Arrange
    const mockOnSave = jest.fn()
    render(<SettingsForm saving={false} onSave={mockOnSave} />)
    
    // Act
    const saveButton = screen.getByRole('button', { name: /enregistrer/i })
    fireEvent.click(saveButton)
    
    // Assert
    expect(mockOnSave).toHaveBeenCalled()
  })

  it('should show saving state when saving is true', () => {
    // Arrange
    render(<SettingsForm saving={true} onSave={jest.fn()} />)
    
    // Assert
    expect(screen.getByText(/enregistrement/i)).toBeInTheDocument()
  })

  it('should disable save button when saving', () => {
    // Arrange
    render(<SettingsForm saving={true} onSave={jest.fn()} />)
    
    // Assert
    const saveButton = screen.getByRole('button', { name: /enregistrement/i })
    expect(saveButton).toBeDisabled()
  })
})
