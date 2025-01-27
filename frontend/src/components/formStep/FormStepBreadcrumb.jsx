import { Steps } from "../../pages/utils/Step";
import React, {useState} from "react";

const FormStepBreadcrumb = ({ stepParam }) => {

  const [currentStepIndex, setCurrentStepIndex] = useState(
    Steps.findIndex(step => step.key === stepParam)
  );

  const updateQueryParam = (key, value) => {
    const url = new URL(window.location);
    url.searchParams.set(key, value);

    // Use history.pushState to update the URL without refreshing
    window.history.pushState({}, '', url);
  };

  const handleStepChange = (stepKey) => {
    const newIndex = Steps.findIndex(step => step.key === stepKey);
    setCurrentStepIndex(newIndex);
    updateQueryParam('step', stepKey);

  };

  return (
    <div className="mb-3">
      <div className="flex ">
        {Steps.map((step, index) => (
          <React.Fragment key={step.key}>
            {step.key === stepParam ? (
              <p className=" relative bg-primary px-6 py-1 after:[''] after:absolute after:w-auto after:h-full after:bg-primary after:aspect-[1/2] after:top-0 after:left-[calc(100%-1px)] after:[clip-path:polygon(0_0,0%_100%,100%_50%)] after:z-20 
              before:absolute before:w-auto before:h-full before:aspect-[1/2] before:top-0 before:left-full before:[clip-path:polygon(0_0,0%_100%,100%_50%)] before:z-20 before:bg-white">{step.title}</p>
            ) : (
              <a
                href="#"
                onClick={() => handleStepChange(step.key)}
                className={`text-white block relative px-6 py-1 after:[''] 
                  after:absolute after:w-auto after:h-full after:aspect-[1/2] after:top-0 after:left-[calc(100%-1px)] after:[clip-path:polygon(0_0,0%_100%,100%_50%)] after:z-20 
                  before:absolute before:w-auto before:h-full before:aspect-[1/2] before:top-0 before:left-full before:[clip-path:polygon(0_0,0%_100%,100%_50%)] before:z-20 before:bg-white
                ${
                  index < currentStepIndex ? 'bg-primary after:bg-primary hover:bg-primaryHover hover:after:bg-primaryHover' : 'bg-secondary after:bg-secondary hover:bg-secondaryHover hover:after:bg-secondaryHover'
                }`}
              >
                {step.title}
              </a>
            )}
            {/* {index < Steps.length - 1 && <span className="px-1">{">"}</span>} */}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FormStepBreadcrumb;
