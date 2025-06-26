import API from "../services/api";
import {useState, useEffect } from "react";

export default function Dashboard({ onLogout }) {
  const [input, setInput]   = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
    try {
        const { data } = await API.get("/analyze-idea/history");
        setHistory(data);
    } catch (err) {
        console.error("History fetch error:", err);
    }
    };

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      // send {idea: input}
      const { data } = await API.post("/analyze-idea", { idea: input });

      // grab field your backend returns
      setResult(data.result ?? JSON.stringify(data, null, 2));
      await loadHistory(); // refresh history after analysis

            // 🚀 Automatically launch Patent Scout in new tab
            window.open(
            `https://www.lens.org/lens/search?q=${encodeURIComponent(input)}`,
            "_blank"
            );

    } catch (err) {
      console.error("Analyze error:", err);
      setResult("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

    // Load history on component mount
  useEffect(() => {
  loadHistory();
    }, []);

  return (
    <div className="card">
      <h1>Founder Dashboard: Let’s Build Something Great and Patent-Worthy</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe your startup idea..."
        rows={4}
        cols={50}
        style={{ marginTop: "1rem" }}
      />

      <br />

      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {/* Info about Patent Scout */}
        <small style={{ display: "block", marginTop: "0.5rem", color: "#555" }}>
        Patent Scout will open automatically after analysis.
        </small>

      {result && (
        <div style={{ marginTop: "1.5rem", padding: "1rem", border: "1px solid #ccc" }}>
          <h3>Results</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{result}</pre>
        </div>
      )}

      {history.length > 0 && (
        
        <div style={{ marginTop: "2rem", textAlign: "left" }}>
            <h3>Previous Analyses</h3>
            <ul>
            {history.map((item) => (
                <li key={item.id} style={{ marginBottom: "1rem" }}>
                <strong>Idea:</strong> {item.idea} <br />
                <strong>Analysis:</strong> {item.analysis} <br />
                <em>{new Date(item.created_at).toLocaleString()}</em>
                </li>
            ))}
            </ul>
        </div>
        )}

      <br />

      <button onClick={onLogout} style={{ marginTop: "2rem" }}>
        Logout
      </button>
    </div>
  );
}
