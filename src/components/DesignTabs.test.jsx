import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DesignTabs from './DesignTabs';

const mockTabs = [
  {
    label: 'Interior Designing',
    images: ['/img1.jpg', '/img2.jpg'],
    alts: ['Interior 1', 'Interior 2'],
  },
  {
    label: 'Kitchen Designs',
    images: ['/img3.jpg', '/img4.jpg'],
    alts: ['Kitchen 1', 'Kitchen 2'],
  },
  {
    label: 'Bedroom Design',
    images: ['/img5.jpg'],
    alts: ['Bedroom 1'],
  },
];

describe('DesignTabs', () => {
  it('renders all tab buttons', () => {
    render(<DesignTabs tabs={mockTabs} />);
    expect(screen.getByText('Interior Designing')).toBeInTheDocument();
    expect(screen.getByText('Kitchen Designs')).toBeInTheDocument();
    expect(screen.getByText('Bedroom Design')).toBeInTheDocument();
  });

  it('first tab is active by default', () => {
    render(<DesignTabs tabs={mockTabs} />);
    const firstTab = screen.getByText('Interior Designing');
    expect(firstTab.classList.contains('active')).toBe(true);
  });

  it('shows images of the active tab', () => {
    render(<DesignTabs tabs={mockTabs} />);
    expect(screen.getByAltText('Interior 1')).toBeInTheDocument();
    expect(screen.getByAltText('Interior 2')).toBeInTheDocument();
  });

  it('switches tab on click', async () => {
    const user = userEvent.setup();
    render(<DesignTabs tabs={mockTabs} />);

    await user.click(screen.getByText('Kitchen Designs'));
    expect(screen.getByText('Kitchen Designs').classList.contains('active')).toBe(true);
    expect(screen.getByAltText('Kitchen 1')).toBeInTheDocument();
  });

  it('hides previous tab images when switching', async () => {
    const user = userEvent.setup();
    render(<DesignTabs tabs={mockTabs} />);

    await user.click(screen.getByText('Kitchen Designs'));
    expect(screen.queryByAltText('Interior 1')).not.toBeInTheDocument();
  });
});
