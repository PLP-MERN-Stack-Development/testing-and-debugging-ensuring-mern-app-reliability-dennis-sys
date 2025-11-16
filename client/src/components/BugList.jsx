import React from 'react';
import Button from './Button';

const BugList = ({ bugs, onUpdate, onDelete }) => {
  return (
    <ul>
      {bugs.map(bug => (
        <li key={bug._id}>
          <strong>{bug.title}</strong> - {bug.status}
          <Button onClick={() => onUpdate(bug._id, { status: 'resolved' })}>Resolve</Button>
          <Button onClick={() => onDelete(bug._id)}>Delete</Button>
        </li>
      ))}
    </ul>
  );
};

export default BugList;
