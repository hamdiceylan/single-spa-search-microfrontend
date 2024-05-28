import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchPage from "../../search-page/search-page.component";
import { search } from "@react-mf/api";

jest.mock('@react-mf/api', () => ({
  search: jest.fn(),
}));

jest.mock('@react-mf/styleguide', () => ({
  Button: ({ onClick, children }) => (
    <button onClick={onClick} data-testid="mocked-button">{children}</button>
  ),
}));

describe('SearchPage', () => {
  test('performs search successfully and renders search results', async () => {
    const mockSearchResults = { planet: [], people: [] };
    search.mockResolvedValueOnce(mockSearchResults);

    const { getByPlaceholderText, getByText, queryByText } = render(<SearchPage />);

    const searchInput = getByPlaceholderText('Search for people or planets');
    fireEvent.change(searchInput, { target: { value: 'search term' } });

    fireEvent.click(getByText('Search'));

    await waitFor(() => expect(search).toHaveBeenCalledTimes(1));

    expect(queryByText('Searching...')).not.toBeInTheDocument();

    expect(getByText('No results found.')).toBeInTheDocument(); // Assuming initially no results are found
  });

  test('handles search failure and displays error message', async () => {
    search.mockRejectedValueOnce(new Error('Search failed'));

    const { getByPlaceholderText, getByText } = render(<SearchPage />);

    const searchInput = getByPlaceholderText('Search for people or planets');
    fireEvent.change(searchInput, { target: { value: 'search term' } });

    fireEvent.click(getByText('Search'));

    await waitFor(() => expect(search).toHaveBeenCalledTimes(2));

    expect(getByText('An error occurred. Please try again later.')).toBeInTheDocument();
  });
});

