/**
 * CTABanner Section Contract Test
 * 
 * Visible contract:
 * - Headline "Start focusing today"
 * - Description text about team count
 * - CTA button "Get started for free"
 */
import { render, screen } from '@testing-library/react'
import { CTABanner } from '@/components/sections/CTABanner'

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

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ArrowRight: () => <svg data-testid="arrow-right" />,
}))

describe('CTABanner', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render CTA headline', () => {
    // Arrange & Act
    render(<CTABanner />)
    
    // Assert
    expect(screen.getByText(/Start focusing today/i)).toBeInTheDocument()
  })

  it('should render description and CTA button', () => {
    // Arrange & Act
    render(<CTABanner />)
    
    // Assert
    expect(screen.getByText(/Join 2,400\+ teams/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Get started for free/i })).toBeInTheDocument()
  })

  it('should render no credit card text', () => {
    // Arrange & Act
    render(<CTABanner />)
    
    // Assert
    expect(screen.getByText(/No credit card required/i)).toBeInTheDocument()
  })
})
