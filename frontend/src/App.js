import './App.scss';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {Component, useRef} from 'react'
import {  faSearch, faHistory } from '@fortawesome/free-solid-svg-icons'
import { faBookmark} from '@fortawesome/free-regular-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      details: [],
      input_value: ''
    }
    //this.change_path = this.change_path.bind(this)


    this.searchRef = React.createRef()
    this.favoriteRef = React.createRef()
    this.historyRef = React.createRef()
    this.inputref = React.createRef()
  }
  
  // DELETING SOON

  

  search_visible = (e) =>{
    this.searchRef.current.style.display = "flex"
    this.historyRef.current.style.display = "none"
    this.favoriteRef.current.style.display = "none"
  }
  favorite_visible = (e) => {
    this.searchRef.current.style.display = "none"
    this.historyRef.current.style.display = "none"
    this.favoriteRef.current.style.display = "flex"
  }

  history_visible = (e) =>{
    this.searchRef.current.style.display = "none"
    this.historyRef.current.style.display = "flex"
    this.favoriteRef.current.style.display = "none"
  }

  change_path = (e) => {
    const path = e
    console.log(e)
    if (e === 'favorite'){
      
      window.history.pushState({section: path}, "", e)
      document.title = `${e[0].toUpperCase()+  e.slice(1).toLowerCase()} - Lyricize ai`

      this.setState({loading: true}, async () => {
        await this.mounting().then(() => {
          this.setState({loading: false}, () => {
            this.searchRef.current.style.display = "none"
            this.historyRef.current.style.display = "none"
            this.favoriteRef.current.style.display = "flex"
          })
  
        }).catch((e) => {console.log("Error fetching data", e)})
      })

      

      
    }else{

    window.history.pushState({section: path}, "", e)
    document.title = `${e[0].toUpperCase()+  e.slice(1).toLowerCase()} - Lyricize ai`
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

  handlePath = (path) => {
    if (path === '/favorite') {
      console.log("Handle path at favorite")
      console.log("it's mounting at", this.favoriteRef.current)


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
    if(path === '/search'){
      this.searchRef.current.style.display = "flex"
      this.historyRef.current.style.display = "none"
      this.favoriteRef.current.style.display = "none"
    }
    if(path === '/history'){
      this.searchRef.current.style.display = "none"
      this.historyRef.current.style.display = "flex"
      this.favoriteRef.current.style.display = "none"
    }
  };

  componentDidUpdate(){
    console.log("it's updating at", this.favoriteRef.current)
  }
  
  componentDidMount(){
    console.log("it's mounting at", this.favoriteRef.current)

    this.setState({
      loading: false,
    })
    this.onpop()
    window.onload = () =>{
      const path = window.location.pathname;
      console.log(path)
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
      <Skeleton variant="circular" count={5}  style={custom_skeleton} width={400} height={250} />
      
      </div>
    </div>

        );
    }else{
      {console.log("Done loading")}

    return (


      <div className="App" >
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <div 
         className="menuebar">
          <h2 className='webname_sidebar'>Lyri<span className='a_span'>cize a</span><span>i</span></h2>
          <button id='search'  className='side_buttons search'  data-page='search' onClick= {(e) => {this.search_visible(); this.change_path(e.currentTarget.id); }} ><FontAwesomeIcon icon={faSearch} className='side_icon' /><span>Search</span></button>
          <button id='favorite' className='side_buttons favorite' data-page='favorite'onClick= {(e) => { this.change_path(e.currentTarget.id) }}><FontAwesomeIcon icon={faBookmark} className='side_icon' /><span>Favorite</span></button>
          <button id='history' className='side_buttons history'  data-page='history' onClick= {(e) => {this.history_visible(); this.change_path(e.currentTarget.id);}} ><FontAwesomeIcon icon={faHistory} className='side_icon history' /><span>History</span></button>

        </div>

        <div className="wrapper">

          <div ref={this.searchRef} className='innerwrap' id='search_page'>
            <h1>Search</h1>
            <form onSubmit={this.handleSubmit}>
              <div className='seachbarNsearchI'>
              <div className='wrapper_searh_icon'><FontAwesomeIcon icon={faSearch} className='side_icon' /></div>
                <input 
                  ref={this.inputref}
                  onChange={this.handleChange}
                  className='search_input'
                  placeholder= "Search via URL"// <FontAwesomeIcon icon={faSearch} className='side_icon' />
                  type='url' 
                ></input>
              </div>
              <button  type='submit' id='search_submit_button' > Search</button>
            </form>
          </div>
          <div ref={this.favoriteRef} className='innerwrap' id='favorite_right'>
          
            {this.state.details.map((output, id) => (
              <div className='lst' key={id} >
                <h2>{output.name }</h2>
                <h3>{output.email }</h3>
                <p>{`City: ${output.address.city}`}</p>

              </div>
            ))}
            {console.log("Done mapping")}
        
          </div>
          <div ref={this.historyRef} className='innerwrap' id='history_right'>
            <h1>My history</h1>
          </div>
        {/* <h1>Welcome to lyricizeai AI</h1> */}
        </div>

        
      </div>



     

      
    );
  };
};
}
export default App;



