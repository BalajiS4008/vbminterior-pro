import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FAQAccordion from './FAQAccordion';

const mockItems = [
  { question: 'What is VBM Interior?', answer: 'VBM Interior is a premium interior design company.' },
  { question: 'Where are you located?', answer: 'We are based in Chennai, Tamil Nadu.' },
  { question: 'Do you offer warranty?', answer: 'Yes, we offer a 10-year warranty.' },
];

describe('FAQAccordion', () => {
  it('renders all questions', () => {
    render(<FAQAccordion items={mockItems} />);
    expect(screen.getByText('What is VBM Interior?')).toBeInTheDocument();
    expect(screen.getByText('Where are you located?')).toBeInTheDocument();
    expect(screen.getByText('Do you offer warranty?')).toBeInTheDocument();
  });

  it('renders all answers', () => {
    render(<FAQAccordion items={mockItems} />);
    expect(screen.getByText('VBM Interior is a premium interior design company.')).toBeInTheDocument();
    expect(screen.getByText('We are based in Chennai, Tamil Nadu.')).toBeInTheDocument();
    expect(screen.getByText('Yes, we offer a 10-year warranty.')).toBeInTheDocument();
  });

  it('opens an item when clicked', async () => {
    const user = userEvent.setup();
    render(<FAQAccordion items={mockItems} />);

    const firstItem = screen.getByText('What is VBM Interior?').closest('.faq-accordion-item');
    expect(firstItem.classList.contains('open')).toBe(false);

    await user.click(firstItem);
    expect(firstItem.classList.contains('open')).toBe(true);
  });

  it('closes an open item when clicked again', async () => {
    const user = userEvent.setup();
    render(<FAQAccordion items={mockItems} />);

    const firstItem = screen.getByText('What is VBM Interior?').closest('.faq-accordion-item');
    await user.click(firstItem);
    expect(firstItem.classList.contains('open')).toBe(true);

    await user.click(firstItem);
    expect(firstItem.classList.contains('open')).toBe(false);
  });

  it('only one item can be open at a time', async () => {
    const user = userEvent.setup();
    render(<FAQAccordion items={mockItems} />);

    const firstItem = screen.getByText('What is VBM Interior?').closest('.faq-accordion-item');
    const secondItem = screen.getByText('Where are you located?').closest('.faq-accordion-item');

    await user.click(firstItem);
    expect(firstItem.classList.contains('open')).toBe(true);

    await user.click(secondItem);
    expect(secondItem.classList.contains('open')).toBe(true);
    expect(firstItem.classList.contains('open')).toBe(false);
  });

  it('renders with empty items array', () => {
    render(<FAQAccordion items={[]} />);
    const accordion = document.querySelector('.faq-accordion');
    expect(accordion).toBeInTheDocument();
    expect(accordion.children.length).toBe(0);
  });
});
