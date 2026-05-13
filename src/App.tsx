import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLayout from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import RoomManagement from './pages/admin/RoomManagement';
import VideoUpload from './pages/admin/VideoUpload';
import StorageSettings from './pages/admin/StorageSettings';
import GeneralSettings from './pages/admin/GeneralSettings';

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Home />} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="rooms" element={<RoomManagement />} />
        <Route path="videos" element={<VideoUpload />} />
        <Route path="settings" element={<StorageSettings />} />
        <Route path="general" element={<GeneralSettings />} />
      </Route>
    </Routes>
  );
}

export default App;