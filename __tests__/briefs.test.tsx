/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import BriefsPage from '@/app/(dashboard)/dashboard/briefs/page'
import { getBriefs, getBriefsFiltered } from '@/lib/mock/briefs'

jest.mock('@/lib/mock/briefs', () => ({
  getBriefs: jest.fn(),
  getBriefsFiltered: jest.fn(),
}))

jest.mock('@/components/dashboard/BriefModal', () => ({
  BriefModal: ({ brief, onClose }: any) => (
    <div data-testid="brief-modal">
      <button onClick={onClose}>Close</button>
    </div>
  ),
}))

describe('BriefsPage', () => {
  const mockBriefs = [
    { id: '1', title: 'Brief 1', source: 'Email', shortSummary: 'Summary 1', date: '2025-01-15', timeSaved: 10 },
    { id: '2', title: 'Brief 2', source: 'Slack', shortSummary: 'Summary 2', date: '2025-01-14', timeSaved: 15 },
    { id: '3', title: 'Brief 3', source: 'Meeting', shortSummary: 'Summary 3', date: '2025-01-13', timeSaved: 20 },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(getBriefs as jest.Mock).mockReturnValue(mockBriefs)
    ;(getBriefsFiltered as jest.Mock).mockReturnValue([])
  })

  it('should load and display briefs', async () => {
    // Arrange & Act
    render(<BriefsPage />)
    
    // Assert - briefs are displayed
    await waitFor(() => {
      expect(screen.getByText('Brief 1')).toBeInTheDocument()
    })
  })

  it('should filter briefs when filter tab is clicked', async () => {
    // Arrange
    ;(getBriefsFiltered as jest.Mock).mockReturnValue([mockBriefs[0]])
    render(<BriefsPage />)
    
    // Act - click Email filter
    const emailFilter = screen.getByRole('button', { name: /email/i })
    fireEvent.click(emailFilter)
    
    // Assert - filtered briefs are shown
    await waitFor(() => {
      expect(getBriefsFiltered).toHaveBeenCalledWith('Email')
    })
  })

  it('should show empty state when no briefs match filter', async () => {
    // Arrange
    ;(getBriefsFiltered as jest.Mock).mockReturnValue([])
    render(<BriefsPage />)
    
    // Act - click a filter that returns empty
    const meetingFilter = screen.getByRole('button', { name: /meeting/i })
    fireEvent.click(meetingFilter)
    
    // Assert - empty state message
    await waitFor(() => {
      expect(screen.getByText(/aucun brief trouvé/i)).toBeInTheDocument()
    })
  })

  it('should open modal when viewing a brief', async () => {
    // Arrange
    render(<BriefsPage />)
    
    // Wait for briefs to load
    await waitFor(() => {
      expect(screen.getByText('Brief 1')).toBeInTheDocument()
    })
    
    // Act - hover over the first brief card to make the "Voir" button visible
    const firstBriefCard = screen.getByText('Brief 1').closest('div[class*="group"]')
    if (firstBriefCard) {
      fireEvent.mouseEnter(firstBriefCard)
    }
    
    // Then click the "Voir" button
    const voirButton = screen.getByRole('button', { name: /voir/i })
    fireEvent.click(voirButton)
    
    // Assert - modal opens
    expect(screen.getByTestId('brief-modal')).toBeInTheDocument()
  })
})
