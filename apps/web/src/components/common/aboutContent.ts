export type AboutSectionId =
  | 'genesis'
  | 'vision-mission'
  | 'four-businesses'
  | 'specialty'
  | 'philosophy'
  | 'founder-principles'
  | 'master-card-commitments'
  | 'evolving-together'
  | 'staying-true'
  | 'core-team'
  | 'advisory-board';

export type AboutBusiness = {
  name: string;
  tagline: string;
  body: string;
  extra?: string;
};

export type AboutTeamGroup = {
  role: string;
  members: ReadonlyArray<{ name: string; location: string }>;
};

export type AboutSection = {
  id: AboutSectionId;
  title: string;
};

export type AboutContent = {
  hero: {
    eyebrow: string;
    headline: string;
    body: string;
    support: string;
    businessesLine: string;
    closing: string;
  };
  sections: ReadonlyArray<AboutSection>;
  genesis: {
    headline: string;
    body: string;
    foundationLine: string;
    flow: string;
  };
  visionMission: {
    visionTitle: string;
    vision: string;
    missionTitle: string;
    mission: string;
  };
  fourBusinesses: { intro: string; businesses: ReadonlyArray<AboutBusiness> };
  specialty: {
    headline: string;
    body: string;
    flow: string;
    premiumNote: string;
    premiumValue: string;
  };
  philosophy: { headline: string; body: string; closingLine: string };
  founderPrinciples: ReadonlyArray<string>;
  masterCardCommitments: ReadonlyArray<string>;
  evolvingTogether: { headline: string; body: string; flow: string };
  stayingTrue: { body: string; closingLine: string };
  coreTeam: {
    headline: string;
    intro: string;
    groups: ReadonlyArray<AboutTeamGroup>;
  };
  advisoryBoard: ReadonlyArray<{ name: string; location: string }>;
  closing: { headline: string; body: string; tagline: string };
};

const premiumValue =
  'Our premium value reflects the expertise, preparation, professional screening and verification, personalized assistance, specialized execution, coordination and responsibility required for each selected service, with applicable verification and due diligence conducted subject to lawful access, consent and relevant requirements.';

