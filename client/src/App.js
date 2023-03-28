import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./pages/layout/Layout";
import Company from "./pages/Company/Company";
import CompanyCreate from "./pages/Company/CompanyCreate";

const App = () => {
  return (
    <div className="h-max">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Company />} />
            <Route path="/add" element={<CompanyCreate />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
