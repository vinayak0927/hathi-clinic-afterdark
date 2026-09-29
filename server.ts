import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize Google GenAI client if GEMINI_API_KEY is present
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err);
  }
}

// -------------------------------------------------------------
// Real Human Healthcare Types
// -------------------------------------------------------------

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
  avatar?: string;
  age?: number;
  gender?: string;
  bloodGroup?: string;
  phone?: string;
  allergies?: string[];
  medicalHistory?: string;
  metrics?: {
    bloodPressure: string;
    heartRate: number;
    spo2: number;
    temperature: string;
    bmi: number;
    weight: string;
    height: string;
    lastCheckup: string;
  };
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  department: 'General Medicine' | 'Cardiology' | 'Neurology' | 'Orthopedics' | 'Dermatology' | 'Pediatrics';
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  patientsTreated: number;
  room: string;
  availability: 'Available Now' | 'In Consultation' | 'In Surgery' | 'On Call';
  quote: string;
  bio: string;
  avatarColor: string;
  avatarUrl?: string;
  featured?: boolean;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  title: string;
  scanType: 'Brain MRI' | 'Full Body X-Ray' | 'Electrocardiogram' | 'Abdominal Ultrasound' | 'Knee Orthopedic Scan' | 'Comprehensive Blood Panel';
  date: string;
  status: 'Normal' | 'Stable' | 'Requires Review' | 'Follow-up Scheduled';
  doctor: string;
  description: string;
  details: {
    bloodPressure?: string;
    heartRate?: string;
    findings?: string;
    labValues?: string;
    recommendations?: string;
    notes?: string;
  };
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientAge?: number;
  patientGender?: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  clinicRoom: string;
  symptoms: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  doctorNotes?: string;
  prescriptionIssued?: string;
  createdAt: string;
}

export interface PharmacyItem {
  id: string;
  name: string;
  genericName: string;
  indication: string;
  category: 'Antibiotics' | 'Cardiovascular' | 'Analgesics' | 'Respiratory' | 'Vitamins & Supplements';
  price: string;
  availability: 'In Stock' | 'Prescription Required' | 'Limited Stock';
  dosage: string;
  instructions: string;
  sideEffects: string;
}

export interface QueuePatient {
  id: string;
  tokenNumber: string;
  name: string;
  age: number;
  gender: string;
  symptoms: string;
  doctorName: string;
  priority: 'Routine' | 'Urgent' | 'Emergency';
  waitTimeMinutes: number;
  position: number;
  status: 'Waiting' | 'With Doctor' | 'Completed';
  time: string;
}

// -------------------------------------------------------------
// Database State & Seed Data
// -------------------------------------------------------------

const users: User[] = [
  {
    id: 'user-patient-1',
    name: 'Rahul Sharma',
    email: 'patient@hathiclinic.com',
    password: 'password123',
    role: 'PATIENT',
    age: 34,
    gender: 'Male',
    bloodGroup: 'A+',
    phone: '+91 98765 43210',
    allergies: ['Penicillin', 'Dust Mites'],
    medicalHistory: 'Mild seasonal asthma, non-smoker, annual health checks compliant.',
    metrics: {
      bloodPressure: '120/80 mmHg',
      heartRate: 72,
      spo2: 99,
      temperature: '98.6 °F',
      bmi: 22.4,
      weight: '68 kg',
      height: '175 cm',
      lastCheckup: '18 September 2026',
    },
  },
  {
    id: 'user-doctor-hathi',
    name: 'Dr. Hansraj Hathi',
    email: 'dr.hathi@hathiclinic.com',
    password: 'doctor123',
    role: 'DOCTOR',
    age: 52,
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '+91 98200 11223',
    metrics: {
      bloodPressure: '124/82 mmHg',
      heartRate: 78,
      spo2: 98,
      temperature: '98.6 °F',
      bmi: 28.1,
      weight: '92 kg',
      height: '172 cm',
      lastCheckup: '10 September 2026',
    },
  },
];

let currentUser: User = users[0];

