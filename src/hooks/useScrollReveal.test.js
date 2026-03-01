import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import useScrollReveal from './useScrollReveal';

describe('useScrollReveal', () => {
  it('returns a ref object', () => {
    const { result } = renderHook(() => useScrollReveal());
    expect(result.current).toBeDefined();
    expect(result.current).toHaveProperty('current');
  });

  it('ref starts as null', () => {
    const { result } = renderHook(() => useScrollReveal());
    expect(result.current.current).toBeNull();
  });
});
