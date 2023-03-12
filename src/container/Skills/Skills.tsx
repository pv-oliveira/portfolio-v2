import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tooltip as ReactTooltip } from "react-tooltip";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Skills.scss";

type Experiences = {
  _id: string;
  year: string;
  description: string;
  imgUrl: HTMLImageElement;
  works: [
    {
      name: string;
      company: string;
      desc: string;
    }
  ];
};

type Skills = {
  name: string;
  _id: string;
  icon: HTMLImageElement;
  bgColor: string;
};

const Skills: React.FC = () => {
  const [experiences, setExperiences] = useState<Experiences[]>([]);
  const [skills, setSkills] = useState<Skills[]>([]);

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query).then((data) => {
      setExperiences(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">Skills & Experiences</h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon).url()} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="app__skills-exp">
          {experiences.map((experience, idx) => (
            <motion.div
              className="app__skills-exp-item"
              key={experience.year + idx}
            >
              <div key={experience.year + idx} className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <motion.div
                key={`works-${experience.year}-${idx}`}
                className="app__skills-exp-works"
              >
                {experience.works.map((work, idx2) => (
                  <React.Fragment
                    key={`work-${experience.year}-${idx}-${idx2}`}
                  >
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={work.name}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    <ReactTooltip
                      id={work.name}
                      key={`tooltip-${experience.year}-${idx}-${idx2}`}
                      className="skills-tooltip #fff"
                    >
                      {work.desc}
                    </ReactTooltip>
                  </React.Fragment>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppWrap({
  Component: MotionWrap(Skills, "app__skills"),
  idName: "skills",
  classNames: "app__whitebg",
});
