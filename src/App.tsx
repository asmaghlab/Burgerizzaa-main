import Pages from "./Components/Pages/Pages";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardRoutes from "./Dashboard/Pages/DashboardRoutes";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/dashboard/*" element={<DashboardRoutes/>} />

          <Route path="/*" element={<Pages />} />


        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
