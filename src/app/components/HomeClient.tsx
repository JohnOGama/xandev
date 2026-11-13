import FeaturedApp from "./FeaturedApp";
import ProfileInformation from "./ProfileInformation";
import Skills from "./Skills";
import WorkExperience from "./WorkExperience";
import WorkTimeline from "./WorkTimeline";

export default function HomeClient() {
  return (
    <div className="w-full">
      <ProfileInformation />
      <section className="border-t border-line py-12">
        <WorkTimeline />
        <div className="mt-8">
          <Skills />
        </div>
      </section>
      <section className="pt-12">
        <FeaturedApp />
      </section>
      <section className="py-12">
        <WorkExperience />
      </section>
    </div>
  );
}
