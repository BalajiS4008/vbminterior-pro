import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ImageAccordion from './ImageAccordion';

const mockPanels = [
  { image: '/test-image-1.jpg', label: 'Living Room' },
  { image: '/test-image-2.jpg', label: 'Bedroom' },
  { image: '/test-image-3.jpg', label: 'Kitchen' },
];

describe('ImageAccordion', () => {
  it('renders all panel labels', () => {
    render(<ImageAccordion panels={mockPanels} />);
    expect(screen.getByText('Living Room')).toBeInTheDocument();
    expect(screen.getByText('Bedroom')).toBeInTheDocument();
    expect(screen.getByText('Kitchen')).toBeInTheDocument();
  });

  it('renders correct number of panels', () => {
    render(<ImageAccordion panels={mockPanels} />);
    const panels = document.querySelectorAll('.accordion-panel');
    expect(panels.length).toBe(3);
  });

  it('sets background image style on panels', () => {
    render(<ImageAccordion panels={mockPanels} />);
    const panels = document.querySelectorAll('.accordion-panel');
    // jsdom normalizes backgroundImage to include url()
    expect(panels[0].style.backgroundImage).toContain('/test-image-1.jpg');
    expect(panels[1].style.backgroundImage).toContain('/test-image-2.jpg');
  });

  it('renders with empty panels array', () => {
    render(<ImageAccordion panels={[]} />);
    const accordion = document.querySelector('.image-accordion');
    expect(accordion).toBeInTheDocument();
    expect(accordion.children.length).toBe(0);
  });
});
