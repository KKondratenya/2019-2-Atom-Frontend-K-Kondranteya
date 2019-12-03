import React from 'react';
import avatar from '../assets/images/spongebob.jpg';
import styles from '../styles/profileEdit.module.css';
/* eslint react/prop-types: 0 */
function ProfileEdit({ user, updateProfile }) {
	return (
		<div className={styles.profile}>
			<img src={avatar} className={styles.avatar} alt="avatar" />
			<div className={styles.fullname}>
				<div className={styles.point}>Full name</div>
				<input
					type="text"
					placeholder="input fullname"
					className={styles.inputfullname}
				/>
			</div>
			<div>
				<div className={styles.fullname}>
					<div className={styles.point}>Username</div>
					@
					<input
						type="text"
						placeholder="input username"
						className={styles.inputfullname}
					/>
				</div>
				<div className={styles.hint}>Minimum lenght is 5 characters</div>
			</div>
			<div>
				<div className={styles.bio}>
					<div className={styles.point}>Bio</div>
					<textarea
						type="text"
						placeholder="input bio"
						className={styles.inputbio}
					/>
				</div>
				<div className={styles.hint}>Any details about you</div>
			</div>
		</div>
	);
}

export default ProfileEdit;
