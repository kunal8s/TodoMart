import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api.config.js';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Form states
    const [newTodo, setNewTodo] = useState({ name: '', description: '' });
    const [editTodo, setEditTodo] = useState({ id: null, name: '', description: '' });
    const [todoToDelete, setTodoToDelete] = useState(null);

    // Bulk delete states
    const [isRemoveMode, setIsRemoveMode] = useState(false);
    const [selectedTodos, setSelectedTodos] = useState([]);

    // Dropdown menu states
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRef = useRef(null);

    // Error and loading states
    const [error, setError] = useState('');
    const [formError, setFormError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Profile modal states
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [profileData, setProfileData] = useState({ firstName: '', lastName: '', email: '' });
    const [profileError, setProfileError] = useState('');
    const [profileSuccess, setProfileSuccess] = useState('');

    // Get user from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setProfileData({
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                email: userData.email || '',
            });
        } else {
            navigate('/signin');
        }
    }, [navigate]);

    // Fetch todos on mount
    useEffect(() => {
        fetchTodos();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getAuthHeaders = () => {
        const token = localStorage.getItem('authToken');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
    };

    const fetchTodos = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(API_ENDPOINTS.TODOS, {
                method: 'GET',
                headers: getAuthHeaders(),
                credentials: 'include',
            });

            if (response.status === 401) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                navigate('/signin');
                return;
            }

            const data = await response.json();
            if (data.success) {
                setTodos(data.todos || []);
            } else {
                setError(data.message || 'Failed to fetch todos');
            }
        } catch (err) {
            console.error('Fetch todos error:', err);
            setError('Failed to load todos. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddTodo = async (e) => {
        e.preventDefault();
        setFormError('');

        if (!newTodo.name.trim()) {
            setFormError('Todo name is required');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(API_ENDPOINTS.TODOS, {
                method: 'POST',
                headers: getAuthHeaders(),
                credentials: 'include',
                body: JSON.stringify({
                    name: newTodo.name.trim(),
                    description: newTodo.description.trim(),
                }),
            });

            const data = await response.json();
            if (data.success) {
                setTodos([data.todo, ...todos]);
                setNewTodo({ name: '', description: '' });
                setShowAddModal(false);
            } else {
                setFormError(data.message || 'Failed to create todo');
            }
        } catch (err) {
            console.error('Add todo error:', err);
            setFormError('Failed to create todo. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateTodo = async (e) => {
        e.preventDefault();
        setFormError('');

        if (!editTodo.name.trim()) {
            setFormError('Todo name is required');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(API_ENDPOINTS.TODO_BY_ID(editTodo.id), {
                method: 'PUT',
                headers: getAuthHeaders(),
                credentials: 'include',
                body: JSON.stringify({
                    name: editTodo.name.trim(),
                    description: editTodo.description.trim(),
                }),
            });

            const data = await response.json();
            if (data.success) {
                setTodos(todos.map(t => t.id === editTodo.id ? data.todo : t));
                setEditTodo({ id: null, name: '', description: '' });
                setShowEditModal(false);
            } else {
                setFormError(data.message || 'Failed to update todo');
            }
        } catch (err) {
            console.error('Update todo error:', err);
            setFormError('Failed to update todo. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteSingle = async () => {
        if (!todoToDelete) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(API_ENDPOINTS.TODO_BY_ID(todoToDelete), {
                method: 'DELETE',
                headers: getAuthHeaders(),
                credentials: 'include',
            });

            const data = await response.json();
            if (data.success) {
                setTodos(todos.filter(t => t.id !== todoToDelete));
                setTodoToDelete(null);
                setShowDeleteConfirm(false);
                setActiveDropdown(null);
            } else {
                setError(data.message || 'Failed to delete todo');
            }
        } catch (err) {
            console.error('Delete todo error:', err);
            setError('Failed to delete todo. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBulkDelete = async () => {
        if (selectedTodos.length === 0) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(API_ENDPOINTS.TODOS_BULK_DELETE, {
                method: 'POST',
                headers: getAuthHeaders(),
                credentials: 'include',
                body: JSON.stringify({ todoIds: selectedTodos }),
            });

            const data = await response.json();
            if (data.success) {
                setTodos(todos.filter(t => !selectedTodos.includes(t.id)));
                setSelectedTodos([]);
                setIsRemoveMode(false);
            } else {
                setError(data.message || 'Failed to delete todos');
            }
        } catch (err) {
            console.error('Bulk delete error:', err);
            setError('Failed to delete todos. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch(API_ENDPOINTS.LOGOUT, {
                method: 'POST',
                headers: getAuthHeaders(),
                credentials: 'include',
            });
        } catch (err) {
            console.error('Logout error:', err);
        }

        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/signin');
    };

    const openEditModal = (todo) => {
        setEditTodo({ id: todo.id, name: todo.name, description: todo.description || '' });
        setShowEditModal(true);
        setActiveDropdown(null);
    };

    const openDeleteConfirm = (todoId) => {
        setTodoToDelete(todoId);
        setShowDeleteConfirm(true);
        setActiveDropdown(null);
    };

    const toggleTodoSelection = (todoId) => {
        setSelectedTodos(prev =>
            prev.includes(todoId)
                ? prev.filter(id => id !== todoId)
                : [...prev, todoId]
        );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    // Handle profile update
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setProfileError('');
        setProfileSuccess('');

        if (!profileData.firstName.trim() || !profileData.lastName.trim()) {
            setProfileError('First name and last name are required');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(API_ENDPOINTS.USER_PROFILE, {
                method: 'PUT',
                headers: getAuthHeaders(),
                credentials: 'include',
                body: JSON.stringify({
                    firstName: profileData.firstName.trim(),
                    lastName: profileData.lastName.trim(),
                    email: profileData.email.trim(),
                }),
            });

            const data = await response.json();
            if (data.success) {
                // Update local storage and state
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                setProfileSuccess('Profile updated successfully!');
                setTimeout(() => {
                    setShowProfileModal(false);
                    setProfileSuccess('');
                }, 1500);
            } else {
                setProfileError(data.message || 'Failed to update profile');
            }
        } catch (err) {
            console.error('Profile update error:', err);
            setProfileError('Failed to update profile. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const openProfileModal = () => {
        setProfileData({
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
        });
        setProfileError('');
        setProfileSuccess('');
        setShowProfileModal(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute top-1/4 -left-40 w-80 h-80 bg-gradient-to-r from-blue-300 to-teal-300 rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute bottom-40 right-1/4 w-60 h-60 bg-gradient-to-r from-green-300 to-blue-300 rounded-full opacity-10 blur-3xl"></div>
            </div>

            {/* Navigation */}
            <nav className="relative z-10 border-b border-gray-200 bg-white/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <span className="text-3xl transition-transform duration-300 group-hover:scale-110">🛒</span>
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                                    TodoMART
                                </h1>
                                <span className="text-xs text-gray-500 font-medium tracking-wide">
                                    Smart Shopping Made Simple
                                </span>
                            </div>
                        </Link>

                        <div className="flex items-center space-x-4">
                            {user && (
                                <div className="hidden sm:flex items-center space-x-2 text-gray-600">
                                    <span className="text-sm">Welcome,</span>
                                    <span className="font-semibold text-gray-900">{user.firstName}</span>
                                </div>
                            )}
                            <button
                                onClick={openProfileModal}
                                className="cursor-pointer flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="hidden sm:inline font-medium">Profile</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="cursor-pointer flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className="hidden sm:inline font-medium">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">My Shopping List</h2>
                    <p className="text-gray-600">Manage your todos and keep track of what you need</p>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
                        <div className="flex items-center text-red-600">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                        <button onClick={() => setError('')} className="text-red-400 hover:text-red-600">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="cursor-pointer flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Add Item</span>
                    </button>

                    {!isRemoveMode ? (
                        <button
                            onClick={() => setIsRemoveMode(true)}
                            disabled={todos.length === 0}
                            className="cursor-pointer flex items-center space-x-2 px-6 py-3 border-2 border-red-300 text-red-600 font-semibold rounded-xl hover:bg-red-50 hover:border-red-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span>Remove Items</span>
                        </button>
                    ) : (
                        <div className="flex gap-3">
                            <button
                                onClick={handleBulkDelete}
                                disabled={selectedTodos.length === 0 || isSubmitting}
                                className="cursor-pointer flex items-center space-x-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Confirm Delete ({selectedTodos.length})</span>
                            </button>
                            <button
                                onClick={() => {
                                    setIsRemoveMode(false);
                                    setSelectedTodos([]);
                                }}
                                className="cursor-pointer flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
                            >
                                <span>Cancel</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Todo Cards Grid */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
                    </div>
                ) : todos.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No todos yet</h3>
                        <p className="text-gray-500 mb-6">Start by adding your first item to the shopping list</p>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="cursor-pointer inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-600 transition-all duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Add Your First Item</span>
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {todos.map((todo) => (
                            <div
                                key={todo.id}
                                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-200 hover:shadow-xl ${isRemoveMode && selectedTodos.includes(todo.id)
                                    ? 'border-red-400 bg-red-50'
                                    : 'border-gray-100 hover:border-purple-200'
                                    }`}
                            >
                                {/* Selection checkbox for remove mode */}
                                {isRemoveMode && (
                                    <div className="absolute top-4 left-4 z-10">
                                        <input
                                            type="checkbox"
                                            checked={selectedTodos.includes(todo.id)}
                                            onChange={() => toggleTodoSelection(todo.id)}
                                            className="cursor-pointer w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                        />
                                    </div>
                                )}

                                {/* Options dropdown */}
                                {!isRemoveMode && (
                                    <div className="absolute top-4 right-4" ref={activeDropdown === todo.id ? dropdownRef : null}>
                                        <button
                                            onClick={() => setActiveDropdown(activeDropdown === todo.id ? null : todo.id)}
                                            className="cursor-pointer p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                            </svg>
                                        </button>

                                        {/* Dropdown menu */}
                                        {activeDropdown === todo.id && (
                                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
                                                <button
                                                    onClick={() => openEditModal(todo)}
                                                    className="cursor-pointer w-full px-4 py-2 text-left text-gray-700 hover:bg-purple-50 hover:text-purple-600 flex items-center space-x-2 transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    <span>Update</span>
                                                </button>
                                                <button
                                                    onClick={() => openDeleteConfirm(todo.id)}
                                                    className="cursor-pointer w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Card content */}
                                <div className={`p-6 ${isRemoveMode ? 'pl-12' : ''}`} onClick={isRemoveMode ? () => toggleTodoSelection(todo.id) : undefined}>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 pr-8 line-clamp-2">{todo.name}</h3>
                                    {todo.description && (
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{todo.description}</p>
                                    )}
                                    <div className="flex items-center text-xs text-gray-400">
                                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {formatDate(todo.createdAt)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Add Todo Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Add New Item</h3>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setNewTodo({ name: '', description: '' });
                                    setFormError('');
                                }}
                                className="cursor-pointer p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        {formError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                                {formError}
                            </div>
                        )}

                        <form onSubmit={handleAddTodo} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Item Name *</label>
                                <input
                                    type="text"
                                    value={newTodo.name}
                                    onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="Enter item name"
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description (optional)</label>
                                <textarea
                                    value={newTodo.description}
                                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                                    placeholder="Add a description"
                                    rows={3}
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setNewTodo({ name: '', description: '' });
                                        setFormError('');
                                    }}
                                    className="cursor-pointer flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="cursor-pointer flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-600 transition-all disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Adding...' : 'Add Item'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Todo Modal */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Update Item</h3>
                            <button
                                onClick={() => {
                                    setShowEditModal(false);
                                    setEditTodo({ id: null, name: '', description: '' });
                                    setFormError('');
                                }}
                                className="cursor-pointer p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        {formError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                                {formError}
                            </div>
                        )}

                        <form onSubmit={handleUpdateTodo} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Item Name *</label>
                                <input
                                    type="text"
                                    value={editTodo.name}
                                    onChange={(e) => setEditTodo({ ...editTodo, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="Enter item name"
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description (optional)</label>
                                <textarea
                                    value={editTodo.description}
                                    onChange={(e) => setEditTodo({ ...editTodo, description: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                                    placeholder="Add a description"
                                    rows={3}
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setEditTodo({ id: null, name: '', description: '' });
                                        setFormError('');
                                    }}
                                    className="cursor-pointer flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="cursor-pointer flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-600 transition-all disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Item?</h3>
                            <p className="text-gray-600 mb-6">This action cannot be undone. Are you sure you want to delete this item?</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setShowDeleteConfirm(false);
                                        setTodoToDelete(null);
                                    }}
                                    className="cursor-pointer flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteSingle}
                                    disabled={isSubmitting}
                                    className="cursor-pointer flex-1 px-4 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Profile Update Modal */}
            {showProfileModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Update Profile</h3>
                            <button
                                onClick={() => {
                                    setShowProfileModal(false);
                                    setProfileError('');
                                    setProfileSuccess('');
                                }}
                                className="cursor-pointer p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        {profileError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                                {profileError}
                            </div>
                        )}

                        {profileSuccess && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600">
                                {profileSuccess}
                            </div>
                        )}

                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                <input
                                    type="text"
                                    value={profileData.firstName}
                                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="Enter first name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                <input
                                    type="text"
                                    value={profileData.lastName}
                                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="Enter last name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowProfileModal(false);
                                        setProfileError('');
                                        setProfileSuccess('');
                                    }}
                                    className="cursor-pointer flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="cursor-pointer flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-600 transition-all disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Saving...' : 'Save Profile'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
