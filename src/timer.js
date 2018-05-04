
import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
 
class Timers extends Component {
  /* delay is just the delay on showing the update of the timer */
	 constructor(){
	    super();
	    
	    this.state = {
	       timer: null,
	       counter: 0,
	       memeCount: 0,
	       finishCount: 0
	  	};

	  	this.tick = this.tick.bind(this)
	  }

	componentDidMount() {
	    let timer = setInterval(this.tick, 1000);
	    this.setState({timer: timer});
	  }


	componentWillUnmount() {
	    this.clearInterval(this.state.timer);
	  }

	tick() {
		if (this.props.start){
			var time = this.state.counter + 1
		    this.setState({
		      counter: time
		    })

		    if(this.props.meme){
		    	if(this.state.memeCount==4){
		    		this.setState({memeCount: 0})
		    		this.props.memeTime()
		    	}else{
		    		this.setState({memeCount: this.state.memeCount+1})
		    	}
		    }
		}

		if (this.props.finish){
			if(this.state.finishCount != 6){
				this.setState({finishCount: this.state.finishCount+1})
			}else{
				this.props.handleFinal()
			}
		}
	  }

	render() {
	  return (
	  	<div className="timer col-md-2 col-lg-2">
	  		Time Elapsed: {this.state.counter} seconds
	  	</div>
	  	)
	}
}

export default Timers;