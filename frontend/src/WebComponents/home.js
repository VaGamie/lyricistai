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
          <button onClick={this.sendtodashboard} className='get_started_button'>Get started</button>
          
      </div>
    )
  }

}

export default Home;