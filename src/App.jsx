import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home1 from './pages/Home1';
import Dashboard1 from './pages/Dashboard1';
import Assignments1 from './pages/Assignments1';
import Tasks1 from './pages/Tasks1';
import Tools1 from './pages/Tools1';
import PointsRewards1 from './pages/PointsRewards1';
import PersonalInfo1 from './pages/PersonalInfo1';
import Community1 from './pages/Community1';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home1 />} />
          <Route path="/dashboard1" element={<Dashboard1 />} />
          <Route path="/assignments1" element={<Assignments1 />} />
          <Route path="/tasks1" element={<Tasks1 />} />
          <Route path="/tools1" element={<Tools1 />} />
          <Route path="/points-rewards1" element={<PointsRewards1 />} />
          <Route path="/community1" element={<Community1 />} />
          <Route path="/profile1" element={<PersonalInfo1 />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;