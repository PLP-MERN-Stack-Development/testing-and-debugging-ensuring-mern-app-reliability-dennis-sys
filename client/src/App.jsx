import React, { useEffect, useState } from 'react';
import BugForm from './components/BugForm';
import BugList from './components/BugList';

function App() {
  const [bugs, setBugs] = useState([]);

  const fetchBugs = async () => {
    const res = await fetch('http://localhost:5000/api/bugs');
    const data = await res.json();
    setBugs(data);
  };

  const addBug = async bug => {
    const res = await fetch('http://localhost:5000/api/bugs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bug),
    });
    const data = await res.json();
    setBugs(prev => [...prev, data]);
  };

  const updateBug = async (id, updates) => {
    const res = await fetch(`http://localhost:5000/api/bugs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    setBugs(prev => prev.map(b => (b._id === id ? data : b)));
  };

  const deleteBug = async id => {
    await fetch(`http://localhost:5000/api/bugs/${id}`, { method: 'DELETE' });
    setBugs(prev => prev.filter(b => b._id !== id));
  };

  useEffect(() => { fetchBugs(); }, []);

  return (
    <div>
      <h1>Bug Tracker</h1>
      <BugForm onAdd={addBug} />
      <BugList bugs={bugs} onUpdate={updateBug} onDelete={deleteBug} />
    </div>
  );
}

export default App;
