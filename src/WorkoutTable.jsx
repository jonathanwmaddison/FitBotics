// WorkoutTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@emotion/react';

const CustomTable = styled(Table)`
  // Your table styles
`;

function WorkoutTable({ workoutPlan }) {
  const renderExerciseRows = (exercises) => {
    return exercises.map((exercise, index) => (
      <React.Fragment key={index}>
        <TableCell>{exercise.name}</TableCell>
        <TableCell>{exercise.reps}</TableCell>
      </React.Fragment>
    ));
  };

  const renderWorkoutPlanRows = () => {
    if (!workoutPlan || !workoutPlan.workouts) {
      return null;
    }

    return workoutPlan.workouts.map((workout, index) => (
      <TableRow key={index}>
        <TableCell>{workout.week}</TableCell>
        <TableCell>{workout.day}</TableCell>
        {renderExerciseRows(workout.exercises)}
        <TableCell>{workout.description}</TableCell>
      </TableRow>
    ));
  };

  return (
    <TableContainer component={Paper}>
      <CustomTable>
        <TableHead>
          <TableRow>
            <TableCell>Week</TableCell>
            <TableCell>Day</TableCell>
            <TableCell>Exercise</TableCell>
            <TableCell>Reps</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderWorkoutPlanRows()}</TableBody>
      </CustomTable>
    </TableContainer>
  );
}

export default WorkoutTable;
