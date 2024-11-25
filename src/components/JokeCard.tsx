import React, { useState, useEffect } from 'react';
import { Joke } from '../interfaces/jokeInterface';


interface JokeCardProps {
  joke: Joke | null;
  isLoading: boolean;
  error: Error | null;
}

const JokeCard: React.FC<JokeCardProps> = ({ joke, isLoading, error }) => {
  const [showDelivery, setShowDelivery] = useState(false);

  useEffect(() => {
    setShowDelivery(false);
    if (joke?.type === 'twopart') {
      const timer = setTimeout(() => setShowDelivery(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [joke]);

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-600">Error: {error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg border animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (!joke) {
    return (
      <div className="p-6 bg-white rounded-lg border">
        <p className="text-gray-500">Click the button to fetch a joke!</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg border">
      {joke.type === 'single' ? (
        <p className="text-lg">{joke.joke}</p>
      ) : (
        <div>
          <p className="text-lg mb-4">{joke.setup}</p>
          <p className={`text-lg font-medium transition-opacity duration-500 ${showDelivery ? 'opacity-100' : 'opacity-0'}`}>
            {joke.delivery}
          </p>
        </div>
      )}
      <div className="mt-4 text-sm text-gray-500">
        Category: {joke.category}
      </div>
    </div>
  );
};

export default JokeCard;