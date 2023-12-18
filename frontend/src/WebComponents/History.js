import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, {Component, useRef} from 'react'
class History extends Component{
  constructor(props){
    super(props);

  }

 
  
    render(){
      
        return(
            <div ref={this.props.historyforward} className='innerwrap' id='history_right'>
                <h1>My history</h1>
            </div>
        )
    }
}


export default History;


