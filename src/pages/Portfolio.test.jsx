import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Portfolio from './Portfolio';
import { renderWithRouter } from '../test/test-utils';

describe('Portfolio Page', () => {
  const mockOpenModal = vi.fn();

  it('renders hero section', () => {
    renderWithRouter(<Portfolio onOpenModal={mockOpenModal} />);
    expect(screen.getByText('Our Work')).toBeInTheDocument();
  });

  it('renders hero stats', () => {
    renderWithRouter(<Portfolio onOpenModal={mockOpenModal} />);
    expect(screen.getByText('500+')).toBeInTheDocument();
    expect(screen.getByText('450+')).toBeInTheDocument();
    expect(screen.getByText('15+')).toBeInTheDocument();
  });

  it('renders all filter buttons', () => {
    renderWithRouter(<Portfolio onOpenModal={mockOpenModal} />);
    const filterButtons = document.querySelectorAll('.filter-btn');
    expect(filterButtons.length).toBe(5);
    expect(filterButtons[0].textContent).toContain('All Projects');
    expect(filterButtons[1].textContent).toContain('Living Room');
    expect(filterButtons[2].textContent).toContain('Bedroom');
    expect(filterButtons[3].textContent).toContain('Kitchen');
    expect(filterButtons[4].textContent).toContain('Office');
  });

  it('shows project count', () => {
    renderWithRouter(<Portfolio onOpenModal={mockOpenModal} />);
    // The count shows "9" inside a <strong> tag
    const countElement = screen.getByText((content, element) => {
      return element.tagName === 'STRONG' && content === '9';
    });
    expect(countElement).toBeInTheDocument();
  });

  it('filters projects by category', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Portfolio onOpenModal={mockOpenModal} />);
    // Click the Kitchen filter button specifically
    const filterButtons = document.querySelectorAll('.filter-btn');
    const kitchenBtn = Array.from(filterButtons).find(btn => btn.textContent.includes('Kitchen'));
    await user.click(kitchenBtn);
    // After filtering, count should be 2
    const countElement = screen.getByText((content, element) => {
      return element.tagName === 'STRONG' && content === '2';
    });
    expect(countElement).toBeInTheDocument();
    expect(screen.getByText('Modular Kitchen')).toBeInTheDocument();
  });

  it('renders project details', () => {
    renderWithRouter(<Portfolio onOpenModal={mockOpenModal} />);
    expect(screen.getByText('Modern Living Room')).toBeInTheDocument();
    expect(screen.getByText('Luxury Bedroom Suite')).toBeInTheDocument();
    expect(screen.getByText('Modular Kitchen')).toBeInTheDocument();
  });

  it('renders CTA section', () => {
    renderWithRouter(<Portfolio onOpenModal={mockOpenModal} />);
    expect(screen.getByText('Love What You See?')).toBeInTheDocument();
    expect(screen.getByText('Start Your Project')).toBeInTheDocument();
  });
});
