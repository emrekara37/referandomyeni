import React, { Component } from "react";
import { connect } from "react-redux";
import FooterCard from "./footerCard";
import { url } from "../config.json";
import EditModal from "./editModal";

class ProfileCard extends Component {
  state = {
    editModalShow: false
  };

  editModalClose = () => {
    this.setState({ editModalShow: false });
  };

  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        {user && (
          <React.Fragment>
            <div className="ui segment profile a-profile-card ">
              <div className="ui image cover">
                <img src={url + "img/cover.jpg"} alt="cover" />
              </div>
              <div className="content">
                <a className="info" href="#">
                  <div className="ui avatar image">
                    <img src={url + "img/img_avatar3.png"} alt="" />
                  </div>
                  <div className="header" href="#">
                    <h3>
                      {user.name
                        ? user.name + " " + user.surname
                        : user.username}
                    </h3>
                    <p>@{user.username}</p>
                  </div>
                  <div
                    className="ui blue button duzenle a-more-radius"
                    onClick={() => this.setState({ editModalShow: true })}
                  >
                    Düzenle
                  </div>
                </a>
                <p className="bio">
                  {user.status
                    ? user.status
                    : "Student at University. Loves to build new tools using popular technologies as a creator."}
                </p>
                <ul className="links">
                  <li>
                    <i className="chain icon" />
                    <a
                      href={
                        user.website
                          ? user.website
                          : "https://www.referandombeta.herokuapp.com"
                      }
                    >
                      {user.website
                        ? user.website
                        : "referandombeta.herokuapp.com"}
                    </a>
                  </li>
                  <li>
                    <i className="envelope icon" />{" "}
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </li>
                  <li>
                    <i className="map marker alternate icon" />{" "}
                    {user.location ? user.location : "Konum yok"}
                  </li>
                </ul>
              </div>
              <div className="extra content">
                <div className="ui two column grid">
                  <div className="column">
                    <i className="check icon" />
                    {user.numberOfVote} Oy
                  </div>
                  <div className="column right aligned">
                    <i className="comment icon" />
                    {user.numberOfComment} Yorum
                  </div>
                </div>
              </div>
            </div>
            <FooterCard />
          </React.Fragment>
        )}
        <EditModal
          show={this.state.editModalShow}
          onHide={this.editModalClose}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data
  };
};

export default connect(mapStateToProps)(ProfileCard);
