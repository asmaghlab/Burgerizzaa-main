import Pages from "./Components/Pages/Pages";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardRoutes from "./Dashboard/Pages/DashboardRoutes";
import { HelmetProvider } from "react-helmet-async";
import PageError from "./PageError";

function App() {

  return (
    <>
    <HelmetProvider>

    <BrowserRouter>
        <Routes>

          <Route path="/dashboard/*" element={<DashboardRoutes/>} />

          <Route path="/*" element={<Pages />} />

          <Route path="*" element={<PageError/>} />

        </Routes>
    </BrowserRouter>
    </HelmetProvider>

    </>
  );
}

export default App;
