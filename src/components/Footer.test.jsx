import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from './Footer';
import { renderWithRouter } from '../test/test-utils';

describe('Footer', () => {
  const mockOpenModal = vi.fn();

  it('renders the CTA banner', () => {
    renderWithRouter(<Footer onOpenModal={mockOpenModal} />);
    expect(screen.getByText(/Transform Your Vision into Reality/i)).toBeInTheDocument();
  });

  it('renders Book Free Consultation button and calls onOpenModal', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Footer onOpenModal={mockOpenModal} />);
    const ctaBtn = screen.getByText('Book Free Consultation!');
    await user.click(ctaBtn);
    expect(mockOpenModal).toHaveBeenCalled();
  });

  it('renders the footer logo', () => {
    renderWithRouter(<Footer onOpenModal={mockOpenModal} />);
    const logos = screen.getAllByAltText('VBM Interior');
    expect(logos.length).toBeGreaterThanOrEqual(1);
  });

  it('renders quick links', () => {
    renderWithRouter(<Footer onOpenModal={mockOpenModal} />);
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Blogs')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('renders services links', () => {
    renderWithRouter(<Footer onOpenModal={mockOpenModal} />);
    expect(screen.getByText('Interior Design')).toBeInTheDocument();
    expect(screen.getByText('Kitchen Designs')).toBeInTheDocument();
    expect(screen.getByText('Bedroom Designs')).toBeInTheDocument();
    expect(screen.getByText('Living room Designs')).toBeInTheDocument();
  });

  it('renders contact information', () => {
    renderWithRouter(<Footer onOpenModal={mockOpenModal} />);
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    expect(screen.getByText('+91 7397373587')).toBeInTheDocument();
    expect(screen.getByText('Vbminterior@gmail.com')).toBeInTheDocument();
    expect(screen.getByText(/112, NSK Nagar Main Rd/)).toBeInTheDocument();
  });

  it('renders social media links in footer and floating sidebar', () => {
    renderWithRouter(<Footer onOpenModal={mockOpenModal} />);
    // Footer has social links + floating sidebar has Facebook too
    const facebookLinks = screen.getAllByLabelText('Facebook');
    expect(facebookLinks.length).toBeGreaterThanOrEqual(2); // social section + floating
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
    expect(screen.getByLabelText('YouTube')).toBeInTheDocument();
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
  });

  it('renders floating sidebar with WhatsApp and email', () => {
    renderWithRouter(<Footer onOpenModal={mockOpenModal} />);
    expect(screen.getByLabelText('WhatsApp')).toHaveAttribute('href', 'https://wa.me/917397373587');
    expect(screen.getByLabelText('Email')).toHaveAttribute('href', 'mailto:Vbminterior@gmail.com');
  });

  it('renders copyright text', () => {
    renderWithRouter(<Footer onOpenModal={mockOpenModal} />);
    expect(screen.getByText(/Copyright 2026/)).toBeInTheDocument();
  });
});
