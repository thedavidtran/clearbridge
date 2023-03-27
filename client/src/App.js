import { BrowserRouter, Route, Routes } from "react-router-dom";

import Company from "./pages/Company/Company";

const App = () => {
  return (
    <div className="bg-slate-800 p-4 h-max">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Company />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
