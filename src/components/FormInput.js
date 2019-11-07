import React from 'react';
import '../styles/formInput.css'
/* eslint react/prop-types: 0 */
function FormInput({updateValue}) {

	function KeyEvent(event) {
		const input = event.target
		if (event.which === 13) {
			event.preventDefault();
			if (event.shiftKey) {
				input.value += "\n"
			} else if (event.target.value !== '') {
				updateValue(event.target.value)
				input.value = ''
			}
		}
	}

	return ( 
		<textarea type="text"  placeholder='Введите сообщение' onKeyPress={event => KeyEvent(event)}/>
	)
}



export default FormInput