import React from 'react';
import './style.css';
function Item({ item, deleteCallback }) {
    return (<div className="item" key={item.id}>
        <div className="name">{item.name}</div>
        <div className="priotity">Priority:{item.priotity}</div>
        <div className="btn-delete" onClick={() => deleteCallback(item)}>Delete</div>
    </div>)
}

export default Item;