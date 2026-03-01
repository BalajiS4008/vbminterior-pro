import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatBot from './ChatBot';

describe('ChatBot', () => {
  it('renders the chat bubble button', () => {
    render(<ChatBot />);
    expect(screen.getByLabelText('Open chat')).toBeInTheDocument();
  });

  it('opens chat window when bubble is clicked', async () => {
    const user = userEvent.setup();
    render(<ChatBot />);
    await user.click(screen.getByLabelText('Open chat'));
    expect(screen.getByText('VBM Design Assistant')).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();
  });

  it('shows opening message when chat is opened', async () => {
    const user = userEvent.setup();
    render(<ChatBot />);
    await user.click(screen.getByLabelText('Open chat'));
    expect(screen.getByText(/I'm VBM Interior's design assistant/)).toBeInTheDocument();
  });

  it('closes chat when close button in header is clicked', async () => {
    const user = userEvent.setup();
    render(<ChatBot />);
    await user.click(screen.getByLabelText('Open chat'));
    expect(screen.getByText('VBM Design Assistant')).toBeInTheDocument();

    const closeBtn = document.querySelector('.chatbot-header-close');
    await user.click(closeBtn);
    expect(screen.queryByText('VBM Design Assistant')).not.toBeInTheDocument();
  });

  it('has input field for typing messages', async () => {
    const user = userEvent.setup();
    render(<ChatBot />);
    await user.click(screen.getByLabelText('Open chat'));
    const input = screen.getByPlaceholderText('Ask about interior design...');
    expect(input).toBeInTheDocument();
  });

  it('has send button', async () => {
    const user = userEvent.setup();
    render(<ChatBot />);
    await user.click(screen.getByLabelText('Open chat'));
    expect(screen.getByLabelText('Send message')).toBeInTheDocument();
  });

  it('send button is disabled when input is empty', async () => {
    const user = userEvent.setup();
    render(<ChatBot />);
    await user.click(screen.getByLabelText('Open chat'));
    expect(screen.getByLabelText('Send message')).toBeDisabled();
  });

  it('send button is enabled when input has text', async () => {
    const user = userEvent.setup();
    render(<ChatBot />);
    await user.click(screen.getByLabelText('Open chat'));
    await user.type(screen.getByPlaceholderText('Ask about interior design...'), 'Hello');
    expect(screen.getByLabelText('Send message')).not.toBeDisabled();
  });

  it('can type a message in the input', async () => {
    const user = userEvent.setup();
    render(<ChatBot />);
    await user.click(screen.getByLabelText('Open chat'));
    const input = screen.getByPlaceholderText('Ask about interior design...');
    await user.type(input, 'I need a kitchen design');
    expect(input).toHaveValue('I need a kitchen design');
  });

  it('sends message and shows user message in chat', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ reply: 'Great choice!', cta_trigger: false }),
    });
    const user = userEvent.setup();
    render(<ChatBot />);
    await user.click(screen.getByLabelText('Open chat'));

    const input = screen.getByPlaceholderText('Ask about interior design...');
    await user.type(input, 'Hello');
    await user.click(screen.getByLabelText('Send message'));

    // User message should appear
    await waitFor(() => {
      const userMsgs = document.querySelectorAll('.chatbot-msg-user');
      expect(userMsgs.length).toBeGreaterThanOrEqual(1);
    });

    // Bot reply should appear
    await waitFor(() => {
      expect(screen.getByText('Great choice!')).toBeInTheDocument();
    });
  });
});
