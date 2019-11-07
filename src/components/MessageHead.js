import React from 'react';
import '../styles/messageHeadStyles.css'
import glass from '../assets/images/magnifying-glass.png'
import arrow from '../assets/images/left-arrow.png'
import avatar from '../assets/images/spongebob.jpg'
import menu from '../assets/images/menu.png'

/* eslint react/prop-types: 0 */
function MessageHead( {update, nick} ) {
	return ( 
		<div className='messagehat'>
		    <img className='arrow' src={arrow} onClick={()=>update(-1)} alt="arrow" role="presentation"/>
		    <img className='avatar' src={avatar} alt="avatar"/>
		    <div className='user'>
			        {nick}
			    <div className='time'>
			        Online
			    </div>
		    </div>
		    <img className="magnifying" src={glass} alt="glass"/>
		    <img className="menu" src={menu} alt="menu"/>
		</div>
	)
}


export default MessageHead