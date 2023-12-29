import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Authentification.css';
import Header from '../../../components/header';

const Authentification = () => {
  const navigate = useNavigate();

  const [digits, setDigits] = useState<string[]>(Array.from({ length: 6 }, () => ''));
  const [activeInput, setActiveInput] = useState(0);
  const [warning, setWarning] = useState('');

  const handleDigitChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);

      if (index < digits.length - 1 && value !== '') {
        setActiveInput(index + 1);
      }
    }
  };

  const handleSubmit = () => {
    // Replace this with your actual verification logic
    const correctDigits = ['1', '2', '3', '4', '5', '6'];

    if (digits.join('') === correctDigits.join('')) {
      // Digits are correct, clear the input and reset warning
      setDigits(Array.from({ length: 6 }, () => ''));
      setWarning('');

      // Navigate to the home page
      navigate('/home');
    } else {
      // Digits are incorrect, clear the input and show a warning
      setDigits(Array.from({ length: 6 }, () => ''));
      setWarning('Incorrect Verification Code. Please try again.');
    }
  };

  useEffect(() => {
    if (activeInput < digits.length) {
      const inputElement = document.getElementById(`digit-${activeInput}`) as HTMLInputElement | null;
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, [activeInput, digits.length]);

  return (
    <div className="Authentification">
      <Header
        title="Scan QR code"
        description="To be able to authorize transactions, you need to scan this QR Code with your Google Authentication App and enter the verification code below."
      />

      <div className="qr-code">
        <img src={process.env.PUBLIC_URL + '/qr-test.svg'} alt="QR Code" />
      </div>

      <div className="code-container">
        <label className="verification_Code" htmlFor="verificationCode">
          Enter Verification Code :
        </label>
        <div className="digits-grid">
          {digits.map((digit, index) => (
            <div className="digit-container" key={index}>
              <input
                type="text"
                value={digit}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                id={`digit-${index}`}
                maxLength={1}
              />
            </div>
          ))}
        </div>
      </div>

      {warning && <p className="warning-message">{warning}</p>}
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Authentification;
