import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import iconSaleswhale from "../assets/svg/icon-saleswhale.svg";
import iconTeams from "../assets/svg/icon-teams.svg";
import iconLeads from "../assets/svg/icon-leads.svg";
import iconReports from "../assets/svg/icon-reports.svg";
import iconCampaign from "../assets/svg/icon-campaign.svg";
import iconHelp from "../assets/svg/icon-help.svg";

export class Sidebar extends Component {
  // TODO: Make a better CSS Styling for this
  sidebarElement = (sidebarLink, key) => {
    const { location } = this.props;
    const locationFirstLevel = location.pathname.split("/")?.[1] ?? "";

    const pathActiveString =
      locationFirstLevel === sidebarLink.linkPath ? "active" : "";
    return (
      <Link to={"/" + sidebarLink?.linkPath} key={key}>
        <div className={`p-3 sidebarElements ${pathActiveString}`}>
          <img src={sidebarLink?.iconSrc} />
        </div>
      </Link>
    );
  };

  render() {
    // const sidebarLinks = [iconTeams, iconLeads, iconReports, iconCampaign];
    const sidebarLinks = [
      {
        iconSrc: iconTeams,
        linkPath: "teams",
      },
      {
        iconSrc: iconLeads,
        linkPath: "leads",
      },
      {
        iconSrc: iconReports,
        linkPath: "reports",
      },
      {
        iconSrc: iconCampaign,
        linkPath: "campaign",
      },
    ];

    return (
      <div className="bg-dark-purple d-flex flex-column h-100">
        <div className="p-3">
          <img src={iconSaleswhale} />
        </div>
        <div className="flex-grow-1 flex-column d-flex">
          {sidebarLinks.map((sidebarLink, index) =>
            this.sidebarElement(sidebarLink, index)
          )}
        </div>
        <a role="button">
          <div className="p-3 sidebarElements">
            <img src={iconHelp} />
          </div>
        </a>
      </div>
    );
  }
}

export default withRouter(Sidebar);
