import React from 'react';
import styles from '../styles/formInput.module.css';
import clip from '../assets/images/clip.png';
import microphone from '../assets/images/microphone.png';
import globe from '../assets/images/globe.png';
import record from '../assets/images/record.png';
/* eslint react/prop-types: 0 */

class FormInput extends React.Component {
	constructor(props) {
		super(props);
		this.updateFiles = props.updateFiles;
		this.updateValue = props.updateValue;
		this.state = {
			recording: false,
		};
	}

	async componentDidMount() {
		const constraints = { audio: true };
		const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
		this.mediaRecorder = new MediaRecorder(mediaStream);
		let chunks = [];
		this.mediaRecorder.addEventListener('start', (event) => {
			event.preventDefault();
		});
		this.mediaRecorder.addEventListener('stop', (event) => {
			event.preventDefault();
			const blob = new Blob(chunks, { type: this.mediaRecorder.mimeType });
			chunks = [];
			const audioURL = URL.createObjectURL(blob);
			this.updateFiles('audio', audioURL);
		});
		this.mediaRecorder.addEventListener('dataavailable', (event) => {
			chunks.push(event.data);
		});
	}

	KeyEvent = (event) => {
		const input = event.target;
		if (event.which === 13) {
			event.preventDefault();
			if (event.shiftKey) {
				input.value += '\n';
			} else if (event.target.value !== '') {
				this.updateValue('text', event.target.value);
				input.value = '';
			}
		}
	};

	handleFiles = (event) => {
		const { files } = event.target;
		if (files.length) {
			const src = window.URL.createObjectURL(files[0]);
			this.updateFiles('image', src);
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
				this.updateValue(
					'geo',
					`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`,
				);
			});
		} else {
			console.log('Геолокация недоступна');
		}
	};

	handleAudio = () => {
		if ('mediaDevices' in navigator) {
			if (this.mediaRecorder.state === 'inactive') {
				this.mediaRecorder.start();
				this.setState({
					recording: true,
				});
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

export default FormInput;
