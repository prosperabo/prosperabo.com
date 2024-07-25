"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import teamMembers from "data/team-members";

const Team = () => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const handleClick = () => {
    setIsInfoVisible(!isInfoVisible);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-tranparent rounded-lg shadow-lg">
            <motion.div
              key={index}
              className="relative cursor-pointer rounded-lg bg-transparent shadow-lg"
              onClick={handleClick}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="overflow-hidden rounded-lg"
                animate={isInfoVisible ? { scale: 0.95 } : { scale: 1 }}
              >
                <Image
                  src={member.image}
                  alt={`Team Member ${index + 1}`}
                  className="mx-auto"
                  width={200}
                  height={250}
                  style={{ transition: "transform 0.3s" }}
                />
              </motion.div>
              {isInfoVisible && (
                <motion.section
                  id="team-member-info"
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 p-4 text-center text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="mt-0 font-bold lg:text-2xl">{member.role}</h2>
                  <p className="font-light uppercase lg:text-lg">
                    {member.name}
                  </p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-xs hover:text-blue-500 hover:underline"
                  >
                    LinkedIn
                  </a>
                </motion.section>
              )}
            </motion.div>
            {/* <Image
              src={member.image}
              alt={`Team Member ${index + 1}`}
              className="mx-auto rounded-lg" // rounded-full
              width={200}
              height={250}
              style={{
                animationDelay: "0.3s",
                animationFillMode: "forwards",
              }}
            />
            <section id="team-member-info" className="p-4 text-white text-center hover:hidden">
              <h2 className="mt-0 font-bold lg:text-2xl">{member.role}</h2>
              <p className="font-light uppercase lg:text-lg">{member.name}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 hover:text-blue-500 hover:underline text-xs"
              >
                LinkedIn
              </a>
            </section> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
