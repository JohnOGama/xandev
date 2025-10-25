import { SKILLS } from "../config/constants";

const Skills = () => {
  return (
    <div className="space-y-2">
      <h1 className="text-secondary text-xl font-medium">Skills</h1>

      <div className="flex gap-2 items-center flex-wrap">
        {SKILLS.map((skill, id) => (
          <div
            key={id}
            className="p-1.5 text-nowrap text-sm bg-secondary-card rounded-md"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
