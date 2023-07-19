import React, { useEffect, useState } from 'react';

// Importamos los iconos react de fontawesome
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-regular-svg-icons";
import {faSquare} from "@fortawesome/free-regular-svg-icons";
import {faSquareCheck} from "@fortawesome/free-regular-svg-icons";

// Importamos los componentes
import {AddTaskButton} from "./Components/Buttons/AddTaskButton";
import {EditTaskButton} from "./Components/Buttons/EditTaskButton";
import {DeleteTaskButton} from "./Components/Buttons/DeleteTaskButton";
import PopupModalEditAdd from "./Components/Modals/PopupModalEditAdd";
import PopupModalDelete from "./Components/Modals/PopupModalDelete";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskId, setTaskId] = useState(0);
    const [newId, setNewId] = useState(-1); // Para crear un nuevo to do
    const [newTitle, setNewTitle] = useState('');
    const [newCompleted, setNewCompleted] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    // Lo primero es el valor de tasks y lo segundo el tipo.
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/1/todos', {
            method: 'GET',
        }).then((response) => {
            return response.json(); // Devuelves la promesa para el siguiente .then()
        }).then((tasks) => {
            setTasks(tasks);
        }).catch((error) => {
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
            } else {
                console.error('Error status: ' + response.status);
            }
        }).catch((error) => {
            console.error('Error catch:', error);
        });

        setShowDeleteModal(false);
    };

    const handleEdit = (event) => {
        setNewTitle(event.target.value);
        setNewCompleted(event.target.checked);

        const currentTask = tasks.find((task) => task.id === taskId);

        fetch('https://jsonplaceholder.typicode.com/todos/' + taskId, {
            method: 'PUT',
            body: JSON.stringify({
                userId: currentTask.userId,
                id: currentTask.id,
                title: newTitle,
                completed: newCompleted,
            }),
        }).then((response) => {
            if (response.ok) {
                // Actualizamos la lista de tareas en el codigo para no tener que llamar de nuevo a la API.
                const updatedTasks = tasks.map((task) => {
                    if (task.id === taskId) {
                        // Actualizamos el título de la tarea modificada
                        return { ...task, title: newTitle, completed: newCompleted };
                    }
                    return task;
                });
                setTasks(updatedTasks);
            } else {
                console.error('Error status: ' + response.status);
            }
        }).catch((error) => {
            console.error('Error catch:', error);
        });

        setShowEditModal(false);
    };

    const handleCreate = () => {
        fetch('https://jsonplaceholder.typicode.com/todos/', {
            method: 'POST',
            body: JSON.stringify({
                userId: 1,
                id: newId,
                title: newTitle,
                completed: newCompleted,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((response) => {
            response.json()
            if (response.ok) {
                const newTask = {
                    userId: 1,
                    id: newId,
                    title: newTitle,
                    completed: newCompleted,
                };
                setTasks((prevState) => [...prevState, newTask]);
            } else {
                console.error('Error status: ' + response.status);
            }
        })

        setShowAddModal(false);
    };

    const handleCancel = () => {
        setShowEditModal(false);
        setShowAddModal(false);
        setShowDeleteModal(false);
    };

    const handleChange = (event) => {
        if (event.target.type === 'text') {
            setNewTitle(event.target.value);
        } else if (event.target.type === 'checkbox') {
            setNewCompleted(event.target.checked);
        }
    };

    const openEditPopup = (taskTitle, taskId, taskCompleted) => {
        setNewCompleted(taskCompleted);
        setTaskId(taskId);
        setNewTitle(taskTitle);
        setShowEditModal(true);
    };

    const openDeletePopup = (taskId) => {
        setTaskId(taskId)
        setShowDeleteModal(true);
    };

    const clearNewTask = () => {
        setNewTitle('');
        setNewCompleted(false);
    };

    const openAddPopup = () => {
        clearNewTask();
        let newIdTemp = 1;
        if (tasks.length > 0) {
            const lastTask = tasks[tasks.length - 1];
            newIdTemp = lastTask.id + 1;
        }
        setNewId(newIdTemp);
        setShowAddModal(true);
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
                        <AddTaskButton data-bs-target="#add-task-modal" className="text-white " style={{ color: "white"}} onClick={() => {
                            openAddPopup();
                        }} />
                    </div>
                </div>



                <div className="row">
                    <table className="bg-secondary table-borderless mb-5" >

                        <thead >
                        <tr className="text-white rounded-3">
                            <td className="text-center p-2">ID</td>
                            <td className="text-center p-2" style={{ minWidth: "80px" }}>USER ID</td>
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
                                        <FontAwesomeIcon icon={faSquareCheck} />
                                    ) : (
                                        <FontAwesomeIcon icon={faSquare} />
                                    )}
                                </td>
                                <td className="text-center" >
                                    <EditTaskButton data-bs-target="#edit-task-modal" onClick={() => {
                                        openEditPopup(task.title, task.id, task.completed);
                                    }} />
                                </td>
                                <td className="text-center p-2">
                                    <DeleteTaskButton onClick={() => {
                                        openDeletePopup(task.id);
                                    }} />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {showEditModal && (
                    <PopupModalEditAdd
                        onCancel={handleCancel}
                        onEdit={handleEdit}
                        onChange={handleChange}
                        newTittle={newTitle}
                        taskId={taskId}
                        checkState={newCompleted}
                        isCreating={false}
                    />
                )}

                {showDeleteModal && (
                    <PopupModalDelete
                        onCancel={handleCancel}
                        onDelete={handleDelete}
                        taskId={taskId}
                    />
                )}

                {showAddModal && (
                    <PopupModalEditAdd
                        onCancel={handleCancel}
                        onCreate={handleCreate}
                        onChange={handleChange}
                        taskId={newId}
                        checkState={newCompleted}
                        isCreating={true}
                    />
                )}
            </div>

        </div>
    );
};

export default TaskList;