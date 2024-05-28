import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom"; // Ensure to import this for Jest expectations
import PeopleCard from "../../search-results/people-card.component";
import { MemoryRouter } from 'react-router-dom';

describe("PeopleCard", () => {
  test("returns null when people is not an array", () => {
    const { container } = render(<PeopleCard />);
    expect(container.firstChild).toBeNull();
  });

  test("returns null when people is an empty array", () => {
    const people = [];
    const { container } = render(<PeopleCard people={people} />, { wrapper: MemoryRouter });
    expect(container.firstChild).toBeNull();
  });

  test("renders list of people with correct URLs and names", () => {
    const people = [
      { pk: 1, fields: { name: "Luke Skywalker" } },
      { pk: 2, fields: { name: "Leia Organa" } },
    ];
    const { getByText } = render(<PeopleCard people={people} />, { wrapper: MemoryRouter });
    expect(getByText("Luke Skywalker")).toHaveAttribute("href", "/people/1");
    expect(getByText("Leia Organa")).toHaveAttribute("href", "/people/2");
  });
});
