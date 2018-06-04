import React from "react";

class ExtraDeets extends React.Component {

  handleClick(){
    this.props.removeDetails();
  }

  render() {

    let deets = this.props.deets;

    //Only render the component if there are details to show
    if (Object.keys(deets).length == 0) {
      return(
        <p></p>
      );
    } else {
        if(deets.totalItems > 0){
          return(
            <div className="extra-details">
              <div className="close-me"><div className="barr" onClick={this.handleClick.bind(this)}></div></div>
              <h2>{deets.items[0].volumeInfo.title}</h2>
              <h3>{deets.items[0].volumeInfo.subtitle}</h3>
              <p className="publisher">Published by: {deets.items[0].volumeInfo.publisher}</p>
              <p className="description">{deets.items[0].volumeInfo.description}</p>
              <p className="pagecount">Pages: {deets.items[0].volumeInfo.pageCount}</p>
            </div>
          );
        } else {
          return(
            <div className="extra-details">
              <div className="close-me"><div className="barr" onClick={this.handleClick.bind(this)}></div></div>
              <p className="error">Sorry! No extra details for this book.</p>
            </div>
          );
        }
    }
  }
}

export default ExtraDeets;