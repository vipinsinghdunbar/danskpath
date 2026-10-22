import { useState, useEffect } from 'react';
import { getAllCategories, getExercisesByCategory } from '../lib/grammarExercises';

export default function AdminPanel({ onClose }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [lessons, setLessons] = useState(() => {
    const saved = localStorage.getItem('dansk_admin_lessons');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentLesson, setCurrentLesson] = useState(null);
  const [newLesson, setNewLesson] = useState({
    title: '',
    category: 'ORD',
    description: '',
    difficulty: 'beginner',
    exercises: []
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(getAllCategories());
  }, []);

  const handleCreateLesson = () => {
    if (!newLesson.title) {
      alert('Please enter a lesson title');
      return;
    }

    const lesson = {
      id: Date.now(),
      ...newLesson,
      createdAt: new Date().toISOString(),
      exerciseCount: newLesson.exercises.length
    };

    const updated = [...lessons, lesson];
    setLessons(updated);
    localStorage.setItem('dansk_admin_lessons', JSON.stringify(updated));

    setNewLesson({
      title: '',
      category: 'ORD',
      description: '',
      difficulty: 'beginner',
      exercises: []
    });

    alert('✅ Lesson created: ' + lesson.title);
  };

  const handleAddExercises = (category) => {
    const categoryExercises = getExercisesByCategory(category);
    const updated = [...newLesson.exercises, ...categoryExercises];
    setNewLesson({ ...newLesson, exercises: updated });
  };

  const handleDeleteLesson = (id) => {
    if (confirm('Delete this lesson?')) {
      const updated = lessons.filter(l => l.id !== id);
      setLessons(updated);
      localStorage.setItem('dansk_admin_lessons', JSON.stringify(updated));
      setCurrentLesson(null);
      alert('Lesson deleted');
    }
  };

  const handleSetDifficulty = (exerciseId, newDifficulty) => {
    const updated = newLesson.exercises.map(ex =>
      ex.id === exerciseId ? { ...ex, difficulty: newDifficulty } : ex
    );
    setNewLesson({ ...newLesson, exercises: updated });
  };

  return (
    <div className="min-h-screen bg-[#e5f1ff] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">DanskPath Admin</h1>
            <p className="text-gray-600 mt-2">Create and manage Danish grammar lessons</p>
          </div>
          <button
            onClick={onClose}
            className="bg-white text-gray-700 px-6 py-2 rounded-lg shadow hover:shadow-md"
          >
            ← Back
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 bg-white p-2 rounded-lg shadow">
          {['dashboard', 'create', 'manage'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded font-semibold transition ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab === 'dashboard' && '📊 Dashboard'}
              {tab === 'create' && '➕ Create Lesson'}
              {tab === 'manage' && '⚙️ Manage'}
            </button>
          ))}
        </div>

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stats */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">📚 Total Lessons</h3>
              <p className="text-4xl font-bold text-blue-600">{lessons.length}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">📝 Grammar Categories</h3>
              <p className="text-4xl font-bold text-green-600">{categories.length}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">✅ Total Exercises</h3>
              <p className="text-4xl font-bold text-purple-600">
                {lessons.reduce((sum, l) => sum + (l.exerciseCount || 0), 0)}
              </p>
            </div>

            {/* Recent Lessons */}
            <div className="col-span-full bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Lessons</h3>
              {lessons.length === 0 ? (
                <p className="text-gray-500">No lessons created yet. Create one to get started!</p>
              ) : (
                <div className="space-y-3">
                  {lessons.slice(-5).reverse().map(lesson => (
                    <div key={lesson.id} className="p-4 bg-gray-50 rounded flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">{lesson.title}</p>
                        <p className="text-sm text-gray-600">{lesson.category} • {lesson.exerciseCount} exercises</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(lesson.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Grammar Categories Reference */}
            <div className="col-span-full bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">📖 Grammar Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categories.map(cat => (
                  <div key={cat.code} className="p-4 bg-gray-50 rounded">
                    <p className="font-semibold text-gray-900">{cat.code}</p>
                    <p className="text-sm text-gray-700">{cat.name}</p>
                    <p className="text-xs text-gray-500 mt-2">{cat.count} exercises</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CREATE TAB */}
        {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Form */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Lesson</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📚 Lesson Title
                  </label>
                  <input
                    type="text"
                    value={newLesson.title}
                    onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                    placeholder="e.g., V2 Word Order Basics"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🏷️ Grammar Category
                  </label>
                  <select
                    value={newLesson.category}
                    onChange={(e) => setNewLesson({ ...newLesson, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.code} value={cat.code}>
                        {cat.code} - {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📝 Description
                  </label>
                  <textarea
                    value={newLesson.description}
                    onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                    placeholder="What will students learn?"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📊 Difficulty
                  </label>
                  <select
                    value={newLesson.difficulty}
                    onChange={(e) => setNewLesson({ ...newLesson, difficulty: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="beginner">Beginner (A1-A2)</option>
                    <option value="intermediate">Intermediate (B1-B2)</option>
                    <option value="advanced">Advanced (C1-C2)</option>
                  </select>
                </div>

                <button
                  onClick={() => handleAddExercises(newLesson.category)}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
                >
                  ✅ Add All Exercises from {newLesson.category}
                </button>

                <button
                  onClick={handleCreateLesson}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 text-lg"
                >
                  🚀 Create Lesson
                </button>
              </div>
            </div>

            {/* Right: Preview */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Preview</h2>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Title:</p>
                  <p className="text-lg font-semibold text-gray-900">{newLesson.title || '(no title yet)'}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Category:</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {categories.find(c => c.code === newLesson.category)?.name || 'Select category'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Exercises:</p>
                  <p className="text-lg font-semibold text-gray-900">{newLesson.exercises.length}</p>
                </div>

                <div className="mt-6 max-h-96 overflow-y-auto border-t pt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Exercises in this lesson:</p>
                  {newLesson.exercises.length === 0 ? (
                    <p className="text-gray-500 text-sm">Click "Add All Exercises" to populate this lesson</p>
                  ) : (
                    <div className="space-y-2">
                      {newLesson.exercises.map((ex, idx) => (
                        <div key={ex.id} className="p-3 bg-gray-50 rounded">
                          <p className="text-sm font-semibold text-gray-800">{idx + 1}. {ex.question}</p>
                          <p className="text-xs text-gray-600 mt-1">Answer: {ex.correct}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MANAGE TAB */}
        {activeTab === 'manage' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Lessons</h2>

            {lessons.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 mb-4">No lessons yet</p>
                <button
                  onClick={() => setActiveTab('create')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Create Your First Lesson
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {lessons.map(lesson => (
                  <div
                    key={lesson.id}
                    className="p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer border-l-4 border-blue-500"
                    onClick={() => setCurrentLesson(lesson)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-lg font-semibold text-gray-900">{lesson.title}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {lesson.category} • {lesson.difficulty} • {lesson.exerciseCount} exercises
                        </p>
                        <p className="text-xs text-gray-500 mt-2">{lesson.description}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteLesson(lesson.id);
                        }}
                        className="text-red-600 hover:text-red-800 font-semibold px-4"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Lesson Details */}
            {currentLesson && (
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Lesson Details: {currentLesson.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="text-lg font-semibold text-gray-900">{currentLesson.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Difficulty</p>
                    <p className="text-lg font-semibold text-gray-900">{currentLesson.difficulty}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Exercises</p>
                    <p className="text-lg font-semibold text-gray-900">{currentLesson.exerciseCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Created</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(currentLesson.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 bg-gray-50 p-4 rounded">{currentLesson.description}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
