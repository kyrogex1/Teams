import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { ReactComponent as IconSaleswhale } from "../assets/svg/icon-saleswhale.svg";
import { ReactComponent as IconTeams } from "../assets/svg/icon-teams.svg";
import { ReactComponent as IconLeads } from "../assets/svg/icon-leads.svg";
import { ReactComponent as IconReports } from "../assets/svg/icon-reports.svg";
import { ReactComponent as IconCampaign } from "../assets/svg/icon-campaign.svg";
import { ReactComponent as IconHelp } from "../assets/svg/icon-help.svg";

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
          <sidebarLink.svg className="text-white" />
        </div>
      </Link>
    );
  };

  render() {
    // const sidebarLinks = [iconTeams, iconLeads, iconReports, iconCampaign];
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
        <a role="button">
          <div className="p-3 sidebarElements">
            <IconHelp className="text-white" />
          </div>
        </a>
      </div>
    );
  }
}

export default withRouter(Sidebar);
