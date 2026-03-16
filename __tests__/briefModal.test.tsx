/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react'
import { BriefModal } from '@/components/dashboard/BriefModal'
import { Brief } from '@/lib/mock/briefs'

jest.mock('@/lib/mock/briefs', () => ({
  Brief: {} as any,
}))

describe('BriefModal', () => {
  const mockBrief: Brief = {
    id: '1',
    title: 'Test Brief',
    source: 'Email',
    shortSummary: 'Short summary',
    fullSummary: 'Full summary content',
    date: '2025-01-15',
    timeSaved: 10,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render modal with brief content', () => {
    // Arrange
    const mockOnClose = jest.fn()
    render(<BriefModal brief={mockBrief} onClose={mockOnClose} />)
    
    // Assert
    expect(screen.getByText('Test Brief')).toBeInTheDocument()
    expect(screen.getByText('Full summary content')).toBeInTheDocument()
  })

  it('should close modal when close button is clicked', () => {
    // Arrange
    const mockOnClose = jest.fn()
    render(<BriefModal brief={mockBrief} onClose={mockOnClose} />)
    
    // Act
    const closeButton = screen.getByRole('button', { name: /fermer/i })
    fireEvent.click(closeButton)
    
    // Assert
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('should close modal when backdrop is clicked', () => {
    // Arrange
    const mockOnClose = jest.fn()
    render(<BriefModal brief={mockBrief} onClose={mockOnClose} />)
    
    // Act - click on the backdrop (first div with bg-black)
    const backdrop = document.querySelector('.bg-black\\/70')
    if (backdrop) {
      fireEvent.click(backdrop)
    }
    
    // Assert
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('should close modal when Escape key is pressed', () => {
    // Arrange
    const mockOnClose = jest.fn()
    render(<BriefModal brief={mockBrief} onClose={mockOnClose} />)
    
    // Act
    fireEvent.keyDown(document, { key: 'Escape' })
    
    // Assert
    expect(mockOnClose).toHaveBeenCalled()
  })
})
