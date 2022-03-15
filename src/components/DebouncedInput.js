import React, { Component } from "react";
import iconSearch from "../assets/svg/icon-search.svg";

export class DebouncedInput extends Component {
  constructor(props) {
    super(props);
    this.timeoutId = null;
    this.state = {
      value: "",
    };
  }

  internalChangeHandler = (event) => {
    const value = event.target.value;
    this.setState({
      value,
    });

    const timeoutId = setTimeout(
      () => this.props.onChange(value),
      this.props.debounceDuration
    );
    clearTimeout(this.timeoutId);
    this.timeoutId = timeoutId;
  };

  // Escape hatch to allow parent to set state value
  setQuery = (query) => {
    if (query !== this.state.value) {
      this.setState({ value: query }, () =>
        this.props.onChange(this.state.value)
      );
    }
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

DebouncedInput.defaultProps = {
  debounceDuration: 500,
};

export default DebouncedInput;
