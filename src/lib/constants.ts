import type {
  PersonalInfo,
  Stat,
  About,
  Experience,
  Project,
  SkillCategory,
  Proficiency,
  Education,
  Certificate,
  CertificateGroup,
  Conference,
  ContactInfo,
  SocialLink,
  NavItem,
} from '@/types';

// ============================================================
// PERSONAL INFORMATION
// ============================================================

export const personalInfo: PersonalInfo = {
  name: 'Sushant Sharma',
  firstName: 'Sushant',
  lastName: 'Sharma',
  initials: 'SS',
  title: 'AI Research Engineer & Full-Stack Developer',
  titles: [
    'AI Research Engineer',
    'ML Specialist',
    'Full-Stack Developer',
    'Deep Learning Expert',
  ],
  location: 'Toronto, Ontario, Canada',
  email: 'sharmasj53@gmail.com',
  phone: '(226) 961-5873',
  availability: 'Available Now',
  linkedin: 'https://linkedin.com/in/sushantsharma22',
  github: 'https://github.com/sushantsharma22',
  portfolio: 'https://sushantsharma22.github.io/Portfolio',
};

// ============================================================
// STATISTICS
// ============================================================

export const stats: Stat[] = [
  { value: 17, label: 'Projects', description: 'End-to-end ML/AI solutions' },
  { value: 3, label: 'Years Experience', description: 'In AI/ML development' },
  { value: 50, label: 'Events Coordinated', description: 'AI & coding hackathons' },
  { value: 200, label: 'Participants Engaged', description: 'Engaged & mentored' },
];

// ============================================================
// ABOUT SECTION
// ============================================================

export const about: About = {
  greeting: "Hello, I'm",
  intro: "Hello! I'm Sushant, an AI Research Engineer passionate about creating intelligent solutions.",
  description: 'Recently completed Master of Applied Computing at University of Windsor, specializing in Artificial Intelligence and Finance. Available for full-time opportunities.',
  paragraphs: [
    'My journey in AI and machine learning has been driven by a fascination with creating systems that can learn, adapt, and make intelligent decisions. I specialize in developing AI-driven solutions, predictive analytics, and scalable distributed systems.',
    "Throughout my career, I've had the privilege of collaborating with industry leaders like JLR North America and TD Bank, working on cutting-edge automotive AI research and financial ML systems. My experience spans from developing self-improving language models to implementing real-time IoT analytics pipelines.",
    "When I'm not coding, you'll find me exploring the latest research papers, contributing to open-source projects, or coordinating tech events. I've organized 50+ AI & coding hackathons, engaging over 200+ participants and fostering innovation in the tech community.",
  ],
  highlights: [
    {
      icon: '🚀',
      title: 'Innovation Driven',
      description: 'Constantly exploring cutting-edge AI technologies and methodologies',
    },
    {
      icon: '👥',
      title: 'Collaborative Leader',
      description: 'Experience leading cross-functional teams and coordinating major tech events',
    },
    {
      icon: '💡',
      title: 'Problem Solver',
      description: 'Passion for tackling complex challenges with creative, efficient solutions',
    },
  ],
};

// ============================================================
// EXPERIENCE
// ============================================================

