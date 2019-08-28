import React, { Component } from "react";

class ExpandButton extends Component {
  render() {
    const { vote, onClick, role, role2, display, text } = this.props;

    return (
      <div className={`ui grid butonlar d-${display ? "block" : "none"}`}>
        <div
          className={`column ${vote ? "katiliyorum" : "katilmiyorum"} ${
            role === "collapse" ? "a-daralt" : ""
          }`}
          onClick={onClick}
        >
          {text}
          <i
            className={`fa fa-chevron-${
              role === "expand" ? "down" : role2 === "viewAll" ? "" : "up"
            } ml-3`}
            aria-hidden="true"
          />
        </div>
      </div>
    );
  }
}

export default ExpandButton;
