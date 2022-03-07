import React, { Component } from "react";
import iconSearch from "../assets/svg/icon-search.svg";

export class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      timeoutId: null,
    };
  }

  internalChangeHandler = (event) => {
    const value = event.target.value;
    this.setState({
      value,
    });

    const timeoutId = setTimeout(() => this.props.onChange(value), 500);
    clearTimeout(this.state.timeoutId);

    this.setState({
      timeoutId: timeoutId,
    });
  };

  render() {
    return (
      <div className="d-flex me-3 align-items-center">
        <img src={iconSearch} height={"18px"} className="me-2" />
        <input
          className="border-0"
          placeholder="Search Team Name"
          value={this.state.value}
          onChange={this.internalChangeHandler}
        />
        {this.props.isLoading ? (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Input;
