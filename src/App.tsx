import './App.css';
import { NavBar } from './layouts/NavBarAndFooter/NavBar';
import { Footer } from './layouts/NavBarAndFooter/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { SearchJobsPage } from './layouts/SearchJobsPage/SearchJobsPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ContactPage } from './layouts/ContactPage/ContactPage';
import { AboutUsPage } from './layouts/AboutUsPage/AboutUsPage';
import { JobDetailsPage } from './layouts/JobDetailsPage/JobDetailsPage';
import { MissionPage } from './layouts/MissionPage/MissionPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AllReviewsPage } from './layouts/JobDetailsPage/AllReviewsPage';

export const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <div className="page-background flex-grow-1">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchJobsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/details/:jobId" element={<JobDetailsPage />} />
          <Route path="/reviews/:jobId" element={<AllReviewsPage />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
