import ProfileInformation from "./components/ProfileInformation";
import Skills from "./components/Skills";
import WorkExperience from "./components/WorkExperience";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-4">
      <ProfileInformation />
      <Skills />
      <WorkExperience />
    </div>
  );
}
