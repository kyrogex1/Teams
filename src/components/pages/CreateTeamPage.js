import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { addTeam } from "../../util/api";
import { generateRandomNumber } from "../../util/utils";
import TeamCard from "../TeamCard";

export class CreateTeamPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: null,
      description: "",
      campaigns_count: 0,
      leads_count: 0,
      is_favorited: false,
      is_archived: false,
    };
  }

  onFileChange = (e) => {
    const files = e.target.files;
    const file = files[0];
    this.getBase64(file);
  };

  getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({
        image: reader.result,
      });
    };
  };

  onSubmit = async (e) => {
    await addTeam({ ...this.state, id: generateRandomNumber() });
    alert(
      "Your Team has been saved, you may view your new team in the Teams Page"
    );
    this.props.history.push(".");
  };

  render() {
    return (
      <>
        <div className="container">
          <h3 className="my-4">Create a Team</h3>
          <div className="row">
            <p>How your team card looks like</p>
            <div className="col-sm-8 col-md-6 col-lg-4">
              <TeamCard {...this.state} />
            </div>
          </div>
          <form>
            <div class="mb-3">
              <label for="team-name" class="form-label">
                Team Name
              </label>
              <input
                class="form-control"
                id="team-name"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">
                Description
              </label>
              <textarea
                class="form-control"
                id="description"
                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}
              />
            </div>
            <div class="mb-3">
              <label for="campaigns-count" class="form-label">
                Campaigns count
              </label>
              <input
                type="number"
                class="form-control"
                id="campaigns-count"
                value={this.state.campaigns_count}
                onChange={(e) =>
                  this.setState({ campaigns_count: e.target.value })
                }
              />
            </div>
            <div class="mb-3">
              <label for="leads-count" class="form-label">
                Leads count
              </label>
              <input
                type="number"
                class="form-control"
                id="leads-count"
                value={this.state.leads_count}
                onChange={(e) => this.setState({ leads_count: e.target.value })}
              />
            </div>
            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="is-favorited"
                value={this.state.is_favorited}
                onChange={(e) =>
                  this.setState({ is_favorited: e.target.value })
                }
              />
              <label class="form-check-label" for="is-favorited">
                Favorited
              </label>
            </div>
            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="is-archived"
                value={this.state.is_archived}
                onChange={(e) => this.setState({ is_archived: e.target.value })}
              />
              <label class="form-check-label" for="is-archived">
                Archived
              </label>
            </div>
            <div class="mb-3">
              <label for="image" class="form-label">
                Default file input example
              </label>
              <input
                class="form-control"
                type="file"
                id="image"
                onChange={this.onFileChange}
              />
            </div>
            <button
              onClick={this.onSubmit}
              type="button"
              class="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default withRouter(CreateTeamPage);
