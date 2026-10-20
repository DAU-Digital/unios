import type { Dict } from "./types";

const ja: Dict = {
  meta: {
    title: "AI-native University 戦略プロジェクト — ダナン建築大学",
    description:
      "ダナン建築大学（DAU）が2026–2031年に推進する、AI-native Competency-Based 5T University モデル構築のための戦略プロジェクト。",
  },
  brand: { project: "AI-native University", school: "ダナン建築大学" },
  nav: {
    why: "なぜ必要か",
    book: "ブック表示",
    overview: "概要",
    philosophy: "5T哲学",
    model: "モデル",
    copilots: "Copilot",
    roadmap: "ロードマップ",
    benchmark: "ベンチマーク",
    menu: "メニュー",
    close: "閉じる",
  },
  hero: {
    eyebrow: "戦略プロジェクト 2026–2031",
    title: ["AI-native 大学", "人間を中心に"],
    model: "AI-native Competency-Based 5T University",
    lead:
      "DAUが目指すのは、表面的な「大学のAI化」ではありません。人間、5T哲学、OBE/VQF、実証されたコンピテンシー、そして質を中心に据え、大学のあり方そのものをAI-nativeな形へと再設計します。",
    cta: "プロジェクトを見る",
    stats: [
      { value: "9", label: "統合設計レイヤー" },
      { value: "4", label: "コア Copilot" },
      { value: "5", label: "成熟度レベル" },
      { value: "2031", label: "AI-native 目標年" },
    ],
  },
  why: {
    label: "01 — なぜ必要か",
    title: "DAUにAIネイティブ構想が必要な理由",
    lead:
      "AIはもはや個々の小さな作業を支えるだけではなく、大学の価値連鎖全体に影響を及ぼしつつある。LMSにチャットボットを加えたり、AIで講義資料を作成したりするだけでは、AIネイティブではなくAI支援（AI-assisted）の段階にとどまる。",
    note: "このセクションの翻訳は確認中です。",
    paths: [
      {
        tag: "道筋1",
        title: "個別最適のまま発展を続ける",
        text: "部署ごとに別々のソフトウェア、学部等の教育組織ごとに異なるやり方、教育プログラムごとに別の学修成果マトリクスがあり、評価・認証のたびにエビデンスを手作業で集め直す。",
        result: "結果として「データの孤島」が生まれ、質の保証も、学修の個別化も、長期的な強みの形成もできない。",
        strong: "「データの孤島」",
      },
      {
        tag: "DAUの選択",
        title: "一つのAIネイティブ・エコシステムに統合する",
        text: "学修成果を基幹とし、実証された能力を目標に、データを基盤として、AIを行動を支える層と位置付ける。",
        result: "結果として、人間が意思決定を行う一体的な設計となる。",
        strong: "人間が意思決定を行う",
      },
    ],
    table: {
      head: ["現在の課題", "対処しない場合の影響", "本構想における解決策"],
      rows: [
        {
          problem: "教育、試験、LMS、ポートフォリオ、評価・認証のデータが分散している",
          effect: "学修成果の達成度の測定、エビデンスの検索、迅速な意思決定が難しい",
          answer: "OBE/CBEコア、セカンドブレインとデータガバナンス",
          codes: ["5D", "5F"],
        },
        {
          problem: "AIが個別のツールとして使われるおそれがある",
          effect: "表面的なチャットボット化にとどまり、質の実質的な向上につながらない",
          answer: "人間による確認・監督を組み込んだAIエージェントの協調",
          codes: ["5H"],
        },
        {
          problem: "従来の評価はAIに代替されやすい",
          effect: "成績が学修者本人の能力を十分に反映しなくなる",
          answer: "プロセス、制作物、口頭審査、リビング・ポートフォリオに基づく、AIによる代替に耐えうる評価",
          codes: ["5I"],
        },
        {
          problem: "評価・認証が期ごとの書類収集に依存している",
          effect: "エビデンスが更新されず、PDCAのサイクルを閉じにくい",
          answer: "継続的に更新されるエビデンスと、評価・認証に常時対応できる態勢",
          codes: ["5I"],
        },
        {
          problem: "学生には個別化された学修経路が必要である",
          effect: "受け身の学修になりやすく、必要なときに支援が届かない",
          answer: "コンピテンシー・マップに基づくAIチューター",
          codes: ["5E"],
        },
      ],
    },
    drivers: [
      {
        title: "テクノロジーによる教育の再構築",
        text: "AI、ビッグデータ、自動化、Digital Twin、グリーントランスフォーメーション、デジタル経済が、大学における教育・学習・運営のあり方を変えつつあります。",
      },
      {
        title: "社会が求める本物の能力",
        text: "学習者には、成績証明書だけでなく、成果物と信頼できるエビデンスによって能力を示すことが求められています。",
      },
      {
        title: "自律性と説明責任",
        text: "高等教育は、自律的な運営、認証評価、質の透明性を重視する方向へ移行しています。",
      },
      {
        title: "規模から能力へ",
        text: "発展の軸は、規模の拡大から、能力、データ、質、イノベーションへと移りつつあります。",
      },
    ],
  },
  overview: {
    label: "02 — 概要",
    title: "ソフトウェア導入ではなく、大学変革のプログラム",
    lead:
      "本プロジェクトは、チャットボットや管理ソフトウェアを導入するものではありません。データ、学修成果、実証されたコンピテンシー、AIによって運営される大学エコシステムへとDAUを転換する取り組みであり、最終的な意思決定の主体は常に人間です。",
    facts: [
      { value: "2006", title: "基盤", text: "約20年にわたる発展の歩み。" },
      { value: "6年", title: "2026–2031", text: "DAUの重点戦略プロジェクト。" },
      { value: "レベル5", title: "AI-native", text: "2031年に向けて目指す成熟度。" },
      { value: "2050", title: "ビジョン", text: "5Tの価値 – 実証されたコンピテンシー – アジアと世界に通用する存在。" },
    ],
  },
  motto: { label: "モットー", text: "実質 – 実力 – 未来を創る" },
  philosophy: {
    label: "03 — アイデンティティ",
    title: "5Tの三層構造",
    lead:
      "5TはDAUのアイデンティティであり、指導理念、教育の方法、大学としてのブランド価値という三つの層に分けて整理されています。AI-nativeは、これらの価値を実現するための基盤にすぎません。",
    tiers: [
      {
        name: "5T哲学",
        text: "思想的基盤",
        items: [
          { name: "静謐", en: "Tranquility" },
          { name: "叡智", en: "Theoria" },
          { name: "実証", en: "Tangibility" },
          { name: "変通", en: "Transfluency" },
          { name: "永続", en: "Transcendence" },
        ],
      },
      {
        name: "5T教育",
        text: "教育の方法",
        items: [
          { name: "実学", en: "Think" },
          { name: "実習", en: "Train" },
          { name: "実務", en: "Task" },
          { name: "実戦", en: "Test" },
          { name: "実践的創造", en: "Transform" },
        ],
      },
      {
        name: "5Tブランド価値",
        text: "DAU学生の特質",
        items: [
          { name: "先駆", en: "Trailblazing" },
          { name: "実践", en: "Tangible" },
          { name: "全人", en: "Thriving" },
          { name: "協働", en: "Togetherness" },
          { name: "責任", en: "Trustworthy" },
        ],
      },
    ],
    bridge: {
      label: "5Tをデータ・AIへ結び付ける運用指標",
      items: ["実証されたコンピテンシー", "デジタル責任", "創成的思考"],
    },
  },
  model: {
    label: "04 — モデル",
    title: "九層からなる統合設計",
    lead:
      "AI-native Competency-Based DAU モデルは、人間の価値から知的基盤・質の基盤に至る九つの層で構成されます。個別ツールの寄せ集めではなく、一つの統合された設計です。",
    layers: [
      { code: "5A", name: "Human-centred 5T", text: "人間が中心。AIは教員に取って代わらない。" },
      { code: "5B", name: "OBE/VQF", text: "学修成果に基づく教育を、ベトナム国家資格枠組（VQF）に整合させる。" },
      { code: "5C", name: "AI-Native CBE Ecosystem", text: "学修成果を、観察・測定・証明・改善が可能なコンピテンシーへと転換する。" },
      { code: "5D", name: "OBE/CBE Core", text: "全学の学術データの基幹。" },
      { code: "5E", name: "Competency Map", text: "コンピテンシーを観察可能な行動で記述し、エビデンス、ルーブリック、習熟度と結び付ける。" },
      { code: "5F", name: "Second Brain & Governance", text: "組織の記憶、Knowledge Graph、データとAIのガバナンス。" },
      { code: "5G", name: "AI Infrastructure Efficiency", text: "モデルの調整とコスト管理。基盤データを損なわずにモデルを切り替えられる。" },
      { code: "5H", name: "Agentic Orchestration", text: "権限管理、監査ログ、human-in-the-loopを備えたAIエージェントの統合運用。" },
      { code: "5I", name: "World Models, Evidence & Quality Intelligence", text: "Digital Twin University、Learning Analytics、Living Portfolio、PDCA/CQI、常時型の認証評価。" },
    ],
  },
  copilots: {
    label: "05 — Copilot",
    title: "四つの中核Copilotと共通基盤",
    lead:
      "Agentic AIは単一のチャットボットではなく、権限管理・統制・説明責任を備えたエージェントのエコシステムです。各Copilotには明確な制約が設けられています。",
    forLabel: "対象",
    guardLabel: "制約",
    items: [
      {
        name: "AI Tutor",
        for: "学生",
        does: "コンピテンシーマップに沿って学習に伴走し、演習の提案やフィードバックを行う。",
        guard: "学生の課題を代行しない。",
      },
      {
        name: "Faculty Copilot",
        for: "教員",
        does: "科目設計、ルーブリック、教材、学習者へのフィードバックを支援する。",
        guard: "教員の専門的判断に取って代わらない。",
      },
      {
        name: "Research Copilot",
        for: "研究者",
        does: "文献レビュー、データ管理、論文発表のプロセスを支援する。",
        guard: "論文の代筆やデータの捏造は行わない。",
      },
      {
        name: "Admin Copilot",
        for: "管理部門",
        does: "業務プロセス、報告、質のモニタリング、認証評価を支援する。",
        guard: "教務・財務・人事・認証評価に関する決定を自ら行わない。",
      },
    ],
    foundation: "四つのCopilotはいずれも、Second Brain、Knowledge Graph、OBE/CBE Core、Data/AI Governanceを共通基盤とします。",
    quote: ["Second Brainが正しく記憶し", "World Modelsがより良く予測し", "人間が決定する"],
  },
  maturity: {
    label: "06 — 成熟度",
    title: "五段階の成熟度",
    lead: "各レベルは、次のレベルに進むための必要条件です。DAUは一歩ずつ前進し、拡大の前に実態を正確に測定します。",
    levels: [
      { name: "デジタル化", en: "Digitized", text: "業務とデータがデジタル化されている。" },
      { name: "データ活用", en: "Data-informed", text: "データを根拠に意思決定が行われる。" },
      { name: "AI統合", en: "AI-integrated", text: "AIが中核的な活動に組み込まれている。" },
      { name: "AI主導", en: "AI-driven", text: "AIが業務を調整し、人間が監督する。" },
      { name: "AI-native", en: "AI-native", text: "設計段階からデータとAIを基盤として大学が運営される。" },
    ],
    target: "目標：2031年までにレベル5を目指す。",
  },
  roadmap: {
    label: "07 — ロードマップ",
    title: "ロードマップ 2026–2031",
    lead: "テクノロジーは学術目標に従う。各段階は、データとエビデンスが十分に信頼できる水準に達した時点で初めて拡大します。",
    phases: [
      { when: "最初の100日", name: "始動", text: "運営委員会の設置、パイロット教育プログラムの選定、Second Brain v1。" },
      { when: "2026", name: "AI-ready & CBE-ready", text: "OBE/CBE CoreとCompetency Mapの試行、データ・AIポリシーの制定。" },
      { when: "2027", name: "AI-integrated & CBE-integrated", text: "AI Tutor、Faculty Copilot、Research Copilotの試行、Living Portfolioの導入。" },
      { when: "2028–2029", name: "AI-driven CBE DAU", text: "Agentic AIの拡大、学生・科目・プログラム単位のDigital Twin、常時型の認証評価。" },
      { when: "2030–2031", name: "AI-native core completion", text: "マルチエージェントのエコシステム、全学規模のDigital Twin、生涯学習。" },
      { when: "2031年以降", name: "AI-native scaling & maturity", text: "全学への展開と運営の最適化。" },
    ],
    principle: "小さく始め、正直に測り、素早く改善し、統制のもとで拡大する。",
    note: "各マイルストーンは提案段階の枠組みです。段階の移行は、データ成熟度指数（Data Maturity Index）とエビデンス真正性指数（Evidence Authenticity Index）に基づいて判断します。",
  },
  targets: {
    label: "2030年までの目標",
    title: "提案中の指標",
    note: "2026–2030年発展戦略に基づく。成果はエビデンスが揃った場合にのみ公表します。",
    items: [
      { value: "100%", label: "学修成果、VQF、認証評価に基づき見直された教育プログラム" },
      { value: "≥50%", label: "Living Portfolioを持つ2027–2030年度入学生" },
      { value: "100%", label: "OBE/VQF、ルーブリック、評価に関する研修を受けた教員" },
      { value: "≥80%", label: "AI-readinessとデジタル教材の研修を修了した教員" },
      { value: "≥30%", label: "博士号を持つ専任教員" },
    ],
  },
  pillars: {
    label: "08 — 戦略の柱",
    title: "七つの戦略的柱",
    lead: "すべての柱は、5Tの価値とOBE/VQFに基づく学修成果重視の教育という共通の基盤の上に成り立っています。",
    items: [
      { title: "教育", text: "コンピテンシー基盤のプログラム、スタジオ型学習、Living Portfolio。" },
      { title: "科学技術・AI", text: "Research Copilotと透明性の高い論文発表プロセス。" },
      { title: "地域社会", text: "地域に貢献する学びと地域との連携。" },
      { title: "国際協力・広報", text: "教育投資の価値を発信し、パートナーシップを拡大。" },
      { title: "教職員", text: "教員のOBE能力とAI-readinessの育成。" },
      { title: "財務・施設", text: "AIインフラ、第2キャンパス、資源の多様化。" },
      { title: "質・IQA", text: "大学、学部、プログラム、科目の4レベルにおける内部質保証。" },
    ],
    crossTitle: "Design × Domain 学際的重点分野",
    cross: [
      "Smart City, Urban Design & Digital Twin",
      "Green Architecture & Sustainable Construction",
      "BIM, Construction Management & Project Finance",
      "UX/UI, Digital Product & Visual Communication",
    ],
  },
  studio: {
    label: "09 — パイロット",
    title: "建築設計スタジオ",
    lead:
      "建築設計課題のための9基準ルーブリックが、最初のパイロット成果物です。AIの利用は管理下で行い、申告を義務とします。学生は個人としての能力を証明しなければなりません。AIへの耐性は独立した基準とせず、全体を通じて組み込まれています。",
    badge: "試行版",
    standards: [
      "コンセプトと創造性",
      "アイデンティティと地域性",
      "空間と機能",
      "都市計画とランドスケープ",
      "建築技術",
      "材料と構法",
      "グリーン建築",
      "地域社会への波及",
      "表現と講評",
    ],
  },
  benchmark: {
    label: "10 — ベンチマーク",
    title: "科学的根拠とベンチマーク",
    lead:
      "DAUの設計を構成する要素は、いずれも世界に先行事例があります。したがって優位性は「AI-native」という名称ではなく、統合の質から生まれます。",
    stats: [
      { value: "76", label: "ベトナム国内の重点事例" },
      { value: "100", label: "比較対象機関：海外80、ベトナム20" },
      { value: "14", label: "世界の地域クラスター" },
      { value: "14", label: "学術・制度面の評価基準" },
    ],
    advantagesTitle: "六つの潜在的な優位性",
    advantages: [
      "価値と運営メカニズムの一貫性",
      "個々のコンピテンシー不足まで遡れるトレーサビリティ",
      "学習と正式な認定の分離",
      "共通の基準と柔軟な学習経路",
      "生きたコンピテンシー記録 — Living Portfolio",
      "建築・建設・デザインの特性に根差した学際的スタジオ",
    ],
    caveat: "これは設計の質と可能性に関する評価であり、DAUがすでに優れた成果を上げたという結論ではありません。",
  },
  principles: {
    label: "11 — 原則",
    title: "運営原則",
    items: [
      { title: "人間が決定する", text: "Human-in-commandはガバナンスの原則であり、human-in-the-loopはその実行メカニズムです。" },
      { title: "学術が主導する", text: "テクノロジーは学術目標に従うものであり、その逆ではありません。" },
      { title: "安定した中核、柔軟な周縁", text: "中核では使命、5T、OBE/VQF、ガバナンスを堅持し、周縁ではマイクロクレデンシャルや学際的スタジオを迅速に試行します。" },
      { title: "中核的知識はDAUが保有", text: "Build–Buy–Partnerモデルのもと、基準、ルーブリック、エビデンスデータはDAUが保持します。" },
      { title: "まずデータの整備から", text: "データが整備され、エビデンスが検証されるまで、早期の拡大は行いません。" },
      { title: "エビデンスに基づく公表", text: "公表するのは、エビデンスに裏付けられた実施状況と成果のみです。" },
    ],
  },
  closing: {
    quote:
      "人間を中心に、5Tをアイデンティティに、実証されたコンピテンシーを尺度に、データとAIを知的基盤に、そして真の質を長期的な約束とする。",
    cite: "DAU発展戦略 2026–2030、2050年ビジョン",
  },
  gate: {
    title: "ようこそ",
    lead: "ダナン建築大学の AI-native University 構想のプレゼンテーションです。続けるにはアクセスキーを入力してください。",
    label: "アクセスキー",
    placeholder: "キーを入力",
    submit: "入場",
    error: "キーが正しくありません。もう一度お試しください。",
    note: "アクセスキーは招待状に記載されています。",
  },
  deck: { prev: "前へ", next: "次へ", hint: "↑ ↓ セクション · ← → 詳細" },
  footer: {
    ownership: "本システムはダナン建築大学（Danang Architecture University）が所有しています。",
    address: "566 Nui Thanh, Hoa Cuong Ward, Da Nang（ベトナム）",
    source:
      "本サイトの内容は、2026年に大学評議会へ提出されたAI-native University プロジェクト資料を要約したものです。各マイルストーンと指標は提案であり、確約ではありません。",
    rights: "© 2026 ダナン建築大学（DAU）",
    top: "ページの先頭へ",
  },
};

export default ja;
