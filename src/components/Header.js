import React, { Component } from "react";
import iconNotification from "../assets/svg/icon-notifications.svg";

// TODO: Seperate the badge number
export class Header extends Component {
  mainHeader = () => {
    return (
      <div className="border-bottom">
        <div className="d-flex align-items-center">
          <div className="py-2 px-3 border-end">Narwhal</div>
          <div className="p-2 flex-grow-1 d-flex justify-content-between align-items-center">
            <p className="mb-0">Teams</p>
            <div className="d-flex align-items-center">
              <button className="btn">
                <img src={iconNotification} height="100%" />
              </button>
              <p className="mb-0">Dropdown</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return <div className="bg-white">{this.mainHeader()}</div>;
  }
}

export default Header;
