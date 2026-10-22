import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { PremiumProvider } from './context/PremiumContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import LanguageRuntime from './components/LanguageRuntime';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Marketplace from './pages/Marketplace';
import Weather from './pages/Weather';
import Advisory from './pages/Advisory';
import DiseaseDetection from './pages/DiseaseDetection';
import Community from './pages/Community';
import PostDetail from './pages/PostDetail';
import Experts from './pages/Experts';
import Schemes from './pages/Schemes';
import Dashboard from './pages/Dashboard';
import Premium from './pages/Premium';

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <LanguageRuntime />
        <PremiumProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/weather" element={<Weather />} />
                  <Route path="/advisory" element={<Advisory />} />
                  <Route path="/disease-detection" element={<DiseaseDetection />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/community/:id" element={<PostDetail />} />
                  <Route path="/experts" element={<Experts />} />
                  <Route path="/schemes" element={<Schemes />} />
                  <Route path="/premium" element={<Premium />} />
                  <Route
                    path="/dashboard"
                    element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </PremiumProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}