const doctors: Doctor[] = [
  {
    id: 'doc-hathi',
    name: 'Dr. Hansraj Hathi, M.D.',
    title: 'Chief Medical Director & Senior Consultant',
    specialty: 'General Medicine & Preventive Cardiology',
    department: 'General Medicine',
    rating: 4.95,
    reviewsCount: 2450,
    experienceYears: 26,
    patientsTreated: 34000,
    room: 'Consultation Suite 101 (Director Suite)',
    availability: 'Available Now',
    quote: 'Your Health, Our Priority! Swasth Gokuldham, Khush Gokuldham!',
    bio: 'Renowned physician and founder of Hathi Clinic. Known for his comprehensive diagnostic accuracy, empathetic bedside manner, and balanced lifestyle medicine philosophy.',
    avatarColor: '#10B981',
    featured: true,
  },
  {
    id: 'doc-emily',
    name: 'Dr. Emily Carter, M.D.',
    title: 'Senior Consultant Dermatologist',
    specialty: 'Clinical Dermatology & Allergo-Immunology',
    department: 'Dermatology',
    rating: 4.9,
    reviewsCount: 1240,
    experienceYears: 14,
    patientsTreated: 16800,
    room: 'Dermatology Wing — Suite 204',
    availability: 'Available Now',
    quote: 'Healthy skin is a reflection of overall systemic wellness.',
    bio: 'Specialist in auto-immune skin manifestations, chronic allergies, laser dermatologic therapy, and complex eczema management.',
    avatarColor: '#06B6D4',
  },
  {
    id: 'doc-james',
    name: 'Dr. James Paul, M.D.',
    title: 'Chief of Neurosciences',
    specialty: 'Cognitive Neurology & Cerebrovascular Health',
    department: 'Neurology',
    rating: 4.85,
    reviewsCount: 980,
    experienceYears: 22,
    patientsTreated: 21500,
    room: 'Neurosciences Pavilion — Room 310',
    availability: 'In Consultation',
    quote: 'Early detection and neural plasticity make all the difference.',
    bio: 'Leading neurologist specializing in migraine protocols, stroke prevention, sleep architecture, and autonomic nervous system disorders.',
    avatarColor: '#8B5CF6',
  },
  {
    id: 'doc-john',
    name: 'Dr. John Smith, M.S. (Ortho)',
    title: 'Senior Orthopedic Surgeon',
    specialty: 'Joint Replacement & Sports Medicine',
    department: 'Orthopedics',
    rating: 4.9,
    reviewsCount: 1530,
    experienceYears: 19,
    patientsTreated: 19200,
    room: 'Orthopedics & Rehabilitation — Room 108',
    availability: 'Available Now',
    quote: 'Restoring pain-free mobility and biomechanical alignment.',
    bio: 'Expert in minimally invasive knee and hip arthroplasty, spinal alignment, and athletic rehabilitation therapy.',
    avatarColor: '#3B82F6',
  },
  {
    id: 'doc-devid',
    name: 'Dr. Devid Johnson, M.D., DM',
    title: 'Interventional Cardiologist',
    specialty: 'Cardiovascular Intervention & Lipidology',
    department: 'Cardiology',
    rating: 4.92,
    reviewsCount: 1810,
    experienceYears: 24,
    patientsTreated: 28000,
    room: 'Cardiac Catheterization & Echo Lab — Suite 102',
    availability: 'On Call',
    quote: 'Precision cardiology combines cutting-edge hemodynamics with active prevention.',
    bio: 'Pioneer in complex coronary stenting, non-invasive cardiac imaging, hypertension protocols, and heart failure management.',
    avatarColor: '#EC4899',
  }
];

