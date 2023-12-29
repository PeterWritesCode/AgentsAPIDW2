import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AgentPage from "./AgentPage";
import {HashRouter, Routes, Route } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
       <HashRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path='/agent/:id' element={<AgentPage/>} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);