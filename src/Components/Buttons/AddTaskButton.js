import React from "react";
export const AddTaskButton = ({ onClick }) => {
    return (
        <button type="button" className="btn btn-secondary mb-3 float-end " onClick={onClick}>
            + NEW TO DO
        </button>
    )
}