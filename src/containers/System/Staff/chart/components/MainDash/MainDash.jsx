import { textAlign } from "@mui/system";
import React from "react";
import Cards from "../Cards/Cards";
import "./MainDash.css";


const MainDash = () => {
  return (
    <div className="MainDash">
      <h1 className="h1">Thống Kê</h1>
      <Cards />
    </div>
  );
};

export default MainDash;
