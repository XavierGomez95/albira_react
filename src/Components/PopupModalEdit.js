import React from 'react';

const PopupModalEdit = ({ onCancel, onEdit, onChange, newTittle, taskId }) => {
    const marginButtonsStyle = {
        marginLeft: 10,
        marginRight: 10
    }

    const backgroundStyle = {
        backgroundColor: "#FFFFFF"
    }

    return (
        <div id="edit-task-modal" className="modal modal-dialog-centered" >
            <div className="modal-dialog rounded-3 border border-black" style={backgroundStyle}>
                <div className="modal-content">
                    <div className="modal-header mx-5 my-5 mt-3 mb-3" >
                        <h5 className="modal-title" >Edit Tittle Task ID: {taskId}</h5>
                        <button style={marginButtonsStyle} type="button" className="btn-close" onClick={onCancel} />
                    </div>
                    <div className="modal-bodymx-3 mx-5 my-5 mt-3 mb-3" >
                        <input type="text" className="mx-5 my-5 mt-3 mb-3" value={newTittle} onChange={onChange}/>
                        <input type="checkbox" className="row mx-5 my-5 mt-3 mb-3" />
                    </div>
                    <div className="modal-footer mx-5 my-5 mt-3 mb-3" >
                        <button style={marginButtonsStyle} type="button" className="btn btn-success" onClick={onEdit}>Edit</button>
                        <button type="button" className="btn btn-danger" onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupModalEdit;