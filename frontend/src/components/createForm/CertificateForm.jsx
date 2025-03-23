import { useResumeStore } from "../../store/ResumeStore"

const CertificateForm = () => {

  const { resume, setResume } = useResumeStore();
  
    const formField =
    {
      name: '',
      issuedBy: '',
    }

    const handleChange = (e, index) => {
      const list = [...resume.certifications];
      const { name, value } = e.target;
      list[index][name] = value;
  
      setResume({ ...resume, certifications: list });
    };

    const HandleAddNewForm = () => {
      setResume({ ...resume, certifications: [...resume.certifications, formField] });
    }

    const HandleRemove = (index) => {
      if (resume.certifications.length === 1) return;
      const list = [...resume.certifications];
      list.splice(index, 1);
      setResume({ ...resume, certifications: list });
  
    }

  return (
    <>
    <h2 className="uppercase font-bold text-center mb-5">Education</h2>
    <div>
      {resume.certifications.map((cert, index) => (
        <div key={index} className="[&:not(:last-of-type)]:border-b-2 border-gray-200 border-dashed pb-5 mb-5">
          <div>
            <label className="">Certificate Name</label>
            <input type="text" name="name" placeholder="Certificate Name" className="border border-gray-200 p-2 w-full" onChange={(e) => handleChange(e, index)}
              value={cert?.name} />
          </div>
          <div>
            <label className="">Organization</label>
            <input type="text" name="issuedBy" placeholder="Issued By" className="border border-gray-200 p-2 w-full" onChange={(e) => handleChange(e, index)}
              value={cert?.issuedBy} />
          </div>
          <div className="flex gap-5 mt-3 justify-end">
            {index === resume.certifications.length-1 && 
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

export default CertificateForm;