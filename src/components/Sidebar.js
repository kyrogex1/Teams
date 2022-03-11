import React, { Component } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";

import { ReactComponent as IconSaleswhale } from "../assets/svg/icon-saleswhale.svg";
import { ReactComponent as IconTeams } from "../assets/svg/icon-teams.svg";
import { ReactComponent as IconLeads } from "../assets/svg/icon-leads.svg";
import { ReactComponent as IconReports } from "../assets/svg/icon-reports.svg";
import { ReactComponent as IconCampaign } from "../assets/svg/icon-campaign.svg";
import { ReactComponent as IconHelp } from "../assets/svg/icon-help.svg";

export class Sidebar extends Component {
  // TODO: Make a better CSS Styling for this
  sidebarElement = (sidebarLink, key) => {
    const url = this.props?.match?.url ?? "/";
    return (
      <NavLink
        to={url + sidebarLink?.linkPath}
        key={key}
        className="sidebarElements"
        activeClassName="active"
      >
        <div className="p-3">
          <sidebarLink.svg className="text-white" />
        </div>
      </NavLink>
    );
  };

  render() {
    const url = this.props?.match?.url ?? "/";
    const sidebarLinks = [
      {
        svg: IconTeams,
        linkPath: "teams",
      },
      {
        svg: IconLeads,
        linkPath: "leads",
      },
      {
        svg: IconReports,
        linkPath: "reports",
      },
      {
        svg: IconCampaign,
        linkPath: "campaign",
      },
    ];

    return (
      <div className="bg-dark-purple d-flex flex-column h-100">
        <div className="p-3">
          <IconSaleswhale />
        </div>
        <div className="flex-grow-1 flex-column d-flex">
          {sidebarLinks.map((sidebarLink, index) =>
            this.sidebarElement(sidebarLink, index)
          )}
        </div>
        <NavLink role="button" to={url + "help"}>
          <div className="p-3 sidebarElements">
            <IconHelp className="text-white" />
          </div>
        </NavLink>
      </div>
    );
  }
}

export default withRouter(Sidebar);
