import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import About from './About';
import { renderWithRouter } from '../test/test-utils';

describe('About Page', () => {
  it('renders hero section with badge', () => {
    renderWithRouter(<About />);
    expect(screen.getByText('Since 2008')).toBeInTheDocument();
  });

  it('renders hero title', () => {
    renderWithRouter(<About />);
    // The heading contains "About" and "VBM Interior" as separate elements
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toContain('About');
  });

  it('renders the story section', () => {
    renderWithRouter(<About />);
    expect(screen.getByText('Our Journey')).toBeInTheDocument();
    expect(screen.getByText(/Founded in 2008/)).toBeInTheDocument();
  });

  it('renders mission and vision', () => {
    renderWithRouter(<About />);
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
    expect(screen.getByText('Our Vision')).toBeInTheDocument();
  });

  it('renders core values', () => {
    renderWithRouter(<About />);
    expect(screen.getByText('Innovation')).toBeInTheDocument();
    expect(screen.getByText('Quality')).toBeInTheDocument();
    expect(screen.getByText('Client-Focused')).toBeInTheDocument();
    expect(screen.getByText('Passion')).toBeInTheDocument();
  });

  it('renders team members', () => {
    renderWithRouter(<About />);
    expect(screen.getByText('Vijay Kumar')).toBeInTheDocument();
    expect(screen.getByText('Priya Menon')).toBeInTheDocument();
    expect(screen.getByText('Arun Sharma')).toBeInTheDocument();
    expect(screen.getByText('Divya Reddy')).toBeInTheDocument();
  });

  it('renders team member roles', () => {
    renderWithRouter(<About />);
    expect(screen.getByText('Founder & Lead Designer')).toBeInTheDocument();
    expect(screen.getByText('Senior Designer')).toBeInTheDocument();
    expect(screen.getByText('Project Manager')).toBeInTheDocument();
    expect(screen.getByText('Design Consultant')).toBeInTheDocument();
  });

  it('renders why choose us section', () => {
    renderWithRouter(<About />);
    expect(screen.getByText('Personalized Approach')).toBeInTheDocument();
    expect(screen.getByText('Transparent Pricing')).toBeInTheDocument();
    expect(screen.getByText('Quality Materials')).toBeInTheDocument();
    expect(screen.getByText('Timely Completion')).toBeInTheDocument();
  });
});
