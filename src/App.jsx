import React from "react";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import StatsPage from "./pages/StatsPage";
import NotFoundPage from "./pages/NotFoundPage";
import Footer from "./components/Footer";

import TimelinePage from "./pages/TimelinePage";
import { ToastContainer } from "react-toastify";
import FriendDetailPage from "./pages/FriendDetailpage";
import { Route, Routes } from "react-router-dom";


const App = () => {
  return (
    <>
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
     <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/friend/:id" element={<FriendDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer></Footer>
    </>
  );
};

export default App;
