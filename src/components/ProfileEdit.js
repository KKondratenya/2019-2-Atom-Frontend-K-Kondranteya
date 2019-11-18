import React from 'react';
import avatar from '../assets/images/spongebob.jpg';
import '../styles/profileEdit.css';
/* eslint react/prop-types: 0 */
function ProfileEdit({ updateProfile }) {
	return (
		<div className="profile">
			<img src={avatar} className="avatarprofile" alt="avatar" />
			<div className="fullname">
				<div className="point">Full name</div>
				<input
					type="text"
					placeholder="input fullname"
					className="inputfullname"
				/>
			</div>
			<div>
				<div className="fullname">
					<div className="point">Username</div>
					@
					<input
						type="text"
						placeholder="input username"
						className="inputfullname"
					/>
				</div>
				<div className="hint">Minimum lenght is 5 characters</div>
			</div>
			<div>
				<div className="bio">
					<div className="point">Bio</div>
					<textarea type="text" placeholder="input bio" className="inputbio" />
				</div>
				<div className="hint">Any details about you</div>
			</div>
		</div>
	);
}

export default ProfileEdit;
