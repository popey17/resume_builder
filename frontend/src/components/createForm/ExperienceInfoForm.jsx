import { useResumeStore } from "../../store/ResumeStore"

const ExperienceInfoForm = () => {

  const { resume, setResume } = useResumeStore();

  const formField =
  {
    companyName: '',
    role: '',
    startDate: '',
    endDate: '',
    isStillWroking: false,
    description: ''
  }


  const handleChange = (e, index) => {
    const list = [...resume.experience];
    const { name, value } = e.target;
    list[index][name] = value;

    setResume({ ...resume, experience: list });
  };

  const handleCheckChange = (e, index) => {
    const list = [...resume.experience];    
    list[index]["isStillWroking"] = e.target.checked;
    setResume({ ...resume, experience: list });
  }

  const HandleAddNewExp = () => {
    setResume({ ...resume, experience: [...resume.experience, formField] });
  }

  const HandleRemove = (index) => {
    if (resume.experience.length === 1) return;
    const list = [...resume.experience];
    list.splice(index, 1);
    setResume({ ...resume, experience: list });

  }

  return (
    <>
      <h2 className="uppercase font-bold text-center mb-5">Work Experiences</h2>
      <div>
        {resume.experience.map((exp, index) => (
          <div key={index} className="[&:not(:last-of-type)]:border-b-2 border-gray-200 border-dashed pb-5 mb-5">
            <div className="flex gap-5 justify-between mb-3">
              <div className="w-1/2">
                <label className="">Company Name</label>
                <input type="text" name="companyName" placeholder="Enter Company Name" className="border border-gray-200 p-2 w-full" onChange={(e) => handleChange(e, index)}
                  value={exp?.companyName} />
              </div>
              <div className="w-1/2">
                <label className="">Position</label>
                <input type="text" name="role" placeholder="Enter Company Name" className="border border-gray-200 p-2 w-full" onChange={(e) => handleChange(e, index)}
                  value={exp?.role} />
              </div>
            </div>
            <div className="flex gap-5 justify-between mb-3">
              <div className="w-1/2">
                <label className="">Start Date</label>
                <input type="date" name="startDate" placeholder="Enter Company Name" className="border border-gray-200 p-2 w-full" onChange={(e) => handleChange(e, index)}
                  value={exp?.startDate} />
              </div>
              <div className="w-1/2">
                <label className="">End Date</label>
                <input type="date" name="endDate" placeholder="Enter Company Name" className="border border-gray-200 p-2 w-full" onChange={(e) => handleChange(e, index)}
                  value={exp?.endDate} 
                  disabled={exp?.isStillWroking}/>
              </div>
            </div>
            <div className="mb-3">
              <label className="flex items-center gap-2" htmlFor={`isStillWroking${index}`}>Still Working
              <input type="checkbox" name="isStillWroking" id={`isStillWroking${index}`}  placeholder="Enter Company Name" className="border border-gray-200 p-2" onChange={(e) => handleCheckChange(e, index)}
                value={exp?.isStillWroking} />
              <span className="checkBox">
              </span>
              </label>
              
              
            </div>
            <div>
              <label className="">Description</label>
              <textarea type="text" placeholder="Enter work detail" className="border border-gray-200 p-2 w-full resize-none" rows={4} name="description" onChange={(e) => handleChange(e, index)}
                value={exp?.description} />
            </div>
            <div className="flex gap-5 mt-3 justify-end">
              {index === resume.experience.length-1 && 
              <button className={"text-black  rounded-md hover:text-secondaryHover flex justify-center w-fit"} onClick={HandleAddNewExp}>
                add
              </button>}
              <button className={"text-error  rounded-md flex justify-center w-fit"} onClick={()=>HandleRemove(index)}>
                remove
              </button>
            </div>
          </div>

        ))
        }
      </div>
    </>
  )
}

export default ExperienceInfoForm