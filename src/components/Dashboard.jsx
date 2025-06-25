export default function Dashboard({ onLogout }) {
  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
