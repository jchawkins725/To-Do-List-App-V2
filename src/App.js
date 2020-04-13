import React from "react";
import "./style.scss";
import { FaPlus, FaTimes, FaCheck } from 'react-icons/fa';
import { Draggable } from 'react-beautiful-dnd'

/*
const List = (props) => (
<div>
  <ul>
    <div>
      {props.items.map((x, index) => (
        <li className="flexcontainer" key={props.items.key}>
          <div
            className={`circle ${props.items[index].done ? 'circledone' : ""}`}
            onClick={() => props.complete(index)}
          >
            {props.items[index].done && (
              <FaCheck />
            )}
          </div>
          <div
            className={`itemcontainer ${props.items[index].done ? "done" : ""}`}
          >
            {x.value}
          </div>
          <FaTimes onClick={() => props.delete(x)}/>
        </li>
      ))}
    </div>
  </ul>
</div>
)

function Form(props) {
  return (
    <form className="taskform" onSubmit={props.submit}>
      <input
        className="taskinput"
        value={props.value}
        onChange={props.change}
        placeholder="enter task"
        required
      />
      <button className="add">
        <FaPlus />
      </button>
    </form>
  );
}

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      items: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }
  handleChange(event) {
    const itemText = event.target.value;
    this.setState({ input: itemText });
  }
  handleAdd(event) {
    event.preventDefault();
    const items = this.state.items;
    const value = this.state.input.split(",");
    for (let i = 0; i < value.length; i++) {
      items.push({
        value: value[i],
        done: false,
        key: Date.now(),
      });
    }
    this.setState({
      input: "",
      items: items,
    });
  }
  handleDelete(i) {
    this.setState((prevState) => ({
      items: prevState.items.filter((x) => x != i),
    }));
  }
  handleComplete(i) {
    var items = this.state.items;
    var item = this.state.items[i];
    item.done = !item.done;
    this.setState({
      items: items,
    });
  }
  render() {
    return (
      <div>
        <h1>To Do List App</h1>
        <Form
          className="form"
          value={this.state.input}
          submit={this.handleAdd}
          change={this.handleChange}
        />
        <List
          complete={this.handleComplete}
          items={this.state.items}
          delete={this.handleDelete}
        />
      </div>
    );
  }
}*/

const Container = <div></div>

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      items: ["item1", "item2", "item3", "item4"],
    };
  }
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {provided => (
          <Container
            {...provided.draggableProps}
            {...provided.draggableProps}
            innerRef={provided.innerRef} >
              {this.props.task.content}
          </Container>
        )}
      </Draggable>
    )
  }
}

export default TodoApp;
