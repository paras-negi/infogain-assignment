import React, { useState, useCallback, useEffect } from "react";

import JokeCard from "./components/JokeCard";
import Button from "./components/Button";
import Select from "./components/Select";
import Loader from "./components/Loader";

import { Joke } from "./interfaces/jokeInterface";

// Main App Component
const App: React.FC = () => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Any");

  const fetchJoke = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://v2.jokeapi.dev/joke/${selectedCategory}`
      );
      if (!response.ok) throw new Error("Failed to fetch joke");
      const data = await response.json();
      setJoke(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch joke"));
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("https://v2.jokeapi.dev/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data.categories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setCategories(["Any"]);
      }
    })();
  }, []);

  if (error) return <div>Error: {error.message}</div>;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Joke Generator
          </h1>
          <p className="text-gray-600">Get ready to laugh with random jokes!</p>
        </div>

        <div className="mb-8 flex flex-col items-center justify-center gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Select Category
          </h2>
          <Select
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
            label="Category"
            disabled={isLoading}
          />
          <Button
            onClick={fetchJoke}
            isLoading={isLoading}
            disabled={isLoading}
          >
            Get New Joke
          </Button>
        </div>

        <JokeCard joke={joke} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};

export default App;
