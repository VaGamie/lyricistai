import React from 'react'
import './Home.scss';

class Home extends React.Component{
  constructor(props){
    super(props);
    }


    sendtodashboard = () => {
      console.log('sending to dashboard');
      this.props.history.push({
        pathname: '/dashboard',
        state: 'search'

      });
    }


  render(){
    return(
      <div className='home_page_div'>
          <h1 className='webname_sidebar_for_home_page'>Welcome to Lyri<span className='a_span'>cize A</span><span>I</span></h1>

          <div className='home_page_boxes_div'>
            <div className='our_mission_div' >
              <h2 className='our_mission_text'>Our mission!</h2>
              <p>Our job is to quickly help you find the book you desire.Find the most affortable and most reliable ones.</p>
            </div>
            <div className = 'how_it_works_div'>
              <h2 className='how_it_works_text'>How it works!</h2>
              <p>Search for the book of your choice and let us find the best place to obtain it. </p>
            </div>
          </div>
          

          <a className='get_started_a_tag' href='/dashboard/search'><button  className='get_started_button'>Get started</button></a>
          
      </div>
    )
  }

}

export default Home;