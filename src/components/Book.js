import React from "react";

const API_subjects = 'http://api-biblio.officebureau.ca/wp-json/wp/v2/subject/';

class Book extends React.Component {

  handleClick(){
    const title = this.props.book.title.rendered;
    this.props.addBook(title);
  }

  // Send the ISBN back to App to change state of "extradetails"
  handleMore(){
    const isbn = this.props.book.acf.isbn;
    this.props.viewDetails(isbn);
  }

  render() {
    //Link the book subject IDs to their subject objects
    const subjectID = this.props.book.subject;
    const filteredSub = this.props.subjects.filter(function(el){ 
      return ~subjectID.indexOf(el.id)
    });

    //Link the book author IDs to their subject objects
    const authorID = this.props.book.author;
    const filteredAut = this.props.authors.filter(function(el){ 
      return ~authorID.indexOf(el.id)
    });

    let booklist = this.props.booklist;

  	let cover = this.props.book._embedded['wp:featuredmedia'][0];
    return(
      <div className="book-item">
        <div className="image-container">
      	  <img src={cover.source_url} alt={cover.title.rendered} />
        </div>
        <div className="details-container">
          <p className="small">{this.props.book.acf.isbn}</p>
          <h2>{this.props.book.title.rendered}</h2>
          <p className="authors">
            {filteredAut.map((author, i) => {
              return <span key={i}>{ (i ? ', ' : '') + author.name }</span>
              })
            }
          </p>
          <div className="subjects">
            <h3>Subjects</h3>
            <p className="small">
              {filteredSub.map((subject, i) => {
                return <span key={i}>{ (i ? ', ' : '') + subject.name }</span>
                })
              }
            </p>
          </div>
          <button onClick={this.handleClick.bind(this)}>Add to reading list</button>
          <button onClick={this.handleMore.bind(this)}>See more details</button>
        </div>
      </div>
    );
  }
}

export default Book;