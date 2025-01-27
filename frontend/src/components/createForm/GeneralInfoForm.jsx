import { useResumeStore } from "../../store/ResumeStore"

const GeneralInfoForm = () => {

  const { resume, setResume } = useResumeStore();
  
  

  return (
    <>
      <h2 className="uppercase font-bold text-center mb-5">General Information</h2>
      <div>
        <label className="">Resume Title</label>
        <input type="text" placeholder="Enter Title" className="border border-gray-200 p-2 w-full" onChange={(e)=> {
          setResume({ ...resume, resumeTitle: e.target.value })
        }} value={resume?.resumeTitle} />
      </div>
      <div className="flex gap-5 justify-between">
        
      </div>
    </>
  )
}

export default GeneralInfoForm