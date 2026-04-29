/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { NewRequest } from './pages/NewRequest';
import { RequestDetail } from './pages/RequestDetail';
import { Settings } from './pages/Settings';
import { AnimatePresence } from 'motion/react';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50 font-sans selection:bg-brand/10 selection:text-brand">
        {/* Sidebar - Fixed on desktop, hidden on mobile */}
        <Sidebar />
        
        {/* Main Layout */}
        <div className="flex-1 md:ml-64 flex flex-col min-h-screen relative overflow-x-hidden">
          <Header />
          
          <main className="flex-1 flex flex-col relative w-full">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/new" element={<NewRequest />} />
                <Route path="/requests/:id" element={<RequestDetail />} />
                <Route path="/settings" element={<Settings />} />
                {/* Fallback routes */}
                <Route path="/my-requests" element={<Dashboard />} />
                <Route path="/approvals" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </main>

          {/* Footer - Optional branding or status */}
          <footer className="p-6 text-center border-t border-gray-100 bg-white">
            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em]">
              BRASIMBA Digital Ecosystem © 2026 • Powered by SAP Integration
            </p>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
