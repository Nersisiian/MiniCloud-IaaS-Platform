import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import VmList from './pages/VmList';
import VmCreate from './pages/VmCreate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/vms" element={<VmList />} />
        <Route path="/vms/create" element={<VmCreate />} />
        <Route path="/" element={<Navigate to="/vms" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
