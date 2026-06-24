import { Dashboard } from "./pages/Dashboard";
import { NavBar } from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Productos } from "./pages/Products";

function App() {
  const [sideBar, setSideBar] = useState(false);

  return (
    <BrowserRouter>
      <NavBar sideBar={sideBar} setSideBar={setSideBar} />
      <main
        style={{
          marginLeft: sideBar ? "240px" : "64px",
          marginTop: "52px",
          padding: "2rem",
          minHeight: "calc(100vh - 52px)",
          boxSizing: "border-box",
          transition: "margin-left 260ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Productos />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
