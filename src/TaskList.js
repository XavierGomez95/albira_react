import PopupModalEdit from "./Components/PopupModalEdit";
import React, { useEffect, useState } from 'react';
import {EditButton} from "./Components/EditButton";
import {DeleteButton} from "./Components/DeleteButton";

// Importamos los iconos react de fontawesome
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// asignamos a cada boton un
import {AddButton} from "./Components/AddButton";
import {faEdit} from "@fortawesome/free-regular-svg-icons";
import {faSquare} from "@fortawesome/free-regular-svg-icons";
import {faSquareCheck} from "@fortawesome/free-regular-svg-icons";
import PopupModalDelete from "./Components/PopupModalDelete";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskId, setTaskId] = useState(0);
    const [newTittle, setNewTittle] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [completed, setCompleted] = useState(false);


    // Lo primero es el valor de tasks y lo segundo el tipo.
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/1/todos')
            .then((response) => response.json())
            .then((tasks) => {
                setTasks(tasks);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const handleDelete = () => {
        fetch('https://jsonplaceholder.typicode.com/todos/' + taskId, {
            method: 'DELETE',
        }).then((response) => {
            if (response.ok) {
                // Actualizamos la lista de tareas en el codigo para no tener que llamar de nuevo a la API.
                const updatedTasks = tasks.filter((task) => task.id !== taskId);
                setTasks(updatedTasks);
                console.log('TAREA ELIMINADA, task id:' + taskId);
            } else {
                console.log('Error status: ' + response.status);
            }
        }).catch((error) => {
            console.error('Error Deleting:', error);
        });

        setShowDeleteModal(false);
    };

    const handleEdit = (event) => {
        setNewTittle(event.target.value);

        const currentTask = tasks.find((task) => task.id === taskId);

        fetch('https://jsonplaceholder.typicode.com/todos/' + taskId, {
            method: 'PUT',
            body: JSON.stringify({
                id: currentTask.id,
                title: newTittle,
                body: currentTask.body,
                userId: currentTask.userId,
            }),
        }).then((response) => {
            if (response.ok) {
                // Actualizamos la lista de tareas en el codigo para no tener que llamar de nuevo a la API.
                const updatedTasks = tasks.map((task) => {
                    if (task.id === taskId) {
                        // Actualizamos el título de la tarea modificada
                        return { ...task, title: newTittle };
                    }
                    return task;
                });

                console.error('RESPONSE OK');
                setTasks(updatedTasks);
            } else {
                console.error('NO RESPONSE OK');
            }
        }).catch((error) => {
            console.error('Error Deleting:', error);
        });

        setShowEditModal(false);
    };

    const handleCancel = () => {
        setShowEditModal(false);
        setShowDeleteModal(false);
    };

    const handleChange = (event) => {
        setNewTittle(event.target.value)
    };

    const handleCheckbox = () => {
        // STUFF
        if (!completed) {
            setCompleted(true);
        } else {
            setCompleted(false);
        }
    };

    const openEditPopup = (taskTitle, taskId) => {
        setTaskId(taskId)
        setNewTittle(taskTitle);
        setShowEditModal(true);
    };

    const openDeletePopup = (taskId) => {
        setTaskId(taskId)
        setShowDeleteModal(true);
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
                            <td className=" p-2">USER ID</td>
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
                                    {task.completed ? (
                                        <FontAwesomeIcon icon={faSquareCheck} onClick={() => handleCheckbox(task.id, task.body, task.title, task.userId)} />
                                    ) : (
                                        <FontAwesomeIcon icon={faSquare} onClick={() => handleCheckbox(task.id, task.body, task.title, task.userId)} />
                                    )}
                                </td>
                                <td className="text-center" >
                                    <EditButton data-bs-target="#edit-task-modal" onClick={() => {
                                        openEditPopup(task.title, task.id);
                                    }} />
                                </td>
                                <td className="text-center p-2">
                                    <DeleteButton onClick={() => {
                                        openDeletePopup(task.id);
                                        //handleDelete(task.id)
                                    }} />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {showEditModal && (
                    <PopupModalEdit
                        onCancel={handleCancel}
                        onEdit={handleEdit}
                        onChange={handleChange}
                        newTittle={newTittle}
                        taskId={taskId}
                    />
                )}

                {showDeleteModal && (
                    <PopupModalDelete
                        onCancel={handleCancel}
                        onDelete={handleDelete}
                        taskId={taskId}
                    />
                )}
            </div>

        </div>
    );
};

export default TaskList;