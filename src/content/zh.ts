import type { Dict } from "./types";

const zh: Dict = {
  meta: {
    title: "AI-native University 战略项目 — 岘港建筑大学",
    description:
      "岘港建筑大学（DAU）2026–2031 年战略项目，旨在构建 AI-native Competency-Based 5T University 模式。",
  },
  brand: { project: "AI-native University", school: "岘港建筑大学" },
  nav: {
    why: "为何需要",
    book: "书本视图",
    overview: "概览",
    philosophy: "5T 理念",
    model: "模式",
    copilots: "Copilot",
    roadmap: "路线图",
    benchmark: "对标",
    menu: "菜单",
    close: "关闭",
  },
  hero: {
    eyebrow: "2026–2031 战略项目",
    title: ["AI-native 大学", "以人为本"],
    model: "AI-native Competency-Based 5T University",
    lead:
      "DAU 并非在表层意义上“让大学 AI 化”，而是以人、5T 理念、OBE/VQF、实证能力和质量为中心，按照 AI-native 方向重新设计大学模式。",
    cta: "了解项目",
    stats: [
      { value: "9", label: "集成设计层" },
      { value: "4", label: "核心 Copilot" },
      { value: "5", label: "成熟度等级" },
      { value: "2031", label: "AI-native 目标年份" },
    ],
  },
  why: {
    label: "01 — 为何需要",
    title: "DAU为何需要AI原生大学建设方案",
    lead:
      "AI已不只是辅助单项小任务，而是正在影响大学的整个价值链。仅在学习管理系统（LMS）中加入聊天机器人，或用AI编写课件，只是“AI辅助”（AI-assisted），而非AI原生。",
    note: "本部分译文尚待审校。",
    paths: [
      {
        tag: "路径一",
        title: "继续分散式发展",
        text: "每个部门一套软件，每个院系一种做法，每个专业一套学习成果矩阵，每轮评估认证都要人工收集证据。",
        result: "结果是形成“数据孤岛”，无法保障质量，无法实现个性化学习，也无法形成长期优势。",
        strong: "“数据孤岛”",
      },
      {
        tag: "DAU的选择",
        title: "整合为统一的AI原生生态系统",
        text: "以学习成果为主干，以经证据验证的能力为目标，以数据为基础设施，以AI为支持行动的层级。",
        result: "结果是形成一体化设计，并由人作出决定。",
        strong: "由人作出决定",
      },
    ],
    table: {
      head: ["现存问题", "若不解决的后果", "建设方案中的解决路径"],
      rows: [
        {
          problem: "教学、考试、LMS、学习档案和评估认证数据仍然分散",
          effect: "难以衡量学习成果达成度，难以追溯证据，难以快速决策",
          answer: "OBE/CBE核心、第二大脑与数据治理",
          codes: ["5D", "5F"],
        },
        {
          problem: "AI容易被当作零散工具使用",
          effect: "停留于表面的“聊天机器人化”，无法带来真正的质量提升",
          answer: "引入人在回路机制的AI智能体编排",
          codes: ["5H"],
        },
        {
          problem: "传统评价容易被AI替代",
          effect: "分数不再能充分反映学习者的真实能力",
          answer: "结合过程、作品、答辩与动态能力档案的防AI替代真实性评价",
          codes: ["5I"],
        },
        {
          problem: "评估认证仍偏重按周期汇集材料",
          effect: "证据缺乏时效，PDCA闭环难以形成",
          answer: "持续更新的证据与面向评估认证的常态化准备机制",
          codes: ["5I"],
        },
        {
          problem: "学生需要个性化学习路径",
          effect: "容易被动学习，缺乏及时支持",
          answer: "依据能力图谱提供支持的AI学习导师",
          codes: ["5E"],
        },
      ],
    },
    drivers: [
      {
        title: "技术重塑教育",
        text: "AI、大数据、自动化、Digital Twin、绿色转型与数字经济，正在改变大学的教学、学习与治理方式。",
      },
      {
        title: "市场需要真才实学",
        text: "学习者需要以作品和可信的证据证明自己的能力，而不仅仅依靠成绩单。",
      },
      {
        title: "自主与问责",
        text: "高等教育正走向自主办学、认证评估与质量透明。",
      },
      {
        title: "从规模到能力",
        text: "发展方向正从规模扩张转向能力、数据、质量与创新。",
      },
    ],
  },
  overview: {
    label: "02 — 概览",
    title: "一项大学转型计划，而非软件项目",
    lead:
      "本项目不是采购聊天机器人或管理软件，而是推动 DAU 成为一个依靠数据、学习成果、实证能力和 AI 运行的大学生态系统——同时，人始终是最终决策的主体。",
    facts: [
      { value: "2006", title: "基础", text: "近 20 年的建设与发展。" },
      { value: "6 年", title: "2026–2031", text: "DAU 重点战略项目。" },
      { value: "第 5 级", title: "AI-native", text: "力争于 2031 年达到的成熟度目标。" },
      { value: "2050", title: "愿景", text: "5T 价值 – 实证能力 – 亚洲与世界影响力。" },
    ],
  },
  motto: { label: "宗旨", text: "实质 – 实才 – 开创未来" },
  philosophy: {
    label: "03 — 特色",
    title: "5T 的三个层次",
    lead:
      "5T 是 DAU 的特色与身份，分为三个相互独立的层次：指导理念、培养方式与学校品牌价值。AI-native 只是实现这些价值的基础设施。",
    tiers: [
      {
        name: "5T 理念",
        text: "思想基础",
        items: [
          { name: "宁静", en: "Tranquility" },
          { name: "睿智", en: "Theoria" },
          { name: "实证", en: "Tangibility" },
          { name: "通变", en: "Transfluency" },
          { name: "永续", en: "Transcendence" },
        ],
      },
      {
        name: "5T 教育",
        text: "培养方式",
        items: [
          { name: "实学", en: "Think" },
          { name: "实训", en: "Train" },
          { name: "实务", en: "Task" },
          { name: "实战", en: "Test" },
          { name: "实创", en: "Transform" },
        ],
      },
      {
        name: "5T 品牌价值",
        text: "DAU 学子的特质",
        items: [
          { name: "先锋", en: "Trailblazing" },
          { name: "务实", en: "Tangible" },
          { name: "全面", en: "Thriving" },
          { name: "协作", en: "Togetherness" },
          { name: "责任", en: "Trustworthy" },
        ],
      },
    ],
    bridge: {
      label: "将 5T 融入数据与 AI 的运行指标",
      items: ["实证能力", "数字责任", "建构思维"],
    },
  },
  model: {
    label: "04 — 模式",
    title: "一体化设计，九个层次",
    lead:
      "AI-native Competency-Based DAU 模式由九个层次构成，从人的价值延伸至智能与质量基础设施——是一个统一的整体设计，而非零散的工具。",
    layers: [
      { code: "5A", name: "Human-centred 5T", text: "以人为本；AI 不取代教师。" },
      { code: "5B", name: "OBE/VQF", text: "基于学习成果的培养，与越南国家资历框架（VQF）相衔接。" },
      { code: "5C", name: "AI-Native CBE Ecosystem", text: "将学习成果转化为可观察、可衡量、可证明、可改进的能力。" },
      { code: "5D", name: "OBE/CBE Core", text: "全校学术数据的主干。" },
      { code: "5E", name: "Competency Map", text: "以可观察的行为描述能力，并关联证据、评分量规与熟练等级。" },
      { code: "5F", name: "Second Brain & Governance", text: "机构记忆、Knowledge Graph 以及数据与 AI 治理。" },
      { code: "5G", name: "AI Infrastructure Efficiency", text: "模型调度与成本控制；可更换模型而不破坏基础数据。" },
      { code: "5H", name: "Agentic Orchestration", text: "调度具备权限管理、审计日志和人在回路（human-in-the-loop）机制的 AI 智能体。" },
      { code: "5I", name: "World Models, Evidence & Quality Intelligence", text: "Digital Twin University、Learning Analytics、Living Portfolio、PDCA/CQI 与动态认证评估。" },
    ],
  },
  copilots: {
    label: "05 — Copilot",
    title: "四个核心 Copilot，一个共同基础",
    lead:
      "Agentic AI 不是单一的聊天机器人，而是具备权限管理、控制与问责机制的智能体生态系统。每个 Copilot 都有明确的边界。",
    forLabel: "服务对象",
    guardLabel: "边界",
    items: [
      {
        name: "AI Tutor",
        for: "学生",
        does: "依据能力图谱陪伴学习，推荐练习并提供反馈。",
        guard: "不代替学生完成作业。",
      },
      {
        name: "Faculty Copilot",
        for: "教师",
        does: "支持课程设计、评分量规、教学资源以及对学习者的反馈。",
        guard: "不取代教师的专业判断。",
      },
      {
        name: "Research Copilot",
        for: "研究人员",
        does: "支持文献综述、数据管理与成果发表流程。",
        guard: "不代写论文，不编造数据。",
      },
      {
        name: "Admin Copilot",
        for: "管理人员",
        does: "支持业务流程、报告、质量监测与认证评估。",
        guard: "不自行决定教务、财务、人事及认证事项。",
      },
    ],
    foundation: "四者共用 Second Brain、Knowledge Graph、OBE/CBE Core 与 Data/AI Governance。",
    quote: ["Second Brain 让 DAU 记得准确", "World Models 让 DAU 预测得更好", "由人来决定"],
  },
  maturity: {
    label: "06 — 成熟度",
    title: "五个成熟度等级",
    lead: "每一级都是迈向下一级的必要条件。DAU 稳步推进，在扩展之前如实衡量。",
    levels: [
      { name: "数字化", en: "Digitized", text: "流程与数据实现数字化。" },
      { name: "数据支撑", en: "Data-informed", text: "决策以数据为依据。" },
      { name: "AI 融合", en: "AI-integrated", text: "AI 融入各项核心工作。" },
      { name: "AI 驱动", en: "AI-driven", text: "由 AI 协调流程，人负责监督。" },
      { name: "AI-native", en: "AI-native", text: "大学从设计之初即以数据和 AI 为基础运行。" },
    ],
    target: "目标：力争于 2031 年达到第 5 级。",
  },
  roadmap: {
    label: "07 — 路线图",
    title: "2026–2031 路线图",
    lead: "技术服从于学术目标。只有当数据与证据足够可信时，各阶段才会扩展。",
    phases: [
      { when: "最初 100 天", name: "启动", text: "成立指导委员会，选定试点培养方案，建设 Second Brain v1。" },
      { when: "2026", name: "AI-ready & CBE-ready", text: "试点 OBE/CBE Core 与 Competency Map；出台数据与 AI 政策。" },
      { when: "2027", name: "AI-integrated & CBE-integrated", text: "试点 AI Tutor、Faculty Copilot、Research Copilot；推行 Living Portfolio。" },
      { when: "2028–2029", name: "AI-driven CBE DAU", text: "扩展 Agentic AI；建立学生、课程与专业层面的 Digital Twin；动态认证评估。" },
      { when: "2030–2031", name: "AI-native core completion", text: "多智能体生态系统、全校 Digital Twin、终身学习。" },
      { when: "2031 年以后", name: "AI-native scaling & maturity", text: "全校推广并优化运行。" },
    ],
    principle: "从小处起步，如实衡量，快速改进，有序扩展。",
    note: "各里程碑为建议框架；阶段推进以数据成熟度指数（Data Maturity Index）和证据真实性指数（Evidence Authenticity Index）为依据。",
  },
  targets: {
    label: "2030 年目标",
    title: "拟定指标",
    note: "依据 2026–2030 年发展战略。仅在具备证据时公布结果。",
    items: [
      { value: "100%", label: "依据学习成果、VQF 与认证要求完成审查的培养方案" },
      { value: "≥50%", label: "拥有 Living Portfolio 的 2027–2030 级新生" },
      { value: "100%", label: "接受 OBE/VQF、评分量规与评价培训的教师" },
      { value: "≥80%", label: "完成 AI-readiness 与数字教学资源培训的教师" },
      { value: "≥30%", label: "具有博士学位的专任教师" },
    ],
  },
  pillars: {
    label: "08 — 支柱",
    title: "七大战略支柱",
    lead: "所有支柱都建立在共同的基础之上：5T 价值与基于 OBE/VQF 学习成果的培养。",
    items: [
      { title: "人才培养", text: "基于能力的培养方案、工作室化教学、Living Portfolio。" },
      { title: "科技与 AI", text: "Research Copilot 与透明的成果发表流程。" },
      { title: "社区服务", text: "服务社区的学习，连接地方发展。" },
      { title: "国际合作与传播", text: "传播教育投资的价值，拓展合作伙伴。" },
      { title: "师资队伍", text: "提升教师的 OBE 能力与 AI-readiness。" },
      { title: "财务与基础设施", text: "AI 基础设施、第二校区、资源多元化。" },
      { title: "质量与 IQA", text: "在学校、学院、专业、课程四个层面实施内部质量保障。" },
    ],
    crossTitle: "Design × Domain 跨学科优先方向",
    cross: [
      "Smart City, Urban Design & Digital Twin",
      "Green Architecture & Sustainable Construction",
      "BIM, Construction Management & Project Finance",
      "UX/UI, Digital Product & Visual Communication",
    ],
  },
  studio: {
    label: "09 — 试点",
    title: "建筑设计工作室",
    lead:
      "建筑设计作业的 9 项标准评分量规是首个试点成果。AI 的使用须受控并如实申报；学生必须证明个人能力。抗 AI 要素贯穿始终，而非单列为一项标准。",
    badge: "试行版",
    standards: [
      "构思与创意",
      "特色与在地性",
      "空间与功能",
      "规划与景观",
      "建筑技术",
      "材料与构造",
      "绿色建筑",
      "社区影响",
      "表现与答辩",
    ],
  },
  benchmark: {
    label: "10 — 对标",
    title: "科学依据与对标",
    lead:
      "DAU 设计中的每个组成部分在世界上都已有先例。因此，优势并非来自“AI-native”这一名称，而是来自整合的质量。",
    stats: [
      { value: "76", label: "越南重点案例" },
      { value: "100", label: "对标院校：国际 80 所，越南 20 所" },
      { value: "14", label: "全球地理集群" },
      { value: "14", label: "学术与制度评价标准" },
    ],
    advantagesTitle: "六项潜在优势",
    advantages: [
      "价值与运行机制相一致",
      "可追溯至每一项能力差距",
      "学习与正式认定相分离",
      "统一标准，灵活路径",
      "动态能力档案 — Living Portfolio",
      "立足建筑–建造–设计特色的跨学科工作室",
    ],
    caveat: "这是对设计质量与潜力的评估，并不意味着 DAU 已取得卓越成果。",
  },
  principles: {
    label: "11 — 原则",
    title: "运行原则",
    items: [
      { title: "由人决定", text: "Human-in-command 是治理原则；human-in-the-loop 是执行机制。" },
      { title: "学术引领", text: "技术服从于学术目标，而非相反。" },
      { title: "核心稳定，边缘灵活", text: "核心坚守使命、5T、OBE/VQF 与治理；边缘快速试验微证书与跨学科工作室。" },
      { title: "DAU 掌握核心知识", text: "依据 Build–Buy–Partner 模式，DAU 自主掌握标准、评分量规与证据数据。" },
      { title: "数据清洁优先", text: "在数据尚未清洁、证据尚未核实之前，不过早扩展。" },
      { title: "有据方可发布", text: "只公布有证据支撑的实施程度与成果。" },
    ],
  },
  closing: {
    quote:
      "以人为中心，以 5T 为特色，以实证能力为标尺，以数据和 AI 为智能基础设施，以真正的质量为长期承诺。",
    cite: "DAU 2026–2030 年发展战略及 2050 年愿景",
  },
  gate: {
    title: "欢迎",
    lead: "这是岘港建筑大学 AI-native University 方案的展示。请输入访问码以继续。",
    label: "访问码",
    placeholder: "输入访问码",
    submit: "进入",
    error: "访问码不正确，请重试。",
    note: "访问码随邀请函一同发送。",
  },
  deck: { prev: "上一页", next: "下一页", hint: "↑ ↓ 切换章节 · ← → 查看详情" },
  footer: {
    ownership: "本系统归岘港建筑大学（Danang Architecture University）所有。",
    address: "566 Nui Thanh, Hoa Cuong Ward, Da Nang（越南）",
    source:
      "内容摘自 2026 年提交学校理事会的 AI-native University 项目材料。各里程碑与指标均为建议，并非承诺。",
    rights: "© 2026 岘港建筑大学（DAU）",
    top: "返回顶部",
  },
};

export default zh;
