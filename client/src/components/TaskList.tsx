import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api";
import "../styles/global.css"; 

interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const handleAddTask = async () => {
    if (!title.trim()) return;
    try {
      await createTask(title, description);
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      const updatedTask = { ...task, isComplete: !task.isComplete };

      // Update UI immediately
      setTasks((prevTasks) => prevTasks.map(t => (t.id === task.id ? updatedTask : t)));

      // Send API request
      await updateTask(task.id, { isComplete: !task.isComplete });

    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setEditedTitle(task.title);
    setEditedDescription(task.description || "");
  };

  const handleSaveEdit = async (id: number) => {
    try {
      await updateTask(id, { title: editedTitle, description: editedDescription });
      setEditingTaskId(null);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedTitle("");
    setEditedDescription("");
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);

      // Update UI immediately
      setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));

    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div className="task-container">
      <h2>Tasks</h2>
      <div className="task-input">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button onClick={handleAddTask}>➕ Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-card ${task.isComplete ? "completed" : ""}`}>
            <input type="checkbox" checked={task.isComplete} onChange={() => handleToggleComplete(task)} />
            
            {editingTaskId === task.id ? (
              <div className="editing">
                <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                <input type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
                <button onClick={() => handleSaveEdit(task.id)}>💾 Save</button>
                <button onClick={handleCancelEdit}>❌ Cancel</button>
              </div>
            ) : (
              <div className="task-details">
                <strong>{task.title}</strong>
                <p>{task.description}</p>
              </div>
            )}

            <div className="task-actions">
              {editingTaskId !== task.id && (
                <>
                  <button className="edit-btn" onClick={() => handleEditClick(task)}>✏</button>
                  <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>❌</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default TaskList;
