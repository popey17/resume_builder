import EducationInfoForm from "../../components/createForm/EducationInfoForm";
import ExperienceInfoForm from "../../components/createForm/ExperienceInfoForm";
import GeneralInfoForm from "../../components/createForm/GeneralInfoForm";
import PersonalInfoForm from "../../components/createForm/PersonalInfoForm";
import SocialInfoForm from "../../components/createForm/SocialInfoForm";

export const Steps = [
  {
    title: "General Information",
    component: GeneralInfoForm,
    key: "general-info",
  },
  {
    title: "Personal Information",
    component: PersonalInfoForm,
    key: "personal-info",
  },
  {
    title: "Socials",
    component: SocialInfoForm,
    key: "socials-info",
  },
  {
    title: "Experience",
    component: ExperienceInfoForm,
    key: "experience-info",
  },
  {
    title: "Education",
    component: EducationInfoForm,
    key: "education-info",
  },
  {
    title: "Certification",
    component: EducationInfoForm,
    key: "certification-info",
  }
];
