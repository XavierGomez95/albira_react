import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export const DeleteTaskButton = ({ onClick }) => {
    return (
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={onClick}>
            <FontAwesomeIcon icon={faTrashCan} />
        </button>
    )
}