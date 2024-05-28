import React from "react";
import PlanetCard from "./planet-card.component";
import PeopleCard from "./people-card.component";

const hasAnyResults = (planet, people) => hasResults(planet) || hasResults(people);
const hasResults = (data) => data.length > 0;

export default function SearchResultPage({ searchResults }) {
  if (!searchResults) return null;

  const { planet, people } = searchResults;

  if (!hasAnyResults(planet, people)) {
    return <p>No results found.</p>;
  }

  return (
    <div className="flex shadow rounded-md">
      {hasResults(planet) && <PlanetCard planet={planet} />}
      {hasResults(people) && <PeopleCard people={people} />}
    </div>
  );
}
