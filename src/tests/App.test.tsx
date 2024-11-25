import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  const jokeObject = {
    category: "Programming",
    type: "single",
    joke: "Why do programmers prefer dark mode? Because light attracts bugs!",
    id: 1,
    safe: true
  };

  beforeEach(() => {
    // Update mock to use vi instead of jest
    global.fetch = vi.fn().mockImplementation((url) => {
      if (url.includes('/categories')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ categories: ['Programming'] })
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(jokeObject)
      });
    });
  });

  it('displays joke after clicking get new joke button', async () => {
    render(<App />);
    
    const button = screen.getByText(/get new joke/i);
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(jokeObject.joke)).toBeInTheDocument();
    });
  });
});
