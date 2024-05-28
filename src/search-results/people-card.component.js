import React from "react";
import { Link } from "react-router-dom";

export default function PeopleCard({ people = [] }) {
  if (people.length === 0) return null;

  return (
    <div className="p-6">
      <p className="font-semibold text-lg mb-4">People</p>
      <ul className="list-disc list-inside space-y-2">
        {people.map((person, index) => {
          return (
            <li key={index}>
              <Link to={`/people/${person.pk}`}>{person.fields.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
