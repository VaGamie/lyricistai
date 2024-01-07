import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faSearch} from '@fortawesome/free-solid-svg-icons'
import React, {Component} from 'react'
import axios from 'axios'
class Search extends Component{
  constructor(props){
    super(props);

    
    this.inputref = React.createRef()

  }

  componentDidMount(){
    console.log(this.props.searchforward.current)
  }
  handleSubmit = (e) =>{
    if (this.inputref.current.value === ''){
      e.preventDefault()
    }
    else{
      e.preventDefault()
      // stringifying the url
      //    axios.get(`http://localhost:8000/add? url=${encodeURIComponent(this.inputref.current.value)}`)
      axios.get(`http://localhost:8000/add`,{
        params:{
          url:this.inputref.current.value
        }
      })
    .then(res => {
      let data = res;
      console.log(data);
    })
    .catch(err => {
      console.error(err);
    });

    this.inputref.current.value = ''
    }
  }
  
    render(){
        return(
            <div ref={this.props.searchforward} className='innerwrap' id='search_page'>

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
        )
    }
}


export default Search;