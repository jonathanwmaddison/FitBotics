import React, { useState } from 'react';
import { Exercise, WorkoutPlan } from './App';
import ExerciseCard from './ExerciseCard';

type ActiveDays = number[];

function WorkoutTable({ workoutPlan }: { workoutPlan: WorkoutPlan }) {
  const [activeDays, setActiveDays] = useState<ActiveDays>([]);

  const toggleDay = (index: number) => {
    setActiveDays((prevActiveDays) => {
      let newActiveDays = [...prevActiveDays];
      if (newActiveDays.includes(index)) {
        newActiveDays = newActiveDays.filter((day) => day !== index);
      } else {
        newActiveDays = newActiveDays.concat(index);
      }
      return newActiveDays;
    });
  };

  const renderExercises = (exercises: Exercise[]) => {
    return (
      <div className="border-t border-gray-200 dark:border-gray-700">
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.name} exercise={exercise} />
        ))}
      </div>
    );
  };

  const renderWorkoutPlanRows = () => {
    if (!workoutPlan || !workoutPlan.workouts) {
      return null;
    }

    return workoutPlan.workouts.map((workout, index) => (
      <div
        key={index}
        className="border border-gray-200 dark:border-gray-700 mb-2 rounded-lg overflow-hidden"
      >
        <div
          className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300"
          onClick={() => toggleDay(index)}
        >
          <div className="w-12/12">
            <div className="font-bold">Day {workout.day}</div>
            {workout.description}
          </div>
          <div className="ml-2">
            {activeDays.includes(index) ? (
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </div>
        </div>
        {activeDays.includes(index) && renderExercises(workout.exercises)}
      </div>
    ));
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4">
      <div className="flex justify-between px-4 py-2 font-bold text-gray-700 dark:text-gray-300">
        <div className="w-1/3">Day</div>
      </div>
      {renderWorkoutPlanRows()}
    </div>
  );
}
export default WorkoutTable;
