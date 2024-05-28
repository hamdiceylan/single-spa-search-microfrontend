import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom"; // Ensure to import this for Jest expectations
import PlanetCard from "../../search-results/planet-card.component";
import { MemoryRouter } from 'react-router-dom';

describe("PlanetCard", () => {
  test("returns null when planet is not an array", () => {
    const { container } = render(<PlanetCard />);
    expect(container.firstChild).toBeNull();
  });

  test("returns null when planet is an empty array", () => {
    const planet = [];
    const { container } = render(<PlanetCard planet={planet} />, { wrapper: MemoryRouter });
    expect(container.firstChild).toBeNull();
  });

  test("renders list of planets with correct URLs and names", () => {
    const planet = [
      { pk: 1, fields: { name: "Tatooine" } },
      { pk: 2, fields: { name: "Alderaan" } },
    ];
    const { getByText } = render(<PlanetCard planet={planet} />, { wrapper: MemoryRouter });
    expect(getByText("Tatooine")).toHaveAttribute("href", "/planets/1");
    expect(getByText("Alderaan")).toHaveAttribute("href", "/planets/2");
  });
});
