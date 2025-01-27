import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import FormStepBreadcrumb from '../components/formStep/FormStepBreadcrumb';
import { Steps } from './utils/Step';
import { useResumeStore } from "../store/ResumeStore"

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Create = () => {

  const query = useQuery();
  const paramValue = query.get('step');
  const navigate = useNavigate();

  const FormComponent = Steps.find(step => step.key === paramValue)?.component;

  useEffect(() => {
    if (!paramValue) {
      navigate('/resume/create?step=general-info');
    }
  }, [paramValue, navigate]);

  const { resume } = useResumeStore();
  

  return (
    <div className="pt-[70px] px-3">
      <h1 className="text-[35px] font-medium font-homeTitle text-center mb-8">Create Your Resume</h1>
      <FormStepBreadcrumb stepParam={paramValue} />
      <div className="flex justify-center mt-5">
        <div className="w-full md:w-1/2">
        {FormComponent && <FormComponent />}
        </div>
        <div className="w-full md:w-1/2">
          <pre>{JSON.stringify(resume, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}

export default Create