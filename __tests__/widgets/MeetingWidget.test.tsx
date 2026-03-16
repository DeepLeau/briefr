/**
 * MeetingWidget Contract Test
 * 
 * Visible contract:
 * - Widget displays meeting title, duration, attendees
 * - Shows transcript analysis with key insights
 * - Progress bar showing AI processing
 * - Auto-rotation between meetings every 4s
 */
import { render, screen } from '@testing-library/react'
import { MeetingWidget } from '@/components/widgets/MeetingWidget'

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Video: ({ className }: { className?: string }) => <svg data-testid="video-icon" className={className} />,
  Clock: ({ className }: { className?: string }) => <svg data-testid="clock-icon" className={className} />,
  Users: ({ className }: { className?: string }) => <svg data-testid="users-icon" className={className} />,
}))

describe('MeetingWidget', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should render meeting widget with meeting details', () => {
    // Arrange & Act
    render(<MeetingWidget />)
    
    // Assert - first meeting should be visible
    expect(screen.getByText(/Weekly All-Hands/i)).toBeInTheDocument()
    expect(screen.getByText(/45 min/i)).toBeInTheDocument()
    expect(screen.getByText(/24 attendees/i)).toBeInTheDocument()
  })

  it('should render transcript analysis section', () => {
    // Arrange & Act
    render(<MeetingWidget />)
    
    // Assert
    expect(screen.getByText(/Transcript Analysis/i)).toBeInTheDocument()
    expect(screen.getByText(/Key insight:/i)).toBeInTheDocument()
    expect(screen.getByText(/Action:/i)).toBeInTheDocument()
    expect(screen.getByText(/Decision:/i)).toBeInTheDocument()
  })

  it('should render progress bar for AI processing', () => {
    // Arrange & Act
    render(<MeetingWidget />)
    
    // Assert
    expect(screen.getByText(/AI processing/i)).toBeInTheDocument()
    expect(screen.getByText(/0%/i)).toBeInTheDocument()
  })
})
