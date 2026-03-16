/**
 * EmailWidget Contract Test
 * 
 * Visible contract:
 * - Widget displays email summary with from, subject, preview
 * - AI Brief section is visible
 * - Auto-rotation between emails every 3.5s
 * - Status indicators (summarized time, accuracy)
 */
import { render, screen, waitFor } from '@testing-library/react'
import { EmailWidget } from '@/components/widgets/EmailWidget'

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Mail: ({ className }: { className?: string }) => <svg data-testid="mail-icon" className={className} />,
}))

describe('EmailWidget', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should render email widget with initial email data', () => {
    // Arrange & Act
    render(<EmailWidget />)
    
    // Assert - first email should be visible
    expect(screen.getByText(/From: Sarah Chen/i)).toBeInTheDocument()
    expect(screen.getByText(/Q4 Product Roadmap Review/i)).toBeInTheDocument()
  })

  it('should render AI Brief section', () => {
    // Arrange & Act
    render(<EmailWidget />)
    
    // Assert
    expect(screen.getByText(/AI Brief/i)).toBeInTheDocument()
    expect(screen.getByText(/Key decision:/i)).toBeInTheDocument()
  })

  it('should render status indicators', () => {
    // Arrange & Act
    render(<EmailWidget />)
    
    // Assert
    expect(screen.getByText(/Summarized in/i)).toBeInTheDocument()
    expect(screen.getByText(/96% accuracy/i)).toBeInTheDocument()
  })
})
