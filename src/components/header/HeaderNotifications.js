import React, { Component } from "react";
import iconMail from "../../assets/svg/icon-mail.svg";
import AuthContext from "../../context/AuthContext";

export class HeaderNotifications extends Component {
  render() {
    let notificationText;
    if (this?.context?.notifications_count) {
      if (this.context.notifications_count > 99) {
        notificationText = "99+";
      } else {
        notificationText = this.context.notifications_count;
      }
    }
    return (
      <>
        {/* REFLECTION : Why the badge alignment screwed up without d-flex */}
        <button className="btn position-relative">
          <img src={iconMail} />
          {notificationText ? (
            <p
              className="text-white d-flex justify-content-center align-items-center position-absolute mb-0 top-0 end-0 bg-primary border border-2 border-light rounded-circle"
              style={{ width: "22px", height: "22px" }}
            >
              <span>{notificationText}</span>
            </p>
          ) : null}
        </button>
      </>
    );
  }
}
HeaderNotifications.contextType = AuthContext;
export default HeaderNotifications;
