import React from 'react';

function WorkoutTable({ workoutPlan }) {
  const renderExerciseRows = (exercises) => {
    return exercises.map((exercise, index) => (
      <React.Fragment key={index}>
        <td>{exercise.name}</td>
        <td>{exercise.reps}</td>
      </React.Fragment>
    ));
  };

  const renderWorkoutPlanRows = () => {
    if (!workoutPlan || !workoutPlan.workouts) {
      return null;
    }

    return workoutPlan.workouts.map((workout, index) => (
      <tr key={index}>
        <td>{workout.week}</td>
        <td>{workout.day}</td>
        {renderExerciseRows(workout.exercises)}
        <td>{workout.description}</td>
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Week</th>
            <th>Day</th>
            <th>Exercise</th>
            <th>Reps</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{renderWorkoutPlanRows()}</tbody>
      </table>
    </div>
  );
}

export default WorkoutTable;