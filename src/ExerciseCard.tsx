import React, { useState } from 'react';
import { Exercise } from './App';
import { Icon } from 'react-icons-kit';
import { star } from 'react-icons-kit/fa/star';
import { starO } from 'react-icons-kit/fa/starO';

type ExerciseCardProps = {
  exercise: Exercise;
};

type Rating = {
  rating: number;
  comment: string;
};

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const [rating, setRating] = useState<Rating>({
    rating: 0,
    comment: '',
  });

  const handleRatingChange = (newRating: number) => {
    setRating((prevRating) => ({
      ...prevRating,
      rating: newRating,
    }));
  };

  const handleCommentChange = (newComment: string) => {
    setRating((prevRating) => ({
      ...prevRating,
      comment: newComment,
    }));
  };

  return (
    <div className="p-4 mb-4 bg-white shadow rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-lg">{exercise.name}</div>
        <div className="text-gray-500">
          {exercise.reps} {exercise.reps === 1 ? 'rep' : 'reps'}
        </div>
      </div>
      <div className="mb-4">
        <div className="mb-2 text-gray-700">Satisfaction</div>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              className={
                'mr-1 p-1 rounded-full focus:outline-none ' +
                (value <= rating.rating
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200')
              }
              onClick={() => handleRatingChange(value)}
            >
              <Icon
                icon={value <= rating.rating ? star : starO}
                size={16}
                className="inline-block"
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-2 text-gray-700">Comment</div>
        <textarea
          className="w-full p-2 rounded-lg border-gray-200 focus:outline-none focus:border-blue-400"
          placeholder="Enter your comment here"
          value={rating.comment}
          onChange={(event) => handleCommentChange(event.target.value)}
        />
      </div>
    </div>
  );
};

export default ExerciseCard;