export const aboutContent: AboutContent = {
  hero: {
    eyebrow: 'About Holy Yatra',
    headline: 'We Look for What More a Service Can Become.',
    body: 'Holy Yatra creates premium operational services for customers who value tradition, lawful processes, authenticity, privacy, personal attention and professional execution.',
    support:
      'We look beyond the conventional service to discover additional customer value, test what is practical, and build the expertise, people and capability required to deliver it.',
    businessesLine:
      'PitruMoksha Gaya · Ritual Services · Personal Travel Assistance · Vahi Records',
    closing:
      "Within these boundaries, we develop the additional service layer around the customer's actual requirement—understanding what is needed, identifying what more can meaningfully be delivered, testing its practical feasibility, coordinating the appropriate people and resources, supporting the customer personally, and carrying the accepted scope through preparation, execution and completion.",
  },
  sections: [
    { id: 'genesis', title: 'Genesis' },
    { id: 'vision-mission', title: 'Vision & Mission' },
    { id: 'four-businesses', title: 'Our Four Premium Businesses' },
    { id: 'specialty', title: 'Our Specialty' },
    { id: 'philosophy', title: 'Our Philosophy: Timeless & True' },
    { id: 'founder-principles', title: 'Founder Principles' },
    { id: 'master-card-commitments', title: 'Our Master Card Commitments' },
    { id: 'evolving-together', title: 'Evolving Together' },
    { id: 'staying-true', title: 'Staying True to Our Purpose' },
    { id: 'core-team', title: 'The Core Team' },
    { id: 'advisory-board', title: 'Advisory Board' },
  ],
  genesis: {
    headline: 'What More Is Possible?',
    body: 'Real customer requirements showed us that existing services could often deliver much more through deeper knowledge, personalization, better access and human assistance.',
    foundationLine: 'That became our foundation:',
    flow: 'Discover Value → Test Feasibility → Build Capability → Deliver',
  },
  visionMission: {
    visionTitle: 'Our Vision',
    vision:
      'To build a modern service company that brings tradition, lawful processes, specialist human expertise and technology together to create deeper, more accessible and professionally delivered services.',
    missionTitle: 'Our Mission',
    mission:
      'To discover meaningful possibilities within existing services and turn them into practical, professionally deliverable customer value. Preserve what must remain authentic, improve what can be improved, and make every added value practically deliverable.',
  },
  fourBusinesses: {
    intro: premiumValue,
    businesses: [
      {
        name: 'PitruMoksha Gaya',
        tagline: 'Tradition Supported by Lineage Intelligence.',
        body: 'Family-specific ancestral services built around applicable Gotra, lineage, family tradition, Gayawal records and prescribed rites—with Virtual, Hybrid and Gaya-based participation where applicable. Sensitive family circumstances can receive Confidentiality-First coordination, Private Ancestral Rites, purpose-based information handling and controlled professional access. Know the lineage. Understand the requirement. Perform the prescribed duty with dignity.',
      },
      {
        name: 'Ritual Services',
        tagline: 'Tradition Where It Matters. Modern Access Where It Helps.',
        body: 'Beyond booking a priest, services are developed around the applicable Vedic/Shastric method, Gotra and Sankalp, family or customary tradition, prescribed mantra, samagri, offerings, preparation and appropriate priestly expertise. From customized and remotely accessible rituals to Legal e-Marriage, modern participation and lawful-process support are added where applicable without replacing the tradition or authority on which the service depends.',
      },
      {
        name: 'Personal Travel Assistance',
        tagline: 'When a Travel Plan Is Not Enough, Put a Human Beside the Journey.',
        body: 'Our Travel Companion / Shadow Assistance model adds real human support while allowing the traveller to remain independent. From mobility needs and difficult local situations to unexpected disruption or emergencies, assistance can extend to practical response, family communication and coordination with appropriate local, hospital or emergency services when required. Travel independently. Have someone there when it matters.',
      },
      {
        name: 'Vahi Records',
        tagline: 'Discover the Journey, beyond finding one ancestral entry.',
        body: 'Available traditional records can be cross-referenced across locations and generations to investigate lineage connections, differences, missing links and wider family history. The larger vision is to progressively collect, organize, preserve, interpret, translate and support permitted traditional genealogical and custodian-held information across locations such as Gaya Ji, Haridwar, Badrinath, Kashi and other relevant heritage centres. Subject to lawful access, record availability and applicable custodian permissions, this information can contribute to lineage mapping and ancestral heritage preservation.',
        extra:
          'Last Visit — Auspicious Occasion | Mourning Occasion. Trace available records associated with marriages, births, pilgrimages, family ceremonies, ancestral rites, bereavement-related visits or occasions.',
      },
    ],
  },
  specialty: {
    headline: 'We Look for What More a Service Can Become.',
    body: 'We examine an existing service, identify additional meaningful customer value, test its feasibility and build the capability required to deliver it.',
    flow: 'Discover → Validate → Design → Build → Deliver',
    premiumNote: 'Premium is not a label. It must be visible in the service delivered.',
    premiumValue,
  },
  philosophy: {
    headline: 'Preserve What Matters. Improve What Can Be Improved.',
    body: 'We preserve the tradition, knowledge and lawful authority that must remain intact while improving access, participation, coordination and customer experience through human expertise and technology.',
    closingLine: 'Timeless in principle. Modern in delivery.',
  },
  founderPrinciples: [
    'Dharma before profit',
    'Trust before revenue',
    'Transparency before marketing',
    'Service before technology',
    'Long-term value before short-term gain',
  ],
  masterCardCommitments: [
    'Authenticity',
    'Sanctity',
    'Privacy',
    'Confidentiality',
    'Transparency',
    'Professional Execution',
    'Human Assistance',
    'Traceable Service Journey',
  ],
  evolvingTogether: {
    headline: 'Built to Learn. Designed to Improve.',
    body: 'Customer needs, professional practices and technology continue to evolve. So do our services. We learn from real service experiences, customer feedback and professional insight to identify what can be improved, simplified or newly made possible—without compromising authenticity, lawful requirements or the purpose of the service.',
    flow: 'Listen → Learn → Improve → Evolve',
  },
  stayingTrue: {
    body: 'As we grow, we intend to expand our capabilities without compromising authenticity, lawful practice, privacy, personal attention or professional responsibility.',
    closingLine: 'Expand the capability. Preserve the purpose.',
  },
  coreTeam: {
    headline: 'People Behind the Service',
    intro:
      'Our Core Team brings together the people responsible for service design, customer assistance, professional coordination, operations and technology. Each role carries clear responsibility—from understanding customer requirements and preparing the service to coordinating its execution and supporting it through completion.',
    groups: [
      {
        role: 'Co-Founder & CEO',
        members: [{ name: 'Kumar Dev', location: 'Pune' }],
      },
      {
        role: 'Legal Advisor',
        members: [{ name: 'Shyam Kumar Saraogi', location: 'Bagaha' }],
      },
      {
        role: 'Head of Product',
        members: [
          { name: 'Priyam', location: 'Gurugram' },
          { name: 'Ritu', location: 'Surat' },
        ],
      },
      {
        role: 'Head of Web-Engineering',
        members: [{ name: 'Aman Kumar', location: 'Hyderabad' }],
      },
      {
        role: 'Head of Data & Marketing',
        members: [
          { name: 'Navita Aggarwal', location: 'Nepal' },
          { name: 'Shishir Kumar', location: 'Bangalore' },
          { name: 'Mittali', location: 'Surat' },
        ],
      },
    ],
  },
  advisoryBoard: [
    { name: 'Dr. K. K. Agarwal', location: 'Nepal' },
    { name: 'Basant Goenka', location: 'Madras' },
    { name: 'Dr. Muskan Saraogi', location: 'Pune' },
    { name: 'Sangita Jhunjunwala', location: 'Kashi' },
    { name: 'Gauri Singh', location: 'Gaya Ji' },
  ],
  closing: {
    headline: 'Four Businesses. One Growing Purpose.',
    body: 'Today, we operate through four online businesses—PitruMoksha Gaya, Ritual Services, Personal Travel Assistance and Vahi Records. As we grow, we also plan to create free training opportunities for selected transgender individuals to build professional opportunities in Travel Assistance.',
    tagline: 'Building Services | Creating Opportunities. | Staying True to Purpose.',
  },
};
