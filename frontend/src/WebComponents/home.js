import React from 'react'
import './Home.scss';

class Home extends React.Component{
  constructor(props){
    super(props);
    }


    sendtodashboard = () => {
      console.log('sending to dashboard');
      this.props.history.push('/dashboard');
    }


  render(){
    return(
      <div>
          <h1 className='webname_sidebar_for_home_page'>Welcome to Lyri<span className='a_span'>cize A</span><span>I</span></h1>

          <div className='our_mission_div' >
            <h2 className='our_mission_text'>Our mission!</h2>
            <p>Our job is to quickly help you find the book you desire. Well find the most affortable and most reliable ones.</p>
          </div>

          <button onClick={this.sendtodashboard} className='get_started_button'>Get started</button>
          
      </div>
    )
  }

}

export default Home;