import React from 'react';
import './style.css';
import Item from '../Item/index'
function List({list, deleteCallback}) {
    return (<div className="list">
    {

      list.map(item => (
          <Item item={item}  deleteCallback={deleteCallback} key={item.id}/>
      ))
    }

  </div>)
}

export default List;