import React, { useEffect, useRef, useState } from 'react';
import axios from '../../api/axios';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

// type NicknameProps = {
//     onNext: (nextStep: string) => void;
// };

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

const Nickname = ({ onNext }) => {
    const userRef = useRef<HTMLInputElement | null>(null);
    const [nickname, setNickname] = useState<string>('');
    const [validNickname, setValidNickname] = useState(false);
    const [errMsg, setErrMsg] = useState('');
	const navigate = useNavigate();

    // useEffect(() => {
    //     if (userRef.current) {
    //         userRef.current.focus();
    //     }
    // }, []);



    useEffect(() => {
        setValidNickname(USER_REGEX.test(nickname));
    }, [nickname]);

	useEffect(() => {
		setErrMsg('')
	}, [nickname]);

	const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!USER_REGEX.test(nickname)) {
            setErrMsg("Invalid Nickname");
            return;
        }
		document.cookie = `nickname=${nickname}; path=/; SameSite=None;`;
			try {
				console.clear();
				const response = await axios.post('auth/nickname', {}, {
					withCredentials: true
				});
				
				console.log(response);
				navigate('/home');
			} catch (err) {
				if (!(err as AxiosError)?.response)
					setErrMsg('No Server Response');
				else if ((err as AxiosError).status === 409)//!to be 
					setErrMsg('Username Taken');
				else
					setErrMsg('Registration Failed');
			}
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <div className="change-nickname">
                    <img className="edit-icon" src={process.env.PUBLIC_URL + '/edit.svg'} alt="edit-icon" />
                    <label className="edit-text"> Enter your nickname</label>
                </div>

                <div className="input-container">
                    <div className="input-wrapper">
                        <input
                            className={`nickname-input ${errMsg ? 'error' : ''}`}
                            type="text"
                            placeholder="Nickname"
                            ref={userRef}
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            aria-invalid={validNickname ? "false" : "true"}
                        />
                    </div>
						<p className={errMsg ? "error-message" : "offscreen"} aria-live="assertive">
							{errMsg}
						</p>
                    <div className="button-containers">
                        <button type="submit">Next</button>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default Nickname;




// import React, { useState } from 'react';
// import axios from 'axios'
// type NicknameProps = {
//     onNext: (nextStep: string) => void;
// };

// const Nickname: React.FC<NicknameProps> = ({ onNext }) => {
// const maxCharacters = 20;
// const [nickname, setNickname] = useState<string>('');
// const [error, setError] = useState<string>('');

// const handleNext = async () => {
//     if (nickname.trim() === '') {
//         setError('Please enter a nickname');
//     } else if (nickname.length > maxCharacters) {
//         setError('Nickname cannot exceed 20 characters');
//     } else {
//         setError('');
//         document.cookie = `nickname=${nickname}; path=/`;
//         try {
//             console.clear();
//             const response = await axios.post('http://localhost:3000/auth/nickname', {}, {
//                 withCredentials: true
//             });
//             // console.log(response.data);
//             const userId = response.data.id;
//             console.log('User ID:', userId);
//             onNext('gender');
//         } catch (error) {
//             console.error('Error making request:', error);
//             setError('Failed to register. Please try again.');
//         }
//     }
// };


   

//     return (
//         <form
//         onSubmit={(e) => {
//             e.preventDefault();
//             handleNext();
//         }}
//         >
//         <div className="change-nickname">
//             <img className="edit-icon" src={process.env.PUBLIC_URL + '/edit.svg'} alt="edit-icon" />
//             <label className="edit-text"> Enter your nickname</label>
//         </div>

//         <div className="input-container">
//             <div className="input-wrapper">
//             <input
//                 className={`nickname-input ${error ? 'error' : ''}`}
//                 type="text"
//                 placeholder="Nickname"
//                 value={nickname}
//                 onChange={(e) => {
//                 const newNickname = e.target.value;
//                 setNickname(newNickname);
//                 if (newNickname.length > maxCharacters) {
//                     setError('Nickname cannot exceed 20 characters');
//                 } else {
//                     setError('');
//                 }
//                 }}
//             />
//             </div>

//             {error && <div className="error-message">{error}</div>}

//             <div className="button-containers">
//             <button type="submit">Next</button>
//             </div>
//         </div>
//         </form>
//     );
// };

// export default Nickname;
