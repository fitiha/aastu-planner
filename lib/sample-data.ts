export const users = [
  {
    id: "PO001",
    name: "Dr. Abebe Bekele",
    email: "abebe.bekele@aastu.edu",
    role: "planning_office",
    password: "hashed_password_here",
    department: "Planning Office",
    subordinates: ["VP001", "VP002", "VP003", "VP004"]
  },
  {
    id: "VP001",
    name: "Dr. Tigist Alemu",
    email: "tigist.alemu@aastu.edu",
    role: "vice_president",
    password: "hashed_password_here",
    department: "Academic Affairs",
    superior: "PO001",
    subordinates: ["D001", "D002", "D003"]
  },
  {
    id: "VP002",
    name: "Dr. Yohannes Tadesse",
    email: "yohannes.tadesse@aastu.edu",
    role: "vice_president",
    department: "Research & Technology Transfer",
    password: "hashed_password_here",
    superior: "PO001",
    subordinates: ["D004", "D005", "D006"]
  },
  {
    id: "VP003",
    name: "Dr. Samuel Belay",
    email: "samuel.belay@aastu.edu",
    role: "vice_president",
    department: "Administrative Affairs",
    password: "hashed_password_here",
    superior: "PO001",
    subordinates: ["D007", "D008", "D009"]
  },
  {
    id: "D001",
    name: "Dr. Fikru Demelash",
    email: "fikru.demelash@aastu.edu",
    role: "director",
    department: "School of Electrical & Computer Engineering",
    password: "hashed_password_here",
    superior: "VP001",
    subordinates: ["TL001", "TL002"]
  },
  {
    id: "D002",
    name: "Dr. Helen Mekonen",
    email: "helen.mekonen@aastu.edu",
    role: "director",
    department: "School of Civil Engineering",
    password: "hashed_password_here",
    superior: "VP001",
    subordinates: ["TL003", "TL004"]
  },
  {
    id: "TL001",
    name: "Meseret Worku",
    email: "meseret.worku@aastu.edu",
    role: "team_lead",
    department: "Computer Science",
    password: "hashed_password_here",
    superior: "D001",
    subordinates: ["S001", "S002", "S003"]
  },
  {
    id: "TL002",
    name: "Dawit Alemu",
    email: "dawit.alemu@aastu.edu",
    role: "team_lead",
    department: "Software Engineering",
    password: "hashed_password_here",
    superior: "D001",
    subordinates: ["S004", "S005", "S006"]
  },
  {
    id: "S001",
    name: "Abeba Tadesse",
    email: "abeba.tadesse@aastu.edu",
    role: "staff",
    password: "hashed_password_here",
    department: "Computer Science",
    superior: "TL001"
  },
  // Add more users as needed...
]

export const pendingUsers = [
  {
    id: "PU001",
    name: "Hiwot Tadesse",
    email: "hiwot.tadesse@aastu.edu",
    role: "director",
    password: "hashed_password_here",
    superior: "VP001",
    status: "pending"
  },
  {
    id: "PU002",
    name: "Kebede Alemu",
    email: "kebede.alemu@aastu.edu",
    role: "team_lead",
    password: "hashed_password_here",
    superior: "D001",
    status: "pending"
  }
]

export const signupRequests = [
  {
    id: "SR001",
    userId: "PU001",
    superiorId: "VP001",
    requestDate: "2023-05-15"
  },
  {
    id: "SR002",
    userId: "PU002",
    superiorId: "D001",
    requestDate: "2023-05-16"
  }
]

export const pillars = [
  { id: 1, title: "Academic Excellence" },
  { id: 2, title: "Research and Innovation" },
  { id: 3, title: "Community Engagement" },
  { id: 4, title: "Infrastructure Development" },
  { id: 5, title: "Student Success" },
  { id: 6, title: "Faculty Development" },
  { id: 7, title: "International Collaboration" },
  { id: 8, title: "Sustainable Practices" },
  { id: 9, title: "Digital Transformation" },
  { id: 10, title: "Financial Sustainability" },
]

