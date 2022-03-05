import React, { Component } from "react";

import iconSaleswhale from "../assets/svg/icon-saleswhale.svg";
import iconTeams from "../assets/svg/icon-teams.svg";
import iconLeads from "../assets/svg/icon-leads.svg";
import iconReports from "../assets/svg/icon-reports.svg";
import iconCampaign from "../assets/svg/icon-campaign.svg";

export class Sidebar extends Component {
  // TODO: Make a better CSS Styling for this
  sidebarElement = (svgIconSrc) => {
    return (
      <a className="p-3 sidebarElements" role="button">
        <img src={svgIconSrc} />
      </a>
    );
  };

  render() {
    const sidebarSvgIconSrc = [iconTeams, iconLeads, iconReports, iconCampaign];

    return (
      <div className="bg-primary d-flex flex-column">
        <a className="p-3">
          <img src={iconSaleswhale} />
        </a>
        {sidebarSvgIconSrc.map((icon) => this.sidebarElement(icon))}
      </div>
    );
  }
}

export default Sidebar;
