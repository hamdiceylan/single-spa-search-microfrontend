import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom"; // Ensure to import this for Jest expectations
import SearchResultPage from "../../search-results/search-results.component";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import PlanetCard from "../../search-results/planet-card.component";
import PeopleCard from "../../search-results/people-card.component";

describe('SearchResultPage', () => {
  test('renders "No results found" message when searchResults contain no data', () => {
    const searchResults = { planet: [], people: [] };
    const { getByText } =render(<MemoryRouter><SearchResultPage searchResults={searchResults} /></MemoryRouter> );
    expect(getByText('No results found.')).toBeInTheDocument();
  });

  test('renders PlanetCard when searchResults contain planet data', () => {
    const searchResults = { planet: [{ pk: 1, fields: { name: 'Tatooine' } }], people: [] };
    const { getByText } =render(<MemoryRouter><SearchResultPage searchResults={searchResults} /></MemoryRouter> );
    expect(getByText('Tatooine')).toBeInTheDocument();
  });

  test('renders PeopleCard when searchResults contain people data', () => {
    const searchResults = { planet: [], people: [{ pk: 1, fields: { name: 'Luke Skywalker' } }] };
    const { getByText } =render(<MemoryRouter><SearchResultPage searchResults={searchResults} /></MemoryRouter> );
    expect(getByText('Luke Skywalker')).toBeInTheDocument();
  });

  test('renders both PlanetCard and PeopleCard when searchResults contain both planet and people data', () => {
    const searchResults = {
      planet: [{ pk: 1, fields: { name: 'Tatooine' } }],
      people: [{ pk: 1, fields: { name: 'Luke Skywalker' } }]
    };
    const { getByText } =render(<MemoryRouter><SearchResultPage searchResults={searchResults} /></MemoryRouter> );
    expect(getByText('Tatooine')).toBeInTheDocument();
    expect(getByText('Luke Skywalker')).toBeInTheDocument();
  });
});
