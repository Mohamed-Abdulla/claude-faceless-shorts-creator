import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Gallery } from './pages/Gallery';
import { Watch } from './pages/Watch';
import { PromptStudio } from './pages/PromptStudio';

export const App: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRefreshKey((prev) => prev + 1);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#090c10] text-slate-100 selection:bg-emerald-500 selection:text-white">
        <Navbar onRefresh={handleRefresh} isRefreshing={isRefreshing} />
        <main className="flex-1" key={refreshKey}>
          <Routes>
            <Route path="/" element={<Gallery />} />
            <Route path="/watch/:projectId" element={<Watch />} />
            <Route path="/prompts" element={<PromptStudio />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
