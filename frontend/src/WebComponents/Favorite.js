import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {Component, useRef} from 'react'

class Favorite extends Component{
    constructor(props){
        super(props);


    }
    render(){
        return(
            <div ref={this.props.favoriteforward} className='innerwrap' id='favorite_right'>
          
            {this.props.detailsforward.map((output, id) => (
              <div className='lst' key={id} >
                <h2>{output.name }</h2>
                <h3>{output.email }</h3>
                <p>{`City: ${output.address.city}`}</p>

              </div>
            ))}
            {console.log("Done mapping")}
        
          </div>
        )
    }
}

export default Favorite