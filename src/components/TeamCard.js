import React, { Component } from "react";
import iconFavoriteActive from "../assets/svg/icon-favorite-active.svg";
import iconFavoriteInactive from "../assets/svg/icon-favorite-inactive.svg";
import iconConversations from "../assets/svg/icon-conversations-small.svg";
import iconLeads from "../assets/svg/icon-leads-small.svg";

export class TeamCard extends Component {
  render() {
    return (
      <div
        className={`card my-3 ${
          this.props.is_archived ? "team-card archived" : ""
        }`}
      >
        <div className="card-body">
          {/* Card header */}
          <div class="d-flex align-items-center mb-3">
            <img
              className="rounded me-3"
              height="45px"
              src={this.props.image}
            />
            <div className="d-flex justify-content-between align-items-start flex-grow-1">
              <div>
                <p class="card-text mb-0">
                  <strong>{this.props.name}</strong>
                </p>
                <p class="card-text">
                  <small class="text-muted">
                    Created on {this.props.created_at}
                  </small>
                </p>
              </div>
              <button className="btn">
                <img
                  src={
                    this.props.is_favorited
                      ? iconFavoriteActive
                      : iconFavoriteInactive
                  }
                />
              </button>
            </div>
          </div>

          {/* Card Body */}
          <p className="card-text">{this.props.description}</p>

          {/* Card Footer */}
          <div className="card-footer bg-transparent">
            <div className="d-flex">
              <div className="me-2">
                <img src={iconConversations} class="me-2" />
                <small className="text-muted">
                  {this.props?.campaigns_count.toLocaleString()} Campaigns
                </small>
              </div>
              <div>
                <img src={iconLeads} class="me-2" />
                <small className="text-muted">
                  {this.props?.leads_count.toLocaleString()} Leads
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeamCard;
