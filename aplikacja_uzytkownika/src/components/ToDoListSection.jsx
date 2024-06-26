import { useState } from 'react';
import "../styles/ToDoListSection.css";

function ToDoListSection(){

    const [tasks, setTasks] = useState([
        { name: 'Odrobić matematyke', important: false, completed: false, deleteChecked: false },
        { name: 'Pozmywać', important: true, completed: false, deleteChecked: false },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTaskName, setNewTaskName] = useState('');
    const [isNewTaskImportant, setIsNewTaskImportant] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const addTask = () => {
        if (newTaskName.trim() !== '') {
            console.log("Added task.");
            setTasks([...tasks, { name: newTaskName, important: isNewTaskImportant, completed: false, deleteChecked: false }]);
            setIsModalOpen(false);
            setNewTaskName('');
            setIsNewTaskImportant(false);
        }
    };

    const toggleTaskCompletion = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    };

    const toggleTaskDeleteChecked = (index) => {
        const newTasks = [...tasks];
        newTasks[index].deleteChecked = !newTasks[index].deleteChecked;
        setTasks(newTasks);
    };

    const deleteTasks = () => {
        setTasks(tasks.filter(task => !task.deleteChecked));
        setIsDeleting(false);
    };

    const toggleDeleteMode = () => {
        setIsDeleting(!isDeleting);
        if (!isDeleting) {
            const newTasks = tasks.map(task => ({ ...task, deleteChecked: false }));
            setTasks(newTasks);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="todo-container">
            <ul className="todo-list">
                { tasks.length > 0 
                ? tasks.map((task, index) => (
                    <li key={index} className={`todo-item ${task.important ? 'important' : ''} ${isDeleting && task.deleteChecked ? 'deleting' : ''}`}>
                        <label className="custom-checkbox">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={isDeleting ? () => toggleTaskDeleteChecked(index) : () => toggleTaskCompletion(index)}
                                className="task-checkbox"
                            />
                            <span className="checkbox-checkmark" />
                            <span className="task-text" style={{
                                color: (isDeleting && task.deleteChecked) ? 'var(--red)' : (task.important ? 'var(--orange)' : 'var(--text-color)'),
                                textDecoration: task.completed ? 'line-through' : 'none'
                            }}>{task.name}</span>
                        </label>
                    </li>
                ))
                : <p style={{fontSize: "1.6rem", color: "var(--text-color)", textAlign: "center"}}>Brak zadań!</p>}
            </ul>
            <div className="button-container">
                <button className="round-button" onClick={openModal}><i className="fa fa-plus" aria-hidden="true"></i></button>
                {isDeleting ? (
                    <button className="round-button" onClick={deleteTasks}><i className="fa fa-check" aria-hidden="true"></i></button>
                ) : (
                    <button className="round-button" onClick={toggleDeleteMode}><i className="fa fa-minus" aria-hidden="true"></i></button>
                )}
            </div>

            {isModalOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Dodaj nowe zadanie</h2>
                        <input
                            type="text"
                            value={newTaskName}
                            onChange={(e) => setNewTaskName(e.target.value)}
                            placeholder="Nazwa zadania"
                        />
                        <label className="is-important-task-container">
                            <input
                                type="checkbox"
                                checked={isNewTaskImportant}
                                onChange={(e) => setIsNewTaskImportant(e.target.checked)}
                            />
                            <span>Oznacz jako ważne</span>
                        </label>
                        <button onClick={addTask}>Dodaj</button>
                        <button onClick={() => setIsModalOpen(false)}>Anuluj</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ToDoListSection;
