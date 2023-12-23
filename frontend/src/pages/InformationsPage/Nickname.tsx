import React, { useState } from 'react';
// import client from '../../components/client';
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
const handleNext = async () => {
    if (nickname.trim() === '') {
        setError('Please enter a nickname');
    } else if (nickname.length > maxCharacters) {
        setError('Nickname cannot exceed 20 characters');
    } else {
        setError('');

        try {
            // Make a request to your backend using Axios
            const response = await axios.post('http://your-backend-url/auth/nickname', { nickname });

            // Handle the response as needed
            console.log(response.data);

            // Proceed to the next step
            onNext('gender');
        } catch (error) {
            // Handle errors
            console.error('Error making request:', error);
        }
    }
};
    // const handleNext = async () => {
    //     try {
        //     const response = await client.post('/api/register', { nickname });
        //     console.log('Registration successful:', response.data);
        //     onNext('gender');
    //     } 
    //     catch (error) 
    //     {
    //     console.error('Registration error:', error);
    //     setError('Failed to register. Please try again.');
    //     }
    // };

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
