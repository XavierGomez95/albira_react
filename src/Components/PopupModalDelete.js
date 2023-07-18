import React from 'react';

const PopupModalDelete = ({ onCancel, onDelete, taskId }) => {
    const marginStyle = { // TODO: Cambiar esto por Bootstrap 5
        marginLeft: 100,
        marginRight: 100,
        marginTop: 40,
        marginBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
    }

    const marginButtonsStyle = { // TODO: Cambiar esto por Bootstrap 5
        marginLeft: 10,
        marginRight: 10
    }

    const backgroundStyle = { // TODO: Cambiar esto por Bootstrap 5
        backgroundColor: "#FFFFFF"
    }

    return (
        <div id="edit-task-modal" className="modal modal-dialog-centered" >
            <div className="modal-dialog rounded-3 border border-black" style={backgroundStyle}>
                <div className="modal-content">
                    <div className="modal-header" style={marginStyle}>
                        <h5 className="modal-title" >Are you sure you want to delete the task with ID {taskId}?</h5>
                        <button style={marginButtonsStyle} type="button" className="btn-close" onClick={onCancel} />
                    </div>

                    <div className="modal-footer" style={marginStyle}>
                        <button style={marginButtonsStyle} type="button" className="btn btn-danger" onClick={onDelete}>Delete</button>
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupModalDelete;