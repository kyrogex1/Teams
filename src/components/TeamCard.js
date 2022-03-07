import React, { Component } from "react";
import iconFavoriteActive from "../assets/svg/icon-favorite-active.svg";
import iconFavoriteInactive from "../assets/svg/icon-favorite-inactive.svg";
import iconConversations from "../assets/svg/icon-conversations-small.svg";
import iconLeads from "../assets/svg/icon-leads-small.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
        className={`card my-3 ${
          this.props.is_archived ? "team-card archived" : ""
        }`}
      >
        <div className="card-body">
          {/* Card header */}
          <div className="d-flex align-items-center mb-3">
            <img
              className="rounded me-3"
              height="45px"
              src={this.props.image}
            />
            <div className="d-flex justify-content-between align-items-start flex-grow-1">
              <div>
                <p className="card-text mb-0">
                  <strong>{this.props.name}</strong>
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    {this.props.created_at
                      ? `Created on ${this.props.created_at}`
                      : "\u00A0"}
                  </small>
                </p>
              </div>
              {this.state.isPendingFavorite ? (
                <button className="btn" disabled>
                  <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </button>
              ) : (
                <button className="btn" onClick={this.favoriteHandler}>
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
          </div>

          {/* Card Body */}
          <p className="card-text card-truncate">{this.props.description}</p>
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
