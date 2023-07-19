import React from 'react';

const PopupModalEditAdd = ({ onCancel, onEdit, onCreate, onChange, newTittle, taskId, checkState, isCreating }) => {

    const checkboxSize = {
        width: 20,
        height: 20
    };

    const inputTextSize = {
        width: 300,
        height: 30
    };

    console.log('checkState:', checkState); // TEMPORAL

    return (
        <div id="edit-task-modal" className="modal modal-dialog-centered" >
            <div className="modal-dialog rounded-3 border ">
                <div className="modal-content ">
                    <div className="modal-header mx-5 my-5 mt-3 mb-3" >
                        <h4 className="modal-title" >
                            {isCreating ? 'Create New Task' : `Edit Title Task ID: ${taskId}`}
                        </h4>
                        <button type="button" className="btn-close" onClick={onCancel} />
                    </div>
                    <div className="modal-body mx-5 my-5 mt-3 mb-3" >
                        <input type="text" className="mx-5 my-5 mt-3 mb-3" style={inputTextSize} value={newTittle} onChange={onChange}/>
                        {isCreating ? (
                            <div className="form-check mx-3 my-5 mt-3 mb-3 d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    className="custom-checkbox mx-2"
                                    style={checkboxSize}
                                    disabled
                                />
                                <label className="form-check-label"> Task completed</label>
                            </div>
                        ) : (
                            <div className="form-check mx-3 my-5 mt-3 mb-3 d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    className="custom-checkbox mx-2"
                                    style={checkboxSize}
                                    checked={checkState}
                                    onChange={onChange}
                                />
                                <label className="form-check-label"> Task completed</label>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer mx-5 my-5 mt-3 mb-3 " >
                        <button type="button" className="btn btn-success mx-3" onClick={isCreating ? onCreate : onEdit}>
                            {isCreating ? 'Create' : 'Edit'}
                        </button>
                        <button type="button" className="btn btn-secondary " onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupModalEditAdd;