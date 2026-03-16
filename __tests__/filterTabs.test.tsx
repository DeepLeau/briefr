/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react'
import { FilterTabs } from '@/components/dashboard/FilterTabs'

describe('FilterTabs', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render all filter options', () => {
    // Arrange & Act
    render(<FilterTabs active="all" onChange={jest.fn()} />)
    
    // Assert
    expect(screen.getByRole('button', { name: /tous/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /email/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /slack/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /meeting/i })).toBeInTheDocument()
  })

  it('should call onChange when filter is clicked', () => {
    // Arrange
    const mockOnChange = jest.fn()
    render(<FilterTabs active="all" onChange={mockOnChange} />)
    
    // Act
    const emailFilter = screen.getByRole('button', { name: /email/i })
    fireEvent.click(emailFilter)
    
    // Assert
    expect(mockOnChange).toHaveBeenCalledWith('Email')
  })

  it('should call onChange with all when Tous is clicked', () => {
    // Arrange
    const mockOnChange = jest.fn()
    render(<FilterTabs active="Email" onChange={mockOnChange} />)
    
    // Act
    const allFilter = screen.getByRole('button', { name: /tous/i })
    fireEvent.click(allFilter)
    
    // Assert
    expect(mockOnChange).toHaveBeenCalledWith('all')
  })
})
