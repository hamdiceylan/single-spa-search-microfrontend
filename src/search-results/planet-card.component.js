import React from "react";
import { Link } from "react-router-dom";

export default function PlanetCard({ planet = [] }) {
  if (planet.length === 0) return null;

  return (
    <div className="p-6">
      <p className="font-semibold text-lg mb-4">Planets</p>
      <ul className="list-disc list-inside space-y-2">
        {planet.map((planetDetail, index) => (
          <li key={index}>
            <Link
              to={`/planets/${planetDetail.pk}`}
              className="text-blue-500 hover:underline"
            >
              {planetDetail.fields.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
