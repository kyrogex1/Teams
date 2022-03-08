import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import HeaderAvatar from "./HeaderAvatar";
import HeaderNotifications from "./HeaderNotifications";

// TODO: Seperate the badge number
export class Header extends Component {
  mainHeader = () => {
    const { location } = this.props;
    const topPath = location?.pathname?.split?.("/")?.[1];
    const capitalizedTopPath =
      topPath?.charAt(0)?.toUpperCase?.() + topPath?.slice(1);

    return (
      <div className="border-bottom">
        <div className="d-flex">
          <div className="py-2 px-3 border-end d-flex justify-content-center align-items-center">
            Narwhal
          </div>
          <div className="p-2 flex-grow-1 d-flex justify-content-between align-items-center">
            <p className="mb-0">{capitalizedTopPath}</p>
            <div className="d-flex align-items-center">
              <HeaderNotifications />
              <div className="ms-3" />
              <HeaderAvatar />
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

export default withRouter(Header);
