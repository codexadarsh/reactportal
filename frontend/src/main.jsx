import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import HomePage from "../src/pages/HomePage.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Nopage from "./pages/Nopage.jsx";
import JobsPage from "./pages/JobsPage.jsx";
import JobPage, { jobLoader } from "./pages/JobPage.jsx";
import AddJobPage from "./pages/AddJobPage.jsx";
import EditJobPage from "./pages/EditJobPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<HomePage />} />
      <Route path="jobs" element={<JobsPage />} />
      <Route path="add-job" element={<AddJobPage />} />
      <Route path="edit-job/:id" element={<EditJobPage />} loader={jobLoader} />
      <Route path="jobs/:id" element={<JobPage />} loader={jobLoader} />
      <Route path="*" element={<Nopage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
