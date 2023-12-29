import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AgentPage from "./AgentPage";
import {BrowserRouter as HashRouter, Routes, Route } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
       <HashRouter>
      <Routes>
        <Route exact= "" path="" element={<App/>} />
        <Route exact= "" path='/agent/:id' element={<AgentPage/>} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);