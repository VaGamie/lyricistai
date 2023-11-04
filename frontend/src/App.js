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



class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      details: [],
      input_value: ''
    }
    this.change_path = this.change_path.bind(this)


    this.searchRef = React.createRef()
    this.favoriteRef = React.createRef()
    this.historyRef = React.createRef()
    this.inputref = React.createRef()
  }
  
  // DELETING SOON

  
  async mounting(){
    this.setState({
      loading: true,
    })
    let data;
    setTimeout(() => {
       axios.get('http://localhost:8000/school/').then(res =>{
        data = res.data
        this.setState({
          details:data,
          loading: false,
          
        });
        
        
      }).catch(err => console.log("Error retreiving your data, please try again"), this.setState({loading: false}))
    }, 2000)

  }
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

  change_path(e){
    const path = e
    console.log(e)
    window.history.pushState({section: path}, "", e)
    document.title = `${e[0].toUpperCase()+  e.slice(1).toLowerCase()} - Lyricize ai`
  }
  

  onpop() {
    window.onpopstate = async (e) => {
      if (e.state !== null) { // Check if e.state is not null
        if (e.state.section !== null) {
          console.log(e.state.section);
          if(e.state.section =='favorite'){
            try{
              await this.mounting();
              this.setState({loading: false})
            } catch (e){
              console.log("Error fetching data",e)
              this.setState({loading: false})
            }
            this.searchRef.current.style.display = "none"
            this.historyRef.current.style.display = "none"
            this.favoriteRef.current.style.display = "flex"
          }
          if (e.state.section === 'search'){
            this.searchRef.current.style.display = "flex"
            this.historyRef.current.style.display = "none"
            this.favoriteRef.current.style.display = "none"
          }
          if (e.state.section === 'history'){
            this.searchRef.current.style.display = "none"
            this.historyRef.current.style.display = "flex"
            this.favoriteRef.current.style.display = "none"
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
      console.log(`path is now at ${path}`)
      this.setState({
        loading: true,
      });
      this.searchRef.current.style.display = "none"
      this.historyRef.current.style.display = "none"
      this.favoriteRef.current.style.display = "flex"

      this.mounting().then(() => 
        this.setState({ loading: false }
        )).catch((error) => {
          <div>Error fetching data {error}</div>
          console.error("Error fetching data");
          this.setState({ loading: false });
      });
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
  
  componentDidMount(){
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
      left: '50px',
      left: '100px',
      width: '200px',
      height: '180px',
      position: 'relative',
      display: 'flex'


    }
    
    if (this.state.loading){
      return(

       
        
 <Router>


      <div className="App">

        <div 
         className="menuebar">
          <h2 className='webname_sidebar'>Lyri<span className='a_span'>cize a</span><span>i</span></h2>
          <button id='search'  className='side_buttons search'  data-page='search' onClick= {(e) => {this.search_visible(); this.change_path(e.currentTarget.id); }} ><FontAwesomeIcon icon={faSearch} className='side_icon' /><span>Search</span></button>
          <button id='favorite' className='side_buttons favorite' data-page='favorite'onClick= {(e) => {this.favorite_visible(); this.change_path(e.currentTarget.id);this.mounting(); }}><FontAwesomeIcon icon={faBookmark} className='side_icon' /><span>Favorite</span></button>
          <button id='history' className='side_buttons history' data-page='history' onClick= {(e) => {this.history_visible(); this.change_path(e.currentTarget.id);}} ><FontAwesomeIcon icon={faHistory} className='side_icon history' /><span>History</span></button>

        </div>

        <div className="wrapper">
        <Skeleton variant="circular" style={custom_skeleton} width={500} height={100} />
        <Skeleton variant="rectangular" sx={{ fontSize: '0.1rem' }}/>
        <Skeleton variant="rounded" sx={{ fontSize: '0.5rem' }}/>
        <Skeleton variant="text" count={4} sx={{ fontSize: '0.5rem' }} />
        
        </div>
      </div>
      </Router>

        );
    }
    return (
      <Router>


      <div className="App">

        <div 
         className="menuebar">
          <h2 className='webname_sidebar'>Lyri<span className='a_span'>cize a</span><span>i</span></h2>
          <button id='search'  className='side_buttons search'  data-page='search' onClick= {(e) => {this.search_visible(); this.change_path(e.currentTarget.id); }} ><FontAwesomeIcon icon={faSearch} className='side_icon' /><span>Search</span></button>
          <button id='favorite' className='side_buttons favorite' data-page='favorite'onClick= {(e) => {this.favorite_visible(); this.change_path(e.currentTarget.id);this.mounting(); }}><FontAwesomeIcon icon={faBookmark} className='side_icon' /><span>Favorite</span></button>
          <button id='history' className='side_buttons history' data-page='history' onClick= {(e) => {this.history_visible(); this.change_path(e.currentTarget.id);}} ><FontAwesomeIcon icon={faHistory} className='side_icon history' /><span>History</span></button>

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
                <h3>{output.school_name }</h3>
                <p>{`created: ${output.todays_date}`}</p>

              </div>
            ))}  
        
          </div>
          <div ref={this.historyRef} className='innerwrap' id='history_right'>
            <h1>My history</h1>
          </div>
        {/* <h1>Welcome to lyricizeai AI</h1> */}
        </div>

        
      </div>
      </Router>   



     

      
    );
  };
};
export default App;






