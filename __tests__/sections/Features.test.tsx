/**
 * Features Section Contract Test
 * 
 * Visible contract:
 * - Section badge "Features"
 * - Section title "Everything you need to stay focused"
 * - Three feature blocks: Email, Slack, Meeting summaries
 * - Feature points: AI-powered extraction, Actionable insights, Export to your tools
 * - Bottom grid with 3 benefit cards
 */
import { render, screen } from '@testing-library/react'
import { Features } from '@/components/sections/Features'

// Mock widgets
jest.mock('@/components/widgets/EmailWidget', () => ({
  EmailWidget: () => <div data-testid="email-widget" />,
}))

jest.mock('@/components/widgets/SlackWidget', () => ({
  SlackWidget: () => <div data-testid="slack-widget" />,
}))

jest.mock('@/components/widgets/MeetingWidget', () => ({
  MeetingWidget: () => <div data-testid="meeting-widget" />,
}))

// Mock lucide-react icons
jest.mock('lucide-react', () => {
  const mockIcons = {
    Mail: () => <svg data-testid="mail-icon" />,
    MessageSquare: () => <svg data-testid="message-icon" />,
    Video: () => <svg data-testid="video-icon" />,
    Zap: () => <svg data-testid="zap-icon" />,
    Shield: () => <svg data-testid="shield-icon" />,
    Brain: () => <svg data-testid="brain-icon" />,
  }
  return mockIcons
})

// Mock framer-motion
jest.mock('framer-motion', () => {
  const React = require('react')
  const strip = ({ animate, initial, exit, transition, whileInView, whileHover, whileTap, variants, viewport, ...p }: any) => p
  return {
    motion: new Proxy({}, {
      get: (_t: any, tag: string) => ({ children, ...props }: any) => React.createElement(tag, strip(props), children)
    }),
    useScroll: () => ({ scrollY: { onChange: jest.fn() } }),
    useTransform: () => 0,
    AnimatePresence: ({ children }: any) => children,
  }
})

describe('Features', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render section header with title', () => {
    // Arrange & Act
    render(<Features />)
    
    // Assert
    expect(screen.getByText('Features')).toBeInTheDocument()
    expect(screen.getByText(/Everything you need to stay focused/i)).toBeInTheDocument()
  })

  it('should render feature sections with titles', () => {
    // Arrange & Act
    render(<Features />)
    
    // Assert - check main feature titles
    expect(screen.getByText(/Summarize Long Emails/i)).toBeInTheDocument()
    expect(screen.getByText(/Digest Slack Channels/i)).toBeInTheDocument()
    expect(screen.getByText(/Recap Meetings Instantly/i)).toBeInTheDocument()
  })

  it('should render benefit cards at bottom', () => {
    // Arrange & Act
    render(<Features />)
    
    // Assert - benefit cards
    expect(screen.getByText('Lightning Fast')).toBeInTheDocument()
    expect(screen.getByText('Enterprise Secure')).toBeInTheDocument()
    expect(screen.getByText('Context Aware')).toBeInTheDocument()
  })
})
