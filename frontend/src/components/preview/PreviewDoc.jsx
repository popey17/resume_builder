import { useRef } from "react";
import { useResumeStore } from "../../store/ResumeStore"
import useDimensions from "../hooks/useDimensions";
import useFormatDate from "../hooks/useFormatDate";

const PreviewDoc = () => {
  const { resume } = useResumeStore();
  const containerRef = useRef(null);
  const { width } = useDimensions(containerRef);

  const formatDate = useFormatDate();

  return (
    <div className="h-full">
      <div className="p-5 bg-white shadow-md w-full h-full text-black overflow-auto" ref={containerRef}>
        <div style={{
          zoom: (1 / 795) * width
        }}>
          {/* <pre>{JSON.stringify(resume, null, 2)}</pre> */}
          <h1 className="text-3xl font-bold mb-1 text-center">{resume?.name}</h1>
          <p className="text-center mb-5">{resume?.address}</p>
          <div className="grid grid-cols-2 gap-2 gap-y-0 empty:hidde">
            {resume?.email && <p><span className="font-bold">Email : </span>{resume?.email}</p>}
            {resume?.phoneNumber && <p><span className="font-bold">Phone : </span>{resume?.phoneNumber}</p>}
          </div>
          <div className="empty:hidde border-b-4 pb-3 border-black">
            {resume?.socials?.linkedin && <p><span className="font-bold"> Linkedin: </span>{resume?.socials?.linkedin}</p>}
            {resume?.socials?.gitHub && <p><span className="font-bold"> GitHub: </span>{resume?.socials?.gitHub}</p>}
            {resume?.socials?.facebook && <p><span className="font-bold"> Facebook: </span>{resume?.socials?.facebook}</p>}
          </div>
          <p className="border-b-4 py-5 border-black whitespace-pre">
            {resume?.objective}
          </p>
          {resume?.experience[0].companyName &&
            <div className="border-b-4 py-5 border-black">
              <h2 className="text-xl font-bold mb-3">Work Experience</h2>
              {resume?.experience.map((exp, index) => {
                return (
                  <div key={index} className="mb-2">
                    <h3 className="font-bold">{exp.companyName}</h3>
                    <p className="text-sm">{exp.role}</p>
                    <p className="text-sm italic inline">
                      {/* <span >{useFormatDate(exp.startDate)}</span> */}
                      <span>{formatDate(exp.startDate)}</span>

                      <span> - </span>
                      {exp.isStillWroking && <span>Present</span>}
                      {!exp.isStillWroking && <span>{formatDate(exp.endDate)}</span>}

                    </p>
                    <p className="text-sm whitespace-pre mt-2">{exp.description}</p>
                  </div>
                )
              })}

            </div>
          }
          {resume?.educationDetails[0].institutionName &&
            <div className="border-b-4 py-5 border-black">
              <h2 className="text-xl font-bold mb-3">Education</h2>
              {resume?.educationDetails.map((edu, index) => {
                return (
                  <div key={index} className="mb-2">
                    <h3 className="font-bold">{edu.institutionName}</h3>
                    <p className="text-sm">{edu.degree}</p>
                    <p className="text-sm italic">{edu.startDate} - {edu.endDate}</p>
                  </div>
                )
              })}

            </div>
          }
          {resume?.certifications[0].name &&
            <div className="border-b-4 py-5 border-black">
              <h2 className="text-xl font-bold mb-3">Certifications</h2>
              {resume?.certifications.map((cert, index) => {
                return (
                  <div key={index} className="mb-2 flex gap-5">
                    <p>{cert.name}</p>
                    {
                      cert.issuedBy &&
                      <div className="contents">
                        <span>-</span>
                        <p>{cert.issuedBy}</p>
                      </div>
                    }
                  </div>
                )
              })}

            </div>
          }
          {resume?.skills[0] &&
            <div className="border-b-4 py-5 border-black">
              <h2 className="text-xl font-bold mb-3">Skills</h2>
              <ul className="list-disc pl-5">
                {resume?.skills.map((skill, index) => {
                  return (
                    <span key={index} className="mr-2">{skill}</span>
                  )
                })}
              </ul>
            </div>
          }

        </div>
      </div>
    </div>
  )
}

export default PreviewDoc