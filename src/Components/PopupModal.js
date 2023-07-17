import React from 'react';

const PopupModal = ({ isOpen, onCancel, onSave, value, onChange }) => {
    const modalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        display: isOpen ? 'block' : 'none'
    };

    const marginStyle = {
        margin: 30,
        paddingLeft: 10,
    }

    const marginButtonsStyle = {
        marginLeft: 10,
        marginRight: 10
    }

    const backgroudStyle = {
        backgroundColor: "#FFFFFF"
    }

    return (
        <div id="edit-task-modal" style={modalStyle}  >
            <div className="modal-dialog rounded-3 border border-black" style={backgroudStyle}>
                <div className="modal-content">
                    <div className="modal-header" style={marginStyle}>
                        <h5 className="modal-title" >Edit Task</h5>
                        <button type="button" className="btn-close" onClick={onCancel} />
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