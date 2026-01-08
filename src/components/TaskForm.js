import React, { useState, useEffect } from 'react';
import taskService from '../services/taskService';
import './TaskForm.css';

function TaskForm({ task, onSuccess, onCancel }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        due_date: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                status: task.status || 'pending',
                priority: task.priority || 'medium',
                due_date: task.due_date ? task.due_date.split('T')[0] : '',
            });
        }
    }, [task]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (task) {
                await taskService.updateTask(task.id, formData);
            } else {
                await taskService.createTask(formData);
            }
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || 'Алдаа гарлаа');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="task-form-container">
            <h3>{task ? 'Task Засах' : 'Шинэ Task Үүсгэх'}</h3>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="task-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>Task Нэр *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Task-ийн нэрийг оруулна уу"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Тайлбар</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Task-ийн дэлгэрэнгүй тайлбар"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Статус</label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Чухал байдал</label>
                        <select name="priority" value={formData.priority} onChange={handleChange}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Дуусах огноо</label>
                        <input
                            type="date"
                            name="due_date"
                            value={formData.due_date}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" onClick={onCancel} className="btn-cancel">
                        Цуцлах
                    </button>
                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? 'Уншиж байна...' : task ? 'Шинэчлэх' : 'Үүсгэх'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TaskForm;