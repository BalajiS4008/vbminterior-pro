import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import BlogPost from './BlogPost';

const renderBlogPost = (slug, onOpenModal = vi.fn()) => {
  return render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPost onOpenModal={onOpenModal} />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('BlogPost Page', () => {
  it('renders a blog post by slug', () => {
    renderBlogPost('interior-design-trends-2024');
    expect(screen.getByText('Interior Design Trends 2024')).toBeInTheDocument();
  });

  it('renders post metadata (author, date, readTime)', () => {
    renderBlogPost('interior-design-trends-2024');
    // Category appears as badge text and in tags section — use getAllByText
    const trendsBadges = screen.getAllByText('Trends');
    expect(trendsBadges.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Feb 15, 2026/)).toBeInTheDocument();
    expect(screen.getByText(/6 min read/)).toBeInTheDocument();
  });

  it('renders content blocks', () => {
    renderBlogPost('interior-design-trends-2024');
    expect(screen.getByText(/Sustainable Materials Take Center Stage/)).toBeInTheDocument();
    expect(screen.getByText(/eco-friendly and sustainable materials/)).toBeInTheDocument();
  });

  it('renders "Back to Blog" link', () => {
    renderBlogPost('interior-design-trends-2024');
    const backLinks = screen.getAllByText('Back to Blog');
    expect(backLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('renders related posts', () => {
    renderBlogPost('interior-design-trends-2024');
    expect(screen.getByText('More Design Guides')).toBeInTheDocument();
  });

  it('renders CTA section', () => {
    renderBlogPost('interior-design-trends-2024');
    expect(screen.getByText('Ready to Transform Your Space?')).toBeInTheDocument();
  });

  it('shows "Post Not Found" for invalid slug', () => {
    renderBlogPost('non-existent-post');
    expect(screen.getByText('Post Not Found')).toBeInTheDocument();
  });

  it('renders tags section', () => {
    renderBlogPost('interior-design-trends-2024');
    // "Interior Design" appears in tags
    const idElements = screen.getAllByText('Interior Design');
    expect(idElements.length).toBeGreaterThanOrEqual(1);
  });

  it('renders next/prev navigation for middle post', () => {
    renderBlogPost('multiple-wallpaper-design-ideas');
    expect(screen.getByText(/Previous Article/)).toBeInTheDocument();
    expect(screen.getByText(/Next Article/)).toBeInTheDocument();
  });
});