export const experience: Experience[] = [
  {
    id: 'jlr',
    title: 'AI Research Intern',
    company: 'JLR North America',
    location: 'Windsor, Ontario (Remote)',
    dateRange: 'May 2025 – August 2025',
    status: 'completed',
    summary: 'Leading cutting-edge AI research initiatives for a global automotive leader, advancing innovative solutions through state-of-the-art AI technologies.',
    achievements: [
      'Drove impactful research initiatives for a global automotive leader, advancing innovative solutions through cutting edge AI technologies',
      'Designed and executed sophisticated experiments with advanced computational tools to analyze complex datasets, delivering high precision results',
      'Developed streamlined workflows to process and evaluate data, ensuring alignment with stringent project standards and timelines',
      'Collaborated with cross functional teams, including academic partners from the University, maintaining strict confidentiality and IP protocols',
      'Leveraged expertise in artificial intelligence, machine learning, data analysis, and software development for transformative automotive research outcomes',
    ],
    techStack: ['AI Research', 'Machine Learning', 'Data Analysis', 'Automotive AI', 'Python', 'Research Methods'],
    icon: '🚗',
  },
  {
    id: 'uwindsor',
    title: 'Machine Learning Intern',
    company: 'University of Windsor',
    location: 'Windsor, Ontario',
    dateRange: 'January 2025 – April 2025',
    status: 'completed',
    summary: 'Collaborated directly with TD Bank as project client, developing ML systems for credit-lending decision predictions with focus on production readiness.',
    achievements: [
      'Collaborated directly with TD Bank as project client, holding regular meetings to align system requirements and progress',
      'Independently designed and implemented the full backend system, managing data pipelines and infrastructure',
      'Developed machine learning modules focused on credit-lending decision predictions, optimizing for model integrity and production readiness',
      'Contributed to rigorous model validation, testing workflows, and system documentation to ensure deployment quality',
    ],
    techStack: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas', 'SQL', 'CLI', 'Agile'],
    icon: '🎓',
  },
  {
    id: 'ss-ml',
    title: 'Machine Learning Engineer',
    company: 'S.S. Engineering Works',
    location: 'Una, India',
    dateRange: 'June 2023 – April 2024',
    status: 'completed',
    summary: 'Developed AI-based predictive analytics and deep learning models for industrial operations, achieving significant cost reductions and efficiency improvements.',
    achievements: [
      'Developed AI-based predictive analytics, reducing inventory costs by 15% and improving financial decision-making',
      'Implemented fine-tuned deep learning models using PyTorch & TensorFlow for anomaly detection in industrial operations',
      'Automated data pipelines and reporting using Python, Pandas, and SQL, improving efficiency by 20%',
    ],
    techStack: ['PyTorch', 'TensorFlow', 'Python', 'Pandas', 'SQL', 'Predictive Analytics', 'Anomaly Detection'],
    icon: '🏭',
  },
  {
    id: 'ss-ds',
    title: 'Data Science Intern',
    company: 'S.S. Engineering Works',
    location: 'Una, India',
    dateRange: 'June 2022 – June 2023',
    status: 'completed',
    summary: 'Built custom data processing solutions and automated workflows for enterprise-scale operations, focusing on performance optimization.',
    achievements: [
      'Built custom data loaders to optimize performance and reduce processing time for enterprise-scale workloads',
      'Automated and documented feed generation pipelines, streamlining team operations and supporting process improvement',
    ],
    techStack: ['Python', 'Data Processing', 'Pipeline Automation', 'Performance Optimization'],
    icon: '🏭',
  },
  {
    id: 'gravity',
    title: 'Tech Event Coordinator',
    company: 'Gravity LPU',
    location: 'Punjab, India',
    dateRange: 'October 2019 – April 2022',
    status: 'completed',
    summary: 'Led coordination of major tech events and hackathons, managing large-scale operations and engaging hundreds of participants in AI and coding competitions.',
    achievements: [
      'Coordinated events using project management tools (MS Project, MS Excel, MS Word etc.), enhancing operational efficiency',
      'Managed 50+ AI & coding hackathons, engaging over 200+ participants and boosting team collaboration',
    ],
    techStack: ['Project Management', 'Event Coordination', 'MS Project', 'Team Leadership', 'Hackathons'],
    icon: '📅',
  },
];

// ============================================================
// PROJECTS
// ============================================================

