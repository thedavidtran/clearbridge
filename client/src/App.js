import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./pages/layout/Layout";
import Company from "./pages/Company/Company";
import CompanyEdit from "./pages/Company/CompanyEdit";
import CompanyDetail from "./pages/Company/CompanyDetail";

const App = () => {
  return (
    <div className="h-max">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Company />} />
            <Route path="/add" element={<CompanyEdit isCreate={true} />} />
            <Route
              path="/edit/:companyId"
              element={<CompanyEdit isCreate={false} />}
            />
            <Route path="/:companyId" element={<CompanyDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
