import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GoogleReviews from './GoogleReviews';

describe('GoogleReviews', () => {
  it('renders the section title', () => {
    render(<GoogleReviews />);
    expect(screen.getByText(/Transforming Homes: Client Reviews/i)).toBeInTheDocument();
  });

  it('renders the company name', () => {
    render(<GoogleReviews />);
    expect(screen.getByText(/VBM Interior - Best Interior Designers/i)).toBeInTheDocument();
  });

  it('renders the overall rating', () => {
    render(<GoogleReviews />);
    expect(screen.getByText('5.0')).toBeInTheDocument();
  });

  it('renders reviews count', () => {
    render(<GoogleReviews />);
    expect(screen.getByText(/6 reviews/)).toBeInTheDocument();
  });

  it('renders Google logos (main + per-card)', () => {
    render(<GoogleReviews />);
    // Swiper duplicates slides for loop, so multiple Google images
    const googleLogos = screen.getAllByAltText('Google');
    expect(googleLogos.length).toBeGreaterThanOrEqual(1);
  });

  it('renders "review us on G" link', () => {
    render(<GoogleReviews />);
    expect(screen.getByText(/review us on G/)).toBeInTheDocument();
  });

  it('renders review cards with author names', () => {
    render(<GoogleReviews />);
    expect(screen.getByText('mani kandan')).toBeInTheDocument();
    expect(screen.getByText('samblessing r')).toBeInTheDocument();
    expect(screen.getByText('David Raj')).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(<GoogleReviews />);
    expect(screen.getByLabelText('Previous review')).toBeInTheDocument();
    expect(screen.getByLabelText('Next review')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<GoogleReviews />);
    expect(screen.getByText('View More Reviews')).toBeInTheDocument();
    expect(screen.getByText('Get Free Quote')).toBeInTheDocument();
  });
});
