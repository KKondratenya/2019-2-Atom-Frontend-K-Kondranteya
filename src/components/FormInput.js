import React from 'react';
import { connect } from 'react-redux';
import { write, send } from '../actions/messengerActions';
import styles from '../styles/formInput.module.css';
import clip from '../assets/images/clip.png';
import microphone from '../assets/images/microphone.png';
import globe from '../assets/images/globe.png';
import record from '../assets/images/record.png';
/* eslint react/prop-types: 0 */

class FormInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recording: false,
		};
		this.sendFiles = props.sendFiles;
		this.writeMessage = props.writeMessage;
	}

	async getMedia() {
		try {
			const constraints = { audio: true };
			const mediaStream = await navigator.mediaDevices.getUserMedia(
				constraints,
			);
			this.mediaRecorder = new MediaRecorder(mediaStream);
			let chunks = [];
			this.mediaRecorder.start();
			this.mediaRecorder.addEventListener('start', (event) => {
				event.preventDefault();
			});
			this.mediaRecorder.addEventListener('stop', (event) => {
				event.preventDefault();
				const blob = new Blob(chunks, { type: this.mediaRecorder.mimeType });
				chunks = [];
				const audioURL = URL.createObjectURL(blob);
				this.sendFiles(audioURL, 'audio');
			});
			this.mediaRecorder.addEventListener('dataavailable', (event) => {
				chunks.push(event.data);
			});
			this.setState({
				recording: true,
			});
		} catch (err) {
			alert('Нет доступа к аудио');
		}
	}

	KeyEvent = (event) => {
		const input = event.target;
		if (event.which === 13) {
			event.preventDefault();
			if (event.shiftKey) {
				input.value += '\n';
			} else if (event.target.value !== '') {
				this.writeMessage(event.target.value);
				input.value = '';
			}
		}
	};

	handleFiles = (event) => {
		const { files } = event.target;
		if (files.length) {
			const src = window.URL.createObjectURL(files[0]);
			this.sendFiles(src, 'image');
		}
	};

	fileClick = () => {
		const fileSelect = document.getElementById('fileSelect');
		fileSelect.click();
	};

	geoLocation = () => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				const { latitude } = position.coords;
				const { longitude } = position.coords;
				this.writeMessage(
					`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`,
				);
			});
		} else {
			console.log('Геолокация недоступна');
		}
	};

	handleAudio = () => {
		if ('mediaDevices' in navigator) {
			if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
				this.getMedia();
			} else if (this.mediaRecorder.state === 'recording') {
				this.mediaRecorder.stop();
				this.setState({
					recording: false,
				});
			}
		} else {
			alert('Аудио сообщения недоступны');
		}
	};

	render() {
		const { recording } = this.state;
		return (
			<div>
				<input
					style={{ display: 'none' }}
					type="file"
					id="fileSelect"
					accept="image/*"
					onChange={(event) => this.handleFiles(event)}
				/>
				<div className={styles.input}>
					<textarea
						type="text"
						placeholder="Введите сообщение"
						onKeyPress={(event) => this.KeyEvent(event)}
						className={styles.inputmessage}
					/>
					<img
						src={clip}
						className={styles.clip}
						onClick={() => this.fileClick()}
						alt="clip"
						role="presentation"
					/>
					<img
						src={!recording ? microphone : record}
						className={styles.clip}
						onClick={(event) => this.handleAudio(event)}
						alt="microphone"
						role="presentation"
					/>
					<img
						src={globe}
						className={styles.clip}
						onClick={() => this.geoLocation()}
						alt="globe"
						role="presentation"
					/>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		writeMessage: (value) => dispatch(write(value)),
		sendFiles: (value, type) => dispatch(send(value, type)),
	};
};

export default connect(null, mapDispatchToProps)(FormInput);
