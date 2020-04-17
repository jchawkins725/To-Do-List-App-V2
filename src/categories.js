import React from "react";
import styles from "./style.module.scss";
import {
  FaPlus,
  FaChevronRight,
  FaListAlt,
  FaMinusCircle,
} from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import {Transition} from 'react-spring/renderprops'

export default class Categories extends React.Component {
  render() {
    const categoryArray = [];
    for (var key of Object.keys(this.props.categories)) {
      categoryArray.push(this.props.categories[key].title);
    }
    return <Transition
    items={this.props.show}
    from={{ transform: 'scaleX(0)', transformOrigin: 'left', padding: '20px 0px' }}
    enter={{ transform: 'scaleX(1)', transformOrigin: 'left', padding: '20px 20px' }}
    leave={{ transform: 'scaleX(0)', transformOrigin: 'left', padding: '20px 0px' }}>
      {show => show && (props =>
        <div className={styles.categories} style={props}>
          <h2>New List</h2>
          <div className={styles.formcontainer}>
            <form onSubmit={this.props.add}>
              <input
                onChange={this.props.input}
                value={this.props.text}
                placeholder="Add List"
                required
              ></input>
              <button type="submit">
                <FaPlus />
              </button>
            </form>
            <div className={styles.colorcontainer}>
              {this.props.colors.map((x, index) => {
                return (
                  <button
                    key={x.color}
                    style={{
                      backgroundColor: `${x.color}`,
                      boxShadow: `${
                        x.selected === true ? "0 0 0 2px gray" : "none"
                      }`,
                    }}
                    onClick={() => this.props.colorChange(index)}
                  ></button>
                );
              })}
            </div>
          </div>
          <div className={styles.mylistcontainer}>
            <h2>My Lists</h2>
            <button onClick={this.props.optionsShow}>
              <IoMdMore />
            </button>
          </div>
          <ul>
            {categoryArray.map((x, index) => {
              return (
                <li key={index}>
                  {this.props.options && (
                    <button
                      onClick={() => this.props.delete(index)}
                      className={styles.delete}
                    >
                      <FaMinusCircle />
                    </button>
                  )}
                  <button onClick={() => this.props.change(index)}>
                    <FaListAlt
                      color={
                        this.props.categories[this.props.order[index]].color
                      }
                    />
                    <p>{x}</p>
                    <FaChevronRight className={styles.chevronright} />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>)}
        </Transition>
  }
}
