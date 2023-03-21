// WorkoutTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/system';

const CustomTable = styled(Table)`
  // Your table styles
`;

const WorkoutTable = ({ isVisible }) => {
  return (
    <TableContainer component={Paper} style={{ display: isVisible ? 'block' : 'none' }}>
      <CustomTable>
        <TableHead>
          <TableRow>
            <TableCell>Week</TableCell>
            <TableCell>Day</TableCell>
            <TableCell>Push-ups</TableCell>
            <TableCell>Squats</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody id="workoutTable"></TableBody>
      </CustomTable>
    </TableContainer>
  );
};

export default WorkoutTable;
