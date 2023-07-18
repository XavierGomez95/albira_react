import React from 'react';

const PopupModal = ({ isOpen, onCancel, onSave, value, onChange, taskId }) => {
    const modalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        display:  'block'
    };

    const marginStyle = {
        marginLeft: 100,
        marginRight: 100,
        marginTop: 40,
        marginBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
    }

    const marginButtonsStyle = {
        marginLeft: 10,
        marginRight: 10
    }

    const backgroundStyle = {
        backgroundColor: "#FFFFFF"
    }

    return (
        <div id="edit-task-modal" style={modalStyle}  >
            <div className="modal-dialog rounded-3 border border-black" style={backgroundStyle}>
                <div className="modal-content">
                    <div className="modal-header" style={marginStyle}>
                        <h5 className="modal-title" >Edit Tittle Task ID: {taskId}</h5>
                        <button style={marginButtonsStyle} type="button" className="btn-close" onClick={onCancel} />
                    </div>
                    <div className="modal-body" style={marginStyle}>
                        <input type="text" value={value} onChange={onChange} />
                    </div>
                    <div className="modal-footer" style={marginStyle}>
                        <button style={marginButtonsStyle} type="button" className="btn btn-primary" onClick={onSave}>Save</button>
                        <button type="button" className="btn btn-danger" onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupModal;