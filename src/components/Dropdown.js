import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";

export class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleDropdown = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  dropdownElement = (item, key) => {
    return (
      <div
        className="border-bottom p-2"
        key={key}
        onClick={this.toggleDropdown}
        role="button"
      >
        {item}
      </div>
    );
  };

  render() {
    return (
      <div className="position-relative">
        {/* Find out why without d-flex this button fucks up */}
        <button className="ms-2 btn d-flex" onClick={this.toggleDropdown}>
          <span
            className={`${this.state.isOpen ? "triangle-up" : "triangle-down"}`}
          ></span>
        </button>
        <CSSTransition
          in={this.state.isOpen}
          timeout={300}
          classNames="cssT-dropdown-grow"
          unmountOnExit
        >
          <div
            className="position-absolute bg-white border overflow-hidden"
            style={{
              right: "0px",
              width: "150px",
            }}
          >
            {this.props.items.map((item, index) =>
              this.dropdownElement(item, index)
            )}
          </div>
        </CSSTransition>
      </div>
    );
  }
}

export default Dropdown;