const medicalRecords: MedicalRecord[] = [
  {
    id: 'rec-001',
    patientId: 'user-patient-1',
    patientName: 'Rahul Sharma',
    title: 'High-Resolution Brain MRI with Contrast',
    scanType: 'Brain MRI',
    date: '18 September 2026',
    status: 'Normal',
    doctor: 'Dr. James Paul, M.D.',
    description: 'T1, T2 weighted and FLAIR coronal/axial magnetic resonance imaging of cerebral cortex and ventricular systems.',
    details: {
      findings: 'No acute intracranial hemorrhage, mass effect, or midline shift. Ventricles and sulci normal for age.',
      labValues: 'Intracranial Pressure: Normal (12 mmHg)',
      recommendations: 'No neurological intervention required. Maintain adequate hydration and ergonomic screen posture.',
      notes: 'Routine executive neurological baseline scan complete.'
    }
  },
  {
    id: 'rec-002',
    patientId: 'user-patient-1',
    patientName: 'Rahul Sharma',
    title: 'Chest Radiography (Full Thoracic X-Ray)',
    scanType: 'Full Body X-Ray',
    date: '12 September 2026',
    status: 'Normal',
    doctor: 'Dr. Hansraj Hathi, M.D.',
    description: 'Posteroanterior and lateral projections of thoracic cavity and cardiopulmonary structures.',
    details: {
      findings: 'Lungs are clear bilaterally with no infiltrates, consolidations, or pleural effusions. Cardiothoracic ratio is normal (< 0.50).',
      recommendations: 'Cardiopulmonary health is optimal. Continue moderate aerobic exercise (30 mins daily).',
      notes: 'Dr. Hathi: Excellent lung expansion and clear bronchi. Sahi baat hai!'
    }
  },
  {
    id: 'rec-003',
    patientId: 'user-patient-1',
    patientName: 'Rahul Sharma',
    title: '12-Lead Electrocardiogram (ECG Telemetry)',
    scanType: 'Electrocardiogram',
    date: '04 September 2026',
    status: 'Stable',
    doctor: 'Dr. Devid Johnson, M.D.',
    description: 'Automated computerized 12-lead electrocardiographic rhythm telemetry and vector analysis.',
    details: {
      heartRate: '72 BPM (Normal Sinus Rhythm)',
      bloodPressure: '120/80 mmHg',
      findings: 'PR interval: 148 ms. QRS duration: 86 ms. QTc: 412 ms. Normal axis, no ST-segment elevation or depression.',
      recommendations: 'Maintain low sodium balanced Mediterranean dietary intake.'
    }
  },
  {
    id: 'rec-004',
    patientId: 'user-patient-1',
    patientName: 'Rahul Sharma',
    title: 'Abdominal & Liver Ultrasound Sonography',
    scanType: 'Abdominal Ultrasound',
    date: '22 August 2026',
    status: 'Normal',
    doctor: 'Dr. Hansraj Hathi, M.D.',
    description: 'High-frequency sonographic evaluation of hepatobiliary, renal, and gastrointestinal organs.',
    details: {
      findings: 'Liver shows normal homogenous parenchymal echogenicity. Gallbladder, kidneys, and spleen show no calculi.',
      recommendations: 'Annual routine ultrasound checkup next year.'
    }
  },
  {
    id: 'rec-005',
    patientId: 'user-patient-1',
    patientName: 'Rahul Sharma',
    title: 'Orthopedic Knee & Weight-Bearing Arthrogram',
    scanType: 'Knee Orthopedic Scan',
    date: '10 August 2026',
    status: 'Stable',
    doctor: 'Dr. John Smith, M.S.',
    description: 'Digital bilateral standing radiograph of knee joints examining medial and lateral joint spaces.',
    details: {
      findings: 'Joint space preserved bilaterally. No signs of osteophytes, joint effusion, or patellofemoral subluxation.',
      recommendations: 'Quadriceps strengthening exercises and low-impact cycling recommended.'
    }
  },
  {
    id: 'rec-006',
    patientId: 'user-patient-1',
    patientName: 'Rahul Sharma',
    title: 'Comprehensive Metabolic Panel & Lipid Profile',
    scanType: 'Comprehensive Blood Panel',
    date: '28 July 2026',
    status: 'Normal',
    doctor: 'Dr. Hansraj Hathi, M.D.',
    description: 'Automated serum analysis of glucose, renal markers, liver enzymes, and lipid fractions.',
    details: {
      labValues: 'Fasting Blood Glucose: 92 mg/dL | HbA1c: 5.3% | Total Cholesterol: 174 mg/dL | HDL: 52 mg/dL | LDL: 98 mg/dL | Triglycerides: 120 mg/dL',
      recommendations: 'Ideal metabolic profile. Re-test in 12 months.'
    }
  }
];

