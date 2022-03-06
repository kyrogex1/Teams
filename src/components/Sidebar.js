import React, { Component } from "react";

import iconSaleswhale from "../assets/svg/icon-saleswhale.svg";
import iconTeams from "../assets/svg/icon-teams.svg";
import iconLeads from "../assets/svg/icon-leads.svg";
import iconReports from "../assets/svg/icon-reports.svg";
import iconCampaign from "../assets/svg/icon-campaign.svg";
import iconHelp from "../assets/svg/icon-help.svg";

export class Sidebar extends Component {
  // TODO: Make a better CSS Styling for this
  sidebarElement = (svgIconSrc) => {
    return (
      <a role="button">
        <div className="p-3 sidebarElements">
          <img src={svgIconSrc} />
        </div>
      </a>
    );
  };

  render() {
    const sidebarSvgIconSrc = [iconTeams, iconLeads, iconReports, iconCampaign];

    return (
      <div className="bg-dark-purple d-flex flex-column h-100">
        <div className="p-3">
          <img src={iconSaleswhale} />
        </div>
        <div className="flex-grow-1 flex-column d-flex">
          {sidebarSvgIconSrc.map((icon) => this.sidebarElement(icon))}
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

export default Sidebar;
