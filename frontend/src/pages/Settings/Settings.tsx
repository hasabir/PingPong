import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import './Settings.css';
import Header from '../../components/header';

const Settings = () => {
    const navigate = useNavigate();

    const initialImage = localStorage.getItem('selectedImage');
    const [selectedImage, setSelectedImage] = useState<File | null>(
        initialImage ? dataURLtoFile(initialImage, 'profileImage') : null
    );

    const [nickname, setNickname] = useState('');
    const [userName, setUserName] = useState('@B9o9a');
    const [isToggled, setIsToggled] = useState(false);

    useEffect(() => {
        const savedNickname = localStorage.getItem('nickname');
        if (savedNickname) setUserName(savedNickname);

        const saved2FAStatus = localStorage.getItem('2FAStatus');
        if (saved2FAStatus === 'enabled') setIsToggled(true);
    }, []);

    const handleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
        const newNickname = e.target.value;

        setNickname(newNickname);

        localStorage.setItem('nickname', newNickname);
    }

    const handleConfirm = () => {
        setUserName('@' + nickname);
        setNickname('');

        localStorage.setItem('nickname', nickname);
    }

    const toggleSwitch = () => {
        const new2FAStatus = !isToggled;
        setIsToggled(new2FAStatus);

        localStorage.setItem('2FAStatus', new2FAStatus ? 'enabled' : 'disabled');

        // Navigate to the specified route when the switch is toggled
        if (new2FAStatus) {
            navigate('/auth');
        }
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setSelectedImage(file);

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (reader.result && typeof reader.result === 'string') {
                    localStorage.setItem('selectedImage', reader.result);
                }
            };
        } else {
            localStorage.removeItem('selectedImage');
        }
    }

    function dataURLtoFile(dataURL: string, fileName: string) {
        const arr = dataURL.split(',');
        const match = arr[0].match(/:(.*?);/);
        if (match) {
            const mime = match[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], fileName, { type: mime });
        }
        return null;
    }


    return (
            <div className="centered-container">

                <div className="settings-heading">
                    <Header title='Settings' />
                </div>
                <div className="separator-line"></div>

                <div className="content-section">


                    <div className="upload-image-section">
        
                        <label htmlFor="profile-image">
                            <img
                                className="user-profile"
                                src={
                                    selectedImage
                                        ? URL.createObjectURL(selectedImage)
                                        : process.env.PUBLIC_URL + '/profile.png'
                                }
                                alt="profile-img"
                            />
                            <AddPhotoAlternateIcon className='icon-edit-image'/>
                        </label>
                        <input
                            type="file"
                            id="profile-image"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                    </div>


                        <div className="name-section">
                            <label className="user-name">Bar9o9a 9o9a</label>
                            <label className="nick-name">{userName}</label>
                        </div>

                </div>

                <div className="nickname">

                        <div className="icon_text">
                            <ModeEditOutlineIcon className="edit_img" />
                            <label className="edit_text">Edit Profile Name</label>
                        </div> 

                        <div className="input_and_confirm">
                            <div className="input_container">
                                <input
                                    className="nickname_input"
                                    type="text"
                                    placeholder="Enter your new nickname"
                                    value={nickname}
                                    onChange={handleChangeNickname}
                                />
                                <button className="confirm_button" onClick={handleConfirm}>
                                    Confirm
                                </button>
                            </div>
                        </div>
                </div> 

                <div className="switch-container">
                    <label className={`switch ${isToggled ? 'on' : 'off'}`}>
                        <input type="checkbox" checked={isToggled} onChange={toggleSwitch} />
                        <span className="slider rounded" />
                    </label>
                    <label className="switch-text">
                        Secure your Account by {isToggled ? 'disabling' : 'enabling'} 2FA
                    </label>
                </div>

            </div>
    );
};

export default Settings;