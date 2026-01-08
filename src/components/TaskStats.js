import React from 'react';
import './TaskStats.css';

function TaskStats({ stats }) {
    return (
        <div className="stats-container">
            <div className="stat-card">
                <div className="stat-icon total">📊</div>
                <div className="stat-content">
                    <h3>{stats.total}</h3>
                    <p>Нийт Tasks</p>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-icon pending">⏳</div>
                <div className="stat-content">
                    <h3>{stats.pending}</h3>
                    <p>Pending</p>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-icon progress">🔄</div>
                <div className="stat-content">
                    <h3>{stats.in_progress}</h3>
                    <p>In Progress</p>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-icon completed">✅</div>
                <div className="stat-content">
                    <h3>{stats.completed}</h3>
                    <p>Completed</p>
                </div>
            </div>
        </div>
    );
}

export default TaskStats;