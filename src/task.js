import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaCheck,FaTimes } from "react-icons/fa";
import styles from "./style.module.scss";



export default class Task extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <div
            className={`${styles.listItem} ${
              snapshot.isDragging ? styles.dragging : ""
            } ${this.props.done ? styles.done : ""}`}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <button onClick={() => this.props.complete(this.props.index, this.props.columnId)}>
              <div
                className={styles.circle}
              >
                {this.props.done && <FaCheck />}
              </div>
            </button>
            <div className={styles.handlecontainer}>
              <div className={styles.handle} {...provided.dragHandleProps}>
                {this.props.task.content}
              </div>
            </div>
            <button onClick={() => this.props.delete(this.props.index, this.props.columnId)} className={styles.delete}>
                {this.props.done && <FaTimes />}
            </button>
          </div>
        )}
      </Draggable>
    );
  }
}
