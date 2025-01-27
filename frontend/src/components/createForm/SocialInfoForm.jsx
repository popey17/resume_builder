import { useResumeStore } from "../../store/ResumeStore"

const SocialInfoForm = () => {

  const { resume, setResume } = useResumeStore();

  return (
    <>
      <h2 className="uppercase font-bold text-center mb-5">Social Information</h2>
      <div className="mb-5">
        <label className="mb-3">Linkedin</label>
        <div>
          <input type="text" placeholder="Enter Linkedin Profile Url" className="border border-gray-200 p-2 w-full" value={resume?.socials?.linkedin} onChange={e=> {
            setResume({ ...resume, socials: { ...resume.socials, linkedin: e.target.value }})
          }} />
        </div>
      </div>
      <div className="mb-5">
        <label className=" mb-3">GitHub</label>
        <div>
          <input type="text" placeholder="Enter GitHub Profile Url" className="border border-gray-200 p-2 w-full" value={resume?.socials?.GitHub} onChange={e=> {
            setResume({ ...resume, socials: { ...resume.socials, GitHub: e.target.value }})
          }} />
        </div>
      </div>
      <div className="mb-5">
        <label className=" mb-3">Facebook</label>
        <div>
          <input type="text" placeholder="Enter Facebook Profile Url" className="border border-gray-200 p-2 w-full" value={resume?.socials?.Facebook} onChange={e=> {
            setResume({ ...resume, socials: { ...resume.socials, Facebook: e.target.value }})
          }}/>
        </div>
      </div>
    </>
  )
}

export default SocialInfoForm