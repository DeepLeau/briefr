/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import LoginPage from '@/app/(auth)/login/page'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
}))

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should show loading spinner when login is in progress', async () => {
    // Arrange
    const { container } = render(<LoginPage />)
    
    // Act - click login button
    const loginButton = screen.getByRole('button', { name: /se connecter/i })
    fireEvent.click(loginButton)
    
    // Assert - loading spinner appears
    const spinner = container.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('should redirect to dashboard after login completes', async () => {
    // Arrange
    const mockPush = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
    
    render(<LoginPage />)
    
    // Act - click login and wait for timeout
    const loginButton = screen.getByRole('button', { name: /se connecter/i })
    fireEvent.click(loginButton)
    
    // Wait for the 800ms timeout to complete
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    }, { timeout: 1000 })
  })

  it('should disable button during loading state', () => {
    // Arrange
    render(<LoginPage />)
    
    // Act
    const loginButton = screen.getByRole('button', { name: /se connecter/i })
    fireEvent.click(loginButton)
    
    // Assert - button is disabled
    expect(loginButton).toBeDisabled()
  })
})
