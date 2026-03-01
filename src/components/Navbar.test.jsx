import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar';
import { renderWithRouter } from '../test/test-utils';

describe('Navbar', () => {
  const mockOpenModal = vi.fn();

  it('renders the logo', () => {
    renderWithRouter(<Navbar onOpenModal={mockOpenModal} />);
    expect(screen.getByAltText('VBM Interior')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    renderWithRouter(<Navbar onOpenModal={mockOpenModal} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('renders the phone number', () => {
    renderWithRouter(<Navbar onOpenModal={mockOpenModal} />);
    expect(screen.getByText('+91 7397373587')).toBeInTheDocument();
  });

  it('renders Get Quote button', () => {
    renderWithRouter(<Navbar onOpenModal={mockOpenModal} />);
    expect(screen.getByText('Get Quote')).toBeInTheDocument();
  });

  it('calls onOpenModal when Get Quote is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Navbar onOpenModal={mockOpenModal} />);
    await user.click(screen.getByText('Get Quote'));
    expect(mockOpenModal).toHaveBeenCalledTimes(1);
  });

  it('toggles mobile menu when hamburger is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Navbar onOpenModal={mockOpenModal} />);
    const toggleButton = screen.getByLabelText('Toggle menu');
    await user.click(toggleButton);
    const navLinks = document.querySelector('.nav-links');
    expect(navLinks.classList.contains('active')).toBe(true);
  });

  it('adds scrolled class when scrolled past 60px', () => {
    renderWithRouter(<Navbar onOpenModal={mockOpenModal} />);
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    fireEvent.scroll(window);
    const navbar = document.querySelector('.navbar');
    expect(navbar.classList.contains('scrolled')).toBe(true);
  });

  it('active link matches current path', () => {
    renderWithRouter(<Navbar onOpenModal={mockOpenModal} />, { route: '/services' });
    const servicesLink = screen.getByText('Services');
    expect(servicesLink.classList.contains('active')).toBe(true);
  });

  it('phone link has correct href', () => {
    renderWithRouter(<Navbar onOpenModal={mockOpenModal} />);
    const phoneLink = screen.getByText('+91 7397373587').closest('a');
    expect(phoneLink).toHaveAttribute('href', 'tel:+917397373587');
  });
});
