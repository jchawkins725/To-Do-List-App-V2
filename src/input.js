import React from "react";
import { FaPlus } from "react-icons/fa";

export default class Input extends React.Component {
  render() {
    return (
      <form onSubmit={(e) => this.props.add(e, this.props.columnId)}>
        <input
          placeholder="Add task"
          onChange={(e) => this.props.input(e, this.props.columnId)}
          value={this.props.column.inputText}
          required
        ></input>
        <button type="submit">
          <FaPlus />
        </button>
      </form>
    );
  }
}
