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
                   "/images/meme4.png", "/images/meme5.png", "/images/meme6.png", 
                   "/images/meme7.png", "/images/meme8.png", "/images/meme9.png", 
                   "/images/meme10.png", "/images/meme11.png", "/images/meme12.png", 
                   "/images/meme13.png", "/images/meme14.png", "/images/meme15.png", 
                   "/images/meme16.png", "/images/meme17.png", "/images/meme18.png",
                   "/images/meme19.png" , "/images/meme20.png"],
      answers: {0: {name: "Monica Brzozowski", correct: false, right: "/images/monicaC.png",
                    wrong: "/images/monicaW.png"} ,
                1: {name: "Adam Workineh", correct: false, right: "/images/adamC.jpg",
                    wrong: "/images/adamW.png"} ,
                2: {name: "Abdelhak Belatreche", correct: false, right: "/images/abC.jpg",
                    wrong: "/images/abW.png"},
                3: {name: "Hanna Rickertsen", correct: false, right: "/images/hannaC.png",
                    wrong: "/images/hannaW.png"},
                4: {name: "Airlia Martz", correct: false, right: "/images/airliaC.png",
                    wrong: "/images/airliaW.png"},
                5: {name: "Nate Haggerty", correct: false, right: "/images/nateC.png",
                    wrong: "/images/nateW.png"},
                6: {name: "Stephen Haberle", correct: false, right: "/images/stephenHC.jpg",
                    wrong: "/images/stephenHW.png"},
                7: {name: "Stephen Leslie", correct: false, right: "/images/stephenLC.png",
                    wrong: "/images/stephenLW.png"},                    
                8: {name: "Zach Schaefer", correct: false, right: "/images/zachC.png",
                    wrong: "/images/zachW.png"},
                9: {name: "Diana Jauregui", correct: false, right: "/images/dianaC.png",
                    wrong: "/images/dianaW.png"},
                10: {name: "Ranish Byanjankar", correct: false, right: "/images/ranishC.png",
                    wrong: "/images/ranishW.png"},                    
                11: {name: "Lliralyn McEachern", correct: false, right: "/images/liraC.png",
                    wrong: "/images/liraW.png"},
                12: {name: "Jake Pearl", correct: false, right: "/images/jakeC.png",
                    wrong: "/images/jakeW.png"},
                13: {name: "Kellen Haile", correct: false, right: "/images/kellenC.jpg",
                    wrong: "/images/kellenW.png"},
                14: {name: "Diego Aldana", correct: false, right: "/images/diegoC.png",
                    wrong: "/images/diegoW.png"},
                15: {name: "Gabe Gomez", correct: false, right: "/images/gabeC.png",
                    wrong: "/images/gabeW.png"},                    
                16: {name: "Elizabeth Mohler", correct: false, right: "/images/elizabethC.png",
                    wrong: "/images/elizabethW.png"},
                17: {name: "Lauren Sanchez", correct: false, right: "/images/laurenC.png",
                    wrong: "/images/laurenW.png"},
                18: {name: "Reginald Nelson", correct: false, right: "/images/reginaldC.png",
                    wrong: "/images/reginaldW.png"},
                19: {name: "Bobby Cao", correct: false, right: "/images/bobbyC.png",
                    wrong: "/images/bobbyW.png"},     
                20: {name: "Lidya Abune", correct: false, right: "/images/lidyaC.png",
                    wrong: "/images/lidyaW.png"},                  
                21: {name: "Allan La", correct: false, right: "/images/allanC.png",
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
    var name = ""
    if(info.correct){
      var image = info.right
      name = <h1 id="nameDisplay"> It's {info["name"]}!!!</h1>   
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

        <div>
          {wrong}
          {name}
        </div>
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
