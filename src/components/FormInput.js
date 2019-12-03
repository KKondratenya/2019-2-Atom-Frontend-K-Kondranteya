import React from 'react';
import styles from '../styles/formInput.module.css';
import clip from '../assets/images/clip.png';
import microphone from '../assets/images/microphone.png';
import globe from '../assets/images/globe.png';
import record from '../assets/images/record.png';
/* eslint react/prop-types: 0 */
/* eslint react/destructuring-assignment: 0 */
class FormInput extends React.Component {
	constructor(props) {
		super(props);
		this.updateFiles = props.updateFiles;
		this.user = props.user;
		this.id = props.id;
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

	updateValue = (type, value) => {
		const message = {};
		const date = new Date();
		const Hours = `0${date.getHours()}`.slice(-2);
		const Minutes = `0${date.getMinutes()}`.slice(-2);
		message.content = value;
		message.date = `${Hours}:${Minutes}`;
		message.user__username = this.state.user;
		message.type = type;
		fetch(
			`https://127.0.0.1:8000/chats/create_message_front?content=${message.content}&user=${this.user}&id=${this.id}`,
			{
				method: 'post',
			},
		).then((resp) => resp.json());
	};

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
		const formData = new FormData();
		formData.append('url', files[0], 'image.png');
		if (files.length) {
			fetch('https://localhost:8000/chats/upload_front', {
				method: 'POST',
				body: formData,
			});
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
					<img
						src={clip}
						className={styles.clip}
						onClick={() => this.fileClick()}
						alt="clip"
						role="presentation"
					/>
					<textarea
						type="text"
						placeholder="Введите сообщение"
						onKeyPress={(event) => this.KeyEvent(event)}
						className={styles.inputmessage}
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
