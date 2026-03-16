/**
 * SlackWidget Contract Test
 * 
 * Visible contract:
 * - Widget displays Slack channel info and thread title
 * - Shows message previews from users
 * - AI Brief section with action items
 * - Auto-rotation between threads every 3.5s
 */
import { render, screen } from '@testing-library/react'
import { SlackWidget } from '@/components/widgets/SlackWidget'

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  MessageSquare: ({ className }: { className?: string }) => <svg data-testid="message-icon" className={className} />,
  Hash: ({ className }: { className?: string }) => <svg data-testid="hash-icon" className={className} />,
  User: ({ className }: { className?: string }) => <svg data-testid="user-icon" className={className} />,
}))

describe('SlackWidget', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should render Slack widget with channel information', () => {
    // Arrange & Act
    render(<SlackWidget />)
    
    // Assert - first thread should be visible
    expect(screen.getByText('#product')).toBeInTheDocument()
    expect(screen.getByText(/Launch checklist for v2.4/i)).toBeInTheDocument()
  })

  it('should render message previews from users', () => {
    // Arrange & Act
    render(<SlackWidget />)
    
    // Assert
    expect(screen.getByText(/@sarah:/i)).toBeInTheDocument()
    expect(screen.getByText(/@mike:/i)).toBeInTheDocument()
  })

  it('should render AI Brief section with action items', () => {
    // Arrange & Act
    render(<SlackWidget />)
    
    // Assert
    expect(screen.getByText(/AI Brief/i)).toBeInTheDocument()
    expect(screen.getByText(/Action items:/i)).toBeInTheDocument()
  })
})
