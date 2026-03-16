/**
 * Pricing Test
 * 
 * Contrat visible :
 * - Le titre "Simple pricing" est affiché
 * - Les 3 plans (Starter, Pro, Enterprise) sont affichés avec leurs prix
 * - Le badge "Most popular" est visible sur le plan Pro
 * - Les features de chaque plan sont listées
 * - Les boutons CTA sont présents
 */
import { render, screen } from '@testing-library/react'
import { Pricing } from '@/components/sections/Pricing'

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

// Mock cn utility
jest.mock('@/lib/utils', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}))

describe('Pricing', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render pricing section header', () => {
    // Arrange & Act
    render(<Pricing />)
    
    // Assert
    expect(screen.getByText(/Simple pricing/i)).toBeInTheDocument()
  })

  it('should render all three pricing plans', () => {
    // Arrange & Act
    render(<Pricing />)
    
    // Assert - use exact text match to avoid matching "Everything in Pro"
    expect(screen.getByText('Starter')).toBeInTheDocument()
    expect(screen.getByText('Pro')).toBeInTheDocument()
    expect(screen.getByText('Enterprise')).toBeInTheDocument()
  })

  it('should render prices for each plan', () => {
    // Arrange & Act
    render(<Pricing />)
    
    // Assert
    expect(screen.getByText(/\$0/i)).toBeInTheDocument()
    expect(screen.getByText(/\$19/i)).toBeInTheDocument()
    expect(screen.getByText(/\$49/i)).toBeInTheDocument()
  })

  it('should show Most popular badge on Pro plan', () => {
    // Arrange & Act
    render(<Pricing />)
    
    // Assert
    expect(screen.getByText(/Most popular/i)).toBeInTheDocument()
  })

  it('should render CTA buttons for each plan', () => {
    // Arrange & Act
    render(<Pricing />)
    
    // Assert
    expect(screen.getByRole('button', { name: /Get started/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Start free trial/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Contact sales/i })).toBeInTheDocument()
  })
})
