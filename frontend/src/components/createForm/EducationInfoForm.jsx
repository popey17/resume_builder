import { useResumeStore } from "../../store/ResumeStore"

const EducationInfoForm = () => {

  const { resume, setResume } = useResumeStore();

  const formField =
  {
    institutionName: '',
    degree: '',
    startDate: '',
    endDate: '',
  }


  const handleChange = (e, index) => {
    const list = [...resume.educationDetails];
    const { name, value } = e.target;
    list[index][name] = value;

    setResume({ ...resume, educationDetails: list });
  };

  const HandleAddNewForm = () => {
    setResume({ ...resume, educationDetails: [...resume.educationDetails, formField] });
  }

  const HandleRemove = (index) => {
    if (resume.educationDetails.length === 1) return;
    const list = [...resume.educationDetails];
    list.splice(index, 1);
    setResume({ ...resume, educationDetails: list });

  }

  return (
    <>
      <h2 className="uppercase font-bold text-center mb-5">Education</h2>
      <div>
        {resume.educationDetails.map((exp, index) => (
          <div key={index} className="[&:not(:last-of-type)]:border-b-2 border-gray-200 border-dashed pb-5 mb-5">
            <div className="flex gap-5 justify-between mb-3">
              <div className="w-1/2">
                <label className="">School</label>
                <input type="text" name="institutionName" placeholder="Enter Company Name" className="border border-gray-200 p-2 w-full" onChange={(e) => handleChange(e, index)}
                  value={exp?.institutionName} />
              </div>
              <div className="w-1/2">
                <label className="">Degree</label>
                <input type="text" name="degree" placeholder="Enter Company Name" className="border border-gray-200 p-2 w-full" onChange={(e) => handleChange(e, index)}
                  value={exp?.degree} />
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
                  value={exp?.endDate} />
              </div>
            </div>
            <div className="flex gap-5 mt-3 justify-end">
              {index === resume.educationDetails.length-1 && 
              <button className={"text-black  rounded-md hover:text-secondaryHover flex justify-center w-fit"} onClick={HandleAddNewForm}>
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

export default EducationInfoForm