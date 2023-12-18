import './App.scss';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {Component, useRef} from 'react'
import {  faSearch, faHistory } from '@fortawesome/free-solid-svg-icons'
import { faBookmark} from '@fortawesome/free-regular-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Search from './WebComponents/Search';
import Favorite from './WebComponents/Favorite';
import History from './WebComponents/History';
import Home from './WebComponents/home'
import { useState } from 'react';



class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      details: [],
      input_value: ''
    }
    //this.change_path = this.change_path.bind(this)

    this.homeRef = React.createRef()
    this.searchRef = React.createRef()
    this.favoriteRef = React.createRef()
    this.historyRef = React.createRef()
    this.inputref = React.createRef()
  }
  


  

  search_visible = (e) =>{
    this.searchRef.current.style.display = "flex"
    // console.log("history ref is" + this.historyRef.current)
    this.historyRef.current.style.display = "none"
    this.favoriteRef.current.style.display = "none"
  }
  favorite_visible = (e) => {
    this.searchRef.current.style.display = "none"
    this.historyRef.current.style.display = "none"
    this.favoriteRef.current.style.display = "flex"
  }

  history_visible() {
    console.log(this.historyRef.current.id)
    console.log(this.searchRef.current.id)
    console.log(this.favoriteRef.current.id)

    //each one of their id's
    const history_id = document.getElementById(this.historyRef.current.id);
    const search_id = document.getElementById(this.favoriteRef.current.id);
    const favorite_id = document.getElementById(this.favoriteRef.current.id);

    // each one of their currents
    const history_current = this.historyRef.current;
    const search_current = this.searchRef.current;
    const favorite_current = this.favoriteRef.current;


    if (history_id) {
      // Now it's safe to access the style property
      history_current.style.display = 'block';
      search_current.style.display = 'none';
      favorite_current.style.display = 'none';
    }
  }

  change_path = (e) => {
    const path = e;
    console.log( `e is ${e}` );
    if (e === 'favorite') {
      this.props.history.push(`/dashboard/${path}`);
      document.title = `${e[0].toUpperCase() + e.slice(1).toLowerCase()} - Lyricize ai`;
  
      this.setState({loading: true}, async () => {
        await this.mounting().then(() => {
          this.setState({loading: false}, () => {
            this.searchRef.current.style.display = "none";
            this.historyRef.current.style.display = "none";
            this.favoriteRef.current.style.display = "flex";
          });
        }).catch((e) => {console.log("Error fetching data", e)});
      });
    } else {
      this.props.history.push(`/dashboard/${path}`);
      document.title = `${e[0].toUpperCase() + e.slice(1).toLowerCase()} - Lyricize ai`;
    }
  }

  

  async mounting(){
    // this.setState({loading: true})
    try{
      const res = axios.get('https://jsonplaceholder.typicode.com/users')
      const data = (await res).data
        this.setState({
          details:data,
          
        });
        this.searchRef.current.style.display = "none"
        this.historyRef.current.style.display = "none"
        this.favoriteRef.current.style.display = "flex"
        console.log("Data retrieved succesfully!")
    } catch(err ){
      // this.setState({loading: false})
      console.log("Error retreiving your data, please try again")
    }   
        
    

  }

  

 

  

  onpop = () => {
    window.onpopstate = async (e) => {
      if (e.state !== null) { // Check if e.state is not null
        if (e.state.section !== null) {
          console.log(e.state.section);
          if(e.state.section === 'favorite'){ 
            
      this.setState({loading: true}, async () => {
        await this.mounting().then(() => {
          this.setState({loading: false}, () => {
            this.searchRef.current.style.display = "none"
            this.historyRef.current.style.display = "none"
            this.favoriteRef.current.style.display = "flex"
          })
  
        }).catch((e) => {console.log("Error fetching data", e)})
      })
          }
          if (e.state.section === 'search'){
            this.search_visible()
          }
          if (e.state.section === 'history'){
          this.history_visible()
          }
        } else {
          console.log("nothing");
        }
      } else {
        console.log("State is null");
      }
    };
  }

  //preventing the page from reloading when button is pressed
  handleSubmit = (e) =>{
    e.preventDefault()
    this.inputref.current.value = ''
  }


  

  // handelling the changing of path (what should be rendered when the user types in what path)

  handlePath = (e) => {
    const path = e
    if (e === '/dashboard/favorite') {
      console.log("Handle path at favorite")
      console.log("it's mounting at", this.favoriteRef.current)
      window.history.pushState({section: path}, "", e)
      document.title = `${e[1].toUpperCase()+  e.slice(2).toLowerCase()} - Lyricize ai`


      this.setState({loading: true}, async () => {
        await this.mounting().then(() => {
          this.setState({loading: false}, () => {
            this.searchRef.current.style.display = "none"
            this.historyRef.current.style.display = "none"
            this.favoriteRef.current.style.display = "flex"
          })
  
        }).catch((e) => {console.log("Error fetching data", e)})
      })

      // Imma be back
    }
    if(e === '/dashboard/search'){
      this.searchRef.current.style.display = "flex"
      this.historyRef.current.style.display = "none"
      this.favoriteRef.current.style.display = "none"
      window.history.pushState({section: path}, "", e)
      document.title = `${e[1].toUpperCase()+  e.slice(2).toLowerCase()} - Lyricize ai`
    }
    if(e === '/dashboard/history'){
      this.searchRef.current.style.display = "none"
      this.historyRef.current.style.display = "flex"
      this.favoriteRef.current.style.display = "none"
      window.history.pushState({section: e}, "", e)
      document.title = `${e[1].toUpperCase()+  e.slice(2).toLowerCase()} - Lyricize ai`
    }
    if (e === '/dashboard'){
      this.searchRef.current.style.display = "flex"
      this.historyRef.current.style.display = "none"
      this.favoriteRef.current.style.display = "none"
      window.history.pushState({section: path}, "", e)
      document.title = `${e[1].toUpperCase()+  e.slice(2).toLowerCase()} - Lyricize ai`
    }
  };

  componentDidUpdate(){
    console.log("it's updating at", this.historyRef.current)
  }
  
  componentDidMount(){
    console.log("it's mounting at", this.favoriteRef.current, this.historyRef.current, this.searchRef.current)
    // console.log("search ref is", this.favoriteRef.current)



    this.setState({
      loading: false,
    })
    this.onpop()
    window.onload = () =>{
      const path = window.location.pathname;
      
      console.log(`path name is ${path}`)
      this.handlePath(path)
    }
    
  }

  //updating the input value on change

  handleChange = ((e) => {
    this.setState({input_value: e.target.value})
    console.log(this.state.input_value)
  })

  render(){
  
    const custom_skeleton = {
      left: '50%',
      transform: 'translate(-50%, -50%)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      zIndex: '1',

    }
    const text_skeleton = {
      down: '-100px',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      position: 'relative',
      display: 'flex',
    }

    const favorite_B_blocker = {
      pointerEvents: 'none',
    };
    const loading_cursor = {
      cursor: 'progress'
    }
    
    if (this.state.loading){
      console.log("Currently Loading")
      return(
       
        


    <div className="App" style={loading_cursor}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div
        className="menuebar">
          <h2 className='webname_sidebar'>Lyri<span className='a_span'>cize a</span><span>i</span></h2>
          <button id='search'  className='side_buttons search'  data-page='search' style={favorite_B_blocker}  onClick= {(e) => {this.search_visible(); this.change_path(e.currentTarget.id); }} ><FontAwesomeIcon icon={faSearch} className='side_icon' /><span>Search</span></button>
          <button id='favorite' className='side_buttons favorite' style={favorite_B_blocker}  data-page='favorite'onClick= {(e) => {this.favorite_visible(); this.change_path(e.currentTarget.id); }}><FontAwesomeIcon icon={faBookmark} className='side_icon' /><span>Favorite</span></button>
          <button id='history' className='side_buttons history' data-page='history' style={favorite_B_blocker}  onClick= {(e) => {this.history_visible(); this.change_path(e.currentTarget.id);}} ><FontAwesomeIcon icon={faHistory} className='side_icon history' /><span>History</span></button>

      </div>

      <div className="wrapper">
        <div ref={this.favoriteRef}  id='favorite_right'>

            <div className='lst_skeleton' >
              {/* <Skeleton variant="circular" count={5}  style={custom_skeleton} width={400} height={250} /> */}
              <Skeleton baseColor='gray'  animation='wave' count={2}  style={text_skeleton} width={400} height={20} />
            </div>
          </div>
      </div>

  </div>

        );
    }else{
      
      {console.log("Done loading")}
      
      // make it so the style property called in the  search_visible, history_visible and favorite_visible functions works
      

    return (
      

      <div className="App" >
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
              <div className="menuebar">
              <h2 className='webname_sidebar'>Lyri<span className='a_span'>cize a</span><span>i</span></h2>
              <button id='search'  className='side_buttons search'  data-page='search' onClick= {(e) => {this.search_visible(); this.change_path(e.currentTarget.id); }} ><FontAwesomeIcon icon={faSearch} className='side_icon' /><span>Search</span></button>
              <button id='favorite' className='side_buttons favorite' data-page='favorite'onClick= {(e) => { this.change_path(e.currentTarget.id) }}><FontAwesomeIcon icon={faBookmark} className='side_icon' /><span>Favorite</span></button>
              <button id='history' className='side_buttons history'  data-page='history' onClick= {(e) => {this.history_visible(); this.change_path(e.currentTarget.id);}} ><FontAwesomeIcon icon={faHistory} className='side_icon history' /><span>History</span></button>

              </div>

              <div className="wrapper">
                <Search searchforward = {this.searchRef}/>
                <Favorite favoriteforward = {this.favoriteRef} detailsforward = {this.state.details}/>
                <History historyforward = {this.historyRef}/>
                <Router>
                  <Switch>
                      <Route path='/dashboard/search' render={(props) => <Search {...props} searchforward = {this.searchRef} />} />
                      <Route path='/dashboard/favorite' render={(props) => <Favorite {...props} favoriteforward = {this.favoriteRef} detailsforward = {this.state.details}/>} />
                      <Route path='/dashboard/history' render={(props) => <History {...props} historyforward = {this.historyRef}/>} />
                      <Route exact path='/dashboard' render = {() => <Redirect to='/dashboard/search' />} />
                      <Route path='/*' render={() => <h1>404: Page Not Found</h1>} />

                  </Switch>
              </Router>



                {/* <Router>
                  <Switch>
                    <Route exact path='/' component={Home}  />
                    <Route path='/search' component={<Search searchforward = {this.searchRef} />} />
                    <Route path='/favorite' component={<Favorite favoriteforward = {this.favoriteRef} detailsforward = {this.state.details}/>} />
                    <Route path='/history' component={<History historyforward = {this.historyRef}/>} />
                  </Switch>

                </Router> */}

                
                
              </div>


        
      </div>



     

      
    );
  };
};
}
export default App;



