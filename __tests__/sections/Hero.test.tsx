/**
 * Hero Section Contract Test
 * 
 * Visible contract:
 * - Badge showing "Now in public beta"
 * - Main headline "Never miss what matters."
 * - Description text about the product
 * - Two CTA buttons: "Get started free" and "View demo →"
 * - Social proof text "Trusted by 2,400+ teams"
 */
import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/sections/Hero'

// Mock AnimatedTextGenerate component
jest.mock('@/components/ui/AnimatedTextGenerate', () => ({
  AnimatedTextGenerate: ({ text, className }: { text: string; className?: string }) => (
    <div data-testid="animated-text" className={className}>{text}</div>
  ),
}))

// Mock UnicornBackground component
jest.mock('@/components/ui/UnicornBackground', () => ({
  UnicornBackground: ({ className }: { className?: string }) => (
    <div data-testid="unicorn-background" className={className} />
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

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ArrowRight: () => <svg data-testid="arrow-right" />,
}))

describe('Hero', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render hero section with badge and headline', () => {
    // Arrange & Act
    render(<Hero />)
    
    // Assert
    expect(screen.getByText(/Now in public beta/i)).toBeInTheDocument()
    expect(screen.getByTestId('animated-text')).toHaveTextContent(/Never miss what matters/i)
  })

  it('should render description and CTAs', () => {
    // Arrange & Act
    render(<Hero />)
    
    // Assert
    expect(screen.getByText(/Briefr automatically summarizes/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Get started free/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /View demo/i })).toBeInTheDocument()
  })

  it('should render social proof text', () => {
    // Arrange & Act
    render(<Hero />)
    
    // Assert
    expect(screen.getByText(/Trusted by 2,400\+ teams/i)).toBeInTheDocument()
    expect(screen.getByText(/No credit card required/i)).toBeInTheDocument()
  })
})
