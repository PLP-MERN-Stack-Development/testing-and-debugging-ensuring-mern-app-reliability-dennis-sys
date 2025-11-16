import React, { useState } from 'react';
import Button from './Button';

const BugForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!title) return;
    onAdd({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Bug title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Bug description" value={description} onChange={e => setDescription(e.target.value)} />
      <Button type="submit">Report Bug</Button>
    </form>
  );
};

export default BugForm;
