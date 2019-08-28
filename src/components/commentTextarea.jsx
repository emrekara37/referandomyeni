import React, { Component } from "react";
import { connect } from "react-redux";
import logger from "../services/logService";
import {
  uiStartCommentButton,
  uiStopCommentButton,
  handleShowToast
} from "../store/actions/index";
import { url } from "../config.json";

class CommentTextarea extends Component {
  state = {
    text: "",
    remainingWord: 500
  };

  handleChange = e => {
    const text = e.currentTarget.value;
    this.setState({ text, remainingWord: 500 - text.length });
  };

  handleSubmit = async e => {
    this.props.onStartCommentButton();

    try {
      await this.props.onAddReason(this.state.text);
      this.props.onShowToast("Yorum gönderildi", "green");
    } catch (error) {
      this.props.onStopCommentButton();
      if (
        error.response &&
        (error.response.status === 500 || error.response.status === 400)
      ) {
        logger.log(error);
        this.props.onShowToast("Yorum gönderilemedi", "red");
        return;
      }
    }
    this.setState({ text: "", remainingWord: 500 });

    this.props.onStopCommentButton();
  };

  render() {
    return (
      <div className="kullanici-yorum">
        <div
          className={`content ${
            this.props.vote ? "katiliyorum" : "katilmiyorum"
          }`}
        >
          <h3>
            <b>{this.props.vote ? "Katılıyorum " : "Katılmıyorum "}</b>
            çünkü;
          </h3>
          <div className="ui form">
            <div className="yorum">
              <div className="ui avatar image foto">
                <img
                  src={`${url}${this.props.user ? this.props.user.ppLink : ""}`}
                  alt=""
                />
              </div>
              <div className="kutu">
                <textarea
                  rows="3"
                  maxLength="500"
                  value={this.state.text}
                  onChange={this.handleChange}
                />
                <span className="enter">{this.state.remainingWord}</span>
                <div
                  className={`ui blue button noborder mt-2 ${
                    this.props.commentButton ? "loading" : ""
                  }`}
                  onClick={this.handleSubmit}
                >
                  Yorum Yap
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    commentButton: state.ui.commentButton
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStartCommentButton: () => dispatch(uiStartCommentButton()),
    onStopCommentButton: () => dispatch(uiStopCommentButton()),
    onShowToast: (text, variant) => dispatch(handleShowToast(text, variant))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentTextarea);
