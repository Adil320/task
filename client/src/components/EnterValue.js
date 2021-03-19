import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEdit, faSave } from '@fortawesome/free-solid-svg-icons'

const EnterValue = ({ value, deleteValue, id, editValue, handleChangeEdit, isEditValue, putValue }) => {
    return (
        <h4 className="text-dark text-center p-1 bg-light border-bottom" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ paddingLeft: '5px' }}>
                <FontAwesomeIcon icon={faEdit} onClick={() => editValue(id, 'edit')} />
            </div>
            {isEditValue ? <div style={{ width: '70%' }}><input type="text" onChange={handleChangeEdit} className="form-control rounded-0 mb-1" placeholder="Введите новое значение ..." />
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <FontAwesomeIcon icon={faTimes} onClick={() => editValue(id, 'cancel')} />
                    <FontAwesomeIcon icon={faSave} onClick={() => putValue(id)} />
                </div>
            </div> : <div>{value}</div>}
            <div style={{ paddingRight: '5px' }}>
                <FontAwesomeIcon icon={faTimes} onClick={() => deleteValue(id)} />
            </div>
        </h4>
    )
}

export default EnterValue;