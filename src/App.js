import React from "react";

import Header from "./components/Header";
import Book from "./components/Book";
import Booklist from "./components/Booklist";
import ExtraDeets from "./components/ExtraDeets";

const API = 'http://api-biblio.officebureau.ca/wp-json/wp/v2/posts?_embed';

class App extends React.Component {

  state = {
    books: [],
    authors: [],
    subjects: [],
    extradetails: [],
    booklist: []
  }

  getBooks = async () => {
    const api_call = await fetch(API);
    const data = await api_call.json();
    const books = data.map(obj => obj);
    this.setState({books});
  };

  //Grab all the subjects because they are in a separate endpoint from posts
  getSubjects = async () => {
    const api_call = await fetch(`http://api-biblio.officebureau.ca/wp-json/wp/v2/subject/?per_page=100`);
    const data = await api_call.json();
    const subjects = data;
    this.setState({subjects});
  };

  //Grab all the authors because they are in a separate endpoint from posts
  getAuthors = async () => {
    const api_call = await fetch(`http://api-biblio.officebureau.ca/wp-json/wp/v2/author/?per_page=100`);
    const data = await api_call.json();
    const authors = data;
    this.setState({authors});
  };

  componentDidMount(){
    this.getBooks();
    this.getSubjects();
    this.getAuthors();
  }

  addBook(title){
    this.setState({
      booklist: [...this.state.booklist, title]
    });
  }

  removeBook(book){
    this.setState({
        booklist: this.state.booklist.filter(el => el !== book)
    });
  }

  viewDetails = async (isbn) => {
    let isbncl = isbn.replace(/-|\s/g,"");
    const api_call = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbncl}`);
    const data = await api_call.json();
    const extradetails = data;
    this.setState({extradetails});
  }

  removeDetails(){
    this.setState({extradetails: []});
  }

  filter(e){
    this.setState({filter: e.target.value});
  }

  render() {

    let books = this.state.books;
    if(this.state.filter){
      books = books.filter( book => book.title.rendered.toLowerCase().includes(this.state.filter.toLowerCase()))
    }

    return(
      <div className="app-wrapper">
        <header>
          <h1>Read More</h1>
          <p><span>Books about design and other things that interest us</span></p> 
        </header>
        <main>
          <div className="sidebar">
            <div className="sidebar-inner">
            <h3>Type to Filter by Title</h3>
              <input type="text" onChange={this.filter.bind(this)} />
              <Booklist list={this.state.booklist} removeBook={this.removeBook.bind(this)} />
            </div>
          </div>
          <div className="books-container">
            {books.map((book, i) => {
                return <Book key={i} book={book} addBook={this.addBook.bind(this)} viewDetails={this.viewDetails.bind(this)} subjects={this.state.subjects} authors={this.state.authors} />;
              })
            }
          </div>
          <ExtraDeets deets={this.state.extradetails} removeDetails={this.removeDetails.bind(this)} />
        </main>
      </div>
    );
  }
}

export default App;