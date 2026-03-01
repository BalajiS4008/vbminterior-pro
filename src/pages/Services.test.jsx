import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Services from './Services';
import { renderWithRouter } from '../test/test-utils';

describe('Services Page', () => {
  const mockOpenModal = vi.fn();

  it('renders hero section', () => {
    renderWithRouter(<Services onOpenModal={mockOpenModal} />);
    expect(screen.getByText('What We Do')).toBeInTheDocument();
  });

  it('renders all 6 services', () => {
    renderWithRouter(<Services onOpenModal={mockOpenModal} />);
    expect(screen.getByText('Living Room Design')).toBeInTheDocument();
    expect(screen.getByText('Bedroom Design')).toBeInTheDocument();
    expect(screen.getByText('Kitchen Design')).toBeInTheDocument();
    expect(screen.getByText('Complete Interior Design')).toBeInTheDocument();
    expect(screen.getByText('Office & Commercial')).toBeInTheDocument();
    expect(screen.getByText('Furniture Design')).toBeInTheDocument();
  });

  it('renders process steps', () => {
    renderWithRouter(<Services onOpenModal={mockOpenModal} />);
    expect(screen.getByText('Consultation')).toBeInTheDocument();
    expect(screen.getByText('Design Concept')).toBeInTheDocument();
    expect(screen.getByText('Planning')).toBeInTheDocument();
    expect(screen.getByText('Execution')).toBeInTheDocument();
    expect(screen.getByText('Delivery')).toBeInTheDocument();
  });

  it('renders Get Quote buttons for each service', () => {
    renderWithRouter(<Services onOpenModal={mockOpenModal} />);
    const getQuoteButtons = screen.getAllByText(/Get Quote/);
    expect(getQuoteButtons.length).toBeGreaterThanOrEqual(6);
  });

  it('calls onOpenModal when Get Quote is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Services onOpenModal={mockOpenModal} />);
    const getQuoteButtons = screen.getAllByText(/Get Quote/);
    await user.click(getQuoteButtons[0]);
    expect(mockOpenModal).toHaveBeenCalled();
  });

  it('renders CTA section', () => {
    renderWithRouter(<Services onOpenModal={mockOpenModal} />);
    expect(screen.getByText(/Ready to Transform Your Space/i)).toBeInTheDocument();
  });
});
