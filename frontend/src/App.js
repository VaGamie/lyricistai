import './App.scss';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {Component, useRef} from 'react'
import {  faSearch, faHistory, faGear } from '@fortawesome/free-solid-svg-icons'
import { faBookmark} from '@fortawesome/free-regular-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS

import 'react-loading-skeleton/dist/skeleton.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Search from './WebComponents/Search';
import Favorite from './WebComponents/Favorite';
import History from './WebComponents/History';
import Settings from './WebComponents/Settings';
import FavoriteSkeleton from './WebComponents/favorite_skeleton';
import { withRouter } from 'react-router-dom';



class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      details: [],
      input_value: '',

          // affecting the style of the search, history and favorite components
      searchState: true,
      historyState: false,
      favoriteState: false
    }
    //this.change_path = this.change_path.bind(this)

    this.homeRef = React.createRef()
    this.searchRef = React.createRef()
    this.favoriteRef = React.createRef()
    this.historyRef = React.createRef()
    this.inputref = React.createRef()
    this.settingsRef = React.createRef()


  }
  


  

  

  change_path = (e) => {
    const path = e;
    console.log("path is", path)
     if (e === 'favorite') {

      this.props.history.push({
        pathname: '/dashboard/favorite',
        state: { section: path }
      });
      document.title = `${e[0].toUpperCase() + e.slice(1).toLowerCase()} - Lyricize ai`;

      this.setState({loading: true}, async () => {
        await this.mounting().then(() => {
          this.setState({loading: false}, () => {
            console.log("Done mounting")

          });
        }).catch((e) => {console.log("Error fetching data", e)});
      });
    } else if (e === 'search') {
      this.setState({loading: true}, () => {
        setTimeout(() => {
          this.setState({loading: false})
        }, 0.001);
      })

      this.props.history.push({
        pathname: '/dashboard/search',
        state: { section: path }
      });
      document.title = `${e[0].toUpperCase() + e.slice(1).toLowerCase()} - Lyricize ai`;

    } else if (e === 'history') {
    // make history component visible
    this.setState({loading: true}, () => {
      setTimeout(() => {
        this.setState({loading: false})
      }, 0.001);
    })
    this.props.history.push({
      pathname: '/dashboard/history',
      state: { section: path }
    });
    document.title = `${e[0].toUpperCase() + e.slice(1).toLowerCase()} - Lyricize ai`;

  } else if (e === 'settings') {
    // make history component visible
    this.setState({loading: true}, () => {
      setTimeout(() => {
        this.setState({loading: false})
      }, 0.001);
    })
    this.props.history.push({
      pathname: '/dashboard/settings',
      state: { section: path }
    });
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
        // call favorite component
        console.log("Data retrieved succesfully!")
    } catch(err ){
      // this.setState({loading: false})
      console.log("Error retreiving your data, please try again")
    }   
        
    

  }

  

 

  

  // onpop = () => {
  //   window.onpopstate = async (e) => {
  //     console.log("popstate event triggered!");
  //     if (e.state !== null) { // Check if e.state is not null
  //       console.log("state is :", e.state)
  //       if (e.state.section !== null) {
  //         console.log( "section is: ",e.state.section);
  //         if(e.state.section === 'favorite'){ 
  //           this.change_path('dashboard/favorite')
  //         }
  //         if (e.state.section === 'search'){
  //           this.change_path('dashboard/search')
  //         }
  //         if (e.state.section === 'history'){
  //         this.change_path('dashboard/history')
  //         }
  //       } else {
  //         console.log("nothing");
  //       }
  //     } else {
  //       console.log("State is null");
  //     }
  //   };
  // }

  //preventing the page from reloading when button is pressed
  handleSubmit = (e) =>{
    e.preventDefault()
    this.inputref.current.value = ''
  }


  

  // handelling the changing of path (what should be rendered when the user types in what path)

  // handlePath = (e) => {
  //   const path = e
  //   if (e === '/dashboard/favorite') {
  //     console.log("Handle path at favorite")
  //     console.log("it's mounting at", this.favoriteRef.current)
  //     window.history.pushState({section: path}, "", e)
  //     document.title = `${e[1].toUpperCase()+  e.slice(2).toLowerCase()} - Lyricize ai`


  //     this.setState({loading: true}, async () => {
  //       await this.mounting().then(() => {
  //         this.setState({loading: false}, () => {
  //           this.searchRef.current.style.display = "none"
  //           this.historyRef.current.style.display = "none"
  //           this.favoriteRef.current.style.display = "flex"
  //         })
  
  //       }).catch((e) => {console.log("Error fetching data", e)})
  //     })

  //     // Imma be back
  //   }
  //   if(e === '/dashboard/search'){
  //     this.searchRef.current.style.display = "flex"
  //     this.historyRef.current.style.display = "none"
  //     this.favoriteRef.current.style.display = "none"
  //     window.history.pushState({section: path}, "", e)
  //     document.title = `${e[1].toUpperCase()+  e.slice(2).toLowerCase()} - Lyricize ai`
  //   }
  //   if(e === '/dashboard/history'){
  //     this.searchRef.current.style.display = "none"
  //     this.historyRef.current.style.display = "flex"
  //     this.favoriteRef.current.style.display = "none"
  //     window.history.pushState({section: e}, "", e)
  //     document.title = `${e[1].toUpperCase()+  e.slice(2).toLowerCase()} - Lyricize ai`
  //   }
  //   if (e === '/dashboard'){
  //     this.searchRef.current.style.display = "flex"
  //     this.historyRef.current.style.display = "none"
  //     this.favoriteRef.current.style.display = "none"
  //     window.history.pushState({section: path}, "", e)
  //     document.title = `${e[1].toUpperCase()+  e.slice(2).toLowerCase()} - Lyricize ai`
  //   }
  // };

  componentDidUpdate(){
    console.log("Content updated")
    // reload the page
    // make the page reload only once

    

  }
  
  componentDidMount(){
    console.log("Content mounted")




    this.setState({
      loading: false,
    })
    // this.onpop()
    window.onload = () =>{
      const path = window.location.pathname;
      
      console.log(`path name is ${path}`)
      this.change_path(path.replace('/dashboard/', ''))
    }
    
  }

  //updating the input value on change

  handleChange = ((e) => {
    this.setState({input_value: e.target.value})
    console.log(this.state.input_value)
  })


  render(){
  



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
              <a className='webname_a_tag_sidebar' href='/'> <h2 className='webname_sidebar'>Lyri<span className='a_span'>cize a</span><span>i</span></h2> </a>
              <button id='search'  className='side_buttons search'  data-page='search' style={favorite_B_blocker} onClick= {(e) => { this.change_path(e.currentTarget.id); }} ><FontAwesomeIcon icon={faSearch} className='side_icon' /><span>Search</span></button>
              <button id='favorite' className='side_buttons favorite' data-page='favorite' style={favorite_B_blocker} onClick= {(e)  => { this.change_path(e.currentTarget.id)}}><FontAwesomeIcon icon={faBookmark} className='side_icon' /><span>Favorite</span></button>
              <button id='history' className='side_buttons history'  data-page='history' style={favorite_B_blocker} onClick= {(e) => { this.change_path(e.currentTarget.id)}} ><FontAwesomeIcon icon={faHistory} className='side_icon history' /><span>History</span></button>
              {/* add settings button */}
              <button id='settings' className='side_buttons settings'  data-page='settings' style={favorite_B_blocker}  onClick= {(e) => { this.change_path(e.currentTarget.id)}} ><FontAwesomeIcon icon={faGear} className='side_icon settings' /><span>Settings</span></button>

      </div>

      <div className="wrapper">
        <div ref={this.favoriteRef}  id='favorite_right'>

            <FavoriteSkeleton/>
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
              <a className='webname_a_tag_sidebar' href='/'> <h2 className='webname_sidebar'>Lyri<span className='a_span'>cize a</span><span>i</span></h2> </a>
              <button id='search'  className='side_buttons search'  data-page='search' onClick= {(e) => { this.change_path(e.currentTarget.id); }} ><FontAwesomeIcon icon={faSearch} className='side_icon' /><span>Search</span></button>
              <button id='favorite' className='side_buttons favorite' data-page='favorite'onClick= {(e)  => { this.change_path(e.currentTarget.id)}}><FontAwesomeIcon icon={faBookmark} className='side_icon' /><span>Favorite</span></button>
              <button id='history' className='side_buttons history'  data-page='history' onClick= {(e) => { this.change_path(e.currentTarget.id)}} ><FontAwesomeIcon icon={faHistory} className='side_icon history' /><span>History</span></button>
              <button id='settings' className='side_buttons settings'  data-page='settings' onClick= {(e) => { this.change_path(e.currentTarget.id)}} ><FontAwesomeIcon icon={faGear } className='side_icon settings' /><span>Settings</span></button>


              </div>

              <div className="wrapper">
                <Router>
                  <Switch>
                      <Route path='/dashboard/search' render={(props) => <Search {...props} searchforward = {this.searchRef} />} />
                      <Route path='/dashboard/favorite' render={(props) => <Favorite {...props} favoriteforward = {this.favoriteRef} detailsforward = {this.state.details}/>} />
                      <Route path='/dashboard/history' render={(props) =>  <History {...props} historyforward = {this.historyRef}/>} />
                      <Route path = '/dashboard/settings' render={(props) => <Settings {...props} settingsforward = {this.settingsRef} />} />

                      <Route exact path='/dashboard' render = {() => <Redirect to='/dashboard/search'  />} />
                      <Route path='/dashboard/*' render={() => <h1>404: Page Not Found</h1>} />

                  </Switch>
              </Router>





                
                
              </div>


        
      </div>



     

      
    );
  };
};
}
export default withRouter(App);



