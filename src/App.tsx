import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Assignments from './pages/Assignments';
import Tasks from './pages/Tasks';
import Tools from './pages/Tools';
import PointsRewards from './pages/PointsRewards';
import Community from './pages/Community';
import PersonalInfo from './pages/PersonalInfo';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/points-rewards" element={<PointsRewards />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<PersonalInfo />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;