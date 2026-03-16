/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SettingsPage from '@/app/(dashboard)/dashboard/settings/page'

describe('SettingsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should show saving state when save is clicked', async () => {
    // Arrange
    render(<SettingsPage />)
    
    // Act - click save button
    const saveButton = screen.getByRole('button', { name: /enregistrer/i })
    fireEvent.click(saveButton)
    
    // Assert - shows saving state
    expect(screen.getByText(/enregistrement/i)).toBeInTheDocument()
  })

  it('should return to saved state after save completes', async () => {
    // Arrange
    render(<SettingsPage />)
    
    // Act - click save and advance timers
    const saveButton = screen.getByRole('button', { name: /enregistrer/i })
    fireEvent.click(saveButton)
    
    // Advance timer past the 1000ms timeout
    jest.advanceTimersByTime(1100)
    
    // Assert - back to normal state
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /enregistrer/i })).toBeInTheDocument()
    })
  })

  it('should disable button during saving', () => {
    // Arrange
    render(<SettingsPage />)
    
    // Act
    const saveButton = screen.getByRole('button', { name: /enregistrer/i })
    fireEvent.click(saveButton)
    
    // Assert - button is disabled
    expect(saveButton).toBeDisabled()
  })
})
