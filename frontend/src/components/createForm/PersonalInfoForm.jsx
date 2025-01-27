import { useResumeStore } from "../../store/ResumeStore"

const PersonalInfoForm = () => {

  const { resume, setResume } = useResumeStore();

  const addTag = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      setResume({ ...resume, skills: [...resume.skills, e.target.value] });
      e.target.value = "";
    } else if (e.key === "Backspace" && e.target.value === "") {
      setResume({ ...resume, skills: resume.skills.slice(0, -1) });
    }
  }

  return (
    <>
      <h2 className="uppercase font-bold text-center mb-5">General Information</h2>
      <div className="flex gap-5 justify-between mb-3">
        <div className="w-1/2">
          <label className="">Full Name</label>
          <input type="text" placeholder="Enter Name" className="border border-gray-200 p-2 w-full" onChange={(e) => {
            setResume({ ...resume, name: e.target.value })
          }} value={resume?.name} />
        </div>
        <div className="w-1/2">
          <label className="">Email</label>
          <input type="email" placeholder="Enter Email" className="border border-gray-200 p-2 w-full" onChange={(e) => {
            setResume({ ...resume, email: e.target.value })
          }} value={resume?.email} />
        </div>
      </div>
      <div className="mb-3">
        <label className="">Phone Number</label>
        <input type="text" placeholder="Enter Phone Number" className="border border-gray-200 p-2 w-full" onChange={(e) => {
          setResume({ ...resume, phoneNumber: e.target.value })
        }} value={resume?.phoneNumber} />
      </div>
      <div className="mb-3">
        <label className="">Address</label>
        <textarea type="text" placeholder="Enter Address" className="border border-gray-200 p-2 w-full resize-none" onChange={(e) => {
          setResume({ ...resume, address: e.target.value })
        }} value={resume?.address} />
      </div>
      <div className="mb-3">
        <label className="">Summary</label>
        <textarea type="text" placeholder="Enter Summary" className="border border-gray-200 p-2 w-full resize-none " rows="4" onChange={(e) => {
          setResume({ ...resume, objective: e.target.value })
        }} value={resume?.objective} />
      </div>
      <div className="mb-3">
        <label className="">Skills</label>
        <div className="border bg-white border-gray-200 p-2 w-full flex gap-1 flex-wrap">
          {resume?.skills?.map((skill, index) => (
            <span key={index} className="border border-gray-50 bg-primary py-1 px-3 text-[14px] rounded-full text-white leading-none">{skill}</span>
          ))}
          <input type="text" className="flex-grow focus:outline-none" value={resume?.linkedin} onKeyUp={addTag} placeholder="Add your skills" />
        </div>
      </div>

    </>
  )
}

export default PersonalInfoForm