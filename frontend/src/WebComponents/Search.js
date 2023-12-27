import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faSearch} from '@fortawesome/free-solid-svg-icons'
import React, {Component} from 'react'

class Search extends Component{
  constructor(props){
    super(props);

    
    this.inputref = React.createRef()

  }

  componentDidMount(){
    console.log(this.props.searchforward.current)
  }
  handleSubmit = (e) =>{
    e.preventDefault()
    this.inputref.current.value = ''
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