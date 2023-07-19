import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit} from "@fortawesome/free-regular-svg-icons";
export const EditTaskButton = ({ onClick }) => {
    return (
        <button type="button" className="btn btn-sm btn-outline-success" onClick={onClick}>
            <FontAwesomeIcon icon={faEdit} />
        </button>
    )
}