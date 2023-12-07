import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Items from "./components/dashboard/Items";
import AddItem from "./components/add-item/AddItem";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/alhamidadmin/add-item" element={<AddItem />} />
        <Route path="/alhamidadmin" element={<Items />} />
        <Route path="/alhamidadmin/add-item/:id" element={<AddItem />} />
      </Routes>
    </Router>
  );
}

export default App;
