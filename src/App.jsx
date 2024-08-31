import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 p-6">
        <Sidebar />
        <Dashboard />
      </div>

    </div>
  );
}

export default App;
