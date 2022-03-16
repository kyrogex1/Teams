import React, { Component } from "react";
import iconFavoriteActive from "../assets/svg/icon-favorite-active.svg";
import iconFavoriteInactive from "../assets/svg/icon-favorite-inactive.svg";
import iconConversations from "../assets/svg/icon-conversations-small.svg";
import iconLeads from "../assets/svg/icon-leads-small.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { avatarIcon } from "../util/api";

const loadingPlaceHolder = (
  <div className="card p-3">
    <Skeleton count={7} />
  </div>
);

export class TeamCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPendingFavorite: false,
    };
  }

  favoriteHandler = async () => {
    this.setState({
      isPendingFavorite: true,
    });

    await this.props.favoriteHandler(this.props.id);

    this.setState({
      isPendingFavorite: false,
    });
  };

  render() {
    if (this.props.isLoading) {
      return loadingPlaceHolder;
    }

    return (
      <div
        className={`card my-3 flex-grow-1 ${
          this.props.is_archived ? "team-card archived" : ""
        }`}
      >
        <div className="card-body">
          {/* Card header */}
          <div className="d-flex align-items-start mb-3">
            {/* Team Image */}
            <img
              className="rounded me-3"
              height="45px"
              width="45px"
              src={this.props.image ?? avatarIcon}
              alt={this.props.name ?? "Unknown"}
            />
            {/* Team Name */}
            <div className="flex-grow-1">
              <p className="card-text mb-0">
                <strong>{this.props.name}</strong>
              </p>
              <p className="card-text">
                <small className="text-muted card-date-truncate">
                  {this.props.created_at
                    ? `Created ${this.props.created_at}`
                    : "\u00A0"}
                </small>
              </p>
            </div>
            {/* Favorite Icon */}
            {this.state.isPendingFavorite ? (
              <button className="btn p-0" disabled>
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </button>
            ) : (
              <button className="btn p-0" onClick={this.favoriteHandler}>
                <img
                  src={
                    this.props.is_favorited
                      ? iconFavoriteActive
                      : iconFavoriteInactive
                  }
                />
              </button>
            )}
          </div>

          {/* Card Body */}
          <p className="card-text card-description-truncate">
            {this.props.description}
          </p>
        </div>
        {/* Card Footer */}
        <div className="card-footer bg-transparent py-3">
          <div className="d-flex">
            <div className="me-2">
              <img src={iconConversations} className="me-2" />
              <small className="text-muted">
                {this.props?.campaigns_count?.toLocaleString()} Campaigns
              </small>
            </div>
            <div>
              <img src={iconLeads} className="me-2" />
              <small className="text-muted">
                {this.props?.leads_count?.toLocaleString()} Leads
              </small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeamCard;
