import React from 'react';
import './TaskList.css';

function TaskList({ tasks, onEdit, onDelete }) {
    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <p>📋 Одоогоор tasks алга байна</p>
                <p className="empty-subtitle">Шинэ task үүсгэж эхлээрэй!</p>
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('mn-MN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { label: 'Pending', class: 'status-pending' },
            in_progress: { label: 'In Progress', class: 'status-progress' },
            completed: { label: 'Completed', class: 'status-completed' },
        };
        const config = statusConfig[status] || statusConfig.pending;
        return <span className={`status-badge ${config.class}`}>{config.label}</span>;
    };

    const getPriorityBadge = (priority) => {
        const priorityConfig = {
            low: { label: 'Low', class: 'priority-low' },
            medium: { label: 'Medium', class: 'priority-medium' },
            high: { label: 'High', class: 'priority-high' },
        };
        const config = priorityConfig[priority] || priorityConfig.medium;
        return <span className={`priority-badge ${config.class}`}>{config.label}</span>;
    };

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <div key={task.id} className="task-card">
                    <div className="task-header">
                        <h3 className="task-title">{task.title}</h3>
                        <div className="task-badges">
                            {getStatusBadge(task.status)}
                            {getPriorityBadge(task.priority)}
                        </div>
                    </div>

                    {task.description && (
                        <p className="task-description">{task.description}</p>
                    )}

                    <div className="task-footer">
                        <div className="task-date">
                            <span className="date-label">Дуусах огноо:</span>
                            <span className="date-value">{formatDate(task.due_date)}</span>
                        </div>

                        <div className="task-actions">
                            <button
                                onClick={() => onEdit(task)}
                                className="btn-edit"
                                title="Засах"
                            >
                                ✏️ Засах
                            </button>
                            <button
                                onClick={() => onDelete(task.id)}
                                className="btn-delete"
                                title="Устгах"
                            >
                                🗑️ Устгах
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TaskList;