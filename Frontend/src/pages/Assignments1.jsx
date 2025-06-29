import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, Clock, AlertCircle, FileText, Calendar, User } from 'lucide-react';

const Assignments1 = () => {
  const [selectedTab, setSelectedTab] = useState('pending');
  const fileInputRef = useRef(null); // NEW
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null); // NEW
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [feedbackView, setFeedbackView] = useState({}); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    subject: '',
    dueDate: '',
    points: '',
    difficulty: 'Medium',
    assignedBy: '',
    description: ''
  });

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

    setIsSubmitting(true); // Start loading

    const formData = new FormData();
    formData.append('image', previewImage.file);
    formData.append('assignmentId', selectedAssignmentId);

    try {
      const response = await fetch('https://snappystreak-backend.onrender.com/analyze-homework', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.error) {
        alert('Error: ' + data.error);
      } else {
        // ✅ Destructure the response properly
        const { subject, estimatedGrade, feedback } = data;

        const completedAssignment = {
          ...pendingAssignments.find(a => a.id === selectedAssignmentId),
          grade: estimatedGrade,
          subject,
          submittedDate: new Date().toISOString(),
          feedbackFull: feedback.fullSolutions || [],
          feedbackHints: feedback.answersWithHints || [],
          feedbackAnswers: feedback.answersOnly || [],
        };

        // Then push into state array:
        setCompletedAssignments(prev => [...prev, completedAssignment]);

        // Also remove from pending
        setPendingAssignments(prev => prev.filter(a => a.id !== selectedAssignmentId));
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload. Please try again.');
    } finally {
      // Clean up
      setIsSubmitting(false); // End loading
      //setPreviewImage(null);
      //setIsPreviewOpen(false);
      setShowThankYou(true); // Show Thank You message
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

  const [completedAssignments, setCompletedAssignments] = useState(assignments.completed);
  const [pendingAssignments, setPendingAssignments] = useState(assignments.pending);

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
    { id: 'pending', label: 'Pending', icon: Clock, count: pendingAssignments.length },
    { id: 'completed', label: 'Completed', icon: CheckCircle, count: completedAssignments.length },
    { id: 'overdue', label: 'Overdue', icon: AlertCircle, count: assignments.overdue.length }
  ];


  return (
    
    
    <div className="space-y-8 animate-fade-in">
      
      {isAddModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg space-y-4">
          <h2 className="text-lg font-bold text-gray-800">Add New Assignment</h2>

          <input
            type="text"
            placeholder="Title"
            className="w-full border rounded-xl px-3 py-2"
            value={newAssignment.title}
            onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Subject"
            className="w-full border rounded-xl px-3 py-2"
            value={newAssignment.subject}
            onChange={(e) => setNewAssignment({ ...newAssignment, subject: e.target.value })}
          />
          <input
            type="date"
            className="w-full border rounded-xl px-3 py-2"
            value={newAssignment.dueDate}
            onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
          />
          <input
            type="number"
            placeholder="Points"
            className="w-full border rounded-xl px-3 py-2"
            value={newAssignment.points}
            onChange={(e) => setNewAssignment({ ...newAssignment, points: e.target.value })}
          />
          <select
            className="w-full border rounded-xl px-3 py-2"
            value={newAssignment.difficulty}
            onChange={(e) => setNewAssignment({ ...newAssignment, difficulty: e.target.value })}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <input
            type="text"
            placeholder="Assigned By"
            className="w-full border rounded-xl px-3 py-2"
            value={newAssignment.assignedBy}
            onChange={(e) => setNewAssignment({ ...newAssignment, assignedBy: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="w-full border rounded-xl px-3 py-2"
            value={newAssignment.description}
            onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
          ></textarea>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const newId = Date.now(); // Simple unique ID
                setPendingAssignments(prev => [
                  ...prev,
                  { ...newAssignment, id: newId }
                ]);
                setIsAddModalOpen(false);
                setNewAssignment({
                  title: '',
                  subject: '',
                  dueDate: '',
                  points: '',
                  difficulty: 'Medium',
                  assignedBy: '',
                  description: ''
                });
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              Add Assignment
            </button>
          </div>
        </div>
      </div>
    )}

      {/* Popup: Preview OR Thank You */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg">
            {!showThankYou ? (
              <>
                <h2 className="text-lg font-bold text-gray-800 mb-4">📷 Preview Submission</h2>
                <img src={previewImage.url} alt="Preview" className="w-full rounded-lg mb-4 border" />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setIsPreviewOpen(false);
                      setPreviewImage(null);
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleConfirmSubmit}
                    disabled={isSubmitting}
                    className={`px-4 py-2 rounded-xl flex items-center justify-center space-x-2 ${
                      isSubmitting
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit</span>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-center text-green-700 mb-4">✅ Thank you for submitting!</h2>
                <p className="text-center text-gray-700 mb-6">Your assignment has been received and reviewed.</p>
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      setIsPreviewOpen(false);
                      setShowThankYou(false);
                      setPreviewImage(null);
                    }}
                    className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
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
            <p className="text-2xl font-bold text-gray-900">
              {pendingAssignments.length + completedAssignments.length + assignments.overdue.length}
            </p>
            <p className="text-sm text-gray-600">Total Assignments</p>
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl w-fit mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {completedAssignments.length}
            </p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl w-fit mx-auto mb-3">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {pendingAssignments.length}
            </p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl w-fit mx-auto mb-3">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {assignments.overdue.length}
            </p>
            <p className="text-sm text-gray-600">Overdue</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          ➕ Add
        </button>
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
            {pendingAssignments.map((assignment) => (
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
            {completedAssignments.map((assignment) => {
              const view = feedbackView[assignment.id];
              let displayContent = '';

              if (view === 'answers') displayContent = assignment.feedbackAnswers?.join('\n') || 'No answers provided.';
              else if (view === 'hints') displayContent = assignment.feedbackHints?.join('\n') || 'No hints available.';
              else if (view === 'full') displayContent = assignment.feedbackFull?.join('\n') || 'No full solution provided.';

              return (
                <div key={assignment.id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(assignment.grade)}`}>
                      {assignment.grade}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-3">Subject: {assignment.subject}</p>
                  <p className="text-gray-600 mb-2">Assigned by: {assignment.assignedBy}</p>

                  {/* Feedback Toggle Buttons */}
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => setFeedbackView(prev => ({ ...prev, [assignment.id]: 'answers' }))}
                      className={`px-3 py-1 rounded ${view === 'answers' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      Answers Only
                    </button>
                    <button
                      onClick={() => setFeedbackView(prev => ({ ...prev, [assignment.id]: 'hints' }))}
                      className={`px-3 py-1 rounded ${view === 'hints' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      With Hints
                    </button>
                    <button
                      onClick={() => setFeedbackView(prev => ({ ...prev, [assignment.id]: 'full' }))}
                      className={`px-3 py-1 rounded ${view === 'full' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      Full Solutions
                    </button>
                  </div>

                  {view && (
                    <pre className="mt-4 bg-gray-50 p-4 rounded text-sm whitespace-pre-wrap border">
                      {displayContent}
                    </pre>
                  )}

                  <div className="text-sm text-gray-500 mt-4 flex items-center space-x-4">
                    <Calendar className="w-4 h-4" />
                    <span>Submitted: {new Date(assignment.submittedDate).toLocaleDateString()}</span>
                    <User className="w-4 h-4" />
                    <span>{assignment.points} pts earned</span>
                  </div>
                </div>
              );
            })}
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