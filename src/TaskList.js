import PopupModal from "./Components/PopupModal";
import React, { useEffect, useState } from 'react';
import {EditButton} from "./Components/EditButton";
import {DeleteButton} from "./Components/DeleteButton";

// Importamos los iconos react de fontawesome
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// asignamos a cada boton un
import {AddButton} from "./Components/AddButton";
import {faEdit} from "@fortawesome/free-regular-svg-icons";
import {faSquare} from "@fortawesome/free-regular-svg-icons";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";

const TaskList = () => {
    const [taskId, setTaskId] = useState(0)
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [completed, setCompleted] = useState(false);

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
        // Update con fetch

        setShowModal(false);
    };

    const handleCheckbox = () => {
        // STUFF
        if (!completed) {
            setCompleted(true);
        } else {
            setCompleted(false);
        }
    };

    const openPopup = (taskTitle, taskId) => {
        setTaskId(taskId)
        setNewTitle(taskTitle);
        setShowModal(true);
    };

    return (
        <div>
            <header className="bg-secondary mb-5 p-3 d-flex align-items-center">
                <h4 className="text-white fw-normal mx-4 align-items-center">
                    <FontAwesomeIcon icon={faEdit} className="mx-4" /> TO DO LIST
                </h4>
            </header>

            <div className="container">
                <div className="row mb-3">
                    <div className="col align-self-end">
                        <AddButton data-bs-target="#add-task-modal" className="text-white " style={{ color: "white"}}>
                            + NEW TO DO
                        </AddButton>
                    </div>
                </div>



                <div className="row">
                    <table className="bg-secondary table-borderless mb-5" >

                        <thead >
                        <tr className="text-white rounded-3">
                            <td className="text-center p-2">ID</td>
                            <td className="text-center p-2">USER ID</td>
                            <td className="text-white p-2">TITTLE</td>
                            <td className="text-center p-2">COMPLETED</td>
                            <td className="text-center p-2">EDIT</td>
                            <td className="text-center p-2">DELETE</td>
                        </tr>
                        </thead>


                        <tbody className="bg-light rounded-3" >
                        {tasks.map((task) => (
                            <tr className=" rounded-3" key={task.id}>
                                <td className="text-center">{task.id}</td>
                                <td className="text-center">{task.userId}</td>
                                <td>{task.title}</td>
                                <td className="text-center">
                                    {completed ? (
                                        <FontAwesomeIcon icon={faSquareCheck} onClick={() => handleCheckbox(task.id, task.body, task.title, task.userId)} />
                                    ) : (
                                        <FontAwesomeIcon icon={faSquare} onClick={() => handleCheckbox(task.id, task.body, task.title, task.userId)} />
                                    )}
                                </td>
                                <td className="text-center" >
                                    <EditButton data-bs-target="#edit-task-modal" onClick={() => {
                                        openPopup(task.title, task.id)
                                        handleEdit(task.id, task.body, task.title, task.userId)
                                    }} />
                                </td>
                                <td className="text-center p-2">
                                    <DeleteButton onClick={() => handleDelete(task.id)} />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {showModal && (
                    <PopupModal
                        isOpen={showModal}
                        onCancel={handleCancel}
                        onSave={handleSave}
                        value={newTitle}
                        onChange={handleNewTitleChange}
                        taskId={taskId}
                    />
                )}
            </div>

        </div>
    );
};

export default TaskList;