// import './App.scss';
// import axios from 'axios'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import React, {Component, useRef} from 'react'
// import {  faSearch, faHistory } from '@fortawesome/free-solid-svg-icons'
// import { faBookmark} from '@fortawesome/free-regular-svg-icons'
// import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'




// class App extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       loading: false,
//       details: [],
//       input_value: ''
//     }
//     this.change_path = this.change_path.bind(this)


//     this.searchRef = React.createRef()
//     this.favoriteRef = React.createRef()
//     this.historyRef = React.createRef()
//     this.inputref = React.createRef()
//   }
  
//   // DELETING SOON

  
//   async mounting(){
//     this.setState({
//       loading: true,
//     })
//     let data;
//     setTimeout(() => {
//        axios.get('http://localhost:8000/school/').then(res =>{
//         data = res.data
//         this.setState({
//           details:data,
//           loading: false,
          
//         });
        
        
//       }).catch(err => <div>Error getting data</div>)
//     }, 2000)

//   }
  
//   search_visible = (e) =>{
//     this.searchRef.current.style.display = "flex"
//     this.historyRef.current.style.display = "none"
//     this.favoriteRef.current.style.display = "none"
//   }
//   favorite_visible = (e) => {
//     this.searchRef.current.style.display = "none"
//     this.historyRef.current.style.display = "none"
//     this.favoriteRef.current.style.display = "flex"
//   }

//   history_visible = (e) =>{
//     this.searchRef.current.style.display = "none"
//     this.historyRef.current.style.display = "flex"
//     this.favoriteRef.current.style.display = "none"
//   }

//   change_path(e){
//     const path = e
//     console.log(e)
//     window.history.pushState({section: path}, "", e)
//     document.title = `${e[0].toUpperCase()+  e.slice(1).toLowerCase()} - Lyricize ai`
//     if (e === "/favorite"){
//       this.mounting()
//     }
//   }
  

//   onpop() {
//     window.onpopstate = async (e) => {
//       if (e.state !== null) { // Check if e.state is not null
//         if (e.state.section !== null) {
//           console.log(e.state.section);
//           if(e.state.section =='favorite'){
//             this.setState({loading: true})
            
//             try{
//               await this.mounting();
//               this.setState({loading: false})

//             } catch (e){
//               console.log("Error fetching data",e)
//               this.setState({loading: false})
//             }
//             this.searchRef.current.style.display = "none"
//             this.historyRef.current.style.display = "none"
//             this.favoriteRef.current.style.display = "flex"
//           }
//           if (e.state.section === 'search'){
//             this.searchRef.current.style.display = "flex"
//             this.historyRef.current.style.display = "none"
//             this.favoriteRef.current.style.display = "none"
//           }
//           if (e.state.section === 'history'){
//             this.searchRef.current.style.display = "none"
//             this.historyRef.current.style.display = "flex"
//             this.favoriteRef.current.style.display = "none"
//           }
//         } else {
//           console.log("nothing");
//         }
//       } else {
//         console.log("State is null");
//       }
//     };
//   }

