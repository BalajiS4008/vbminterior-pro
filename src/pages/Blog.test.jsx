import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Blog from './Blog';
import { renderWithRouter } from '../test/test-utils';

describe('Blog Page', () => {
  it('renders hero section with badge and title', () => {
    renderWithRouter(<Blog />);
    expect(screen.getByText('Insights')).toBeInTheDocument();
    // Title is split: "Design <span>Blog</span>" — check the h1 directly
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toContain('Design');
    expect(heading.textContent).toContain('Blog');
  });

  it('renders featured post section', () => {
    renderWithRouter(<Blog />);
    expect(screen.getByText('Featured Post')).toBeInTheDocument();
    expect(screen.getByText('Interior Design Trends 2024')).toBeInTheDocument();
  });

  it('renders blog grid with remaining posts', () => {
    renderWithRouter(<Blog />);
    expect(screen.getByText('Multiple Wallpaper Design Ideas for Every Room')).toBeInTheDocument();
    expect(screen.getByText(/Small Spaces, Big Style/i)).toBeInTheDocument();
  });

  it('renders newsletter section', () => {
    renderWithRouter(<Blog />);
    expect(screen.getByPlaceholderText('Enter your email address')).toBeInTheDocument();
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
  });

  it('renders Read More links', () => {
    renderWithRouter(<Blog />);
    const readMoreLinks = screen.getAllByText('Read More');
    expect(readMoreLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('renders post metadata', () => {
    renderWithRouter(<Blog />);
    const authorElements = screen.getAllByText('VBM Interior');
    expect(authorElements.length).toBeGreaterThanOrEqual(1);
  });
});
