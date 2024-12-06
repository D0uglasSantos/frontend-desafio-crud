import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import AthleteList from "./pages/AthleteList";
import EventList from "./pages/EventList";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
        <nav className="bg-white shadow-md p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              Athlete & Event Manager
            </Link>
            <div className="space-x-4">
              <Button asChild variant="ghost">
                <Link to="/athletes">Athletes</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/events">Events</Link>
              </Button>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/athletes" element={<AthleteList />} />
            <Route path="/events" element={<EventList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