export const plans = [
  {
    id: "P000",
    name: "10-Year University Development Plan",
    description: "Comprehensive plan for university growth and improvement over the next decade",
    status: "Approved",
    targetValue: 100,
    currentValue: 10,
    startDate: "2024-01-01",
    endDate: "2033-12-31",
    createdBy: "PO001",
    assignedTo: ["VP001", "VP002", "VP003", "VP004"],
    pillarId: "1",
    accomplishmentValue: "Achieve top 100 university ranking",
    targetQuarter: "Q4",
    planType: "10-year"
  },
  {
    id: "P001",
    name: "5-Year Academic Excellence Initiative",
    description: "Enhance academic programs and research output over the next 5 years",
    status: "Approved",
    targetValue: 100,
    currentValue: 0,
    startDate: "2024-01-01",
    endDate: "2028-12-31",
    createdBy: "VP001",
    assignedTo: ["D001", "D002", "D003"],
    pillarId: "1",
    alignedPlanId: "P000",
    accomplishmentValue: "Increase research publications by 50%",
    targetQuarter: "Q4",
    planType: "5-year"
  },
  {
    id: "P002",
    name: "Research Output Enhancement",
    description: "Increase department research publications by establishing research groups",
    status: "Approved",
    targetValue: 20,
    currentValue: 5,
    startDate: "2024-02-01",
    endDate: "2024-11-30",
    createdBy: "TL001",
    assignedTo: ["S001", "S003"],
    pillarId: "2",
    alignedPlanId: "P000", // Assuming this is aligned with a VP's plan
    accomplishmentValue: "20 published papers",
    targetQuarter: "Q3",
    comments: "Excellent initiative. Proceed with implementation.",
  },
  {
    id: "P003",
    name: "Laboratory Modernization",
    description: "Upgrade computer labs with latest hardware and software",
    status: "Rejected",
    targetValue: 5,
    currentValue: 0,
    startDate: "2024-03-01",
    endDate: "2024-08-31",
    createdBy: "TL002",
    assignedTo: ["S004", "S005"],
    pillarId: "4",
    alignedPlanId: "P000", // Assuming this is aligned with a VP's plan
    accomplishmentValue: "5 fully upgraded labs",
    targetQuarter: "Q2",
    comments: "Please provide detailed budget breakdown and equipment specifications",
  },
  {
    id: "P004",
    name: "Enhance Research Output",
    description: "Increase the number and quality of research publications",
    status: "Approved",
    targetValue: 50,
    currentValue: 20,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    createdBy: "VP002",
    assignedTo: ["D004", "D005"],
    pillarId: "2",
    accomplishmentValue: "50 high-quality publications",
    targetQuarter: "Q4",
  },
  {
    id: "P005",
    name: "Improve Student Retention",
    description: "Implement strategies to increase student retention rates",
    status: "Rejected",
    targetValue: 90,
    currentValue: 0,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    createdBy: "VP001",
    assignedTo: ["D001", "D002", "D003"],
    pillarId: "5",
    accomplishmentValue: "90% retention rate",
    targetQuarter: "Q4",
    comments: "Please provide more specific strategies and measurable outcomes."
  },
  {
    id: "P006",
    name: "Expand International Partnerships",
    description: "Establish new partnerships with international universities",
    status: "Pending Review",
    targetValue: 10,
    currentValue: 0,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    createdBy: "VP001",
    assignedTo: ["D001", "D002"],
    pillarId: "7",
    accomplishmentValue: "10 new international partnerships",
    targetQuarter: "Q4",
  },
  // Add more sample plans as needed
]

export const reports = [
  {
    id: "R001",
    planId: "P001",
    quarter: "Q1 2024",
    completion: 30,
    notes: "We have started implementing new strategies to enhance academic programs.",
    submissionDate: "2024-03-31",
    submittedBy: "VP001",
    status: "Pending Review",
    reviewedBy: "PO001"
  },
  {
    id: "R002",
    planId: "P002",
    quarter: "Q1 2024",
    completion: 25,
    notes: "Research groups have been established and initial papers are in progress.",
    submissionDate: "2024-03-31",
    submittedBy: "TL001",
    status: "Approved"
  },
  {
    id: "R003",
    planId: "P003",
    quarter: "Q1 2024",
    completion: 0,
    notes: "Budget approval pending. No progress on lab upgrades yet.",
    submissionDate: "2024-03-31",
    submittedBy: "TL002",
    status: "Rejected",
    comments: "Please provide a detailed action plan for catching up in Q2."
  },
  {
    id: "R004",
    planId: "P004",
    quarter: "Q2 2024",
    completion: 40,
    accomplishedValue: 20,
    notes: "We have published 20 high-quality papers so far. On track to meet the target.",
    submissionDate: "2024-06-30",
    submittedBy: "VP002",
    status: "Approved"
  },
  {
    id: "R005",
    planId: "P005",
    quarter: "Q2 2024",
    completion: 0,
    accomplishedValue: 0,
    notes: "We haven't started implementing the strategies yet due to budget constraints.",
    submissionDate: "2024-06-30",
    submittedBy: "VP001",
    status: "Rejected",
    comments: "Please provide a revised plan considering the budget constraints."
  },
  {
    id: "R006",
    planId: "P006",
    quarter: "Q2 2024",
    completion: 30,
    accomplishedValue: 3,
    notes: "We have established initial contact with 3 potential partner universities.",
    submissionDate: "2024-06-30",
    submittedBy: "VP001",
    status: "Pending Review"
  },
  // Add more sample reports as needed
]


export const departments = [
  {
    id: "1",
    name: "School of Electrical & Computer Engineering",
    programs: ["Computer Science", "Software Engineering", "Electrical Engineering"]
  },
  {
    id: "2",
    name: "School of Civil Engineering",
    programs: ["Civil Engineering", "Architecture", "Construction Technology"]
  },
  // Add more departments...
]

