import React from "react";
import "../styles/SliderStepRegisterStyle.scss";

interface StepPros {
  currentStep: number;
}
const SliderStepRegister: React.FC<StepPros> = ({ currentStep }) => {
  return (
    <div className="slider-container">
      <div className="steps">
        <span className={currentStep === 1 || currentStep === 2 || currentStep === 3  ? "step active" : "step"}></span>
        <span className={currentStep === 2 || currentStep === 3 ? "step active" : "step"}></span>
        <span className={currentStep === 3 ? "step active" : "step"}></span>
      </div>
    </div>
  );
};

export default SliderStepRegister;
