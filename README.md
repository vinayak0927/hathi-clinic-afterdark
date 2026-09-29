# HATHI CLINIC & AFTERDARK 🐘
> *"Your Health, Our Priority."* — **Dr. Hansraj Hathi, M.D.**

A modern, full-stack 24/7 human healthcare web platform featuring real-time 3D anatomical biomonitoring, role-based **Patient Dashboard** and **Doctor Dashboard**, full authentication, MedAI clinical triage, smart pharmacy, and a subtle floating night-shift ghost mascot animation.

---

## 👨‍⚕️ The Platform

**Hathi Clinic & Afterdark** is designed for real human patients and medical staff:
- **Patient Dashboard**: Live vital parameters (BP 120/80 mmHg, Heart Rate 72 BPM, SpO2 99%, BMI 22.4), interactive 3D human anatomy biomonitor with live 12-lead ECG waveform canvas, appointment scheduling, diagnostic imaging records, and smart pharmacy refills.
- **Doctor Dashboard**: Specialized clinical workstation for **Dr. Hansraj Hathi, M.D.** and attending physicians. Includes the active outpatient queue, patient examination suite with vital telemetry, physician notes ledger, and digital prescription generator.
- **Real Authentication**: Role-based login and registration (Patient vs Doctor), complete with 1-click fast-track demo buttons.
- **MedAI Clinical Assistant**: AI-powered symptom triage providing structured differential considerations, practical home remedies, and 1-click booking with clinic specialists.
- **Ghost Animation Mascot 👻**: As requested, a friendly floating night-shift ghost companion with wellness tips and toggleable controls.

---

## 🏛️ Application Architecture

```
/
├── server.ts                       # Express backend API with authentication & clinical data
├── index.html                      # Entry point with Cinzel & Plus Jakarta typography
├── metadata.json                   # Applet configuration & server-side Gemini capability
├── package.json                    # Dependencies & build scripts
├── src/
│   ├── main.tsx                    # React client entry point
│   ├── App.tsx                     # Main shell, router & authenticated session controller
│   ├── index.css                   # Tailwind CSS styling, dark medical glassmorphism
│   ├── components/
│   │   ├── Navbar.tsx              # Top Bar Contract header with user session & portals
│   │   ├── LandingHero.tsx         # Overview hero with Dr. Hathi quotes & portal CTAs
│   │   ├── PatientDashboard.tsx    # Comprehensive human patient health portal
│   │   ├── DoctorDashboard.tsx     # Dr. Hathi physician examination workstation
│   │   ├── HumanAnatomyScanner.tsx # 3D human anatomy biomonitor with live ECG canvas
│   │   ├── MedAIChat.tsx           # Real human clinical AI triage assistant
│   │   ├── AuthModal.tsx           # Role-based login, registration & 1-click demo login
│   │   ├── GhostAnimation.tsx      # Subtle floating ghost mascot animation with wellness tips
│   │   ├── AppointmentsManager.tsx # Real human appointment scheduling & cancellation
│   │   ├── MedicalRecordsView.tsx  # Brain MRI, Chest X-Ray, ECG & Lab reports
│   │   ├── SpectralPharmacy.tsx    # Smart human pharmacy & active prescriptions
│   │   ├── LiveQueue.tsx           # Real-time outpatient token queue tracker (#A-104)
│   │   ├── NotificationsModal.tsx  # Clinical alerts & prescription ready notices
│   │   └── Footer.tsx              # Disclaimer, clinic links & copyright
│   └── utils/
│       └── audio.ts                # Web Audio API procedural sound synthesizer
```

---

## 🔑 Authentication & Testing

You can authenticate in two ways:

### 1. Fast-Track Demo Login
Click **Sign In** in the top navigation bar, then click either:
- **Patient (Rahul)**: Instantly authenticates as patient **Rahul Sharma** with real vitals, active appointments, and imaging records.
- **Dr. Hathi (MD)**: Instantly authenticates as **Dr. Hansraj Hathi, M.D.**, opening the physician workstation with today's 27 consultations, patient examination suite, and prescription writer.

### 2. Standard Form Login / Registration
- Register a new patient account with name, age, gender, and blood group.
- Log in with email (`patient@hathiclinic.com` / `password123`).

---

## 🩺 Core Features

### 1. 🩻 3D Human Anatomy Biomonitor
- Realistic human anatomical model with interactive organ hotspots:
  - **Brain**: Brain MRI & Neurovascular Telemetry (Normal, 12 mmHg)
  - **Heart**: 12-Lead Electrocardiogram with real-time animated ECG waveform (72 BPM)
  - **Lungs**: Chest Radiography (Clear bilaterally)
  - **Abdomen**: Hepato-Renal Ultrasound (Normal)
  - **Knee**: Orthopedic Weight-Bearing Joint Scan (Preserved)

### 2. 🤖 MedAI Clinical Assistant
- Clinical symptom triage for real human conditions (headaches, seasonal allergies, blood pressure queries, joint stiffness).
- Produces structured triage severity levels, home care guidance, and direct specialist match with Dr. Hathi.

### 3. 💊 Smart Pharmacy
- Real medications: **Amoxicillin & Clavulanate 625mg**, **Atorvastatin 10mg**, **Paracetamol & Aceclofenac 500/100mg**, **Metformin ER 500mg**, **Montelukast & Levocetirizine**, and **Vitamin D3 60,000 IU**.

### 4. 👻 Night-Shift Ghost Animation
- A friendly, floating ghost mascot floating in the bottom-right corner.
- Click or hover to receive clinical wellness tips from Dr. Hathi.
- Can be minimized/restored at any time.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the full-stack app
npm run dev

# 3. Build for production
npm run build
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
