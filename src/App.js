import React, {Component} from 'react';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter
} from "@fortawesome/free-brands-svg-icons";


class App extends Component {
  constructor(){
    super();
    this.state = ({
      color: "purple"
    });
    
    this.handleColorChange = this.handleColorChange.bind(this);
  }
  
  //Change the color of the App
  handleColorChange(color){
    this.setState({
      color: color
    });
  }
  
  render() {
    return (
      <div id="app" className={this.state.color}
      style = {{backgroundColor: this.state.color}}
      >
        <QuoteBox onChangeAppColor={this.handleColorChange} color={this.state.color} />
      </div>
    );
  }
}

//Quote Box Component
class QuoteBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      quoteText: "",
      quoteAuthor: "",
      curColor: this.props.color,
      tweetUrl: "https://twitter.com/intent/tweet/?text="
    }
    
    this.getNewQuote();
    
    //Bind Handles and Functions
    this.getNewQuote = this.getNewQuote.bind(this);
    this.handleNewQuote = this.handleNewQuote.bind(this);
  }
  
  //Get a quote and author from an API and set state
  getNewQuote(){
    const app = this;
    fetch('https://api.quotable.io/random')
    .then((response) => response.json())
    .then((data) => {
      app.setState({
        quoteText: data.content,
        quoteAuthor: data.author,
        tweetUrl: "https://twitter.com/intent/tweet/?text=" + data.content.replace(/ /g, "+")
      });
    });
  }
  
  //Handles the new quote button click
  handleNewQuote(){
    const colors = ["gray", "blue", "purple", "red", "orange", "green","Tan",
    "Lime","Brown","Cyan","Beige","Lavender","Maroon","Peru","Salmon","Sienna"];
    let color = colors[Math.floor(Math.random() * colors.length)];
    while(color == this.state.curColor){
      color = colors[Math.floor(Math.random() * colors.length)];
    }
    this.setState({
      curColor: color
    });
    this.props.onChangeAppColor(color);
    this.getNewQuote();
  }
  
  render() {
    return (
      <main id="quote-box">
        <div id="quote-content">
          <div id="text">{this.state.quoteText }</div>
          <div id="author">{ this.state.quoteAuthor }</div>
        </div>
        <button onClick={this.handleNewQuote} id="new-quote">Get New Quote</button>
        <a href={ this.state.tweetUrl } target="_blank" id="tweet-quote">
  <FontAwesomeIcon icon={faTwitter} size="1x" />Tweet Quote</a>
      </main>
    );
  }
}

export default App