let appointments: Appointment[] = [
  {
    id: 'apt-101',
    patientId: 'user-patient-1',
    patientName: 'Rahul Sharma',
    patientAge: 34,
    patientGender: 'Male',
    doctorId: 'doc-hathi',
    doctorName: 'Dr. Hansraj Hathi, M.D.',
    specialty: 'General Medicine & Preventive Cardiology',
    date: '29 September 2026',
    time: '10:30 AM',
    clinicRoom: 'Consultation Suite 101',
    symptoms: 'Routine Bi-Annual Executive Health Checkup & Dietary Review',
    status: 'Confirmed',
    doctorNotes: 'Patient arrived on time. Blood pressure steady at 120/80 mmHg. Discussed stress management and walking routine.',
    prescriptionIssued: 'Daily Multivitamin Complex with CoQ10',
    createdAt: '2026-09-28T09:00:00Z',
  },
  {
    id: 'apt-102',
    patientId: 'user-patient-1',
    patientName: 'Rahul Sharma',
    patientAge: 34,
    patientGender: 'Male',
    doctorId: 'doc-emily',
    doctorName: 'Dr. Emily Carter, M.D.',
    specialty: 'Clinical Dermatology',
    date: '03 October 2026',
    time: '02:00 PM',
    clinicRoom: 'Dermatology Wing — Suite 204',
    symptoms: 'Mild dry skin patch on forearm post seasonal weather change',
    status: 'Pending',
    createdAt: '2026-09-27T14:30:00Z',
  }
];

const pharmacyItems: PharmacyItem[] = [
  {
    id: 'med-01',
    name: 'Amoxicillin & Clavulanate 625mg',
    genericName: 'Augmentin Duo',
    indication: 'Bacterial Respiratory & ENT Infections',
    category: 'Antibiotics',
    price: '₹ 185.00',
    availability: 'Prescription Required',
    dosage: '1 tablet twice daily after meals for 5 days',
    instructions: 'Complete full course even if symptoms subside early.',
    sideEffects: 'Mild nausea or gastrointestinal sensitivity'
  },
  {
    id: 'med-02',
    name: 'Atorvastatin 10mg Tablets',
    genericName: 'Lipitor / Atorva',
    indication: 'Cholesterol & Cardiovascular Plaque Reduction',
    category: 'Cardiovascular',
    price: '₹ 140.00',
    availability: 'In Stock',
    dosage: '1 tablet once daily at bedtime',
    instructions: 'Best taken in the evening. Avoid grapefruit juice.',
    sideEffects: 'Rare muscle fatigue'
  },
  {
    id: 'med-03',
    name: 'Paracetamol & Aceclofenac 500/100mg',
    genericName: 'Zerodol-P',
    indication: 'Acute Pain, Musculoskeletal Strain & Fever',
    category: 'Analgesics',
    price: '₹ 85.00',
    availability: 'In Stock',
    dosage: '1 tablet as needed every 8 hours post meals',
    instructions: 'Do not exceed 3 tablets in 24 hours. Drink plenty of water.',
    sideEffects: 'Mild heartburn if taken on empty stomach'
  },
  {
    id: 'med-04',
    name: 'Metformin Hydrochloride ER 500mg',
    genericName: 'Glycomet-SR',
    indication: 'Type 2 Diabetes Glycemic Control',
    category: 'Cardiovascular',
    price: '₹ 62.00',
    availability: 'In Stock',
    dosage: '1 tablet once daily with evening dinner',
    instructions: 'Swallow whole with water; do not crush extended-release tablet.',
    sideEffects: 'Transient abdominal fullness'
  },
  {
    id: 'med-05',
    name: 'Montelukast & Levocetirizine 10/5mg',
    genericName: 'Montair-LC',
    indication: 'Allergic Rhinitis, Sneezing & Seasonal Asthma',
    category: 'Respiratory',
    price: '₹ 165.00',
    availability: 'In Stock',
    dosage: '1 tablet daily at night before sleep',
    instructions: 'May cause mild drowsiness. Avoid night driving after ingestion.',
    sideEffects: 'Mild dry mouth or drowsiness'
  },
  {
    id: 'med-06',
    name: 'Vitamin D3 60,000 IU Oral Solution',
    genericName: 'Calcirol / Uprise-D3',
    indication: 'Bone Density, Joint Health & Immune Function',
    category: 'Vitamins & Supplements',
    price: '₹ 95.00',
    availability: 'In Stock',
    dosage: '1 bottle once weekly with a glass of warm milk for 8 weeks',
    instructions: 'Fat-soluble vitamin; absorbs best with dietary fats or milk.',
    sideEffects: 'None noted at standard prescribed dosage'
  }
];

