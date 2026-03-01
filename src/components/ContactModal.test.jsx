import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactModal from './ContactModal';

describe('ContactModal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders the modal title', () => {
    render(<ContactModal onClose={mockOnClose} />);
    expect(screen.getByText('Get A Free Design Consultation.')).toBeInTheDocument();
  });

  it('renders all property size radio options', () => {
    render(<ContactModal onClose={mockOnClose} />);
    expect(screen.getByText('2BHK')).toBeInTheDocument();
    expect(screen.getByText('3BHK')).toBeInTheDocument();
    expect(screen.getByText('4BHK')).toBeInTheDocument();
    expect(screen.getByText('5+ BHK/Villa/Penthouse')).toBeInTheDocument();
    expect(screen.getByText('Other')).toBeInTheDocument();
  });

  it('renders timeline dropdown with all options', () => {
    render(<ContactModal onClose={mockOnClose} />);
    const select = screen.getByLabelText(/When do you want this work to start/i);
    expect(select).toBeInTheDocument();
    expect(screen.getByText('Immediately')).toBeInTheDocument();
    expect(screen.getByText('In a Month')).toBeInTheDocument();
    expect(screen.getByText('Within two months')).toBeInTheDocument();
    expect(screen.getByText('After 3 months')).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    render(<ContactModal onClose={mockOnClose} />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Location')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<ContactModal onClose={mockOnClose} />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<ContactModal onClose={mockOnClose} />);
    await user.click(screen.getByLabelText('Close modal'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', async () => {
    const user = userEvent.setup();
    render(<ContactModal onClose={mockOnClose} />);
    const overlay = document.querySelector('.modal-overlay');
    await user.click(overlay);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('does not close when modal content is clicked', async () => {
    const user = userEvent.setup();
    render(<ContactModal onClose={mockOnClose} />);
    const content = document.querySelector('.modal-content');
    await user.click(content);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('can fill in form fields', async () => {
    const user = userEvent.setup();
    render(<ContactModal onClose={mockOnClose} />);

    await user.type(screen.getByLabelText('Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getByLabelText('Number'), '9876543210');
    await user.type(screen.getByLabelText('Location'), 'Chennai');

    expect(screen.getByLabelText('Name')).toHaveValue('John Doe');
    expect(screen.getByLabelText('Email')).toHaveValue('john@example.com');
    expect(screen.getByLabelText('Number')).toHaveValue('9876543210');
    expect(screen.getByLabelText('Location')).toHaveValue('Chennai');
  });

  it('can select a property size', async () => {
    const user = userEvent.setup();
    render(<ContactModal onClose={mockOnClose} />);
    const radio3bhk = screen.getByDisplayValue('3BHK');
    await user.click(radio3bhk);
    expect(radio3bhk).toBeChecked();
  });

  it('shows success message after successful submission', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: true });
    const user = userEvent.setup();
    render(<ContactModal onClose={mockOnClose} />);

    // Fill required fields
    await user.click(screen.getByDisplayValue('2BHK'));
    await user.selectOptions(screen.getByLabelText(/When do you want/i), 'Immediately');
    await user.type(screen.getByLabelText('Name'), 'Test');
    await user.type(screen.getByLabelText('Email'), 'test@test.com');
    await user.type(screen.getByLabelText('Number'), '1234567890');
    await user.type(screen.getByLabelText('Location'), 'Chennai');

    await user.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText(/Thank you! Your request has been sent successfully/)).toBeInTheDocument();
    });
  });

  it('shows error message after failed submission', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: false });
    const user = userEvent.setup();
    render(<ContactModal onClose={mockOnClose} />);

    await user.click(screen.getByDisplayValue('2BHK'));
    await user.selectOptions(screen.getByLabelText(/When do you want/i), 'Immediately');
    await user.type(screen.getByLabelText('Name'), 'Test');
    await user.type(screen.getByLabelText('Email'), 'test@test.com');
    await user.type(screen.getByLabelText('Number'), '1234567890');
    await user.type(screen.getByLabelText('Location'), 'Chennai');

    await user.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText(/Oops! Something went wrong/)).toBeInTheDocument();
    });
  });

  it('shows error message on network failure', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
    const user = userEvent.setup();
    render(<ContactModal onClose={mockOnClose} />);

    await user.click(screen.getByDisplayValue('2BHK'));
    await user.selectOptions(screen.getByLabelText(/When do you want/i), 'Immediately');
    await user.type(screen.getByLabelText('Name'), 'Test');
    await user.type(screen.getByLabelText('Email'), 'test@test.com');
    await user.type(screen.getByLabelText('Number'), '1234567890');
    await user.type(screen.getByLabelText('Location'), 'Chennai');

    await user.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText(/Oops! Something went wrong/)).toBeInTheDocument();
    });
  });

  it('renders the form image', () => {
    render(<ContactModal onClose={mockOnClose} />);
    expect(screen.getByAltText('Interior Design')).toBeInTheDocument();
  });
});
