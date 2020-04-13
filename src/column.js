import React from "react";
import Task from "./task";
import Input from "./input";
import { Droppable } from "react-beautiful-dnd";
import styles from "./style.module.scss";

export default class Column extends React.Component {
  render() {
    return (
      <div className={styles.toDoList}>
        <h1>{this.props.column.title}</h1>
        <Input
          add={this.props.add}
          input={this.props.input}
          inputText={this.props.inputText}
        />
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <div
              className={`${styles.list} ${
                snapshot.isDraggingOver ? styles.dragging : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.props.tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    complete={this.props.complete}
                    done={this.props.taskState[task.id].done}
                    delete={this.props.delete}
                  />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}
