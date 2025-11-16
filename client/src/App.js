import React, { useEffect, useState } from "react";
import axios from "axios";

// ------- Error Boundary Wrapper ---------
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong in the UI.</h2>;
    }
    return this.props.children;
  }
}

// -------- Bug Tracker App --------------
function App() {
  const [bugs, setBugs] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("open");
  const [loading, setLoading] = useState(true);

  // Load bugs from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bugs")
      .then((res) => {
        setBugs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bugs:", err);
        setLoading(false);
      });
  }, []);

  // Create a new bug
  const handleCreateBug = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/bugs", {
        title,
        status,
      });
      setBugs([...bugs, res.data]);
      setTitle("");
      setStatus("open");
    } catch (err) {
      console.error("Error creating bug:", err);
    }
  };

  // Update bug status
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/bugs/${id}`, {
        status: newStatus,
      });

      setBugs(bugs.map((bug) => (bug._id === id ? res.data : bug)));
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // Delete bug
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bugs/${id}`);
      setBugs(bugs.filter((bug) => bug._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <ErrorBoundary>
      <div style={{ padding: "30px" }}>
        <h1>🐞 Bug Tracker</h1>

        {/* Add Bug Form */}
        <form onSubmit={handleCreateBug} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Bug title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ marginRight: "10px" }}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ marginRight: "10px" }}
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>

          <button type="submit">Add Bug</button>
        </form>

        {/* Bug List */}
        {loading ? (
          <p>Loading bugs...</p>
        ) : bugs.length === 0 ? (
          <p>No bugs reported yet.</p>
        ) : (
          <ul>
            {bugs.map((bug) => (
              <li key={bug._id} style={{ marginBottom: "10px" }}>
                <strong>{bug.title}</strong> — {bug.status}
                <br />

                <button
                  onClick={() => handleUpdateStatus(bug._id, "open")}
                  disabled={bug.status === "open"}
                >
                  Open
                </button>

                <button
                  onClick={() =>
                    handleUpdateStatus(bug._id, "in-progress")
                  }
                  disabled={bug.status === "in-progress"}
                >
                  In Progress
                </button>

                <button
                  onClick={() => handleUpdateStatus(bug._id, "resolved")}
                  disabled={bug.status === "resolved"}
                >
                  Resolved
                </button>

                <button
                  onClick={() => handleDelete(bug._id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;

