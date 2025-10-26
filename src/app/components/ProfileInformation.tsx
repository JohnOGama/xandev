"use client";

import { FileText, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GITHUB_LINK, LINKEDIN_LINK } from "../config/constants";

const ProfileInformation = () => {
  const handleDownloadPdf = () => {
    const link = document.createElement("a");
    link.href = "/pdf/JohnOgama.pdf";
    link.download = "JohnOgama.pdf";
    link.click();
  };

  const handleMail = () => {
    const email = "ogamajohnd@gmail.com";
    const subject = encodeURIComponent("Hi John Ogama!");

    window.location.href = `mailto:${email}?subject=${subject}`;
  };

  return (
    <div className="lg:mt-10 lg:space-y-2">
      <div>
        <h1 className="text-xl font-semibold lg:text-2xl">
          Hi, I&apos;m John Ogama
        </h1>
        <span>Fullstack Engineer (+2 years of experience)</span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1 items-center">
          <MapPin size={15} className="text-gray" />
          <span className="text-sm text-gray">Bacoor City, Cavite</span>
        </div>
        <div className="flex gap-1 items-center">
          <Phone size={15} className="text-gray" />
          <span className="text-sm text-gray">+63 992 514 3490</span>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div
          onClick={handleDownloadPdf}
          className="w-fit cursor-pointer flex gap-1 bg-secondary-card items-center h-6 md:h-9 px-1 md:px-2 rounded-md"
        >
          <FileText size={15} />
          <h1 className="text-sm md:text-base">Resume</h1>
        </div>

        <Link target="_blank" href={GITHUB_LINK}>
          <div className="w-fit cursor-pointer flex gap-1 bg-secondary-card items-center h-6 md:h-9 px-1.5 md:px-3 rounded-md">
            <Image
              src="/Icons/github-mark-white.svg"
              alt="Github"
              width={15}
              height={15}
            />
          </div>
        </Link>
        <Link target="_blank" href={LINKEDIN_LINK}>
          <div className="w-fit cursor-pointer flex gap-1 bg-secondary-card items-center h-6 md:h-9 px-1.5 md:px-3 rounded-md">
            <Image
              src="/Icons/linkedin-white.svg"
              alt="Linkedin"
              width={15}
              height={15}
            />
          </div>
        </Link>
        <div
          onClick={handleMail}
          className="w-fit cursor-pointer flex gap-1 bg-secondary-card items-center h-6 md:h-9 px-1.5 md:px-3 rounded-md"
        >
          <Mail size={15} />
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
