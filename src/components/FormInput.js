import React from 'react';
import styles from '../styles/formInput.module.css';
import clip from '../assets/images/clip.png';
import microphone from '../assets/images/microphone.png';
import globe from '../assets/images/globe.png';
/* eslint react/prop-types: 0 */

function FormInput({ updateValue, updateFiles }) {
	let mediaRecorder = null;

	function KeyEvent(event) {
		const input = event.target;
		if (event.which === 13) {
			event.preventDefault();
			if (event.shiftKey) {
				input.value += '\n';
			} else if (event.target.value !== '') {
				updateValue('text', event.target.value);
				input.value = '';
			}
		}
	}

	const handleFiles = (event) => {
		const { files } = event.target;
		if (files.length) {
			const src = window.URL.createObjectURL(files[0]);
			updateFiles('image', src);
		}
	};

	const fileClick = () => {
		const fileSelect = document.getElementById('fileSelect');
		fileSelect.click();
	};

	const geoLocation = () => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				const { latitude } = position.coords;
				const { longitude } = position.coords;
				updateValue(
					'geo',
					`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`,
				);
			});
		} else {
			alert('Геолокация недоступна');
		}
	};

	function handleAudio() {
		if ('mediaDevices' in navigator) {
			if (!mediaRecorder) {
				const constraints = { audio: true };
				navigator.mediaDevices
					.getUserMedia(constraints)
					.then(function(mediaStream) {
						mediaRecorder = new MediaRecorder(mediaStream);
						mediaRecorder.start();
						let chunks = [];
						mediaRecorder.addEventListener('stop', (event) => {
							const blob = new Blob(chunks, { type: mediaRecorder.mimeType });
							chunks = [];
							const audioURL = URL.createObjectURL(blob);
							updateFiles('audio', audioURL);
						});
						mediaRecorder.addEventListener('dataavailable', (event) => {
							chunks.push(event.data);
						});
					});
			} else {
				mediaRecorder.stop();
			}
		} else {
			alert('Аудио сообщения недоступны');
		}
	}

	return (
		<div>
			<input
				style={{ display: 'none' }}
				type="file"
				id="fileSelect"
				accept="image/*"
				onChange={(event) => handleFiles(event)}
			/>
			<div className={styles.input}>
				<textarea
					type="text"
					placeholder="Введите сообщение"
					onKeyPress={(event) => KeyEvent(event)}
					className={styles.inputmessage}
				/>
				<img
					src={clip}
					className={styles.clip}
					onClick={() => fileClick()}
					alt="clip"
					role="presentation"
				/>
				<img
					src={microphone}
					className={styles.clip}
					onClick={(event) => handleAudio(event)}
					alt="microphone"
					role="presentation"
				/>
				<img
					src={globe}
					className={styles.clip}
					onClick={() => geoLocation()}
					alt="globe"
					role="presentation"
				/>
			</div>
		</div>
	);
}

export default FormInput;
