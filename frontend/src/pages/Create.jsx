import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FormStepBreadcrumb from '../components/formStep/FormStepBreadcrumb';
import { Steps } from './utils/Step';
import PreviewDoc from '../components/preview/PreviewDoc';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Create = () => {

  const query = useQuery();
  const paramValue = query.get('step');
  const navigate = useNavigate();

  const [currentStepIndex, setCurrentStepIndex] = useState(
    Steps.findIndex(step => step.key === paramValue)
  );

  const FormComponent = Steps.find(step => step.key === paramValue)?.component;

  useEffect(() => {
    if (!paramValue) {
      navigate('/resume/create?step=general-info');
    }
    setCurrentStepIndex(Steps.findIndex(step => step.key === paramValue));
  }, [paramValue, navigate, currentStepIndex]);

  const handleNextStep = () => {
    const newIndex = currentStepIndex + 1;
    navigate(`/resume/create?step=${Steps[newIndex].key}`);
  }

  const handlePrevStep = () => {
    const newIndex = currentStepIndex - 1;
    navigate(`/resume/create?step=${Steps[newIndex].key}`);
  }

  const handleSave = () => {
    console.log("save");
    
  }

  return (
    <div className="pt-[70px] px-3">
      <h1 className="text-[35px] font-medium font-homeTitle text-center mb-8">Create Your Resume</h1>
      <FormStepBreadcrumb stepParam={paramValue} />
      <div className="flex justify-center mt-5 gap-2 h-[calc(100vh-206.5px)] pb-2">
        <div className="w-full md:w-1/2">
          {FormComponent && <FormComponent />}
          <div className='flex justify-between pt-8'>
            {currentStepIndex > 0 &&
              <button className={"bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryHover flex justify-center w-fit"} onClick={handlePrevStep}>Prev</button>
            }
            {currentStepIndex < Steps.length - 1 &&
              <button className={"bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryHover justify-center w-fit block ml-auto"} onClick={handleNextStep}>Next</button>
            }
            {currentStepIndex === Steps.length - 1 &&
              <button className={"bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryHover justify-center w-fit block ml-auto"} onClick={handleSave}>Save</button>
            }
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <PreviewDoc />
        </div>
      </div>
    </div>
  )
}

export default Create;