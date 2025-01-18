export const users = [
  {
    id: "PO001",
    name: "Dr. Abebe Bekele",
    email: "abebe.bekele@aastu.edu",
    role: "planning_office",
    password: "hashed_password_here",
    subordinates: ["VP001", "VP002", "VP003", "VP004"]
  },
  {
    id: "VP001",
    name: "Dr. Tigist Alemu",
    email: "tigist.alemu@aastu.edu",
    role: "vice_president",
    password: "hashed_password_here",
    superior: "PO001",
    subordinates: ["D001", "D002", "D003", "D004", "D005", "D006", "D007", "D008", "D009", "D010"]
  },
  {
    id: "VP002",
    name: "Dr. Yohannes Tadesse",
    email: "yohannes.tadesse@aastu.edu",
    role: "vice_president",
    password: "hashed_password_here",
    superior: "PO001",
    subordinates: ["D011", "D012", "D013", "D014", "D015", "D016", "D017", "D018", "D019", "D020"]
  },
  {
    id: "D001",
    name: "Fikru Demelash",
    email: "fikru.demelash@aastu.edu",
    role: "director",
    password: "hashed_password_here",
    superior: "VP001",
    subordinates: ["TL001", "TL002", "TL003"]
  },
  {
    id: "TL001",
    name: "Meseret Worku",
    email: "meseret.worku@aastu.edu",
    role: "team_lead",
    password: "hashed_password_here",
    superior: "D001",
    subordinates: ["S001", "S002", "S003", "S004"]
  },
  {
    id: "S001",
    name: "Dawit Mengistu",
    email: "dawit.mengistu@aastu.edu",
    role: "staff",
    password: "hashed_password_here",
    superior: "TL001"
  }
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

export const plans = [
  {
    id: "P001",
    name: "Increase Student Enrollment",
    description: "Implement strategies to increase student enrollment by 20% over the next academic year.",
    status: "In Progress",
    targetValue: 1000,
    currentValue: 600,
    startDate: "2023-09-01",
    endDate: "2024-08-31",
    createdBy: "VP001",
    assignedTo: ["D001", "D002", "D003"],
    pillarId: "1",
    accomplishmentValue: "20% increase in enrollment",
    targetQuarter: "Q4"
  },
  {
    id: "P002",
    name: "Improve Research Output",
    description: "Increase the number of published research papers by 30% in the next year.",
    status: "Not Started",
    targetValue: 100,
    currentValue: 0,
    startDate: "2023-10-01",
    endDate: "2024-09-30",
    createdBy: "VP002",
    assignedTo: ["D011", "D012", "D013"],
    pillarId: "2",
    accomplishmentValue: "30% increase in published papers",
    targetQuarter: "Q3"
  },
  {
    id: "P003",
    name: "Enhance Campus Facilities",
    description: "Renovate and upgrade existing campus facilities to improve student experience.",
    status: "In Progress",
    targetValue: 5,
    currentValue: 2,
    startDate: "2023-07-01",
    endDate: "2024-06-30",
    createdBy: "D001",
    assignedTo: ["TL001", "TL002"],
    pillarId: "4",
    alignedPlanId: "P001",
    accomplishmentValue: "5 renovated facilities",
    targetQuarter: "Q2"
  },
  {
    id: "P004",
    name: "Implement New Curriculum",
    description: "Design and implement a new curriculum for the Computer Science department.",
    status: "In Progress",
    targetValue: 10,
    currentValue: 4,
    startDate: "2023-08-01",
    endDate: "2024-07-31",
    createdBy: "D001",
    assignedTo: ["TL001", "TL003"],
    pillarId: "1",
    alignedPlanId: "P001",
    accomplishmentValue: "10 new courses implemented",
    targetQuarter: "Q3"
  },
  {
    id: "P005",
    name: "Increase Industry Partnerships",
    description: "Establish new partnerships with local and international industries.",
    status: "Not Started",
    targetValue: 15,
    currentValue: 0,
    startDate: "2023-11-01",
    endDate: "2024-10-31",
    createdBy: "VP001",
    assignedTo: ["D001", "D002"],
    pillarId: "3",
    accomplishmentValue: "15 new industry partnerships",
    targetQuarter: "Q4"
  }
]

export const reports = [
  {
    id: "R001",
    planId: "P001",
    quarter: "Q1 2023",
    completion: 30,
    notes: "We have started implementing new marketing strategies to attract more students.",
    submissionDate: "2023-03-31",
    submittedBy: "D001"
  },
  {
    id: "R002",
    planId: "P002",
    quarter: "Q1 2023",
    completion: 0,
    notes: "The plan has not started yet. We are still in the preparation phase.",
    submissionDate: "2023-03-31",
    submittedBy: "D011"
  },
  {
    id: "R003",
    planId: "P003",
    quarter: "Q1 2023",
    completion: 40,
    notes: "Two out of five facilities have been renovated. Work is progressing as scheduled.",
    submissionDate: "2023-03-31",
    submittedBy: "TL001"
  },
  {
    id: "R004",
    planId: "P004",
    quarter: "Q1 2023",
    completion: 20,
    notes: "We have completed the design phase for 2 new courses. Implementation is underway.",
    submissionDate: "2023-03-31",
    submittedBy: "TL001"
  },
  {
    id: "R005",
    planId: "P001",
    quarter: "Q2 2023",
    completion: 50,
    notes: "Our marketing efforts are showing results. We've seen a 10% increase in applications.",
    submissionDate: "2023-06-30",
    submittedBy: "D001"
  },
  {
    id: "R006",
    planId: "P003",
    quarter: "Q2 2023",
    completion: 60,
    notes: "Three out of five facilities have been renovated. We're slightly ahead of schedule.",
    submissionDate: "2023-06-30",
    submittedBy: "TL001"
  }
]

