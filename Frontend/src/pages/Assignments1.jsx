import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, Clock, AlertCircle, FileText, Calendar, User } from 'lucide-react';

const Assignments1 = () => {
  const [selectedTab, setSelectedTab] = useState('pending');
  const fileInputRef = useRef(null); // NEW
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null); // NEW
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleUploadClick = (assignmentId) => {
    setSelectedAssignmentId(assignmentId);
    fileInputRef.current.click(); // Open file picker
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file || !selectedAssignmentId) return;

    const imageUrl = URL.createObjectURL(file); // Creates local preview URL
    setPreviewImage({ file, url: imageUrl });
    setIsPreviewOpen(true);
  };

  const handleConfirmSubmit = async () => {
    if (!previewImage || !selectedAssignmentId) return;

    const formData = new FormData();
    formData.append('image', previewImage.file);
    formData.append('assignmentId', selectedAssignmentId);

    try {
      const response = await fetch('http://localhost:3001/analyze-homework', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.error) {
        alert('Error: ' + data.error);
      } else {
        alert(
          `📘 Subject: ${subject}\n` +
          `📊 Estimated Grade: ${estimatedGrade}\n\n` +
          `🧠 Topics Breakdown:\n${topicsBreakdown}\n\n` +
          `⚠️ Focus Areas:\n- ${focusAreas.join('\n- ')}\n\n` +
          `✅ Answers Only:\n${answersOnly}\n\n` +
          `💡 Answers with Hints:\n${answersWithHints}\n\n` +
          `🧾 Full Solutions:\n${fullSolutions}`
        );
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload. Please try again.');
    } finally {
      // Clean up
      setPreviewImage(null);
      setIsPreviewOpen(false);
      fileInputRef.current.value = null; // reset file input
    }
  };

  const assignments = {
    pending: [
      {
        id: 1,
        title: 'Algebra Problem Set #6',
        subject: 'Mathematics',
        dueDate: '2024-01-15',
        points: 50,
        difficulty: 'Medium',
        assignedBy: 'Ms. Johnson',
        description: 'Complete exercises 1-20 from Chapter 5'
      },
      {
        id: 2,
        title: 'Science Lab Report',
        subject: 'Physics',
        dueDate: '2024-01-18',
        points: 75,
        difficulty: 'Hard',
        assignedBy: 'Mr. Davis',
        description: 'Write a detailed report on the pendulum experiment'
      },
      {
        id: 3,
        title: 'Essay: Climate Change',
        subject: 'English',
        dueDate: '2024-01-20',
        points: 60,
        difficulty: 'Medium',
        assignedBy: 'Mrs. Smith',
        description: '500-word essay on climate change impacts'
      }
    ],
    completed: [
      {
        id: 4,
        title: 'History Timeline Project',
        subject: 'History',
        submittedDate: '2024-01-10',
        points: 85,
        grade: 'A',
        assignedBy: 'Mr. Wilson',
        feedback: 'Excellent work! Very comprehensive timeline.'
      },
      {
        id: 5,
        title: 'Geometry Worksheets',
        subject: 'Mathematics',
        submittedDate: '2024-01-08',
        points: 45,
        grade: 'B+',
        assignedBy: 'Ms. Johnson',
        feedback: 'Good understanding, minor calculation errors.'
      }
    ],
    overdue: [
      {
        id: 6,
        title: 'Book Review: 1984',
        subject: 'English',
        dueDate: '2024-01-05',
        points: 40,
        daysPastDue: 5,
        assignedBy: 'Mrs. Smith',
        description: 'Write a critical analysis of George Orwell\'s 1984'
      }
    ]
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return 'text-green-600 bg-green-100';
    if (grade.includes('B')) return 'text-blue-600 bg-blue-100';
    if (grade.includes('C')) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const tabs = [
    { id: 'pending', label: 'Pending', icon: Clock, count: assignments.pending.length },
    { id: 'completed', label: 'Completed', icon: CheckCircle, count: assignments.completed.length },
    { id: 'overdue', label: 'Overdue', icon: AlertCircle, count: assignments.overdue.length }
  ];


  return (
    
    
    <div className="space-y-8 animate-fade-in">
      
      {/* Preview popup before confirm submit*/}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg">
            <h2 className="text-lg font-bold text-gray-800 mb-4">📷 Preview Submission</h2>
            <img src={previewImage.url} alt="Preview" className="w-full rounded-lg mb-4 border" />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300"
              >
                Close
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input for uploading images WHAT DOES THIS DO?*/}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Assignments</h1>
        <p className="text-xl text-gray-600">Submit and track your academic work</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl w-fit mx-auto mb-3">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">8</p>
            <p className="text-sm text-gray-600">Total Assignments</p>
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl w-fit mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">5</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl w-fit mx-auto mb-3">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl w-fit mx-auto mb-3">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">1</p>
            <p className="text-sm text-gray-600">Overdue</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 bg-white/50 backdrop-blur-sm p-2 rounded-2xl border border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 flex-1 justify-center ${
              selectedTab === tab.id
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-white/70'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="font-medium">{tab.label}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              selectedTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Assignment Lists */}
      <div className="space-y-6">
        {selectedTab === 'pending' && (
          <div className="space-y-4">
            {assignments.pending.map((assignment) => (
              <div key={assignment.id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(assignment.difficulty)}`}>
                        {assignment.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{assignment.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>By: {assignment.assignedBy}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-primary-600">{assignment.points} points</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button onClick={() => handleUploadClick(assignment.id)} className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:shadow-lg transition-all duration-300">
                      <Upload className="w-4 h-4" />
                      <span>Submit</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'completed' && (
          <div className="space-y-4">
            {assignments.completed.map((assignment) => (
              <div key={assignment.id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(assignment.grade)}`}>
                        {assignment.grade}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{assignment.feedback}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Submitted: {new Date(assignment.submittedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>By: {assignment.assignedBy}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-green-600">{assignment.points} points earned</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'overdue' && (
          <div className="space-y-4">
            {assignments.overdue.map((assignment) => (
              <div key={assignment.id} className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                      <span className="px-3 py-1 rounded-full text-sm font-medium text-red-600 bg-red-100">
                        {assignment.daysPastDue} days overdue
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{assignment.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Was due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>By: {assignment.assignedBy}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-red-600">{assignment.points} points at risk</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Submit Late</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignments1;