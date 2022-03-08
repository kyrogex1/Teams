import React, { Component } from "react";
import AuthContext from "../context/AuthContext";

export class HeaderAvatar extends Component {
  render() {
    return (
      <div className="d-flex align-items-center">
        <span>Hello, {this?.context?.name}</span>
        <img
          src={this?.context?.avatar}
          style={{ height: "3rem" }}
          className="rounded-circle"
        />
        <button className="ms-2 btn p-0" style={{ height: 0 }}>
          <span className="triangle-down"></span>
        </button>
      </div>
    );
  }
}

HeaderAvatar.contextType = AuthContext;
export default HeaderAvatar;
