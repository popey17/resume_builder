import GeneralInfoForm from "../../components/createForm/GeneralInfoForm";
import PersonalInfoForm from "../../components/createForm/PersonalInfoForm";

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
    title: "Experience",
    component: PersonalInfoForm,
    key: "experience-info",
  },
  {
    title: "Education",
    component: PersonalInfoForm,
    key: "education-info",
  },
];
