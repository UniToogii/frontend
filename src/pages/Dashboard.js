import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import taskService from '../services/taskService';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskStats from '../components/TaskStats';
import './Dashboard.css';

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filter, setFilter] = useState('');
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    useEffect(() => {
        loadTasks();
        loadStats();
    }, [filter]);

    const loadTasks = async () => {
        try {
            const data = await taskService.getAllTasks(filter);
            setTasks(data.tasks);
        } catch (error) {
            console.error('Tasks авах алдаа:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadStats = async () => {
        try {
            const data = await taskService.getStats();
            setStats(data.stats);
        } catch (error) {
            console.error('Stats авах алдаа:', error);
        }
    };

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    const handleTaskCreated = () => {
        setShowForm(false);
        setEditingTask(null);
        loadTasks();
        loadStats();
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Энэ task-ийг устгах уу?')) {
            try {
                await taskService.deleteTask(id);
                loadTasks();
                loadStats();
            } catch (error) {
                alert('Устгах үед алдаа гарлаа');
            }
        }
    };

    if (loading) {
        return <div className="loading">Уншиж байна...</div>;
    }

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="header-content">
                    <h1>Task Manager</h1>
                    <div className="header-right">
                        <span className="user-info">Сайн байна уу, {user?.username}!</span>
                        <button onClick={handleLogout} className="btn-logout">
                            Гарах
                        </button>
                    </div>
                </div>
            </header>

            <div className="dashboard-content">
                {stats && <TaskStats stats={stats} />}

                <div className="tasks-section">
                    <div className="tasks-header">
                        <h2>Миний Tasks</h2>
                        <div className="tasks-actions">
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="filter-select"
                            >
                                <option value="">Бүгд</option>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            <button
                                onClick={() => {
                                    setEditingTask(null);
                                    setShowForm(!showForm);
                                }}
                                className="btn-add"
                            >
                                {showForm ? 'Хаах' : '+ Шинэ Task'}
                            </button>
                        </div>
                    </div>

                    {showForm && (
                        <TaskForm
                            task={editingTask}
                            onSuccess={handleTaskCreated}
                            onCancel={() => {
                                setShowForm(false);
                                setEditingTask(null);
                            }}
                        />
                    )}

                    <TaskList
                        tasks={tasks}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;