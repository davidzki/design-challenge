import React, { Component } from 'react';
import './App.css';
import names from './names.json';
import businesses from './business.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorBox: '',
      randomName: '',
      business: '',
      fonts: '',
    }
    
  }

  getRandomName() {
    var name = names[Math.floor(Math.random()*names.length)];
    this.setState(
      {
        randomName: name,
      }
    )
  }

  getRandomBiz() {
    var business = businesses[Math.floor(Math.random()*businesses.length)];
    this.setState({
      business: business,
    })
  }

  getRandomColor() {
    var colorhash = '#';
    var color = colorhash += Math.floor(Math.random()*16777215).toString(16).toUpperCase();

    this.setState(
      {
        colorBox: color,
      }
    )
  }

  componentDidMount() {
    this.getRandomColor();
    this.getRandomName();
    this.getRandomBiz();
    this.getRandomFont();
  }

  
  randomizeAll() {
    this.getRandomColor();
    this.getRandomName();
    this.getRandomBiz();
    this.getRandomFont();
  }

  getRandomFont() {

    fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAeFUacTE8P1Dn6APjr-1FLpF5y_61MNwA')
    .then(items => {
      return items.json();
    }).then(data => {
      let fonts = data.items.map((font) => {
        return(
          <span key={font.items}>
          {font.family}
          </span>
        )
      })
      this.setState({fonts: fonts[Math.floor(Math.random()*fonts.length)]});
    })

  }

  render() {

    return (
      <div>
      <div className="top__desc">
        <div className="challenge">Challenge yourself<br />by clicking the dice!</div>
        <div onClick={() => this.randomizeAll()}><i className="fas fa-dice-d6"></i></div>
      </div>
      <div id="main">
        <div className="box name">
          <div className="desc">          
            <i className="fas fa-signature"></i>
            <div>Name</div>
          </div>
          <h2>{this.state.randomName}</h2>
          <button className="btn" onClick={() => this.getRandomName()}>NEW NAME</button>
        </div>
        <div className="box business">
          <div className="desc">          
              <i className="far fa-address-card"></i>
              <div>Business</div>
          </div>
          <p>{this.state.business}</p>
          <button className="btn" onClick={() => this.getRandomBiz()}>NEW BUSINESS</button>
        </div>
        <div className="box font">
          <div className="desc">          
              <i className="fas fa-font"></i>
              <div>Font</div>
          </div>
          <div>{this.state.fonts}</div>
          <button className="btn" onClick={() => this.getRandomFont()}>NEW FONT</button>
        </div>
        <div className="box color">
          <div className="desc">          
              <i className="fas fa-palette"></i>
              <div>Brand color</div>
          </div>
          <div className="color__box" style={{background: this.state.colorBox}}></div>
          <p>{this.state.colorBox}</p>
          <button className="btn" onClick={() => this.getRandomColor()}>NEW COLOR</button>
        </div>
      </div>

      <div id="brief" className="box">
        <div className="desc">
          <i className="far fa-file-alt"></i>
          <div>Brief</div>
        </div>
      <p>Your mission is to design a brand by the name of <b>{this.state.randomName}</b> that work with <i>{this.state.business.toLowerCase()}</i>. The brand color is {this.state.colorBox} and you are allowed to use <b>{this.state.fonts}</b> as font.</p>

      </div>
      <p className="by">Made by davidzki </p>
      </div>
    );
  }
}

export default App;
