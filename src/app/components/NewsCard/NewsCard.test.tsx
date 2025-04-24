/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NewsCard } from '@/app/components/NewsCard/NewsCard';
import * as api from '@/app/api';

const mockNews = {
  ID: 1,
  URL: 'https://originalsource.com/article',
  TI: '',
  AB: '',
  DOM: '',
  DP: '',
  LANG: '',
  REACH: 1,
  KW: [],
  AU: [],
  CNTR: '',
  CNTR_CODE: '',
  SENT: '',
  TRAFFIC: [],
  FAV: '',
  HIGHLIGHTS: [],
};

const mockDuplicates = [
  {
    ID: 1,
    ORIGINAL_ID: 1,
    TI: 'Duplicate 1',
    URL: '[https://dup1.com](https://dup1.com)',
    DOM: 'dup1.com',
    DP: '2022-01-01T00:00:00',
    REACH: 100,
    AU: ['Author 1'],
    CNTR: 'USA',
    CNTR_CODE: 'US',
    RELEVANCE: 50,
  },
  {
    ID: 2,
    ORIGINAL_ID: 1,
    TI: 'Duplicate 2',
    URL: '[https://dup2.com](https://dup2.com)',
    DOM: 'dup2.com',
    DP: '2022-01-02T00:00:00',
    REACH: 200,
    AU: ['Author 2'],
    CNTR: 'Canada',
    CNTR_CODE: 'CA',
    RELEVANCE: 75,
  },
];

describe('NewsCard Component', () => {
  vi.spyOn(api, 'getDuplicatesNews').mockImplementation(async () => {
    return {
      ok: true,
      data: mockDuplicates,
    };
  });

  it('renders Original Source link with correct href', () => {
    render(<NewsCard news={mockNews} />);
    const link = screen.getByRole('link', { name: /original source/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', mockNews.URL);
  });

  it('fetches and displays duplicates count', async () => {
    render(<NewsCard news={mockNews} />);
    const duplicatesText = await screen.findByText(/duplicates:/i);
    expect(duplicatesText).toBeInTheDocument();
    expect(
      screen.getByText(mockDuplicates.length.toString())
    ).toBeInTheDocument();
  });

  it('toggles showing all duplicates on button click', async () => {
    render(<NewsCard news={mockNews} />);

    const toggleButton = await screen.findByRole('button', {
      name: /view duplicates/i,
    });
    expect(toggleButton).toBeInTheDocument();

    expect(screen.getAllByTestId('duplicate-card').length).toBe(1);

    await userEvent.click(toggleButton);

    await waitFor(() => {
      expect(screen.getAllByTestId('duplicate-card').length).toBe(
        mockDuplicates.length
      );
    });

    expect(
      screen.getByRole('button', { name: /hide duplicates/i })
    ).toBeInTheDocument();
  });
});
