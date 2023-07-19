import React from 'react';

const PopupModalDelete = ({ onCancel, onDelete, taskId }) => {

    return (
        <div id="edit-task-modal" className="modal modal-dialog-centered" >
            <div className="modal-dialog rounded-3 " >
                <div className="modal-content">
                    <div className="modal-header mx-5 my-5 mt-3 mb-3" >
                        <h4 className="modal-title" >Are you sure you want to delete the task with ID {taskId}?</h4>
                        <button type="button" className="btn-close" onClick={onCancel} />
                    </div>
                    <div className="modal-footer mx-5 my-5 mt-3 mb-3">
                        <button type="button" className="btn btn-danger " onClick={onDelete}>Delete</button>
                        <button type="button" className="btn btn-secondary mx-3" onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupModalDelete;