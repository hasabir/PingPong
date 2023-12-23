import React, { useState } from 'react';
import axios from 'axios'
type NicknameProps = {
    onNext: (nextStep: string) => void;
};

const Nickname: React.FC<NicknameProps> = ({ onNext }) => {
const maxCharacters = 20;
const [nickname, setNickname] = useState<string>('');
const [error, setError] = useState<string>('');

// const handleNext = () => 
// {
//     if (nickname.trim() === '') 
//         setError('Please enter a nickname');
//     else if (nickname.length > maxCharacters) 
//         setError('Nickname cannot exceed 20 characters'); 
//     else 
//     {
//         setError('');
//         onNext('gender');
//     }
// };
// const handleNext = async () => {
//     if (nickname.trim() === '') 
//         setError('Please enter a nickname');
//     else if (nickname.length > maxCharacters) 
//         setError('Nickname cannot exceed 20 characters');
//     else {
//         setError('');
//         try {
                // const urlParams = new URLSearchParams(window.location.search); // Retrieve the token from the URL
                // const token = urlParams.get('token');
                // if (!token) // Check if the token is present
                // {
                //     console.error('Token not found in the URL');
                //     return;
                // }
                // Make a request to your backend using Axios with the token in the headers
                // const response = await axios.post('http://your-backend-url/auth/nickname', { nickname }, {
                //     headers: {
                //         'Authorization': `Bearer ${token}`
                //     }
                // });
//                 console.log(response.data);
//                 onNext('gender');
//             } catch (error) 
//             {
//                 console.error('Error making request:', error);
//             }
//     }
// };
const handleNext = async () => {
    if (nickname.trim() === '') {
        setError('Please enter a nickname');
    } else if (nickname.length > maxCharacters) {
        setError('Nickname cannot exceed 20 characters');
    } else {
        setError('');

        try {
            console.clear();
            // 1. Extract the JWT token from the URL
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('jwt');
            if (!token) {
                console.error('Token not found in the URL');
                return;
            }
            document.cookie = `jwtToken=${token}; path=/`;// Store the JWT token in a cookie
            console.log('JWT Token:', token);
            const response = await axios.post('http://localhost:3000/auth/nickname', { nickname }, {
                withCredentials: true
            });
            console.log(response.data);
            onNext('gender');
        } catch (error) {
            console.error('Error making request:', error);
            console.log('Error name:', error.name);
            console.log('Error message:', error.message);
            console.log('Error stack:', error.stack);
            console.log('Error response:', error.response); // This may contain details if the server responded
            setError('Failed to register. Please try again.');
        }
    }
};



   

    return (
        <form
        onSubmit={(e) => {
            e.preventDefault();
            handleNext();
        }}
        >
        <div className="change-nickname">
            <img className="edit-icon" src={process.env.PUBLIC_URL + '/edit.svg'} alt="edit-icon" />
            <label className="edit-text"> Enter your nickname</label>
        </div>

        <div className="input-container">
            <div className="input-wrapper">
            <input
                className={`nickname-input ${error ? 'error' : ''}`}
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => {
                const newNickname = e.target.value;
                setNickname(newNickname);
                if (newNickname.length > maxCharacters) {
                    setError('Nickname cannot exceed 20 characters');
                } else {
                    setError('');
                }
                }}
            />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="button-containers">
            <button type="submit">Next</button>
            </div>
        </div>
        </form>
    );
};

export default Nickname;
