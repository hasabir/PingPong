import React, { useState } from "react";
import './Welcome.css';
import Header from "../../components/header";
import Nickname from "./Nickname";
import Gender from "./Gender";
import AvatarUpload from "./AvatarUpload";

const Welcome: React.FC = () => {
  const [step, setStep] = useState<string>('nickname');
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male'); // Provide a default value

  const handleNext = (nextStep: string, gender?: 'male' | 'female') => {
    setStep(nextStep);
    if (gender) {
      setSelectedGender(gender);
    }
  };

  return (
        <div className='overlay-container'>
            <img
              className='overlay-image'
              src={process.env.PUBLIC_URL + 'section.png'}
              alt='Overlay'
            />

            <div className='overlay-text'>
                <Header title="Welcome to the Ping Pong Zone! " description=" Let's make your gaming experience more awesome. Fill in the details below, and let the games begin!" />
                <div className="nickname-cmp">
                  {step === "nickname" && <Nickname onNext={handleNext} />}
                  {step === "gender" && <Gender onNext={handleNext} />}
                  {step === "AvatarUpload" && <AvatarUpload gender={selectedGender} />}
                </div>
        </div>
      </div> 
  );
}

export default Welcome;
