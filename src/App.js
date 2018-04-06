import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Timers from './timer.js';

class App extends Component {

 constructor(){
    super();
    this.state = {
      score: 0,
      wrong: 0,
      start: false,
      current: 0,
      meme: false,
      memePhotos: ["/images/meme1.jpg", "/images/meme2.png", "/images/meme3.png",
                   "/images/meme4.png"],
      answers: {0: {name: "Monica Brzozowski", correct: false, right: "/images/monicaC.png",
                    wrong: "/images/monicaW.png"} ,
                1: {name: "Adam Workineh", correct: false, right: "/images/adamC.jpg",
                    wrong: "/images/adamW.png"} ,
                2: {name: "Abdelhak Belatreche", correct: false, right: "/images/abC.jpg",
                    wrong: "/images/abW.png"},
                3: {name: "Stephen Haberle", correct: false, right: "/images/stephenHC.jpg",
                    wrong: "/images/stephenHW.png"},
                4: {name: "Zach Schaefer", correct: false, right: "/images/zachC.png",
                    wrong: "/images/zachW.png"}, 
                5: {name: "Allan La", correct: false, right: "/images/allanC.jpg",
                    wrong: "/images/allanW.png"}}
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.prevClicked = this.prevClicked.bind(this)
    this.nextClicked = this.nextClicked.bind(this)
    this.memeTime = this.memeTime.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    if(!this.state.start){
      this.setState({start: true})
    }
    var input = this.refs.who.value.toLowerCase()
    var pos = this.state.current
    var info = this.state.answers[pos]
    var name = info.name.toLowerCase()

    if(info.correct){
      return

    }
    else if(input.length < 3){
      alert("Enter an answer with more than 3 characters!")
      return
    }
    console.log("Correct Answer is " +name+ ", used for debugging purposes. Don't cheat.")
    

    if(name.includes(input) && !info.correct){
      info.correct = true
      this.setState({pos: info, score: this.state.score + 1})
      if(this.state.score == Object.keys(this.state.answers).length-1){
        this.setState({start:false})
      }
    }else{
      this.setState({meme: true})
      this.setState({wrong: this.state.wrong + 1})
    }
  }

  memeTime(){
    this.setState({meme: false})
    console.log("here")
  }

  handleStart(){
    this.setState({start: true})
  }

  nextClicked(e){
    e.preventDefault()
    if(this.state.current < Object.keys(this.state.answers).length -1){
      this.setState({current: this.state.current+1})
    }
  }

  prevClicked(e){
    e.preventDefault()
    if(this.state.current > 0){
      this.setState({current: this.state.current-1})
    }
  }

  render() {
    var pos = this.state.current
    var info = this.state.answers[pos]

    if(info.correct){
      var image = info.right     
    }else{  
      var image = info.wrong
    }

    var wrong = ""
    if(this.state.meme){
      wrong = <h1 className="wrong">Wrong!!! Heres a meme for punishment.</h1>
      var memePhotos = this.state.memePhotos
      image = memePhotos[Math.floor(Math.random()*memePhotos.length)];
    }

    var options = { prefix: "seconds elapsed!", delay: 100}
    return (
      <div className = "container">
        <h1 id="header">
          <p id="headerText">ESA Sporcle Quiz, Who Am I?</p>          
        </h1>

        <div>
          <Timers meme= {this.state.meme} memeTime={this.memeTime.bind(this)} start={this.state.start}/>
          <div className = "score col-md-2 col-lg-2">
              Score: <br></br>{this.state.score}/{Object.keys(this.state.answers).length}
              <br></br> Wrong Answers: {this.state.wrong}
          </div>

          <div className = "current col-md-8 col-lg-8">
              Current Slide: {this.state.current + 1}/{Object.keys(this.state.answers).length}
              <button className="start btn btn-success" onClick={this.handleStart.bind(this)} >Start</button>
          </div>
        </div>

        {wrong}
        <div className = "image col-md-12 col-lg-12">
          <img src={process.env.PUBLIC_URL + image}></img>
          
          <form>
            <label>Who Am I?</label><br />
            <input type="text" ref="who" />
            <div>
              <button className="btn btn-primary" onClick={this.handleSubmit.bind(this)} type="submit" >Submit</button>
              <button className="btn btn-primary" onClick={this.prevClicked.bind(this)} >Previous</button>
              <button className="btn btn-primary" onClick={this.nextClicked.bind(this)} >Next</button>
            </div> 
          </form>

          <footer>Developed by the famous Allan La, Class of 2018</footer>                                                       
        </div>

      </div>//div to wrap everything into one element
    );

        
  }//renders bracket
}//class bracket

export default App;
