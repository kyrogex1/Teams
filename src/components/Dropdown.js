import React, { Component } from "react";

// TODO: Animate dropdown minheight ?
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
        {this.state.isOpen ? (
          <div
            className="position-absolute bg-white border"
            style={{
              right: "0px",
              width: "150px",
            }}
          >
            {this.props.items.map((item, index) =>
              this.dropdownElement(item, index)
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Dropdown;
