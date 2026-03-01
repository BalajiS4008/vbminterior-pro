import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';
import { renderWithRouter } from '../test/test-utils';

describe('Contact Page', () => {
  it('renders hero section', () => {
    renderWithRouter(<Contact />);
    expect(screen.getByText("Let's Talk")).toBeInTheDocument();
  });

  it('renders contact info cards', () => {
    renderWithRouter(<Contact />);
    expect(screen.getByText('Visit Us')).toBeInTheDocument();
    expect(screen.getByText('Call Us')).toBeInTheDocument();
    expect(screen.getByText('Email Us')).toBeInTheDocument();
    expect(screen.getByText('Working Hours')).toBeInTheDocument();
  });

  it('renders the contact form', () => {
    renderWithRouter(<Contact />);
    expect(screen.getByPlaceholderText('Enter your full name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your phone number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tell us about your project...')).toBeInTheDocument();
  });

  it('can fill in contact form fields', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Contact />);

    await user.type(screen.getByPlaceholderText('Enter your full name'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('Enter your email'), 'jane@test.com');
    await user.type(screen.getByPlaceholderText('Enter your phone number'), '9876543210');
    await user.type(screen.getByPlaceholderText('Tell us about your project...'), 'Kitchen design');

    expect(screen.getByPlaceholderText('Enter your full name')).toHaveValue('Jane Doe');
    expect(screen.getByPlaceholderText('Enter your email')).toHaveValue('jane@test.com');
  });

  it('submits form successfully', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: true });
    const user = userEvent.setup();
    renderWithRouter(<Contact />);

    await user.type(screen.getByPlaceholderText('Enter your full name'), 'Test');
    await user.type(screen.getByPlaceholderText('Enter your email'), 'test@test.com');
    await user.type(screen.getByPlaceholderText('Enter your phone number'), '1234567890');
    await user.type(screen.getByPlaceholderText('Tell us about your project...'), 'Test message');

    await user.click(screen.getByText('Send Message'));

    await waitFor(() => {
      expect(screen.getByText(/Thank you! Your message has been sent/)).toBeInTheDocument();
    });
  });

  it('shows error on failed submission', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('fail'));
    const user = userEvent.setup();
    renderWithRouter(<Contact />);

    await user.type(screen.getByPlaceholderText('Enter your full name'), 'Test');
    await user.type(screen.getByPlaceholderText('Enter your email'), 'test@test.com');
    await user.type(screen.getByPlaceholderText('Enter your phone number'), '1234567890');
    await user.type(screen.getByPlaceholderText('Tell us about your project...'), 'Test');

    await user.click(screen.getByText('Send Message'));

    await waitFor(() => {
      expect(screen.getByText(/Oops! Something went wrong/)).toBeInTheDocument();
    });
  });

  it('renders FAQ section', () => {
    renderWithRouter(<Contact />);
    expect(screen.getByText('What services does VBM Interior provide?')).toBeInTheDocument();
  });

  it('renders Google Map iframe', () => {
    renderWithRouter(<Contact />);
    expect(screen.getByTitle('VBM Interior Location')).toBeInTheDocument();
  });
});
