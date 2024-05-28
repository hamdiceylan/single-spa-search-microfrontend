import React, { useState } from "react";
import { Button } from "@react-mf/styleguide";
import { search } from "@react-mf/api";
import SearchResultPage from "../search-results/search-results.component";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState(null);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const result = await search(term);
      setSearchResults(result);
      setError(null);
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <input
          type="text"
          className="w-full p-2 text-black"
          placeholder="Search for people or planets"
          value={term}
          onChange={({ target }) => setTerm(target.value)}
        />
        <Button className="ml-2 mt-8" onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <SearchResultPage searchResults={searchResults} />
    </div>
  );
}

