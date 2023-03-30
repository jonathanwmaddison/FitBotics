import React, { useState } from 'react';

function WorkoutTable({ workoutPlan }) {
  const [activeDays, setActiveDays] = useState({});

  const toggleDay = (index) => {
    setActiveDays((prevActiveDays) => {
      const newActiveDays = { ...prevActiveDays };
      if (newActiveDays[index]) {
        delete newActiveDays[index];
      } else {
        newActiveDays[index] = true;
      }
      return newActiveDays;
    });
  };

  const renderExercises = (exercises) => {
    return (
      <div className="border-t border-gray-200 dark:border-gray-700">
        {exercises.map((exercise, index) => (
          <div
            key={index}
            className="flex justify-between px-4 py-2 text-gray-700 dark:text-gray-300"
          >
            <div className="max-w-md ">{exercise.name}</div>
            <div className="max-w-xs ">{exercise.reps}</div>
          </div>
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
        className="border border-gray-200 dark:border-gray-700 mb-2"
      >
        <div
          className="flex justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300"
          onClick={() => toggleDay(index)}
        >
          <div className="max-w-xs ">Day {workout.day}</div>
          <div className="max-w-lg ">{workout.description}</div>
        </div>
        {activeDays[index] && renderExercises(workout.exercises)}
      </div>
    ));
  };

  return (
    <div>
      <div className="flex justify-between px-4 py-2 font-bold text-gray-700 dark:text-gray-300">
        <div>Day</div>
        <div>Description</div>
      </div>
      {renderWorkoutPlanRows()}
    </div>
  );
}

export default WorkoutTable;