//   //preventing the page from reloading when button is pressed
//   handleSubmit = (e) =>{
//     e.preventDefault()
//     this.inputref.current.value = ''
//   }

  

//   // handelling the changing of path (what should be rendered when the user types in what path)

//   handlePath = (path) => {
//     if (path === '/favorite') {
//       console.log(`path is now at ${path}`)
//       this.setState({
//         loading: true,
//       });
//       this.searchRef.current.style.display = "none"
//       this.historyRef.current.style.display = "none"
//       this.favoriteRef.current.style.display = "flex"

//       this.mounting().then(() => 
//         this.setState({ loading: false }
//         )).catch((error) => {
//           <div>Error fetching data {error}</div>
//           console.error("Error fetching data");
//           this.setState({ loading: false });
//       });
//     }
//     if(path === '/search'){
//       this.searchRef.current.style.display = "flex"
//       this.historyRef.current.style.display = "none"
//       this.favoriteRef.current.style.display = "none"
//     }
//     if(path === '/history'){
//       this.searchRef.current.style.display = "none"
//       this.historyRef.current.style.display = "flex"
//       this.favoriteRef.current.style.display = "none"
//     }
//   };
  
//   componentDidMount(){
//     this.onpop()
//     this.setState({
//       loading: false
//     })
//     window.onload = () =>{
//       const path = window.location.pathname;
//       console.log(path)
//       this.handlePath(path)
//     }
    
//   }

//   //updating the input value on change

//   handleChange = ((e) => {
//     this.setState({input_value: e.target.value})
//     console.log(this.state.input_value)
//   })

//   render(){

//     if (this.state.loading){
//       return(
//         <div>
//           <div className='skeleton'><Skeleton height={40} count={5} /> </div>
//         </div>
//       )
//     }
//     return (
//       <div className="App">

//         <div 
//          className="menuebar">
//           <h2 className='webname_sidebar'>Lyri<span className='a_span'>cize a</span><span>i</span></h2>
//           <button id='search'  className='side_buttons search'  data-page='search' onClick= {(e) => {this.search_visible(); this.change_path(e.currentTarget.id); this.mounting();}} ><FontAwesomeIcon icon={faSearch} className='side_icon' /><span>Search</span></button>
//           <button id='favorite' className='side_buttons favorite' data-page='favorite'onClick= {(e) => {this.favorite_visible(); this.change_path(e.currentTarget.id);}}><FontAwesomeIcon icon={faBookmark} className='side_icon' /><span>Favorite</span></button>
//           <button id='history' className='side_buttons history' data-page='history' onClick= {(e) => {this.history_visible(); this.change_path(e.currentTarget.id);}} ><FontAwesomeIcon icon={faHistory} className='side_icon history' /><span>History</span></button>

//         </div>

//         <div className="wrapper">
//           <div ref={this.searchRef} className='innerwrap' id='search_page'>
//             <h1>Search</h1>
//             <form onSubmit={this.handleSubmit}>
//               <div className='seachbarNsearchI'>
//               <div className='wrapper_searh_icon'><FontAwesomeIcon icon={faSearch} className='side_icon' /></div>
//                 <input 
//                   ref={this.inputref}
//                   onChange={this.handleChange}
//                   className='search_input'
//                   placeholder= "Search via URL"// <FontAwesomeIcon icon={faSearch} className='side_icon' />
//                   type='url' 
//                 ></input>
//               </div>
//               <button  type='submit' id='search_submit_button' > Search</button>
//             </form>
//           </div>
//           <div ref={this.favoriteRef} className='innerwrap' id='favorite_right'>
          
//             {this.state.details.map((output, id) => (
              
//               <div className='lst' key={id}>
//                 <h2>{output.name}</h2>
//                 <h3>{output.school_name}</h3>
//                 <p>{`created: ${output.todays_date}`}</p>

//               </div>
//             ))}  
        
//           </div>
          
//           <div ref={this.historyRef} className='innerwrap' id='history_right'>
//             <h1>My history</h1>
//           </div>
//         {/* <h1>Welcome to Lyricize AI</h1> */}
//         </div>

        
//       </div>
      
//     );
//   };
// };
// export default App;
