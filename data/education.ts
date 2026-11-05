export type Education = {
  school: string;
  degree: string;
  start: string;
  end: string;
  detail?: string;
};

export type Certification = {
  name: string;
  issuer: string;
  /** Add only a real verification URL. Leave undefined to render without a link. */
  verifyUrl?: string;
};

export const education: Education[] = [
  {
    school: "University of Texas at Arlington",
    degree: "M.S. in Computer Science",
    start: "Aug 2024",
    end: "May 2026",
    detail: "GPA 3.7 / 4.0",
  },
  {
    school: "Gujarat Technological University",
    degree: "B.E. in Computer Engineering",
    start: "Aug 2020",
    end: "May 2024",
  },
];

export const certifications: Certification[] = [
  { name: "AWS Certified Developer – Associate (DVA-C02)", issuer: "Amazon Web Services" },
  { name: "Data Structures & Algorithms", issuer: "UC San Diego via Coursera" },
];