const patientQueue: QueuePatient[] = [
  {
    id: 'q-101',
    tokenNumber: 'A-102',
    name: 'Mrs. Sunita Verma',
    age: 58,
    gender: 'Female',
    symptoms: 'Blood pressure review & mild dizziness',
    doctorName: 'Dr. Hansraj Hathi, M.D.',
    priority: 'Routine',
    waitTimeMinutes: 4,
    position: 1,
    status: 'With Doctor',
    time: '10:15 AM'
  },
  {
    id: 'q-102',
    tokenNumber: 'A-103',
    name: 'Vikram Mehta',
    age: 42,
    gender: 'Male',
    symptoms: 'Acute lumbar muscle spasm post-lifting',
    doctorName: 'Dr. John Smith, M.S.',
    priority: 'Urgent',
    waitTimeMinutes: 9,
    position: 2,
    status: 'Waiting',
    time: '10:20 AM'
  },
  {
    id: 'q-103',
    tokenNumber: 'A-104',
    name: 'Rahul Sharma (You)',
    age: 34,
    gender: 'Male',
    symptoms: 'Executive health evaluation & ECG follow-up',
    doctorName: 'Dr. Hansraj Hathi, M.D.',
    priority: 'Routine',
    waitTimeMinutes: 14,
    position: 3,
    status: 'Waiting',
    time: '10:25 AM'
  },
  {
    id: 'q-104',
    tokenNumber: 'A-105',
    name: 'Ananya Deshmukh',
    age: 26,
    gender: 'Female',
    symptoms: 'Skin rash & contact dermatitis inspection',
    doctorName: 'Dr. Emily Carter, M.D.',
    priority: 'Routine',
    waitTimeMinutes: 22,
    position: 4,
    status: 'Waiting',
    time: '10:30 AM'
  },
  {
    id: 'q-105',
    tokenNumber: 'A-106',
    name: 'Ramesh Patel',
    age: 63,
    gender: 'Male',
    symptoms: 'Post-stent coronary checkup & lipid titration',
    doctorName: 'Dr. Devid Johnson, M.D.',
    priority: 'Routine',
    waitTimeMinutes: 30,
    position: 5,
    status: 'Waiting',
    time: '10:35 AM'
  }
];

// -------------------------------------------------------------
// Real Human AI Medical Triage Assistant
// -------------------------------------------------------------

