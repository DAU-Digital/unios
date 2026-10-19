import type { Dict } from "./types";

const en: Dict = {
  meta: {
    title: "AI-native University | Danang Architecture University",
    description:
      "A 2026–2031 strategic project to build the AI-native Competency-Based 5T University model at Danang Architecture University (DAU).",
  },
  brand: { project: "AI-native University", school: "Danang Architecture University" },
  nav: {
    overview: "Overview",
    philosophy: "5T Philosophy",
    model: "Model",
    copilots: "Copilots",
    roadmap: "Roadmap",
    benchmark: "Benchmarking",
    menu: "Menu",
    close: "Close",
  },
  hero: {
    eyebrow: "Strategic project 2026–2031",
    title: ["An AI-native university", "centred on people"],
    model: "AI-native Competency-Based 5T University",
    lead:
      "DAU is not simply “adding AI” to the university at surface level. DAU is redesigning its university model to be AI-native, with people, the 5T philosophy, OBE/VQF, evidenced competence and quality at the centre.",
    cta: "Explore the project",
    stats: [
      { value: "9", label: "integrated design layers" },
      { value: "4", label: "core Copilots" },
      { value: "5", label: "maturity levels" },
      { value: "2031", label: "AI-native target" },
    ],
  },
  overview: {
    label: "01 — Overview",
    title: "A university transformation programme, not a software project",
    lead:
      "This project is not about buying a chatbot or management software. It is about turning DAU into a university ecosystem that runs on data, learning outcomes, evidenced competence and AI — while people remain the final decision-makers.",
    drivers: [
      {
        title: "Technology is restructuring education",
        text: "AI, big data, automation, Digital Twins, the green transition and the digital economy are changing how universities teach, learn and govern.",
      },
      {
        title: "The labour market needs real competence",
        text: "Learners need to prove their competence through real work and authentic evidence, not through transcripts alone.",
      },
      {
        title: "Autonomy and accountability",
        text: "Higher education is moving towards autonomy, accreditation and quality transparency.",
      },
      {
        title: "From scale to competence",
        text: "The focus of development is shifting from scale to competence, data, quality and innovation.",
      },
    ],
    facts: [
      { value: "2006", title: "Foundation", text: "Nearly 20 years of growth and development." },
      { value: "6 years", title: "2026–2031", text: "A key strategic project of DAU." },
      { value: "Level 5", title: "AI-native", text: "The maturity level DAU aims to reach by 2031." },
      { value: "2050", title: "Vision", text: "5T values – Evidenced competence – Asian and global stature." },
    ],
  },
  motto: { label: "Motto", text: "Real Substance – Real Talent – Shaping the Future" },
  philosophy: {
    label: "02 — Identity",
    title: "Three tiers of 5T",
    lead:
      "5T is DAU’s identity, structured in three distinct tiers: a guiding philosophy, an educational approach and institutional brand values. AI-native is simply the infrastructure for realising these values.",
    tiers: [
      {
        name: "5T Philosophy",
        text: "Intellectual foundation",
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
        name: "5T Brand Values",
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
      label: "Operational bridges mapping 5T into data and AI",
      items: ["Evidenced competence", "Digital responsibility", "Constructive thinking"],
    },
  },
  model: {
    label: "03 — Model",
    title: "One integrated design, nine layers",
    lead:
      "The AI-native Competency-Based DAU model is built from nine layers, running from human values to intelligence and quality infrastructure — one integrated design, not scattered tools.",
    layers: [
      { code: "5A", name: "Human-centred 5T", text: "People at the centre; AI does not replace lecturers." },
      { code: "5B", name: "OBE/VQF", text: "Outcome-based education aligned with the Vietnamese Qualifications Framework." },
      { code: "5C", name: "AI-Native CBE Ecosystem", text: "Turns learning outcomes into competencies that can be observed, measured, evidenced and improved." },
      { code: "5D", name: "OBE/CBE Core", text: "The academic data backbone of the whole university." },
      { code: "5E", name: "Competency Map", text: "Competencies described as observable behaviours, linked to evidence, rubrics and proficiency levels." },
      { code: "5F", name: "Second Brain & Governance", text: "Institutional memory, Knowledge Graph and data–AI governance." },
      { code: "5G", name: "AI Infrastructure Efficiency", text: "Model orchestration and cost control; models can be swapped without breaking the underlying data." },
      { code: "5H", name: "Agentic Orchestration", text: "Orchestration of AI agents with permissions, audit trails and humans in the loop." },
      { code: "5I", name: "World Models, Evidence & Quality Intelligence", text: "Digital Twin University, Learning Analytics, Living Portfolio, PDCA/CQI and living accreditation." },
    ],
  },
  copilots: {
    label: "04 — Copilots",
    title: "Four core Copilots, one shared foundation",
    lead:
      "Agentic AI is not a single chatbot but an ecosystem of agents with permissions, controls and accountability. Each Copilot has clear limits.",
    forLabel: "For",
    guardLabel: "Limits",
    items: [
      {
        name: "AI Tutor",
        for: "Students",
        does: "Supports learning along the competency map, suggesting practice and giving feedback.",
        guard: "Does not do students’ work for them.",
      },
      {
        name: "Faculty Copilot",
        for: "Lecturers",
        does: "Supports course design, rubrics, learning materials and feedback to learners.",
        guard: "Does not replace lecturers’ professional authority.",
      },
      {
        name: "Research Copilot",
        for: "Researchers",
        does: "Supports literature reviews, data management and the publication process.",
        guard: "Does not ghost-write papers or fabricate data.",
      },
      {
        name: "Admin Copilot",
        for: "Administration",
        does: "Supports processes, reporting, quality monitoring and accreditation.",
        guard: "Does not make academic, financial, staffing or accreditation decisions on its own.",
      },
    ],
    foundation: "All four share the Second Brain, Knowledge Graph, OBE/CBE Core and Data/AI Governance.",
    quote: ["Second Brain helps DAU remember correctly", "World Models help DAU forecast better", "Humans decide"],
  },
  maturity: {
    label: "05 — Maturity",
    title: "Five maturity levels",
    lead: "Each level is a prerequisite for the next. DAU moves step by step, measuring honestly before scaling up.",
    levels: [
      { name: "Digitized", en: "Số hóa", text: "Processes and data are digitised." },
      { name: "Data-informed", en: "Dựa trên dữ liệu", text: "Decisions are grounded in data." },
      { name: "AI-integrated", en: "Tích hợp AI", text: "AI is built into core activities." },
      { name: "AI-driven", en: "Dẫn dắt bởi AI", text: "AI orchestrates processes; people provide oversight." },
      { name: "AI-native", en: "AI-native", text: "The university runs on data and AI by design." },
    ],
    target: "Target: reach level 5 by 2031.",
  },
  roadmap: {
    label: "06 — Roadmap",
    title: "Roadmap 2026–2031",
    lead: "Technology follows academic goals. Each phase expands only once data and evidence are reliable enough.",
    phases: [
      { when: "First 100 days", name: "Launch", text: "Set up the Steering Committee, select pilot programmes, launch Second Brain v1." },
      { when: "2026", name: "AI-ready & CBE-ready", text: "Pilot the OBE/CBE Core and Competency Map; issue data and AI policies." },
      { when: "2027", name: "AI-integrated & CBE-integrated", text: "Pilot AI Tutor, Faculty Copilot and Research Copilot; roll out the Living Portfolio." },
      { when: "2028–2029", name: "AI-driven CBE DAU", text: "Expand Agentic AI; Digital Twins at student, course and programme level; living accreditation." },
      { when: "2030–2031", name: "AI-native core completion", text: "Multi-agent ecosystem, university-wide Digital Twin, lifelong learning." },
      { when: "After 2031", name: "AI-native scaling & maturity", text: "University-wide scaling and operational optimisation." },
    ],
    principle: "Start small, measure honestly, improve fast, scale under control.",
    note: "Milestones are a proposed framework; moving from one phase to the next depends on the Data Maturity Index and the Evidence Authenticity Index.",
  },
  targets: {
    label: "Targets to 2030",
    title: "Proposed targets",
    note: "Based on the 2026–2030 Development Strategy. Results will be published only when backed by evidence.",
    items: [
      { value: "100%", label: "Programmes reviewed against learning outcomes, the VQF and accreditation" },
      { value: "≥50%", label: "Students in the 2027–2030 intakes with a Living Portfolio" },
      { value: "100%", label: "Lecturers trained in OBE/VQF, rubrics and assessment" },
      { value: "≥80%", label: "Lecturers completing AI-readiness and digital learning materials training" },
      { value: "≥30%", label: "Full-time lecturers holding a doctorate" },
    ],
  },
  pillars: {
    label: "07 — Pillars",
    title: "Seven strategic pillars",
    lead: "All pillars rest on a common foundation: 5T values and outcome-based education under OBE/VQF.",
    items: [
      { title: "Education", text: "Competency-based programmes, studio-based learning, Living Portfolio." },
      { title: "Science, Technology & AI", text: "Research Copilot and a transparent publication process." },
      { title: "Community", text: "Service learning and engagement with the local region." },
      { title: "International Cooperation & Communications", text: "Communicating the value of investing in education and expanding partnerships." },
      { title: "Faculty & Staff", text: "Building lecturers’ OBE capability and AI-readiness." },
      { title: "Finance & Facilities", text: "AI infrastructure, a second campus and more diverse resources." },
      { title: "Quality & IQA", text: "Internal quality assurance at four levels: University, Faculty, Programme and Course." },
    ],
    crossTitle: "Design × Domain interdisciplinary priorities",
    cross: [
      "Smart City, Urban Design & Digital Twin",
      "Green Architecture & Sustainable Construction",
      "BIM, Construction Management & Project Finance",
      "UX/UI, Digital Product & Visual Communication",
    ],
  },
  studio: {
    label: "08 — Pilot",
    title: "Architectural design studio",
    lead:
      "A 9-standard rubric for architectural design projects is the first pilot product. AI use is controlled and must be declared; students must demonstrate their individual competence. AI resilience is built in throughout rather than treated as a separate standard.",
    badge: "Pilot version",
    standards: [
      "Concept & creativity",
      "Identity & local character",
      "Space & function",
      "Planning & landscape",
      "Building technology",
      "Materials & construction",
      "Green architecture",
      "Community impact",
      "Presentation & defence",
    ],
  },
  benchmark: {
    label: "09 — Benchmarking",
    title: "Scientific basis and benchmarking",
    lead:
      "Every component of DAU’s design already has precedents around the world. The advantage therefore comes not from the AI-native label, but from the quality of integration.",
    stats: [
      { value: "76", label: "Key reference cases in Vietnam" },
      { value: "100", label: "Benchmark institutions: 80 international, 20 Vietnamese" },
      { value: "14", label: "Geographic clusters worldwide" },
      { value: "14", label: "Academic and institutional criteria" },
    ],
    advantagesTitle: "Six potential advantages",
    advantages: [
      "Coherence between values and operating mechanisms",
      "Traceability down to each competency gap",
      "Separating learning from formal recognition",
      "Common standards, flexible pathways",
      "A living competency record — Living Portfolio",
      "Interdisciplinary studios rooted in Architecture – Construction – Design",
    ],
    caveat: "This is an assessment of design quality and potential, not a claim that DAU has already achieved superior results.",
  },
  principles: {
    label: "10 — Principles",
    title: "Operating principles",
    items: [
      { title: "Humans decide", text: "Human-in-command is the governance principle; human-in-the-loop is the execution mechanism." },
      { title: "Academics lead", text: "Technology follows academic goals, not the other way round." },
      { title: "Stable core, flexible edge", text: "The core holds the mission, 5T, OBE/VQF and governance; the edge tests micro-credentials and interdisciplinary studios quickly." },
      { title: "DAU owns its core knowledge", text: "Under a Build–Buy–Partner model, DAU retains ownership of its standards, rubrics and evidence data." },
      { title: "Clean data first", text: "No early scaling before data is clean and evidence is verified." },
      { title: "Evidence before claims", text: "Only implementation levels and results backed by evidence are published." },
    ],
  },
  closing: {
    quote:
      "People at the centre, 5T as our identity, evidenced competence as the measure, data and AI as intelligence infrastructure, and genuine quality as a long-term commitment.",
    cite: "DAU Development Strategy 2026–2030, Vision to 2050",
  },
  gate: {
    title: "Welcome",
    lead: "This is the presentation of the AI-native University initiative of Danang Architecture University. Enter your access key to continue.",
    label: "Access key",
    placeholder: "Enter key",
    submit: "Enter",
    error: "That key isn't right. Please try again.",
    note: "The access key comes with your invitation.",
  },
  deck: { prev: "Previous", next: "Next", hint: "↑ ↓ sections · ← → details" },
  footer: {
    ownership: "This system is owned by Danang Architecture University.",
    address: "566 Nui Thanh, Hoa Cuong Ward, Da Nang",
    source:
      "Content summarised from the AI-native University proposal submitted to the University Council in 2026. Milestones and targets are proposals, not commitments.",
    rights: "© 2026 Danang Architecture University (DAU)",
    top: "Back to top",
  },
};

export default en;
