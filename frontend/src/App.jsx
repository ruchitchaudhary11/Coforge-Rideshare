import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchRides from "./pages/SearchRides";
import RideDetails from "./pages/RideDetails";
import MyBookings from "./pages/MyBookings";
import OfferRide from "./pages/OfferRide";
import BookRide from "./pages/BookRide";
import MyRides from "./pages/MyRides";
import EditRide from "./pages/EditRide";

function App() {
  return (
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search-rides" element={<SearchRides />} />
          <Route path="/ride/:id" element={<RideDetails />} />
          <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
          <Route path="/offer-ride" element={<ProtectedRoute><OfferRide /></ProtectedRoute>} />
          <Route path="/edit-ride/:id" element={<ProtectedRoute><EditRide /></ProtectedRoute>}/>
          <Route path="/book/:id"element={<BookRide />}/>
          <Route
    path="/my-rides"
    element={
        <ProtectedRoute>
            <MyRides />
        </ProtectedRoute>
    }
/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;