async function generateHumanMedicalAIResponse(userMessage: string): Promise<{
  text: string;
  analysis: {
    triageLevel: 'Routine' | 'Moderate' | 'Seek Immediate Care';
    suspectedConditions: string[];
    immediateAdvice: string[];
    recommendedSpecialist: string;
    clinicalDisclaimer: string;
  };
}> {
  const lowerMsg = userMessage.toLowerCase();

  // Emergency red-flags check
  const isEmergency = lowerMsg.includes('chest pain') || lowerMsg.includes('heart attack') || lowerMsg.includes('cant breathe') || lowerMsg.includes('unconscious') || lowerMsg.includes('severe bleeding');

  const triageLevel = isEmergency ? 'Seek Immediate Care' : (lowerMsg.includes('fever') || lowerMsg.includes('pain') || lowerMsg.includes('rash') || lowerMsg.includes('throat')) ? 'Moderate' : 'Routine';

  let recommendedSpecialist = 'Dr. Hansraj Hathi, M.D. (General Medicine)';
  let suspectedConditions = ['General Health Inquiry', 'Viral Upper Respiratory Symptoms'];

  if (lowerMsg.includes('skin') || lowerMsg.includes('rash') || lowerMsg.includes('itch') || lowerMsg.includes('acne')) {
    recommendedSpecialist = 'Dr. Emily Carter, M.D. (Dermatology)';
    suspectedConditions = ['Contact Dermatitis', 'Urticaria / Allergic Reaction'];
  } else if (lowerMsg.includes('headache') || lowerMsg.includes('migraine') || lowerMsg.includes('dizzy') || lowerMsg.includes('numb')) {
    recommendedSpecialist = 'Dr. James Paul, M.D. (Neurology)';
    suspectedConditions = ['Tension Headache', 'Benign Paroxysmal Positional Vertigo'];
  } else if (lowerMsg.includes('knee') || lowerMsg.includes('back') || lowerMsg.includes('joint') || lowerMsg.includes('bone')) {
    recommendedSpecialist = 'Dr. John Smith, M.S. (Orthopedics)';
    suspectedConditions = ['Lumbar Myofascial Strain', 'Patellofemoral Joint Syndrome'];
  } else if (lowerMsg.includes('heart') || lowerMsg.includes('palpitation') || lowerMsg.includes('bp') || lowerMsg.includes('blood pressure')) {
    recommendedSpecialist = 'Dr. Devid Johnson, M.D. (Cardiology)';
    suspectedConditions = ['Essential Hypertension Evaluation', 'Sinus Tachycardia'];
  }

  let aiReplyText = '';

  const systemInstruction = `You are Hathi Health AI, the clinical medical assistant for Hathi Clinic, a premier 24/7 healthcare facility led by Dr. Hansraj Hathi.
Target audience: REAL HUMAN PATIENTS.
Tone: Warm, highly professional, evidence-based, compassionate, clear.
Provide informative, structured health guidance, lifestyle tips, and appropriate specialist referrals.
Always include appropriate medical safety disclaimers for real human patients.`;

  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Patient inquiry: "${userMessage}".
Provide a concise, compassionate 2-3 sentence clinical response, practical at-home measures, and recommend whether to schedule an in-person evaluation with Dr. Hansraj Hathi or our department specialists.`,
        config: {
          systemInstruction,
        }
      });
      aiReplyText = response.text || '';
    } catch (err) {
      console.warn('Gemini call failed, using clinical fallback engine:', err);
    }
  }

  if (!aiReplyText) {
    if (isEmergency) {
      aiReplyText = `Warning: Your symptoms suggest potential acute distress. If you or someone else is experiencing severe chest pain, shortness of breath, or sudden weakness, please proceed to the nearest emergency room or call emergency services immediately. For stable evaluations, Dr. Hathi's team is available 24/7.`;
    } else if (lowerMsg.includes('headache') || lowerMsg.includes('throat') || lowerMsg.includes('fever')) {
      aiReplyText = `Based on your symptoms, this may indicate a common viral upper respiratory infection or tension-related inflammation. We recommend getting adequate rest, maintaining oral hydration with warm fluids, and monitoring your body temperature. If symptoms persist beyond 48 hours or fever rises above 101°F, please schedule a consultation with Dr. Hansraj Hathi in Suite 101.`;
    } else {
      aiReplyText = `Hello, and welcome to Hathi Clinic. Your health and wellbeing are our highest priority. To ensure accurate diagnosis and appropriate care, we recommend having your vital parameters checked and consulting with Dr. Hansraj Hathi or our department specialists.`;
    }
  }

  return {
    text: aiReplyText,
    analysis: {
      triageLevel,
      suspectedConditions,
      immediateAdvice: [
        'Maintain oral hydration with electrolyte-balanced water.',
        'Record temperature and blood pressure twice daily.',
        'Avoid strenuous exertion and ensure 7-8 hours of restful sleep.',
        'Schedule a clinical follow-up if symptoms do not improve within 48 hours.'
      ],
      recommendedSpecialist,
      clinicalDisclaimer: 'This AI triage tool provides clinical information for educational and orientation purposes. It does not replace an in-person physician examination.'
    }
  };
}

