import React, { useState } from "react";

type GenderProps = {
  onNext: (nextStep: string) => void;
};

const Gender: React.FC<GenderProps> = ({ onNext }) => {
  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (gender !== "") {
      setErrorMessage('');
      onNext("AvatarUpload");
    } else {
      setErrorMessage("Please choose your gender");
    }
  };

  return (
    <form onSubmit={handleNext}>

      <div className="generic-title">
        <label className="text">Choose your gender</label>
      </div>

      <div className="gender-options">
        <label className="gender-option">
          <img
            className="male-pic"
            src={process.env.PUBLIC_URL + '/male.png'}
            alt="male-pic"
          />

          <div className="gender-label"></div>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={() => {
                setGender("male");
                setErrorMessage('');
              }}
            />
        </label>

        <label className="gender-option">
          <img
            className="female-pic"
            src={process.env.PUBLIC_URL + '/female.png'}
            alt="female-pic"
          />
          {/* <div className="gender-label">Female</div> */}
          <div className="gender-label"></div>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={() => {
                setGender("female");
                setErrorMessage('');
              }}
            />
        </label>
      </div>

      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}

      <div className="button-containers">
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default Gender;
