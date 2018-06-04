import React from "react";

class Booklist extends React.Component {

  handleClick(event){
    const book = event.currentTarget.textContent;
    console.log(book);
    this.props.removeBook(book);
  }

  render() {

    let list = this.props.list;

    return(
      <div className="booklist-container">
      	<h3>I would like to read...</h3>
        {list.map((item, i) => {
            return <p key={i} onClick={this.handleClick.bind(this)}><span className="delete-me" ></span>{item}</p>;
          })
        }
      </div>
    );
  }
}

export default Booklist;