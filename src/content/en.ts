import type { Dict } from "./types";

// Copy follows the teacher's Vietnamese–English edition of 20 October 2026
// (docs/translation-source); strings it does not cover are listed in
// docs/translation-review.
const en: Dict = {
  meta: {
    title: "AI-native University Initiative | Danang Architecture University",
    description:
      "A 2026–2031 strategic initiative to build Danang Architecture University (DAU) as an AI-native Competency-Based 5T University.",
  },
  brand: { project: "AI-native University", school: "Danang Architecture University" },
  nav: {
    why: "Why",
    book: "Book view",
    overview: "Overview",
    philosophy: "5T Philosophy",
    model: "The Model",
    copilots: "Copilots",
    roadmap: "Roadmap",
    benchmark: "Benchmarking",
    menu: "Menu",
    close: "Close",
  },
  hero: {
    eyebrow: "Strategic Initiative 2026–2031",
    title: ["A human-centered", "AI-native university"],
    model: "AI-native Competency-Based 5T University",
    lead:
      "DAU is not simply adding a superficial layer of AI to the university. It is redesigning the university as an AI-native institution, centered on people, the 5T philosophy, outcome-based education aligned with the Vietnam Qualifications Framework (OBE/VQF), demonstrated competence, and quality.",
    cta: "Explore the initiative",
    stats: [
      { value: "9", label: "Integrated design layers" },
      { value: "4", label: "Core Copilots" },
      { value: "5", label: "Maturity levels" },
      { value: "2031", label: "Target year for becoming AI-native" },
    ],
  },
  why: {
    label: "01 — Why",
    title: "Why DAU needs the AI-native initiative",
    lead:
      "AI is no longer limited to supporting small, individual tasks; it is reshaping the university’s entire value chain. Adding a chatbot to the LMS or using AI to draft lectures makes a university AI-assisted, not AI-native.",
    note: "The translation of this section is awaiting review.",
    paths: [
      {
        tag: "Path 1",
        title: "Keep developing in silos",
        text: "Each office runs its own software, each academic unit its own practices, each program its own learning-outcome matrix, and every accreditation cycle gathers evidence by hand.",
        result: "The result: “data islands” that cannot assure quality, personalize learning, or build a lasting advantage.",
        strong: "“data islands”",
      },
      {
        tag: "DAU’s choice",
        title: "Integrate into one AI-native ecosystem",
        text: "Learning outcomes form the backbone, demonstrated competence is the goal, data are the infrastructure, and AI is the layer that supports action.",
        result: "The result: one unified design in which people make the decisions.",
        strong: "people make the decisions",
      },
    ],
    table: {
      head: ["Current problem", "Consequence if left unaddressed", "Solution in the initiative"],
      rows: [
        {
          problem: "Data on teaching, examinations, the LMS, portfolios, and accreditation remain fragmented",
          effect: "Attainment of learning outcomes is hard to measure, evidence is hard to retrieve, and decisions are slow",
          answer: "The OBE/CBE Core, the Second Brain, and data governance",
          codes: ["5D", "5F"],
        },
        {
          problem: "AI risks being used as a set of disconnected tools",
          effect: "Superficial chatbot adoption with no real gains in quality",
          answer: "Coordination of AI agents with human-in-the-loop oversight",
          codes: ["5H"],
        },
        {
          problem: "Traditional assessment is easily replaced by AI",
          effect: "Grades no longer fully reflect learners’ actual competence",
          answer: "AI-resistant assessment tied to process, product, oral defense, and the Living Portfolio",
          codes: ["5I"],
        },
        {
          problem: "Accreditation still relies on compiling files each cycle",
          effect: "Evidence is not kept current, and PDCA cycles are hard to close",
          answer: "Continuously updated evidence and continuous accreditation readiness",
          codes: ["5I"],
        },
        {
          problem: "Students need personalized learning pathways",
          effect: "Learning turns passive, and support does not arrive when it is needed",
          answer: "An AI Tutor guided by the competency map",
          codes: ["5E"],
        },
      ],
    },
    drivers: [
      {
        title: "Technology is reshaping education",
        text: "AI, big data, automation, digital twins, the green transition, and the digital economy are changing how universities teach, support learning, and govern themselves.",
      },
      {
        title: "The labor market demands demonstrated competence",
        text: "Learners need to demonstrate their competencies through work products and authentic evidence, not academic transcripts alone.",
      },
      {
        title: "Autonomy and accountability",
        text: "Higher education is moving toward greater institutional autonomy, accreditation, and transparency in quality.",
      },
      {
        title: "From scale to capability",
        text: "The focus of development is shifting from institutional size to capability, data, quality, and innovation.",
      },
    ],
  },
  overview: {
    label: "02 — Overview",
    title: "A university transformation initiative, not a software project",
    lead:
      "This initiative is not about purchasing a chatbot or university management software. It is about transforming DAU into a university ecosystem built around data, learning outcomes, demonstrated competence, and AI, while people retain final decision-making authority.",
    facts: [
      { value: "2006", title: "Foundations", text: "Nearly 20 years of institutional development." },
      { value: "6 years", title: "2026–2031", text: "A major strategic initiative for DAU." },
      { value: "Level 5", title: "AI-native", text: "The maturity level DAU aims to reach by 2031." },
      { value: "2050", title: "Vision", text: "5T values, demonstrated competence, and standing in Asia and globally." },
    ],
  },
  motto: { label: "Guiding motto", text: "Substance – Proven Capability – Shaping the Future" },
  philosophy: {
    label: "03 — Identity",
    title: "The three dimensions of 5T",
    lead:
      "5T defines DAU’s identity through three distinct dimensions: its guiding philosophy, its educational approach, and its institutional values. The AI-native architecture serves as the infrastructure for putting these values into practice.",
    tiers: [
      {
        name: "5T Philosophy",
        text: "Intellectual foundations",
        items: [
          { name: "Tranquility", en: "Tĩnh tại" },
          { name: "Theoria", en: "Tuệ giác" },
          { name: "Tangibility", en: "Thực chứng" },
          { name: "Transfluency", en: "Thông biến" },
          { name: "Transcendence", en: "Trường tồn" },
        ],
      },
      {
        name: "5T Education",
        text: "Educational approach",
        items: [
          { name: "Think", en: "Thực học" },
          { name: "Train", en: "Thực hành" },
          { name: "Task", en: "Thực nghề" },
          { name: "Test", en: "Thực chiến" },
          { name: "Transform", en: "Thực sáng tạo" },
        ],
      },
      {
        name: "5T Institutional Values",
        text: "Hallmarks of DAU learners",
        items: [
          { name: "Trailblazing", en: "Tiên phong" },
          { name: "Tangible", en: "Thực tiễn" },
          { name: "Thriving", en: "Toàn diện" },
          { name: "Togetherness", en: "Tương tác" },
          { name: "Trustworthy", en: "Trách nhiệm" },
        ],
      },
    ],
    bridge: {
      label: "Operational indicators that bring 5T into data and AI",
      items: ["Demonstrated competence", "Digital responsibility", "A constructive mindset"],
    },
  },
  model: {
    label: "04 — The model",
    title: "One integrated design with nine layers",
    lead:
      "DAU’s AI-native, competency-based model comprises nine layers, extending from human values to the infrastructure for intelligence and quality. These layers form a unified design rather than a collection of disconnected tools.",
    layers: [
      { code: "5A", name: "Human-centered 5T", text: "People remain at the center; AI does not replace faculty members." },
      { code: "5B", name: "OBE/VQF", text: "Outcome-based education aligned with the Vietnam Qualifications Framework." },
      {
        code: "5C",
        name: "AI-native CBE Ecosystem",
        text: "Translates learning outcomes into competencies that can be observed, measured, demonstrated, and improved.",
      },
      { code: "5D", name: "OBE/CBE Core", text: "The academic data backbone of the entire university." },
      {
        code: "5E",
        name: "Competency Map",
        text: "Defines competencies through observable behaviors linked to evidence, rubrics, and proficiency levels.",
      },
      { code: "5F", name: "Second Brain and Governance", text: "Institutional memory, the Knowledge Graph, and data and AI governance." },
      {
        code: "5G",
        name: "AI Infrastructure Efficiency",
        text: "Orchestrates models and controls costs, allowing models to be replaced without disrupting the underlying data foundation.",
      },
      {
        code: "5H",
        name: "Agentic Orchestration",
        text: "Coordinates AI agents through role-based permissions, audit trails, and human-in-the-loop oversight.",
      },
      {
        code: "5I",
        name: "World Models, Evidence, and Quality Intelligence",
        text: "Brings together Digital Twin University, Learning Analytics, Living Portfolio, PDCA/CQI, and continuous accreditation readiness.",
      },
    ],
  },
  copilots: {
    label: "05 — Copilots",
    title: "Four core Copilots on one shared foundation",
    lead:
      "Agentic AI is not a standalone chatbot. It is an ecosystem of agents with defined permissions, controls, and accountability. Each Copilot operates within clear boundaries.",
    forLabel: "For",
    guardLabel: "Boundary",
    items: [
      {
        name: "AI Tutor",
        for: "Students",
        does: "Supports learning based on the competency map, recommends practice activities, and provides feedback.",
        guard: "Does not complete assignments on students’ behalf.",
      },
      {
        name: "Faculty Copilot",
        for: "Faculty members",
        does: "Supports course design, rubrics, learning materials, and feedback to learners.",
        guard: "Does not override faculty members’ academic judgment or authority.",
      },
      {
        name: "Research Copilot",
        for: "Researchers",
        does: "Supports literature reviews, data management, and publication workflows.",
        guard: "Does not write papers on researchers’ behalf or fabricate data.",
      },
      {
        name: "Admin Copilot",
        for: "University administration",
        does: "Supports workflows, reporting, quality monitoring, and accreditation.",
        guard: "Does not independently make decisions on academic affairs, finance, personnel, or accreditation.",
      },
    ],
    foundation: "All four share the Second Brain, Knowledge Graph, OBE/CBE Core, and Data and AI Governance framework.",
    quote: [
      "The Second Brain helps DAU maintain accurate institutional memory.",
      "World Models help DAU make better predictions.",
      "People make the decisions.",
    ],
  },
  maturity: {
    label: "06 — Maturity",
    title: "Five maturity levels",
    lead: "Each level is a prerequisite for the next. DAU progresses step by step, measuring actual performance before scaling up.",
    levels: [
      { name: "Digitized", en: "Số hóa", text: "Processes and data are digitized." },
      { name: "Data-informed", en: "Dựa trên dữ liệu", text: "Decisions are informed by data." },
      { name: "AI-integrated", en: "Tích hợp AI", text: "AI is embedded in core activities." },
      { name: "AI-driven", en: "Dẫn dắt bởi AI", text: "AI orchestrates workflows under human oversight." },
      { name: "AI-native", en: "AI-native", text: "Data and AI are built into the university’s operating model by design." },
    ],
    target: "Target: progress toward Level 5 by 2031.",
  },
  roadmap: {
    label: "07 — Roadmap",
    title: "Roadmap for 2026–2031",
    lead: "Academic goals guide technology choices. Expansion at each stage proceeds only when the data and evidence are sufficiently reliable.",
    phases: [
      {
        when: "First 100 days",
        name: "Launch",
        text: "Establish the Steering Committee, select pilot academic programs, and launch Second Brain v1.",
      },
      { when: "2026", name: "AI-ready and CBE-ready", text: "Pilot the OBE/CBE Core and Competency Map; issue data and AI policies." },
      {
        when: "2027",
        name: "AI-integrated and CBE-integrated",
        text: "Pilot the AI Tutor, Faculty Copilot, and Research Copilot; introduce the Living Portfolio.",
      },
      {
        when: "2028–2029",
        name: "AI-driven CBE at DAU",
        text: "Expand Agentic AI; develop digital twins at the student, course, and program levels; establish continuous accreditation readiness.",
      },
      {
        when: "2030–2031",
        name: "Completion of the AI-native core",
        text: "Develop a multi-agent ecosystem, a university-wide digital twin, and lifelong learning.",
      },
      { when: "Beyond 2031", name: "AI-native scaling and maturity", text: "Expand implementation across the university and optimize operations." },
    ],
    principle: "Start small, measure actual results, improve quickly, and scale with appropriate controls.",
    note: "These milestones form a proposed framework. Progression from one stage to the next depends on the Data Maturity Index and the Evidence Validation Index.",
  },
  targets: {
    label: "Targets",
    title: "Proposed targets for 2030",
    note: "Based on the 2026–2030 Development Strategy. Results will be reported only when supported by evidence.",
    items: [
      { value: "100%", label: "Academic programs reviewed for alignment with learning outcomes, the VQF, and accreditation requirements." },
      { value: "≥50%", label: "Students in the 2027–2030 entering cohorts with a Living Portfolio." },
      { value: "100%", label: "Faculty members receiving professional development in OBE/VQF, rubrics, and assessment." },
      { value: "≥80%", label: "Faculty members completing AI-readiness preparation and the development of digital learning materials." },
      { value: "≥30%", label: "Full-time faculty members holding a doctoral degree." },
    ],
  },
  pillars: {
    label: "08 — Strategic pillars",
    title: "Seven strategic pillars",
    lead: "All seven pillars share a common foundation: 5T values and outcome-based education aligned with the VQF.",
    items: [
      { title: "Education", text: "Competency-based programs, studio-based learning, and the Living Portfolio." },
      { title: "Science, Technology, and AI", text: "The Research Copilot and transparent publication workflows." },
      { title: "Community engagement", text: "Service-learning and engagement with local communities." },
      { title: "International cooperation and communications", text: "Communicating the value of investment in education and expanding partnerships." },
      { title: "Faculty and staff", text: "Developing faculty capabilities in OBE and AI readiness." },
      { title: "Finance and facilities", text: "AI infrastructure, a second campus, and diversified resources." },
      {
        title: "Quality and internal quality assurance",
        text: "Internal quality assurance (IQA) at four levels: university, academic unit, program, and course.",
      },
    ],
    crossTitle: "Interdisciplinary priorities under Design × Domain",
    cross: [
      "Smart City, Urban Design, and Digital Twin",
      "Green Architecture and Sustainable Construction",
      "BIM, Construction Management, and Project Finance",
      "UX/UI, Digital Product, and Visual Communication",
    ],
  },
  studio: {
    label: "09 — Pilot",
    title: "Architectural design studio",
    lead:
      "A nine-standard rubric for architectural design projects is the first pilot deliverable. AI use is subject to controls and must be disclosed; students must demonstrate their own competence. AI-resistant assessment is embedded throughout the rubric rather than treated as a separate standard.",
    badge: "Pilot version",
    standards: [
      "Concept and creativity",
      "Identity and local context",
      "Space and function",
      "Planning and landscape",
      "Building technology and engineering",
      "Materials and construction detailing",
      "Green architecture",
      "Community impact",
      "Design communication and oral defense",
    ],
  },
  benchmark: {
    label: "10 — Benchmarking",
    title: "Research foundations and benchmarking",
    lead:
      "Every component of DAU’s design has precedents elsewhere in the world. Its advantage therefore lies in the quality of integration, not in the AI-native label itself.",
    stats: [
      { value: "76", label: "Priority case profiles in Vietnam" },
      { value: "100", label: "Benchmark organizations: 80 international and 20 Vietnamese" },
      { value: "14", label: "Geographic clusters worldwide" },
      { value: "14", label: "Academic and institutional criteria" },
    ],
    advantagesTitle: "Six potential advantages",
    advantages: [
      "Consistency between values and operating mechanisms",
      "Traceability down to individual competency gaps",
      "A clear distinction between learning and formal recognition of attainment",
      "Common standards with flexible learning pathways",
      "A continually updated record of competence: the Living Portfolio",
      "Interdisciplinary studios grounded in DAU’s distinctive strengths in architecture, construction, and design",
    ],
    caveat: "These are assessments of the design’s quality and potential, not conclusions that DAU has already achieved superior outcomes.",
  },
  principles: {
    label: "11 — Principles",
    title: "Operating principles",
    items: [
      {
        title: "People make the decisions",
        text: "Human-in-command is the governance principle; human-in-the-loop is the mechanism for putting it into practice.",
      },
      { title: "Academic priorities lead", text: "Technology serves academic goals, not the other way around." },
      {
        title: "A stable core with room for flexible experimentation",
        text: "The core preserves the mission, 5T, OBE/VQF, and governance. Flexible areas enable rapid experimentation with microcredentials and interdisciplinary studios.",
      },
      {
        title: "DAU owns its core institutional knowledge",
        text: "Under the Build–Buy–Partner model, DAU retains ownership of its standards, rubrics, and evidence data.",
      },
      { title: "Clean data come first", text: "Do not scale prematurely while data quality remains inadequate or evidence has not been validated." },
      { title: "Evidence supports every public claim", text: "Report only implementation levels and results that are supported by evidence." },
    ],
  },
  closing: {
    quote:
      "Place people at the center, define our identity through 5T, measure success through demonstrated competence, build our intelligence infrastructure on data and AI, and commit to genuine quality over the long term.",
    cite: "DAU Development Strategy 2026–2030, with a vision to 2050",
  },
  gate: {
    title: "Welcome",
    lead: "Welcome to the presentation of Danang Architecture University’s AI-native University initiative. Please enter your access code to continue.",
    label: "Access code",
    placeholder: "Enter code",
    submit: "Enter",
    error: "That access code is not correct. Please try again.",
    note: "Your access code is included in your invitation.",
  },
  deck: { prev: "Previous", next: "Next", hint: "↑ ↓ Navigate sections · ← → View details" },
  footer: {
    ownership: "This system is owned by Danang Architecture University.",
    address: "566 Nui Thanh Street, Hoa Cuong Ward, Da Nang, Vietnam",
    source:
      "This content summarizes the AI-native University initiative documentation submitted to the University Council in 2026. The milestones and targets are proposals, not commitments.",
    rights: "© 2026 Danang Architecture University (DAU)",
    top: "Back to top",
  },
};

export default en;