// -------------------------------------------------------------
// Authentication Endpoints
// -------------------------------------------------------------

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  // Find user by email or fallback to demo role
  let found = users.find(u => u.email.toLowerCase() === email?.toLowerCase());

  if (!found) {
    // If demo login by role button
    if (role === 'DOCTOR') {
      found = users.find(u => u.role === 'DOCTOR') || users[1];
    } else {
      found = users.find(u => u.role === 'PATIENT') || users[0];
    }
  }

  currentUser = found;
  res.json({
    success: true,
    user: {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      role: currentUser.role,
      age: currentUser.age,
      gender: currentUser.gender,
      bloodGroup: currentUser.bloodGroup,
      phone: currentUser.phone,
      metrics: currentUser.metrics,
      allergies: currentUser.allergies,
      medicalHistory: currentUser.medicalHistory,
    },
    token: `jwt_token_${currentUser.id}_${Date.now()}`
  });
});

app.post('/api/auth/register', (req: Request, res: Response) => {
  const { name, email, password, role, age, gender, bloodGroup, phone } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newUser: User = {
    id: `user-${Date.now()}`,
    name,
    email,
    password: password || 'password123',
    role: (role === 'DOCTOR' ? 'DOCTOR' : 'PATIENT'),
    age: parseInt(age || '30', 10),
    gender: gender || 'Not Specified',
    bloodGroup: bloodGroup || 'O+',
    phone: phone || '+91 90000 00000',
    allergies: [],
    medicalHistory: 'New patient registered at Hathi Clinic.',
    metrics: {
      bloodPressure: '120/80 mmHg',
      heartRate: 74,
      spo2: 99,
      temperature: '98.6 °F',
      bmi: 22.0,
      weight: '70 kg',
      height: '172 cm',
      lastCheckup: 'Today',
    }
  };

  users.push(newUser);
  currentUser = newUser;

  res.status(201).json({
    success: true,
    user: newUser,
    token: `jwt_token_${newUser.id}_${Date.now()}`
  });
});

app.get('/api/auth/me', (req: Request, res: Response) => {
  res.json({
    user: currentUser,
  });
});

