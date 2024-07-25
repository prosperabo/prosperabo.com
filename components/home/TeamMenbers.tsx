"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import teamMembers from "data/team-members";

type Member = {
  name: string;
  role: string;
  image: string;
  linkedin: string;
};
interface Props {
  member: Member;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

const TeamMemberCard: React.FC<Props> = ({
  member,
  index,
  isSelected,
  onClick,
}) => {
  return (
    <div
      key={index}
      className="cursor-pointer rounded-lg bg-transparent shadow-lg"
      onClick={onClick}
    >
      <motion.div
        className="overflow-hidden rounded-lg"
        animate={isSelected ? { scale: 0.85 } : { scale: 1 }}
        whileHover={{ scale: 0.85 }}
      >
        <Image
          src={member.image}
          alt={`Team Member ${index + 1}`}
          className="mx-auto h-64 w-full object-cover"
          width={250}
          height={300}
          style={{ transition: "transform 0.3s" }}
        />
      </motion.div>
      <AnimatePresence>
        {isSelected && (
          <motion.section
            id="team-member-info"
            className="mt-4 rounded-lg bg-black bg-opacity-75 p-4 text-center text-white"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="mt-0 font-bold lg:text-2xl">{member.role}</h2>
            <p className="font-light uppercase lg:text-lg">{member.name}</p>
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
      </AnimatePresence>
    </div>
  );
};

const TeamMembers = ({}) => {
  const [selectedMember, setSelectedMember] = useState(null);

  const handleClick = (index: any) => {
    setSelectedMember(selectedMember === index ? null : index);
  };

  return (
    <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {teamMembers.map((member, index) => (
        <TeamMemberCard
          key={index}
          member={member}
          index={index}
          isSelected={selectedMember === index}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default TeamMembers;
