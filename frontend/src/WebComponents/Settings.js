import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faGear } from '@fortawesome/free-solid-svg-icons'
import React, {Component} from 'react'

class Settings extends Component{

    render(){
        return(
        <div className='innerwrap' id='settings_page'>
            <h1 className='my_settings_text'>My Settings</h1>
            <br/>
            <h2 className='account_text' >Account Info</h2>
            <div className='user_info'>
                <h3>Name: </h3>
                <h3>Username: </h3>
            </div>
            <div className='edit_account_info'>
                <button className='edit_account_info_button'>Edit</button>
            </div>

        </div>
        )
    }
    }
export default Settings;