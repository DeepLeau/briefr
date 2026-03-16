/**
 * Home Page Contract Test
 * 
 * Visible contract:
 * - Full page renders with all sections
 * - Navbar present
 * - All main sections rendered in order
 */
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// Mock all components used in page
jest.mock('@/components/layout/Navbar', () => ({
  Navbar: () => <header data-testid="navbar">Navbar</header>,
}))

jest.mock('@/components/sections/Hero', () => ({
  Hero: () => <section data-testid="hero">Hero</section>,
}))

jest.mock('@/components/sections/SocialProof', () => ({
  SocialProof: () => <section data-testid="social-proof">SocialProof</section>,
}))

jest.mock('@/components/sections/Features', () => ({
  Features: () => <section data-testid="features">Features</section>,
}))

jest.mock('@/components/sections/Testimonials', () => ({
  Testimonials: () => <section data-testid="testimonials">Testimonials</section>,
}))

jest.mock('@/components/sections/Pricing', () => ({
  Pricing: () => <section data-testid="pricing">Pricing</section>,
}))

jest.mock('@/components/sections/CTABanner', () => ({
  CTABanner: () => <section data-testid="cta-banner">CTABanner</section>,
}))

jest.mock('@/components/layout/Footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}))

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render navbar', () => {
    // Arrange & Act
    render(<Home />)
    
    // Assert
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
  })

  it('should render all main sections', () => {
    // Arrange & Act
    render(<Home />)
    
    // Assert - all sections present
    expect(screen.getByTestId('hero')).toBeInTheDocument()
    expect(screen.getByTestId('social-proof')).toBeInTheDocument()
    expect(screen.getByTestId('features')).toBeInTheDocument()
    expect(screen.getByTestId('testimonials')).toBeInTheDocument()
    expect(screen.getByTestId('pricing')).toBeInTheDocument()
    expect(screen.getByTestId('cta-banner')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('should render main element with correct background', () => {
    // Arrange & Act
    const { container } = render(<Home />)
    
    // Assert - main element has correct background class
    const main = container.querySelector('main')
    expect(main).toHaveClass('min-h-screen')
    expect(main).toHaveClass('bg-[#0a0a0a]')
  })
})