export const projects: Project[] = [
  {
    id: 'self-learning-llms',
    title: 'self-learning-LLMS',
    category: 'ai-ml',
    year: '2025',
    description: 'A Scalable Pipeline for Self-Improving Language Models via Reinforcement Learning and LoRA fine-tuning',
    highlights: [
      { icon: '🚀', text: 'SEAL Algorithm Implementation' },
      { icon: '🖥️', text: 'Multi-GPU Distributed Training' },
      { icon: '⚙️', text: 'Parameter-Efficient Fine-tuning' },
    ],
    techStack: ['PyTorch', 'HuggingFace', 'PEFT/LoRA', 'DeepSpeed', 'Hydra', 'YAML'],
    github: 'https://github.com/sushantsharma22/self-learning-LLMS',
    featured: true,
    icon: '🧠',
  },
  {
    id: 'intellicity',
    title: 'IntelliCity-Architecture',
    category: 'data',
    year: '2025',
    description: 'Smart City Data Pipeline with NiFi, Kafka, Hadoop, and Spark for scalable IoT analytics',
    highlights: [
      { icon: '📡', text: 'Real-time Data Streaming' },
      { icon: '💾', text: 'Distributed Storage' },
      { icon: '📊', text: 'Automated Analytics' },
    ],
    techStack: ['NiFi', 'Kafka', 'Hadoop', 'Spark', 'Cassandra', 'Docker'],
    github: 'https://github.com/sushantsharma22/IntelliCity-Architecture',
    featured: true,
    icon: '🏙️',
  },
  {
    id: 'project-synth',
    title: 'Project Synth',
    category: 'ai-ml',
    year: '2024',
    description: 'Powerful personal AI assistant running on Mac, powered by specialized language model backend. Features question answering, writing assistance, document analysis, and brainstorming - all processed privately through your own GPU infrastructure',
    highlights: [
      { icon: '🖥️', text: 'GPU Backend Cluster' },
      { icon: '🔒', text: 'Private Processing' },
      { icon: '💬', text: 'Multi-Purpose Assistant' },
    ],
    techStack: ['Python', 'LLMs', 'GPU Computing', 'Mac OS'],
    github: 'https://github.com/sushantsharma22/Project-Synth',
    featured: false,
    icon: '🤖',
  },
  {
    id: 'ss-engineering-website',
    title: 'SS Engineering Works Website',
    category: 'web',
    year: '2024',
    description: 'Modern futuristic website for SS Engineering Works - Premier pumping machinery service provider. Features dynamic day-night gradients, glassmorphism UI, and motion-first design with GSAP animations',
    highlights: [
      { icon: '🌗', text: 'Day-Night Gradients' },
      { icon: '✨', text: 'Glassmorphism UI' },
      { icon: '⚡', text: 'GSAP Animations' },
    ],
    techStack: ['TypeScript', 'Next.js 14', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
    github: 'https://github.com/sushantsharma22/ssengineeringworks_website',
    featured: false,
    icon: '🏢',
  },
  {
    id: 'emotion-sentiment-net',
    title: 'EmotionSentimentNet',
    category: 'ai-ml',
    year: '2024',
    description: 'Distributed Multi-Task Emotion & Sentiment Classifier using DeBERTa-v3 with GPU acceleration',
    highlights: [
      { icon: '🧠', text: 'Multi-Head Neural Network' },
      { icon: '⚡', text: 'GPU Acceleration' },
      { icon: '📈', text: 'PSNR/SSIM Metrics' },
    ],
    techStack: ['PyTorch', 'HuggingFace', 'spaCy', 'NLTK', 'DataParallel'],
    github: 'https://github.com/sushantsharma22/EmotionSentimentNet',
    featured: false,
    icon: '😊',
  },
  {
    id: 'edge-ai-optimizer',
    title: 'EdgeAIOptimizer',
    category: 'ai-ml',
    year: '2024',
    description: 'Edge-Aware Deep Learning Inference Framework with resource optimization and quantization',
    highlights: [
      { icon: '🚀', text: 'Performance Optimization' },
      { icon: '📦', text: 'Model Quantization' },
      { icon: '💻', text: 'CLI Benchmarking' },
    ],
    techStack: ['C++', 'ONNX Runtime', 'OpenCV', 'PyTorch', 'Model Compression'],
    github: 'https://github.com/sushantsharma22/EdgeAIOptimizer',
    featured: false,
    icon: '🔧',
  },
  {
    id: 'smartpay-upi',
    title: 'SmartPay-UPI',
    category: 'mobile',
    year: '2025',
    description: 'Secure QR-Based Payment & Personal Finance System with blockchain security',
    highlights: [
      { icon: '📱', text: 'QR Code Payments' },
      { icon: '🔐', text: 'Blockchain Security' },
      { icon: '🤖', text: 'AI Assistant' },
    ],
    techStack: ['Python', 'OpenCV', 'Blockchain', 'QRCode', 'bcrypt'],
    github: 'https://github.com/sushantsharma22/SmartPay-UPI',
    featured: false,
    icon: '💳',
  },
  {
    id: 'aurora-alert',
    title: 'Automated Aurora Alert System',
    category: 'web',
    year: '2023',
    description: 'Real-Time Event Notification Pipeline for aurora borealis alerts',
    highlights: [
      { icon: '📡', text: 'Real-time Data APIs' },
      { icon: '📧', text: 'Email Notifications' },
      { icon: '📋', text: 'Google Sheets Backend' },
    ],
    techStack: ['Python', 'REST API', 'Google Sheets', 'SMTP', 'HTML/CSS'],
    github: 'https://github.com/sushantsharma22/Aurora-Alert',
    featured: false,
    icon: '🌌',
  },
];

// ============================================================
// SKILLS
// ============================================================

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    icon: '💻',
    skills: [
      { name: 'Python', level: 'Expert', percentage: 95 },
      { name: 'Java', level: 'Advanced', percentage: 85 },
      { name: 'C++', level: 'Advanced', percentage: 80 },
      { name: 'C', level: 'Intermediate', percentage: 75 },
      { name: 'JavaScript', level: 'Intermediate', percentage: 70 },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    icon: '🧠',
    skills: [
      { name: 'Large Language Models (LLMs)', level: 'Expert', percentage: 95 },
      { name: 'Transformers', level: 'Expert', percentage: 90 },
      { name: 'Reinforcement Learning', level: 'Advanced', percentage: 85 },
      { name: 'NLP', level: 'Expert', percentage: 90 },
      { name: 'Multimodal AI', level: 'Advanced', percentage: 80 },
      { name: 'Model Optimization', level: 'Expert', percentage: 88 },
      { name: 'Generative AI', level: 'Advanced', percentage: 85 },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks & Libraries',
    icon: '📚',
    skills: [
      { name: 'PyTorch', level: 'Expert', percentage: 95 },
      { name: 'TensorFlow', level: 'Advanced', percentage: 85 },
      { name: 'HuggingFace', level: 'Expert', percentage: 90 },
      { name: 'OpenCV', level: 'Advanced', percentage: 80 },
      { name: 'Scikit-learn', level: 'Expert', percentage: 88 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    icon: '🛠️',
    skills: [
      { name: 'Git', level: 'Expert', percentage: 90 },
      { name: 'Docker', level: 'Advanced', percentage: 80 },
      { name: 'Ubuntu/Linux', level: 'Advanced', percentage: 85 },
      { name: 'Jupyter Notebook', level: 'Expert', percentage: 95 },
    ],
  },
];

export const proficiencies: Proficiency[] = [
  {
    icon: '🖥️',
    title: 'Parallel Model Training',
    description: 'Multi-GPU and distributed training optimization',
  },
  {
    icon: '🚀',
    title: 'AI Model Deployment',
    description: 'Production-ready model optimization and deployment',
  },
  {
    icon: '⚙️',
    title: 'Fine-tuning LLMs',
    description: 'Parameter-efficient fine-tuning with LoRA/PEFT',
  },
  {
    icon: '✨',
    title: 'Generative AI',
    description: 'Text, image, and multimodal generation systems',
  },
  {
    icon: '⚡',
    title: 'Model Optimization',
    description: 'Quantization, pruning, and edge deployment',
  },
];

// ============================================================
// EDUCATION
// ============================================================

export const education: Education[] = [
  {
    id: 'masters',
    degree: 'Master of Applied Computing',
    institution: 'University of Windsor',
    location: 'Windsor, Ontario, Canada',
    dateRange: 'May 2024 – October 2025',
    status: 'completed',
    specialization: 'Artificial Intelligence and Finance at Global Perspective',
    availability: 'Available for full-time opportunities',
    coursework: [
      { icon: '💾', name: 'Advanced Database Systems' },
      { icon: '🌐', name: 'Internet Applications and Distributed Systems' },
      { icon: '⚙️', name: 'Advanced Software Engineering' },
    ],
  },
  {
    id: 'bachelors',
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    institution: 'Lovely Professional University',
    location: 'Punjab, India',
    dateRange: 'July 2019 – June 2023',
    status: 'completed',
    coursework: [
      { icon: '📈', name: 'Predictive Analysis' },
      { icon: '📱', name: 'Android Development' },
      { icon: '☁️', name: 'Cloud Computing' },
      { icon: '📊', name: 'Data Engineering' },
      { icon: '📉', name: 'Data Visualization' },
      { icon: '🧮', name: 'Data Structures and Algorithms' },
    ],
  },
];

// ============================================================
// CERTIFICATES
// ============================================================

export const certificates: Certificate[] = [
  {
    id: 'ml-andrew-ng',
    title: 'Machine Learning Certification',
    provider: 'Stanford University (Coursera)',
    providerIcon: 'coursera',
    description: 'Comprehensive machine learning course covering supervised learning, unsupervised learning.',
    skills: ['Machine Learning', 'Supervised Learning', 'Unsupervised Learning'],
    credentialUrl: 'https://coursera.org/share/9a7d9b01a88e538271047850410725d4',
    icon: 'graduation-cap',
  },
  {
    id: 'deep-learning',
    title: 'Artificial Intelligence - Full Course with Deep Learning',
    provider: 'Udemy',
    providerIcon: 'udemy',
    description: 'Advanced deep learning techniques including neural networks, CNNs, RNNs, and modern architectures.',
    skills: ['Deep Learning', 'Neural Networks', 'PyTorch', 'TensorFlow'],
    credentialUrl: 'https://www.udemy.com/certificate/UC-6355bd2a-b5fe-46ae-af57-01c1283c2db3/',
    icon: 'robot',
  },
  {
    id: 'ml-az',
    title: 'Machine Learning A-Z: AI, Python & R + ChatGPT',
    provider: 'Udemy',
    providerIcon: 'udemy',
    description: 'Comprehensive AI and Machine Learning course with hands-on projects.',
    skills: ['Machine Learning', 'Python', 'R', 'AI'],
    credentialUrl: 'http://ude.my/UC-a4c54070-59a2-4559-918d-ebab15216fc3',
    icon: 'brain',
  },
  {
    id: 'unsupervised-rl',
    title: 'Unsupervised Learning, Recommenders, Reinforcement Learning',
    provider: 'Coursera',
    providerIcon: 'coursera',
    description: 'Advanced ML techniques and reinforcement learning algorithms.',
    skills: ['Supervised and Unsupervised Learning', 'Recommender Systems', 'Reinforcement Learning'],
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/CURSZY446BUY',
    icon: 'chart-line',
  },
  {
    id: 'unix',
    title: 'Unix Essential Training',
    provider: 'LinkedIn Learning',
    providerIcon: 'linkedin',
    description: 'Unix system administration and command line proficiency.',
    skills: ['Unix', 'Command Line', 'System Administration'],
    credentialUrl: 'https://www.linkedin.com/learning/certificates/25248a2df39974064f14a6afdbdb782406602a926d11bab3698444d16fc7fa53',
    icon: 'terminal',
  },
  {
    id: 'dsa',
    title: 'Data Structures and Algorithms',
    provider: 'GeeksforGeeks',
    providerIcon: 'laptop-code',
    description: 'Advanced DSA concepts and problem-solving techniques.',
    skills: ['Data Structures', 'Algorithms', 'Problem Solving'],
    credentialUrl: 'https://media.geeksforgeeks.org/courses/certificates/945fe474080a8bccfa6af1d1d7bb5000.pdf',
    icon: 'code',
  },
  {
    id: 'android',
    title: 'Android Java Masterclass - Become an App Developer',
    provider: 'Udemy',
    providerIcon: 'udemy',
    description: 'Comprehensive Android development with Java.',
    skills: ['Android', 'Java', 'App Development'],
    credentialUrl: 'https://www.udemy.com/certificate/UC-a94ff48c-b0c8-4832-8dea-ece77fb95ea3/',
    icon: 'mobile-alt',
  },
  {
    id: 'java',
    title: 'Master the Java Programming Language',
    provider: 'Udemy',
    providerIcon: 'udemy',
    description: 'Advanced Java programming concepts and best practices.',
    skills: ['Java', 'Programming', 'Best Practices'],
    credentialUrl: 'https://www.udemy.com/certificate/UC-e2d254ce-c8f9-4e79-b185-56d40cca1b53/',
    icon: 'coffee',
  },
  {
    id: 'javascript',
    title: 'Complete JavaScript with HTML5, CSS3 from Zero to Expert',
    provider: 'Udemy',
    providerIcon: 'udemy',
    description: 'Full-stack web development with modern JavaScript.',
    skills: ['JavaScript', 'HTML5', 'CSS3', 'Web Development'],
    credentialUrl: 'https://www.udemy.com/certificate/UC-6f91871d-4af4-4cb8-9d5c-1e461780f849/',
    icon: 'globe',
  },
  {
    id: 'r-programming',
    title: 'R Programming A-Z™: R for Data Science with Real Exercises!',
    provider: 'Udemy',
    providerIcon: 'udemy',
    description: 'Statistical computing and data analysis with R.',
    skills: ['R', 'Data Science', 'Statistics'],
    credentialUrl: 'https://www.udemy.com/certificate/UC-75fe1731-00ea-4028-8553-348b7d9c4117/',
    icon: 'chart-bar',
  },
  {
    id: 'oauth',
    title: 'Web Security: OAuth and OpenID Connect',
    provider: 'LinkedIn Learning',
    providerIcon: 'linkedin',
    description: 'Authentication and authorization security protocols.',
    skills: ['Web Security', 'OAuth', 'OpenID Connect'],
    credentialUrl: 'https://www.linkedin.com/learning/certificates/1df089f1907950279a80943c4da2cb2c077fef36c67815285e817d2c3833f20f',
    icon: 'shield-alt',
  },
  {
    id: 'hadoop',
    title: 'Learning Hadoop',
    provider: 'LinkedIn Learning',
    providerIcon: 'linkedin',
    description: 'Big data processing with Apache Hadoop ecosystem.',
    skills: ['Big Data', 'Hadoop', 'Data Processing'],
    credentialUrl: 'https://www.linkedin.com/learning/certificates/45c7c5ede971f4772f8254037764b58de8554aa075b5ebffede3be621e2fbbfd',
    icon: 'database',
  },
  {
    id: 'databases',
    title: 'Relational Databases Essential Training',
    provider: 'LinkedIn Learning',
    providerIcon: 'linkedin',
    description: 'Database design and SQL fundamentals.',
    skills: ['Databases', 'SQL', 'Database Design'],
    credentialUrl: 'https://www.linkedin.com/learning/certificates/bb3abfd2118f5dc5dc57a42fe89ccf76ec59e4eb1d2448374d7173e71d420f17',
    icon: 'database',
  },
  {
    id: 'regex',
    title: 'Learning Regular Expressions',
    provider: 'LinkedIn Learning',
    providerIcon: 'linkedin',
    description: 'Text processing and pattern matching with regex.',
    skills: ['Regular Expressions', 'Text Processing', 'Pattern Matching'],
    credentialUrl: 'https://www.linkedin.com/learning/certificates/38a501a31bdbe788920d6edfd9592303ba6add0b2d61047863904a025a58496f',
    icon: 'search',
  },
  {
    id: 'agile',
    title: 'Agile Project Management with Jira Cloud',
    provider: 'LinkedIn Learning',
    providerIcon: 'linkedin',
    description: 'Agile methodologies and project management tools.',
    skills: ['Agile', 'Project Management', 'Jira'],
    credentialUrl: 'https://www.linkedin.com/learning/certificates/7bf925b0efab9000fbfc02ed80eefb07ca748eecc4ff33631c3ec57f5009a38d',
    icon: 'tasks',
  },
  {
    id: 'selenium',
    title: 'Selenium Essential Training',
    provider: 'LinkedIn Learning',
    providerIcon: 'linkedin',
    description: 'Automated testing with Selenium WebDriver.',
    skills: ['Selenium', 'Automation', 'Testing'],
    credentialUrl: 'https://www.linkedin.com/learning/certificates/8603f22232bf09054a704a99b4070133ec346decf817e7e122cde0e82ded0657',
    icon: 'bug',
  },
  {
    id: 'rest-design',
    title: 'Designing RESTful APIs',
    provider: 'LinkedIn Learning',
    providerIcon: 'linkedin',
    description: 'API design principles and REST architecture.',
    skills: ['REST', 'API Design', 'Web Architecture'],
    credentialUrl: 'https://www.linkedin.com/learning/certificates/4355b799208a45166f3c37e5bf106ec49f96a125dabb5482f9ffe62c0b29a717',
    icon: 'cloud',
  },
  {
    id: 'http',
    title: 'HTTP Essential Training',
    provider: 'LinkedIn Learning',
    providerIcon: 'linkedin',
    description: 'Web protocols and HTTP fundamentals.',
    skills: ['HTTP', 'Web Protocols', 'Networking'],
    credentialUrl: 'https://www.linkedin.com/learning/certificates/6f2825e6324912bb8796f45499f98932b5789e3c8b8edd08874a03806d30959f',
    icon: 'network-wired',
  },
  {
    id: 'rest-apis',
    title: 'Learning REST APIs',
    provider: 'LinkedIn Learning',
    providerIcon: 'linkedin',
    description: 'RESTful web services and API development.',
    skills: ['REST APIs', 'Web Services', 'API Development'],
    credentialUrl: 'https://www.linkedin.com/learning/certificates/a9fe8819717ad4b80b17906fbe1a8b6e419eac8ea1e83fe89fa44f2f4411ec37',
    icon: 'cloud',
  },
  {
    id: 'bash',
    title: 'Learning Bash Scripting',
    provider: 'LinkedIn Learning',
    providerIcon: 'linkedin',
    description: 'Shell scripting and automation with Bash.',
    skills: ['Bash', 'Shell Scripting', 'Automation'],
    credentialUrl: 'https://www.linkedin.com/learning/certificates/6a6826a335fb7e37eb6e40b8dc0536ad69d8d494ae7a10f9a8d85993828432ec',
    icon: 'terminal',
  },
  {
    id: 'spark',
    title: 'Introduction to Spark SQL and DataFrames',
    provider: 'LinkedIn Learning',
    providerIcon: 'linkedin',
    description: 'Big data analytics with Apache Spark.',
    skills: ['Spark', 'SQL', 'Big Data Analytics'],
    credentialUrl: 'https://www.linkedin.com/learning/certificates/9c2564f6c3d811d3bdfca1286e9c53c3eff78303e25ff1a9e8921d70daa90ad4',
    icon: 'fire',
  },
  {
    id: 'api-testing',
    title: 'API Testing and Validation',
    provider: 'LinkedIn Learning',
    providerIcon: 'linkedin',
    description: 'API testing methodologies and validation techniques.',
    skills: ['API Testing', 'Validation', 'Quality Assurance'],
    credentialUrl: 'https://www.linkedin.com/learning/certificates/1d61577c5e0c55d0050b9501d6a881d2bacbc4f8b279b2391dddd4ffc1f1860f',
    icon: 'vial',
  },
];

// Group certificates for the snowy mountain climb section
export const certificateGroups: CertificateGroup[] = [
  {
    id: 'base-camp',
    camp: 'Base Camp',
    title: 'Programming Foundations',
    certificates: certificates.filter(c =>
      ['java', 'javascript', 'r-programming', 'android', 'unix'].includes(c.id)
    ),
  },
  {
    id: 'camp-1',
    camp: 'Camp 1',
    title: 'AI/ML Core',
    certificates: certificates.filter(c =>
      ['ml-andrew-ng', 'deep-learning', 'ml-az'].includes(c.id)
    ),
  },
  {
    id: 'camp-2',
    camp: 'Camp 2',
    title: 'Advanced ML',
    certificates: certificates.filter(c =>
      ['unsupervised-rl', 'dsa'].includes(c.id)
    ),
  },
  {
    id: 'camp-3',
    camp: 'Camp 3',
    title: 'Data Engineering',
    certificates: certificates.filter(c =>
      ['hadoop', 'spark', 'databases'].includes(c.id)
    ),
  },
  {
    id: 'camp-4',
    camp: 'Camp 4',
    title: 'DevOps & Tools',
    certificates: certificates.filter(c =>
      ['rest-design', 'http', 'selenium', 'agile', 'bash', 'rest-apis', 'api-testing', 'oauth', 'regex'].includes(c.id)
    ),
  },
];

// ============================================================
// CONFERENCE
// ============================================================

export const conference: Conference = {
  title: 'Twitter Sentiment Analysis on COVID-19',
  conference: 'ICCS-2023 (KILBY100)',
  year: '2023',
  description: 'Presented research showcasing NLP techniques using Python and applying diverse ML algorithms for performance metrics, maintaining data pipelines, and statistical analysis in multimodal sentiment analysis.',
  highlights: [
    { icon: '📊', text: 'Multimodal Sentiment Analysis' },
    { icon: '💻', text: 'NLP with Python' },
    { icon: '💾', text: 'Data Pipeline Management' },
  ],
  techStack: ['Python', 'NLP', 'Machine Learning', 'Sentiment Analysis', 'Statistical Analysis'],
};

// ============================================================
// CONTACT
// ============================================================

export const contactInfo: ContactInfo[] = [
  { type: 'email', icon: '📧', label: 'Email', value: 'sharmasj53@gmail.com', href: 'mailto:sharmasj53@gmail.com' },
  { type: 'phone', icon: '📱', label: 'Phone', value: '(226) 961-5873', href: 'tel:+12269615873' },
  { type: 'location', icon: '📍', label: 'Location', value: 'Toronto, Ontario, Canada' },
  { type: 'linkedin', icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/sushantsharma22', displayValue: 'Connect on LinkedIn', href: 'https://linkedin.com/in/sushantsharma22' },
];

export const socialLinks: SocialLink[] = [
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/sushantsharma22', href: 'https://linkedin.com/in/sushantsharma22', icon: 'linkedin', ariaLabel: 'LinkedIn' },
  { platform: 'GitHub', url: 'https://github.com/sushantsharma22', href: 'https://github.com/sushantsharma22', icon: 'github', ariaLabel: 'GitHub' },
  { platform: 'Email', url: 'mailto:sharmasj53@gmail.com', href: 'mailto:sharmasj53@gmail.com', icon: 'email', ariaLabel: 'Email' },
];

// ============================================================
// NAVIGATION
// ============================================================

export const navItems: NavItem[] = [
  { label: 'Home', href: '#hero', icon: 'home' },
  { label: 'About', href: '#about', icon: 'user' },
  { label: 'Skills', href: '#skills', icon: 'cogs' },
  { label: 'Projects', href: '#projects', icon: 'code' },
  { label: 'Experience', href: '#experience', icon: 'briefcase' },
  { label: 'Certificates', href: '#certificates', icon: 'certificate' },
  { label: 'Contact', href: '#contact', icon: 'envelope' },
];

// ============================================================
// SEO METADATA
// ============================================================

export const seoMetadata = {
  title: 'Sushant Sharma - AI Research Engineer & Full-Stack Developer',
  description: 'AI Research Engineer specializing in Machine Learning, Deep Learning, and Distributed Systems. Available for full-time opportunities starting September 2025.',
  keywords: 'AI Research Engineer, Machine Learning, Deep Learning, Full Stack Developer, Python, PyTorch, TensorFlow',
  author: 'Sushant Sharma',
  ogTitle: 'Sushant Sharma - AI Research Engineer',
  ogDescription: 'AI Research Engineer specializing in Machine Learning, Deep Learning, and Distributed Systems',
  ogUrl: 'https://sushantsharma22.github.io/Portfolio',
  twitterCard: 'summary_large_image',
};
