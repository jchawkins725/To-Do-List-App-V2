import React from "react";
import ReactDOM from "react-dom";
import Column from "./column";
import Categories from "./categories";
import "reset-css";
import { DragDropContext } from "react-beautiful-dnd";
import "./style.scss";
import styles from "./style.module.scss";

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
      "task-5": { id: "task-5", content: "Do my homework", done: false },
      "task-6": { id: "task-6", content: "Go to the bank", done: false },
      "task-7": { id: "task-7", content: "Get groceries", done: false },
      "task-8": { id: "task-8", content: "Dust", done: false },
      "task-9": { id: "task-9", content: "Mop the floor", done: false },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "Today",
        taskIds: ["task-1", "task-2", "task-3", "task-4"],
        inputText: "",
        display: true,
        color: "red",
      },
      "column-2": {
        id: "column-2",
        title: "Tomorrow",
        taskIds: ["task-5", "task-6"],
        inputText: "",
        display: false,
        color: "orange",
      },
      "column-3": {
        id: "column-3",
        title: "Future",
        taskIds: ["task-7", "task-8", "task-9"],
        inputText: "",
        display: false,
        color: "green",
      },
    },
    columnOrder: ["column-1", "column-2", "column-3"],
    categoryShow: false,
    categoryInputText: "",
    categoryOptions: false,
    colors: [
      { color: "red", selected: true },
      { color: "orange", selected: false },
      { color: "yellow", selected: false },
      { color: "green", selected: false },
      { color: "blue", selected: false },
      { color: "indigo", selected: false },
      { color: "violet", selected: false },
    ]
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
  handleInput = (e, id) => {
    e.preventDefault();
    const column = this.state.columns[id];
    const newTaskIds = Array.from(column.taskIds);
    let arrayNum = Object.keys(this.state.tasks).length + 1;
    let taskName = "task-" + arrayNum.toString();
    while (this.state.tasks.hasOwnProperty(taskName)) {
      arrayNum++;
      taskName = "task-" + arrayNum.toString();
    }

    newTaskIds.push(taskName);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
      inputText: "",
    };

    const newObject = Object.assign(
      {
        [taskName]: {
          id: taskName,
          content: this.state.columns[id].inputText,
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
    };
    this.setState(newState);
  };
  handleDelete = (e, id) => {
    const currentTask = this.state.columns[id].taskIds[e];
    const tasksCopy = { ...this.state.tasks };
    const tasksArray = Array.from(this.state.columns[id].taskIds);
    delete tasksCopy[currentTask];
    tasksArray.splice(e, 1);

    const newColumn = {
      ...this.state.columns[id],
      taskIds: tasksArray,
    };

    const newState = {
      ...this.state,
      tasks: { ...tasksCopy },
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      },
    };
    this.setState(newState);
  };
  handleInputChange = (e, id) => {
    const itemText = e.target.value;
    const newColumn = {
      ...this.state.columns[id],
      inputText: itemText,
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
  handleTaskCompletion = (e, id) => {
    const currentTask = this.state.columns[id].taskIds[e];
    if (this.state.tasks[currentTask].done === false) {
      this.setState((prevState) => ({
        tasks: {
          ...prevState.tasks,
          [currentTask]: {
            ...prevState.tasks[currentTask],
            done: true,
          },
        },
      }));
    } else {
      this.setState((prevState) => ({
        tasks: {
          ...prevState.tasks,
          [currentTask]: {
            ...prevState.tasks[currentTask],
            done: false,
          },
        },
      }));
    }
  };
  handleCategoryDisplay = () => {
    this.setState((prevState) => ({ categoryShow: !prevState.categoryShow }));
  };
  handleAddCategory = (e) => {
    e.preventDefault();
    let columnNum = this.state.columnOrder.length + 1;
    let columnName = "column-" + columnNum.toString();
    const columnArray = Array.from(this.state.columnOrder);
    const currentColor = this.state.colors.find(x => x.selected === true).color;

    while (this.state.columns.hasOwnProperty(columnName)) {
      columnNum++;
      columnName = "column-" + columnNum.toString();
    }

    columnArray.push(columnName);

    let newColumn = {};
    if (columnNum > 1) {
      newColumn = {
        id: columnName,
        title: this.state.categoryInputText,
        taskIds: [],
        inputText: "",
        display: false,
        color: currentColor
      };
    } else {
      newColumn = {
        id: columnName,
        title: this.state.categoryInputText,
        taskIds: [],
        inputText: "",
        display: true,
        color: currentColor
      };
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [columnName]: newColumn,
      },
      columnOrder: columnArray,
      categoryInputText: "",
    };
    this.setState(newState);
  };
  handleCategoryInput = (e) => {
    const itemText = e.target.value;

    const newState = {
      ...this.state,
      categoryInputText: itemText,
    };
    this.setState(newState);
  };
  handleDeleteCategory = (index) => {
    const currentCategory = this.state.columnOrder[index];
    const columnsCopy = { ...this.state.columns };
    const tasksCopy = { ...this.state.tasks };
    const deleteTasks = this.state.columns[currentCategory].taskIds;
    deleteTasks.forEach((x) => delete tasksCopy[x]);
    const columnArray = Array.from(this.state.columnOrder);
    delete columnsCopy[currentCategory];
    columnArray.splice(index, 1);

    const newState = {
      ...this.state,
      tasks: tasksCopy,
      columns: columnsCopy,
      columnOrder: columnArray,
    };
    this.setState(newState);
  };
  handleChangeCategories = (index) => {
    const currentCategory = this.state.columnOrder[index];
    const columnsCopy = { ...this.state.columns };
    for (const property in columnsCopy) {
      columnsCopy[property].display = false;
    }
    columnsCopy[currentCategory].display = true;

    const newState = {
      ...this.state,
      columns: columnsCopy,
      categoryShow: false,
    };
    this.setState(newState);
  };
  handleColorChange = (index) => {
    const colorsCopy = [...this.state.colors];
    colorsCopy.forEach(x => x.selected = false)
    colorsCopy[index].selected = true;
    const newState = {
      ...this.state,
    };
    this.setState(newState);
  }
  handleOptionsShow = () => {
    this.setState((prevState) => ({ categoryOptions: !prevState.categoryOptions }));
  }
  render() {
    return (
      <div className={styles.toDoList}>
        <Categories
          show={this.state.categoryShow}
          categories={this.state.columns}
          categoryShow={this.handleCategoryDisplay}
          add={this.handleAddCategory}
          input={this.handleCategoryInput}
          delete={this.handleDeleteCategory}
          text={this.state.categoryInputText}
          change={this.handleChangeCategories}
          order={this.state.columnOrder}
          colors={this.state.colors}
          colorChange={this.handleColorChange}
          options={this.state.categoryOptions}
          optionsShow={this.handleOptionsShow}
        />
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
                id={column.id}
                add={this.handleInput}
                input={this.handleInputChange}
                complete={this.handleTaskCompletion}
                taskState={this.state.tasks}
                delete={this.handleDelete}
                categoryShow={this.handleCategoryDisplay}
              />
            );
          })}
        </DragDropContext>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
