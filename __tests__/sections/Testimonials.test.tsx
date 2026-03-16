/**
 * Testimonials Section Contract Test
 * 
 * Visible contract:
 * - Testimonials badge
 * - Section title "Loved by remote teams"
 * - Multiple testimonial cards with quotes, names and roles
 */
import { render, screen } from '@testing-library/react'
import { Testimonials } from '@/components/sections/Testimonials'

// Mock AnimatedCanopy component
jest.mock('@/components/ui/AnimatedCanopy', () => ({
  AnimatedCanopy: ({ children, reverse }: { children: React.ReactNode; reverse?: boolean }) => (
    <div data-testid="animated-canopy" data-reverse={reverse}>{children}</div>
  ),
}))

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

describe('Testimonials', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render testimonials section header', () => {
    // Arrange & Act
    render(<Testimonials />)
    
    // Assert
    expect(screen.getByText('Testimonials')).toBeInTheDocument()
    expect(screen.getByText(/Loved by remote teams/i)).toBeInTheDocument()
  })

  it('should render testimonial quotes and author names', () => {
    // Arrange & Act
    render(<Testimonials />)
    
    // Assert - sample of testimonials visible (use getAllByText because testimonials are duplicated 3x for AnimatedCanopy effect)
    expect(screen.getAllByText(/Sarah Chen/i)).toHaveLength(3)
    expect(screen.getAllByText(/Mike Rodriguez/i)).toHaveLength(3)
    expect(screen.getAllByText(/Jessica Wu/i)).toHaveLength(3)
  })

  it('should render company roles for testimonials', () => {
    // Arrange & Act
    render(<Testimonials />)
    
    // Assert - roles visible (use getAllByText because roles are duplicated 3x for AnimatedCanopy effect)
    expect(screen.getAllByText(/Product Manager at Stripe/i)).toHaveLength(3)
    expect(screen.getAllByText(/Engineering Lead at Notion/i)).toHaveLength(3)
  })
})
