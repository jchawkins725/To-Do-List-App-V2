import React from "react";
import Task from "./task";
import Input from "./input";
import { Droppable } from "react-beautiful-dnd";
import styles from "./style.module.scss";
import { FaChevronLeft } from "react-icons/fa";

export default class Column extends React.Component {
  render() {
    return (
      this.props.column.display && (
      <div>
        <button className={styles.categoryLink} onClick={this.props.categoryShow}><FaChevronLeft />lists</button>
        <h1 style={{color: `${this.props.column.color}`}}>{this.props.column.title}</h1>
        <Input
          add={this.props.add}
          input={this.props.input}
          columnId={this.props.id}
          column={this.props.column}
        />
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <div
              className={`${styles.list} ${
                snapshot.isDraggingOver ? styles.dragging : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{backgroundColor: `${
                snapshot.isDraggingOver ? this.props.column.color : ""
              }`}}
            >
              {this.props.tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    columnId={this.props.id}
                    complete={this.props.complete}
                    done={this.props.taskState[task.id].done}
                    delete={this.props.delete}
                  />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>)
    );
  }
}
