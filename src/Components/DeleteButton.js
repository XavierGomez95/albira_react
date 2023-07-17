import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const DeleteButton = ({ onClick }) => {
    return (
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={onClick}>
            Delete
            <FontAwesomeIcon icon="fa-solid fa-trash" />
        </button>
    )
}