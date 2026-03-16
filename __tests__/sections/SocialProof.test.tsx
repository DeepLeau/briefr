/**
 * SocialProof Section Contract Test
 * 
 * Visible contract:
 * - Section title "Trusted by builders at"
 * - Company logos: Stripe, Notion, Figma, Linear, Vercel, Raycast, Supabase, Retool
 */
import { render, screen } from '@testing-library/react'
import { SocialProof } from '@/components/sections/SocialProof'

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

describe('SocialProof', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render section title', () => {
    // Arrange & Act
    render(<SocialProof />)
    
    // Assert
    expect(screen.getByText(/Trusted by builders at/i)).toBeInTheDocument()
  })

  it('should render company logos', () => {
    // Arrange & Act
    render(<SocialProof />)
    
    // Assert - check several key logos
    expect(screen.getByText('Stripe')).toBeInTheDocument()
    expect(screen.getByText('Notion')).toBeInTheDocument()
    expect(screen.getByText('Figma')).toBeInTheDocument()
    expect(screen.getByText('Linear')).toBeInTheDocument()
  })

  it('should render remaining company logos', () => {
    // Arrange & Act
    render(<SocialProof />)
    
    // Assert
    expect(screen.getByText('Vercel')).toBeInTheDocument()
    expect(screen.getByText('Raycast')).toBeInTheDocument()
    expect(screen.getByText('Supabase')).toBeInTheDocument()
    expect(screen.getByText('Retool')).toBeInTheDocument()
  })
})
