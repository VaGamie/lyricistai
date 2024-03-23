import './App.scss';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {Component, useRef} from 'react'
import {  faSearch, faHistory, faGear, faCaretDown} from '@fortawesome/free-solid-svg-icons'
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
import image from '../src/profile_img/defaultt.jpg'


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      validation: false,
      loading: true,
      details: [],
      input_value: '',
      screen_width: window.innerWidth,

      // determins whether the user clicked on the avtar button
      avatar_validation: false,


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
    this.menueref = React.createRef()
    this.sidebarref = React.createRef()
    this.bar1ref = React.createRef()
    this.bar2ref = React.createRef()
    this.bar3ref = React.createRef()
    this.avatarRef = React.createRef()
    this.dropdown_iconRef = React.createRef()
    this.avatarcircleRef = React.createRef()

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

  
  

  menuecontrol = () => {
    let sidebar = this.sidebarref.current;
    console.log("sidebar is", sidebar)
    
    

    if (this.state.validation === true){
      sidebar.style.display = 'none';
      this.setState({validation: false})
      console.log("sidebar was set to none")
      console.log("validation (from first click) is", this.state.validation)
      this.bar2ref.current.style.width = '43px';
      this.bar3ref.current.style.width = '43px';
    }else{
      this.bar2ref.current.style.width = '33px';
      this.bar3ref.current.style.width = '23px';
      sidebar.style.display = 'flex';
      this.setState({validation: true})
      console.log("sidebar was set to flex")
      console.log("validation (from second click) is", this.state.validation)
    }

    // checking to see if the user clicks outside the sidebar
    window.addEventListener('mouseup', (e) => {
      if (e.target !== this.sidebarref.current && e.target !== this.menueref.current){
        if (this.state.validation === true){
          sidebar.style.display = 'none';
          this.setState({validation: false})
          console.log("sidebar was set to none")
          console.log("validation is (from even)", this.state.validation)
          this.bar2ref.current.style.width = '43px';
          this.bar3ref.current.style.width = '43px';
        }
      }
    })
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
    this.screen_width_track()





    this.setState({
      loading: false,
    })
    // this.onpop()
    window.onload = () =>{
      const path = window.location.pathname;
      
      console.log(`path name is ${path}`)
      this.change_path(path.replace('/dashboard/', ''))
    }
    

  this.screensize()
  // this.avatar_click()

  console.log(`${this.avatarRef.current} is the avatar ref`)
      
  }

  // component ends here

  screensize = () => {
    if (this.state.screen_width > 670){
      // console.log(this.state.validation)

     if (this.bar2ref.current != null && this.bar3ref.current != null){
      this.bar2ref.current.style.width = '43px';
      this.bar3ref.current.style.width = '43px';
      }
      if (this.state.validation === true){
        this.sidebarref.current.style.display = 'none';
        this.setState({validation: false})
      }

    }

    // checking avatar validation (wasn't supposed to use this function but don't want to create a new function for it)

    if (this.avatarRef.current != null){
      if (this.state.avatar_validation === false){
        this.avatarRef.current.style.display = 'none'
        this.dropdown_iconRef.current.style.display = 'none'
      }
    }

    setTimeout(() => {
      this.screensize()
    }, 1)



    
  }

  screen_width_track = () => {
    if(this.state.screen_width !== window.innerWidth){
      this.setState({screen_width: window.innerWidth})
    }
    // console.log(`Screen size is ${this.state.screen_width}`)
    setTimeout(() => {
      this.screen_width_track()
    }, 1)
  }

  // avatar button click

  avatar_click = () => {
    let dropdown = this.avatarRef.current
    let dropdown_icon = this.dropdown_iconRef.current
    if (dropdown != null){
      if (this.state.avatar_validation === false){
        dropdown.style.display = 'flex'
        dropdown_icon.style.display = 'flex'
        this.setState({avatar_validation: true})
        // console.log("avatar button clicked 2")
  
      }else{
        dropdown.style.display = 'none'
        dropdown_icon.style.display = 'none'
        this.setState({avatar_validation: false})

        console.log("validation turned to false")
      }
    }
    // close it when the user clicks outside the dropdown
    window.addEventListener('mouseup', (e) => {
      console.log(e.target !== dropdown && e.target !== this.avatarcircleRef.current )
      console.log(this.state.avatar_validation + 'is validation')
      if (e.target !== dropdown && e.target !== this.avatarcircleRef.current){
        if (this.state.avatar_validation === true){
          dropdown.style.display = 'none'
          dropdown_icon.style.display = 'none'
          this.setState({avatar_validation: false})
          console.log("avatar button clicked (from event)")
        }
      }
      
      
    })
    
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
    const website_name = {
      transition: '0.5s ease',
      position: 'absolute',
      margin: '0px',
      top: '10px',
      padding: '0px',
      fontSize: '34px',
    }
    const name_span = {
      color: '#a76dd1'
    }
    
    if (this.state.loading){
      console.log("Currently Loading")
      return(
       
        


    <div className="App" style={loading_cursor}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div
        className="menuebar" >
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

              {/* navbar */}
              <div className='navbar'>
                {/* <a className='webname_a_tag' href='/'> <h2 className='webname'>Lyri</h2></a> */}
                <a href='/'> <h2 className='webname_navbar' style={website_name} > Lyri<span style={name_span} >cize a</span><span>i</span></h2> </a>
                <div className='navbar_icons'>
                  <a className='navebar_search_logo'  onClick= {(e) => { this.change_path('search'); }}><FontAwesomeIcon icon={faSearch} className='search_icon' /></a>
                  <a className='navebar_favorite_logo'  onClick= {(e) => { this.change_path('favorite'); }}><FontAwesomeIcon icon={faBookmark} className='favorite_icon' /></a>
                  <a className='navebar_history_logo'  onClick= {(e) => { this.change_path('history'); }}><FontAwesomeIcon icon={faHistory} className='search_icon' /></a>
                </div>


                {/* making menue bar */}
                <div onClick={this.menuecontrol} ref={this.menueref} className='menuebar_mobile'>
                  <div className='bar1' ref={this.bar1ref}></div>
                  <div className='bar2' ref={this.bar2ref}></div>
                  <div className='bar3' ref={this.bar3ref}></div>
                </div>
                
                {/* making an avatar button  */}
                
                <div className='avatar'>
                  <div  onClick={this.avatar_click} className='avatar_circle'>
                    <img ref={this.avatarcircleRef}  src= {image} alt='avatar' className='avatar_img'></img>
                  </div>
                  <div ref={this.dropdown_iconRef} className='avatar_dropdown'><FontAwesomeIcon icon = {faCaretDown}></FontAwesomeIcon></div>
                  <div ref={this.avatarRef} className='avatar_dropdown_content'>
                    <a className='manage_account' onClick= {(e) => { this.change_path('settings'); }}>Manage account</a>
                    <a id='sign_out'>Sign out</a>
                  </div>
                </div>

              </div>


              {/* sidebar */}
              <div className="menuebar" ref={this.sidebarref}>
              {/* <a className='webname_a_tag_sidebar' href='/'> <h2 className='webname_sidebar'>Lyri<span className='a_span'>cize a</span><span>i</span></h2> </a> */}
              <button id='search'  className='side_buttons search'  data-page='search' onClick= {(e) => { this.change_path(e.currentTarget.id); }} ><FontAwesomeIcon icon={faSearch} className='side_icon' /><span>Search</span></button>
              <button id='favorite' className='side_buttons favorite' data-page='favorite'onClick= {(e)  => { this.change_path(e.currentTarget.id)}}><FontAwesomeIcon icon={faBookmark} className='side_icon' /><span>Favorite</span></button>
              <button id='history' className='side_buttons history'  data-page='history' onClick= {(e) => { this.change_path(e.currentTarget.id)}} ><FontAwesomeIcon icon={faHistory} className='side_icon history' /><span>History</span></button>
              {/* <button id='settings' className='side_buttons settings'  data-page='settings' onClick= {(e) => { this.change_path(e.currentTarget.id)}} ><FontAwesomeIcon icon={faGear } className='side_icon settings' /><span>Settings</span></button> */}


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



