import React from 'react';
import arrow from './arrow.png';
import arrowdown from './arrow-down.png'
import './App.css';
import List from './components/List/index';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.changeName = this.changeName.bind(this);
    this.changePriotity = this.changePriotity.bind(this);
    this.addItem = this.addItem.bind(this);
    this.changeNeedfilter = this.changeNeedfilter.bind(this);
    this.changeFilterPriotity =this.changeFilterPriotity.bind(this);
    this.priotityList = [1, 2, 3, 4, 5];
    this.state = {
      todoList: [],
      name: '',
      priotity: 5,
      needFilter: false,
      filterPriotity: 5
    };
  }

  changeName(event) {
    this.setState({ name: event.target.value });
  }
  changePriotity(event) {
    this.setState({ priotity: event.target.value });
  }

  addItem() {
    let { todoList, name, priotity } = this.state;
    if(!name) {
      return
    }
    todoList.push({
      name,
      priotity,
      id: this.genID()
    });

    this.setState({
      todoList,
      name: ''
    })
  }
  genID(length) {
    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
  }

  deleteItem(todo) {
    const { todoList } = this.state;
    let newList = todoList.filter(item => (
      item.id !== todo.id
    ));

    this.setState({
      todoList: newList
    })
  }

  changeNeedfilter(event) {
    this.setState({ needFilter: event.target.checked });
  }

  changeFilterPriotity(event) {
    this.setState({ filterPriotity: event.target.value });
  }

  renderList() {
    let list = [];
    const {todoList, needFilter,filterPriotity} = this.state;
    if(needFilter) {
      list = todoList.filter(item => (
        Number(item.priotity) === Number(filterPriotity)
      ));
      console.log('filtered list', list, todoList);
    } else {
    list =  todoList;
    }

    list = list.sort((a,b)=>(b.priotity-a.priotity));
    return (
      <List list={list} deleteCallback={this.deleteItem.bind(this)} />
    )
  }
  render() {
    return (
      <div className="App">
        <h1>#TODO APP{this.state.needFilter}</h1>
        <div className="content">
          <div className="name  block">
            <div className="tip"> Whate is the task name?</div>
            <div className="form">
              <input type="text" placeholder="Enter the task name" value={this.state.name} onChange={this.changeName} />
            </div>
          </div>

          <div className="priotity  block">
            <div className="tip">Priority</div>
            <div className="form-wrapper">
              <div className="form">
                <div className="select-wrapper">
                  <select name="priotity" id="" value={this.state.priotity} onChange={this.changePriotity}>
                    {this.priotityList.map(priotity => {
                      return (<option value={priotity} key={priotity}>{priotity}</option>)
                    })}
                  </select>
                  <img src={arrowdown} alt="" className="arrow-down" />
                </div>

              </div>
              <div className="btn" onClick={this.addItem}>
                <div className="text">Add new TODO</div>
                <img src={arrow} alt="" className="arrow" />
              </div>
            </div>
          </div>

          <div className="flter">
            <input type="checkbox" id="filter-priority" className="priority-checkbox" checked={this.state.needFilter} onChange={this.changeNeedfilter} />
            <label htmlFor="filter-priority">
              Filter on Priority
            </label>
            <div className="select-wrapper">
              <select name="priotity-select" id=""  value={this.state.filterPriotity} onChange={this.changeFilterPriotity} >
                {this.priotityList.map(priotity => {
                  return (<option value={priotity} key={priotity}>{priotity}</option>)
                })}
              </select>
              <img src={arrowdown} alt="" className="arrow-down" />
            </div>

          </div>

          {this.renderList()}
        </div>
      </div>
    );
  }
}

export default App;
