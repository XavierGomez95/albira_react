import React, { useEffect, useState } from 'react';
import {EditButton} from "./Components/EditButton";
import {DeleteButton} from "./Components/DeleteButton";
import PopupModal from "./Components/PopupModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newTitle, setNewTitle] = useState('');

    // Lo primero es el valor de tasks y lo segundo el tipo.
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((tasks) => {
                setTasks(tasks);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const handleDelete = (taskId) => {
        fetch('https://jsonplaceholder.typicode.com/posts/${taskId}', {
            method: 'DELETE',
        }).then((response) => {
            if (response.ok) {
                // Actualizamos la lista de tareas en el codigo para no tener que llamar de nuevo a la API.
                const updatedTasks = tasks.filter((task) => task.id !== taskId);
                setTasks(updatedTasks);
            } else {
                // Manejar error en caso de que la eliminación no sea exitosa
            }
        }).catch((error) => {
            console.error('Error Deleting:', error);
        });
    };

    const handleEdit = (taskId, TaskBody, TaskTitle, TaskUserId) => {
        setNewTitle('')
        fetch('https://jsonplaceholder.typicode.com/posts/${taskId}', {
            method: 'PUT',
            body: JSON.stringify({
                id: taskId,
                title: TaskTitle,
                body: TaskBody,
                userId: TaskUserId,
            }),
        }).then((response) => {
            if (response.ok) {
                // Actualizamos la lista de tareas en el codigo para no tener que llamar de nuevo a la API.
                const updatedTasks = tasks.filter((task) => task.id === taskId);
                setTasks(updatedTasks);
            } else {
                // Error
            }
        }).catch((error) => {
            console.error('Error Deleting:', error);
        });
    };

    const handleNewTitleChange = (event) => {
        setNewTitle(event.target.value);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const handleSave = () => {
        // STUFF
        setShowModal(false);
    };

    const handleCheckbox = () => {
        // STUFF

    };

    const openPopup = (taskTitle) => {
        setNewTitle(taskTitle);
        setShowModal(true);
    };

    return (
        <div>
            <header>
                <h1>To do List</h1>
            </header>

            <body>
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th className="text-center">ID</th>
                            <th className="text-center">User ID</th>
                            <th>Tittle</th>
                            <th className="text-center">Checkbox</th>
                            <th className="text-center">Edit</th>
                            <th className="text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tasks.map((task) => (
                        <tr>
                            <td className="text-center">{task.id}</td>
                            <td className="text-center">{task.userId}</td>
                            <td>{task.title}</td>
                            <td className="text-center">
                                <FontAwesomeIcon icon={faSquareCheck} onClick={() => handleCheckbox(task.id, task.body, task.title, task.userId)} />
                            </td>
                            <td className="text-center" >
                                <EditButton data-bs-target="#edit-task-modal" onClick={() => {
                                    openPopup(task.title)
                                    handleEdit(task.id, task.body, task.title, task.userId)
                                }} />
                            </td>
                            <td className="text-center">
                                <DeleteButton onClick={() => handleDelete(task.id)} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {showModal && (
                    <PopupModal
                        isOpen={showModal}
                        onCancel={handleCancel}
                        onSave={handleSave}
                        value={newTitle}
                        onChange={handleNewTitleChange}
                    />
                )}
            </body>

        </div>
    );
};

export default TaskList;