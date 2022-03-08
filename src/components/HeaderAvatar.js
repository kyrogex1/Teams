import React, { Component } from "react";
import AuthContext from "../context/AuthContext";
import Dropdown from "./Dropdown";

export class HeaderAvatar extends Component {
  render() {
    const dropdownItems = ["Dropdown 1", "Dropdown 2", "Dropdown 3"];

    return (
      <div className="d-flex align-items-center">
        <span>Hello, {this?.context?.name}</span>
        <img
          src={this?.context?.avatar}
          style={{ height: "3rem" }}
          className="rounded-circle"
        />
        <Dropdown items={dropdownItems} />
      </div>
    );
  }
}

HeaderAvatar.contextType = AuthContext;
export default HeaderAvatar;
