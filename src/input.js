import React from "react";
import { FaPlus } from "react-icons/fa";

export default class Input extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.add}>
        <input
          placeholder="Add task"
          onChange={this.props.input}
          value={this.props.inputText}
          required
        ></input>
        <button type="submit">
          <FaPlus />
        </button>
      </form>
    );
  }
}
