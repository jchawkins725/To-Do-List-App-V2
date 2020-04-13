import React from "react";
import ReactDOM from "react-dom";
import Column from "./column";
import "reset-css";
import { DragDropContext } from "react-beautiful-dnd";
import "./style.scss";

class App extends React.Component {
  state = {
    tasks: {
      "task-1": { id: "task-1", content: "Wash the dishes", done: false },
      "task-2": { id: "task-2", content: "Fold the laundry", done: false },
      "task-3": {
        id: "task-3",
        content: "Pick weeds in flower beds",
        done: false,
      },
      "task-4": { id: "task-4", content: "Give the dog a bath", done: false },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "Today",
        taskIds: ["task-1", "task-2", "task-3", "task-4"],
      },
    },
    columnOrder: ["column-1"],
    inputText: "",
  };

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      },
    };

    this.setState(newState);
  };
  handleInput = (event) => {
    event.preventDefault();
    const column = this.state.columns["column-1"];
    const newTaskIds = Array.from(column.taskIds);
    const arrayNum = this.state.columns["column-1"].taskIds.length + 1;
    const taskName = "task-" + arrayNum.toString();
    newTaskIds.push(taskName);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newObject = Object.assign(
      {
        [taskName]: {
          id: taskName,
          content: this.state.inputText,
          done: false,
        },
      },
      this.state.tasks
    );

    const newState = {
      ...this.state,
      tasks: newObject,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      },
      inputText: "",
    };
    this.setState(newState);
  };
  handleDelete = (event) => {
    const currentTask = this.state.columns["column-1"].taskIds[event];
    const tasksCopy = {...this.state.tasks};
    const tasksArray = Array.from(this.state.columns['column-1'].taskIds);
    delete tasksCopy[currentTask];
    tasksArray.splice(event, 1);
    console.log(tasksArray)

    const newColumn = {
      ...this.state.columns["column-1"],
      taskIds: tasksArray,
    };

    const newState = {
      ...this.state,
      tasks: {...tasksCopy},
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      },
    };
    this.setState(newState); 
  };
  handleInputChange = (event) => {
    const itemText = event.target.value;
    this.setState({ inputText: itemText });
  };
  handleTaskCompletion = (e) => {
    const currentTask = this.state.columns["column-1"].taskIds[e];
    if (this.state.tasks[currentTask].done === false) {
      this.setState((prevState) => ({
        tasks: {
          ...prevState.tasks,
          [currentTask]: {
            ...prevState.tasks[currentTask],
            done: true
          },
        },
      }));
    }
    else {
      this.setState((prevState) => ({
        tasks: {
          ...prevState.tasks,
          [currentTask]: {
            ...prevState.tasks[currentTask],
            done: false
          },
        },
      }));
    }
  };
  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}
      >
        {this.state.columnOrder.map((columnId) => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(
            (taskId) => this.state.tasks[taskId]
          );

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              add={this.handleInput}
              input={this.handleInputChange}
              complete={this.handleTaskCompletion}
              taskState={this.state.tasks}
              inputText={this.state.inputText}
              delete={this.handleDelete}
            />
          );
        })}
      </DragDropContext>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
