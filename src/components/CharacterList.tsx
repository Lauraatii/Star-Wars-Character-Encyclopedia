"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "@/graphql/queries";
import "../styles/globals.css";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";

// Helper function to generate a random number(used for random image selection)
const getRandomImageId = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const CharacterList = () => {
  const router = useRouter(); 
  const { loading, error, data } = useQuery(GET_CHARACTERS); // GraphQL query to fetch all characters
  const [searchTerm, setSearchTerm] = useState(""); 
  const [sortOrder, setSortOrder] = useState("asc"); 

  if (loading) return <LoadingSpinner />; 
  if (error) return (
    <div className="text-red-500 p-4">
      <p>Error: {error.message}</p>
      <button onClick={() => window.location.reload()} className="mt-2 bg-red-500 text-white p-2 rounded">
        Retry
      </button>
    </div>
  );

  // Filtering and sorting of characters 
  const filteredCharacters = data.allPeople.people
    .filter((character: any) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a: any, b: any) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <div className="min-h-screen bg-black text-yellow-500 flex flex-col items-center">
      <div className="star-wars-logo my-8">
        <img src="/images/star-wars-logo.png" alt="Star Wars Logo" className="mx-auto" />
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center tracking-widest text-yellow-500">
        Characters
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center w-full md:space-x-4 mb-8 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <input
          type="text"
          placeholder="Search characters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border-2 border-yellow-500 rounded w-full md:w-1/2 bg-gray-800 text-yellow-500 text-lg shadow-md focus:ring-2 focus:ring-yellow-500 placeholder-yellow-500"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-3 border-2 border-yellow-500 rounded w-full md:w-1/4 bg-gray-800 text-yellow-500 text-lg shadow-md mt-4 md:mt-0 focus:ring-2 focus:ring-yellow-500"
        >
          <option value="asc">Sort by Name (A-Z)</option>
          <option value="desc">Sort by Name (Z-A)</option>
        </select>
      </div>
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {filteredCharacters.map((character: any) => {
            const randomImageId = getRandomImageId(1, 83); 
            return (
              <div
                key={character.id}
                className="bg-gray-900 rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300 transform-gpu hover:shadow-2xl text-center text-white border card cursor-pointer"
                onClick={() => router.push(`/character/${character.id}`)} 
              >
                <img
                  src={`https://starwars-visualguide.com/assets/img/characters/${randomImageId}.jpg`}
                  alt={character.name}
                  className="mb-4 w-full h-48 object-cover rounded-lg"
                  style={{ height: "70%", objectFit: "cover" }}
                  onError={(e) => (e.currentTarget.src = "/images/placeholder.jpg")}
                />
                <h2 className="text-2xl font-semibold mb-4">
                  {character.name}
                </h2>
                <div className="bg-gray-800 rounded p-4 shadow-inner">
                  <p className="text-sm text-gray-400 mb-2"><span className="font-semibold text-yellow-500">Birth Year:</span> {character.birthYear}</p>
                  <p className="text-sm text-gray-400 mb-2"><span className="font-semibold text-yellow-500">Species:</span> {character.species?.name ?? "Unknown"}</p>
                  <p className="text-sm text-gray-400"><span className="font-semibold text-yellow-500">Homeworld:</span> {character.homeworld?.name ?? "Unknown"}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CharacterList;
