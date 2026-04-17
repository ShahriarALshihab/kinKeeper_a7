import React from "react";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import StatsPage from "./pages/StatsPage";

const App = () => {
  return <>
  <Navbar></Navbar>
  <HomePage></HomePage>
  <StatsPage></StatsPage>
  </>
};

export default App;