app.post('/api/auth/logout', (req: Request, res: Response) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

// -------------------------------------------------------------
// Doctors & Specialists Endpoints
// -------------------------------------------------------------

app.get('/api/doctors', (req: Request, res: Response) => {
  const dept = req.query.department as string | undefined;
  if (dept && dept !== 'all') {
    return res.json(doctors.filter(d => d.department.toLowerCase() === dept.toLowerCase()));
  }
  res.json(doctors);
});

app.get('/api/doctors/:id', (req: Request, res: Response) => {
  const doc = doctors.find(d => d.id === req.params.id);
  if (!doc) return res.status(404).json({ error: 'Doctor not found' });
  res.json(doc);
});

// -------------------------------------------------------------
// Appointments Endpoints
// -------------------------------------------------------------

app.get('/api/appointments', (req: Request, res: Response) => {
  const role = req.query.role as string | undefined;
  if (role === 'DOCTOR') {
    // Return all clinic appointments for Dr. Hathi's view
    return res.json(appointments);
  }
  // Return user's appointments
  res.json(appointments.filter(a => a.patientId === currentUser.id || currentUser.role === 'DOCTOR'));
});

app.post('/api/appointments', (req: Request, res: Response) => {
  const { doctorName, specialty, date, time, clinicRoom, symptoms } = req.body;
  const targetDoc = doctors.find(d => d.name === doctorName) || doctors[0];

  const newAppointment: Appointment = {
    id: `apt-${Date.now()}`,
    patientId: currentUser.id,
    patientName: currentUser.name,
    patientAge: currentUser.age,
    patientGender: currentUser.gender,
    doctorId: targetDoc.id,
    doctorName: targetDoc.name,
    specialty: specialty || targetDoc.specialty,
    date: date || '30 September 2026',
    time: time || '11:00 AM',
    clinicRoom: clinicRoom || targetDoc.room,
    symptoms: symptoms || 'General Medical Consultation',
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  };

  appointments.unshift(newAppointment);
  res.status(201).json(newAppointment);
});

app.put('/api/appointments/:id', (req: Request, res: Response) => {
  const { status, doctorNotes, prescriptionIssued } = req.body;
  const apt = appointments.find(a => a.id === req.params.id);
  if (!apt) return res.status(404).json({ error: 'Appointment not found' });

  if (status) apt.status = status;
  if (doctorNotes) apt.doctorNotes = doctorNotes;
  if (prescriptionIssued) apt.prescriptionIssued = prescriptionIssued;

  res.json(apt);
});

app.delete('/api/appointments/:id', (req: Request, res: Response) => {
  appointments = appointments.filter(a => a.id !== req.params.id);
  res.json({ success: true, message: 'Appointment cancelled successfully' });
});

// -------------------------------------------------------------
// Medical Records Endpoints
// -------------------------------------------------------------

app.get('/api/records', (req: Request, res: Response) => {
  res.json(medicalRecords);
});

app.get('/api/records/:id', (req: Request, res: Response) => {
  const record = medicalRecords.find(r => r.id === req.params.id);
  if (!record) return res.status(404).json({ error: 'Medical record not found' });
  res.json(record);
});

// -------------------------------------------------------------
// Pharmacy & Prescriptions Endpoints
// -------------------------------------------------------------

app.get('/api/pharmacy', (req: Request, res: Response) => {
  res.json(pharmacyItems);
});

// -------------------------------------------------------------
// Patient Queue Endpoints
// -------------------------------------------------------------

app.get('/api/queue', (req: Request, res: Response) => {
  res.json({
    currentCallingToken: 'A-102',
    userToken: 'A-104',
    userPosition: 3,
    estimatedWaitMinutes: 14,
    totalWaiting: patientQueue.length,
    list: patientQueue,
  });
});

app.post('/api/queue/join', (req: Request, res: Response) => {
  const { symptoms, doctorName } = req.body;
  const newNumber = `A-${100 + patientQueue.length + 1}`;
  const entry: QueuePatient = {
    id: `q-${Date.now()}`,
    tokenNumber: newNumber,
    name: currentUser.name,
    age: currentUser.age || 34,
    gender: currentUser.gender || 'Male',
    symptoms: symptoms || 'General OPD Consultation',
    doctorName: doctorName || 'Dr. Hansraj Hathi, M.D.',
    priority: 'Routine',
    waitTimeMinutes: (patientQueue.length + 1) * 7,
    position: patientQueue.length + 1,
    status: 'Waiting',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  patientQueue.push(entry);
  res.json({ success: true, entry });
});

// -------------------------------------------------------------
// AI Chat Endpoint
// -------------------------------------------------------------

app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message cannot be empty' });
    const result = await generateHumanMedicalAIResponse(message);
    res.json(result);
  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({ error: 'Medical assistant temporarily unavailable' });
  }
});

// -------------------------------------------------------------
// Notifications Endpoint
// -------------------------------------------------------------

app.get('/api/notifications', (req: Request, res: Response) => {
  res.json([
    {
      id: 'notif-1',
      title: 'Dr. Hathi approved your Lab Report',
      message: 'Comprehensive Metabolic Panel and Lipid Profile are within healthy target ranges.',
      time: '15m ago',
      read: false,
      type: 'doctor'
    },
    {
      id: 'notif-2',
      title: 'Upcoming Appointment Reminder',
      message: 'Consultation with Dr. Hansraj Hathi scheduled for tomorrow at 10:30 AM.',
      time: '2h ago',
      read: false,
      type: 'appointment'
    },
    {
      id: 'notif-3',
      title: 'Prescription Refill Ready',
      message: 'Your prescribed Vitamin D3 and Multivitamin pack is ready for pickup at Smart Pharmacy.',
      time: '5h ago',
      read: true,
      type: 'pharmacy'
    }
  ]);
});

// -------------------------------------------------------------
// Vite Middleware / Static Serving
// -------------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[HATHI CLINIC] 24/7 Human Healthcare Server running on port ${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
