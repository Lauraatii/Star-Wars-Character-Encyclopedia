"use client";

import { useQuery } from "@apollo/client";
import { GET_CHARACTER_DETAILS } from "@/graphql/queries";
import { useParams, useRouter } from "next/navigation";
import "../styles/globals.css";
import LoadingSpinner from "@/components/LoadingSpinner";

const CharacterDetails = () => {
  const { id } = useParams(); // Get the character ID from the URL parameters
  const router = useRouter(); // Hook for navigation

  // Fetching character details using the ID from the URL
  const { loading, error, data } = useQuery(GET_CHARACTER_DETAILS, {
    variables: { id },
  });

  if (loading) return <LoadingSpinner />; 
  if (error) return (
    <div className="text-red-500 p-4">
      <p>Error: {error.message}</p>
      <button onClick={() => window.location.reload()} className="mt-2 bg-red-500 text-white p-2 rounded">
        Retry
      </button>
    </div>
  );

  const character = data.person; // Character data from the query

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 min-h-screen bg-black text-yellow-500">
        <div className="mb-8">
          <button
            onClick={() => router.back()} 
            className="back-button"
          >
            <span>←</span>
            <span>Back to Galaxy</span>
          </button>
        </div>

        <div className="text-center mb-8">
            <img
                src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                alt={character.name}
                className="mx-auto w-full max-w-xs h-96 object-cover rounded-lg shadow-lg"
                style={{ objectFit: "cover" }}
                onError={(e) => (e.currentTarget.src = "/images/placeholder.jpg")}
            />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center details-heading">
            {character.name}
        </h1>

        <div className="details-container">
            <p className="details-description"><span className="font-semibold">Birth Year:</span> {character.birthYear}</p>
            <p className="details-description"><span className="font-semibold">Species:</span> {character.species?.name ?? "Unknown"}</p>
            <p className="details-description"><span className="font-semibold">Homeworld:</span> {character.homeworld?.name ?? "Unknown"}</p>

            <div className="films-section">
              <h3 className="text-3xl font-semibold details-heading">Films</h3>
              <div>
                  {character.filmConnection.films.map((film: any) => (
                      <div key={film.title} className="film-item">
                          {film.title}
                      </div>
                  ))}
              </div>
            </div>
        </div>
    </div>
  );
};

export default CharacterDetails;
