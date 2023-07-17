import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const EditButton = ({ onClick }) => {
    return (
        <button type="button" className="btn btn-sm btn-outline-success" onClick={onClick}>
            Edit
            <FontAwesomeIcon icon="fas fa-edit" />
        </button>
    )
}