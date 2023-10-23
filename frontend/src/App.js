import logo from './logo.svg';
import './App.scss';
import React from 'react';
import axios from 'axios'


class App extends React.Component{
  state = {
    
  }

  showpage(page){
    document.querySelectorAll('innerwrap').forEach(screen =>{
      screen.style.display='none'
    })
    document.querySelector(`#${page}`).style.display = 'flex'
  }

  render(){
    return (
      <div className="App">

        <div className="menuebar">
          <button data-page='search' onClick={this.showpage(dataset.page)} >Search</button>
          <button data-page='favorite' >Favorites</button>
          <button data-page='history' >History</button>

        </div>

        <div className="wrapper">
          <div className='innerwrap' id='search'>
            <h1>This is the search</h1>
          </div>
          <div className='innerwrap' id='favorite'>
            <h1> My favorites</h1>
          </div>
          <div className='innerwrap' id='history'>
            <h1>My history</h1>
          </div>
        {/* <h1>Welcome to Lyricize AI</h1> */}
        </div>

        
      </div>
      
    );
  };
};
export default App;
