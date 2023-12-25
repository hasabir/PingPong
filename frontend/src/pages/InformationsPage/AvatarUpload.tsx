import React, { useState, useEffect, useCallback } from 'react';
import { createAvatar, Options } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-avataaars-sprites';
import { useNavigate } from 'react-router-dom';

  type AvatarUploadProps = 
  {
    gender: 'male' | 'female';
  }

  const AvatarUpload: React.FC<AvatarUploadProps> = ({ gender }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  const generateAvatar = useCallback(async () => {
    try {
      const options: Options = { seed: `${gender}-${Math.random()}` };
      const svgString = createAvatar(style, options);
      setAvatarUrl(`data:image/svg+xml,${encodeURIComponent(svgString)}`);
    } 
    catch (error) {
      console.error('Error generating avatar:', error);
    }
  }, [gender]);

  useEffect(() => {
    generateAvatar();
  }, [generateAvatar]);

  const handleGenerateNewAvatar = () => {
    generateAvatar();
  };

  const handleFinish = () => {
    console.log('Finish');
    navigate('/');
  };

  return (
    <>
      <div className="generic-title">
        <label className="text"> This is your avatar</label>
      </div>

      <div className="generic-container">
        {avatarUrl && <img className="avatar-image" src={avatarUrl} alt="Avatar" />}
      </div>

      <div className="button-containers">
        <button onClick={handleGenerateNewAvatar}>Generate Another One </button>
        <button onClick={handleFinish}>Finish</button>
      </div>
    </>
  );
};

export default AvatarUpload;
