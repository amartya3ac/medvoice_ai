import { 
    Activity, Baby, Bone, Brain, BrainCircuit, Building, ChevronRight, Clock, 
    CloudRain, Dna, Droplets, Ear, Eye, FlaskConical, Flower2, Heart, 
    HeartHandshake, HeartPulse, Home, Layers, Leaf, MapPin, MessageSquare, 
    Microscope, Moon, Palmtree, Pill, Scale, Scan, Scissors, ShieldAlert, 
    ShieldCheck, Smile, Sparkles, Sprout, Stethoscope, Syringe, Target, 
    Thermometer, User, UserPlus, Volume2, Waves, Wind, Zap, Accessibility,
    Handshake, Languages, AlertTriangle, Briefcase
} from 'lucide-react';

export const GLOBAL_DOCTOR_REGISTRY = [
    // Kolkata (Local Elite)
    { name: 'Dr. Jajati Sinha', specialty: 'Internal Medicine', hospital: 'Manipal (AMRI) Dhakuria / Remedy Garia', city: 'Kolkata', fees: '₹1200', qualification: 'MD, MRCP' },
    { name: 'Dr. Ramna Banerjee', specialty: 'Gynecology & Robotic Surgeon', hospital: 'Apollo Multispeciality', city: 'Kolkata', fees: '₹1500', qualification: 'MD, FRCOG' },
    { name: 'Dr. Kunal Sarkar', specialty: 'Cardiac Surgeon', hospital: 'Medica Superspecialty', city: 'Kolkata', fees: '₹2000', qualification: 'MCh, FIACS' },
    { name: 'Dr. Tarun Jindal', specialty: 'Uro-Oncologist', hospital: 'Apollo Multispeciality', city: 'Kolkata', fees: '₹1800', qualification: 'MS, MCh' },
    { name: 'Dr. Sujoy Majumdar', specialty: 'Endocrinologist', hospital: 'Apollo Multispeciality', city: 'Kolkata', fees: '₹1200', qualification: 'MD, DM' },
    { name: 'Dr. Biswanath Roy', specialty: 'ENT Specialist', hospital: 'Apollo Multispeciality', city: 'Kolkata', fees: '₹1000', qualification: 'MS (ENT)' },
    { name: 'Dr. Gautam Dhar Choudhury', specialty: 'Rheumatologist', hospital: 'Apollo Multispeciality', city: 'Kolkata', fees: '₹1400', qualification: 'MD, DM' },
    { name: 'Dr. Vivek Goel', specialty: 'Nephrologist', hospital: 'Apollo Multispeciality', city: 'Kolkata', fees: '₹1400', qualification: 'MD, DM' },
    { name: 'Dr. Vikash Kapoor', specialty: 'Orthopedic Surgeon', hospital: 'Medica Superspeciality', city: 'Kolkata', fees: '₹1500', qualification: 'MS (Ortho)' },
    { name: 'Dr. Ronen Roy', specialty: 'Orthopedic Surgeon', hospital: 'Fortis Anandapur', city: 'Kolkata', fees: '₹1600', qualification: 'MS, FRCS' },
    { name: 'Dr. Deep Das', specialty: 'Neurologist', hospital: 'CMRI / Woodlands', city: 'Kolkata', fees: '₹1500', qualification: 'MD, DM' },
    { name: 'Dr. Raja Dhar', specialty: 'Pulmonologist', hospital: 'CMRI', city: 'Kolkata', fees: '₹1400', qualification: 'MD, MRCP' },
    { name: 'Dr. Arindam Biswas', specialty: 'Internal Medicine', hospital: 'Rabindranath Tagore (RN Tagore)', city: 'Kolkata', fees: '₹1100', qualification: 'MD' },
    { name: 'Dr. Koushik Lahiri', specialty: 'Dermatologist', hospital: 'Apollo Multispeciality', city: 'Kolkata', fees: '₹1200', qualification: 'MD, DDVL' },

    // Mumbai (Financial & Western Hub)
    { name: 'Dr. Ramakanta Panda', specialty: 'Cardiologist', hospital: 'Asian Heart Institute', city: 'Mumbai', fees: '₹3000', qualification: 'MCh' },
    { name: 'Dr. Nitin Sampat', specialty: 'Neurologist', hospital: 'Wockhardt Hospital', city: 'Mumbai', fees: '₹2500', qualification: 'MD, DNB' },
    { name: 'Dr. Dinshaw Pardiwala', specialty: 'Orthopedic Surgeon', hospital: 'Kokilaben Dhirubhai Ambani Hospital', city: 'Mumbai', fees: '₹3000', qualification: 'MS, DNB' },
    { name: 'Dr. Subhash Agal', specialty: 'Gastroenterologist', hospital: 'Kokilaben Hospital', city: 'Mumbai', fees: '₹2500', qualification: 'MD, DM' },
    { name: 'Dr. Suresh Advani', specialty: 'Oncologist', hospital: 'Nanavati Max Hospital', city: 'Mumbai', fees: '₹3500', qualification: 'MD, FICP' },
    { name: 'Dr. Pratit Samdani', specialty: 'Internal Medicine', hospital: 'Breach Candy / Jaslok', city: 'Mumbai', fees: '₹2800', qualification: 'MD (Gold Medalist)' },
    { name: 'Dr. Vishal Peshattiwar', specialty: 'Orthopedic Surgeon', hospital: 'Kokilaben Dhirubhai Ambani Hospital', city: 'Mumbai', fees: '₹3200', qualification: 'MS (Spine Surgery)' },
    { name: 'Dr. Alok Sharma', specialty: 'Neurologist', hospital: 'NeuroGen Institute', city: 'Mumbai', fees: '₹3000', qualification: 'MS, MCh' },
    { name: 'Dr. Santanu Sen', specialty: 'Oncologist', hospital: 'Kokilaben Dhirubhai Ambani Hospital', city: 'Mumbai', fees: '₹2800', qualification: 'MD (Pediatric Oncology)' },

    // Delhi NCR (Northern Hub)
    { name: 'Dr. Naresh Trehan', specialty: 'Cardiologist', hospital: 'Medanta - The Medicity', city: 'Delhi NCR', fees: '₹3500', qualification: 'MCh' },
    { name: 'Dr. Ashok Rajgopal', specialty: 'Orthopedic Surgeon', hospital: 'Medanta - The Medicity', city: 'Delhi NCR', fees: '₹3000', qualification: 'MS, MCh' },
    { name: 'Dr. Vinit Suri', specialty: 'Neurologist', hospital: 'Indraprastha Apollo', city: 'Delhi NCR', fees: '₹2800', qualification: 'MD, DM' },
    { name: 'Dr. Randhir Sud', specialty: 'Gastroenterologist', hospital: 'Medanta - The Medicity', city: 'Delhi NCR', fees: '₹3200', qualification: 'MD, DM' },
    { name: 'Dr. Sabhyata Gupta', specialty: 'Gynecologist', hospital: 'Medanta - The Medicity', city: 'Delhi NCR', fees: '₹2800', qualification: 'MD, DNB' },
    { name: 'Dr. Pradeep Chowbey', specialty: 'Bariatric Surgeon', hospital: 'Max Super Speciality, Saket', city: 'Delhi NCR', fees: '₹3500', qualification: 'MS, FRCS' },
    { name: 'Dr. Rommel Tickoo', specialty: 'Internal Medicine', hospital: 'Max Hospital', city: 'Delhi NCR', fees: '₹1800', qualification: 'MD' },

    // Bangalore (Southern Hub)
    { name: 'Dr. Devi Prasad Shetty', specialty: 'Cardiologist', hospital: 'Narayana Health', city: 'Bangalore', fees: '₹3000', qualification: 'MS, FRCS' },
    { name: 'Dr. Vivek Jawali', specialty: 'Cardiologist', hospital: 'Fortis Hospital', city: 'Bangalore', fees: '₹2800', qualification: 'MS, MCh' },
    { name: 'Dr. Deepak Haldipur', specialty: 'ENT Specialist', hospital: 'Sparsh Hospital', city: 'Bangalore', fees: '₹1500', qualification: 'MS (ENT)' },
    { name: 'Dr. Somashekhar S. P.', specialty: 'Oncologist', hospital: 'Aster DM Healthcare', city: 'Bangalore', fees: '₹3200', qualification: 'MS, MCh' },
    { name: 'Dr. Ravi Gopal Varma', specialty: 'Neurologist', hospital: 'Aster CMI', city: 'Bangalore', fees: '₹3000', qualification: 'MS, MCh' },

    // Hyderabad & Chennai
    { name: 'Dr. D. Nageshwar Reddy', specialty: 'Gastroenterologist', hospital: 'AIG Hospitals', city: 'Hyderabad', fees: '₹3000', qualification: 'MD, DM' },
    { name: 'Dr. P. Raghu Ram', specialty: 'Oncologist', hospital: 'KIMS Hospitals', city: 'Hyderabad', fees: '₹3000', qualification: 'MS, FRCS' },
    { name: 'Dr. K. M. Cherian', specialty: 'Cardiac Surgeon', hospital: 'Frontier Lifeline', city: 'Chennai', fees: '₹2500', qualification: 'MS, FRCS' },
    { name: 'Dr. Mohamed Rela', specialty: 'Liver Transplant Surgeon', hospital: 'Rela Institute', city: 'Chennai', fees: '₹3000', qualification: 'MS, FRCS' },

    { name: 'Dr. Arundhati Roy', specialty: 'General Physician', hospital: 'MedVoice Online Clinic', city: 'Online', fees: '₹500', qualification: 'MBBS, MD' },
    { name: 'Dr. Sanjoy Sen', specialty: 'Dermatologist', hospital: 'MedVoice Online Clinic', city: 'Online', fees: '₹700', qualification: 'MD (Skin)' },
    { name: 'Dr. Pritam Das', specialty: 'Psychiatrist', hospital: 'MedVoice Online Clinic', city: 'Online', fees: '₹800', qualification: 'MD, DPM' },
    { name: 'Dr. Meera Iyer', specialty: 'Pediatrician', hospital: 'MedVoice Virtual Care', city: 'Online', fees: '₹600', qualification: 'MD (Pediatrics)' },
    { name: 'Dr. Rahul Verma', specialty: 'Endocrinologist', hospital: 'MedVoice Online Clinic', city: 'Online', fees: '₹900', qualification: 'MD, DM' },
    { name: 'Dr. S. K. Gupta', specialty: 'Nephrologist', hospital: 'MedVoice Virtual Care', city: 'Online', fees: '₹1000', qualification: 'MD, DM' },
    { name: 'Dr. Ananya Reddy', specialty: 'Rheumatologist', hospital: 'MedVoice Online Clinic', city: 'Online', fees: '₹950', qualification: 'MD, DM' },
    { name: 'Dr. Vikram Seth', specialty: 'Pulmonologist', hospital: 'MedVoice Virtual Care', city: 'Online', fees: '₹850', qualification: 'MD, DTCD' },
    { name: 'Dr. Sneha Kapoor', specialty: 'Ophthalmologist', hospital: 'MedVoice Online Clinic', city: 'Online', fees: '₹750', qualification: 'MS (Ophtha)' },
];

export const normalizeSpecialtyName = (name: string) => {
    if (!name) return 'Medical Specialist';
    return name
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
        .replace('Care Specialist', 'Palliative Care Specialist')
        .replace('Medicine Doctor', 'Sports Medicine Doctor');
};

export const getSpecialtyIcon = (specialty: string) => {
    const s = specialty.toLowerCase();
    
    // 60-Specialty Massive Mapping
    if (s.includes('dermatologist') || s.includes('skin')) return { icon: Sparkles, color: 'text-blue-400' };
    if (s.includes('cardiologist') || s.includes('heart')) return { icon: Heart, color: 'text-red-400' };
    if (s.includes('neurologist') || s.includes('brain')) return { icon: Brain, color: 'text-purple-400' };
    if (s.includes('orthopedic') || s.includes('bone') || s.includes('joint')) return { icon: Bone, color: 'text-orange-400' };
    if (s.includes('ent specialist') || s.includes('ear') || s.includes('nose') || s.includes('throat')) return { icon: Ear, color: 'text-cyan-400' };
    if (s.includes('gastroenterologist') || s.includes('stomach') || s.includes('liver')) return { icon: Stethoscope, color: 'text-emerald-400' };
    if (s.includes('pulmonologist') || s.includes('lung')) return { icon: Activity, color: 'text-sky-400' };
    if (s.includes('nephrologist') || s.includes('kidney')) return { icon: Droplets, color: 'text-indigo-400' };
    if (s.includes('urologist') || s.includes('urine')) return { icon: Wind, color: 'text-blue-500' };
    if (s.includes('oncologist') || s.includes('cancer')) return { icon: ShieldAlert, color: 'text-rose-400' };
    if (s.includes('pediatrician') || s.includes('child')) return { icon: Baby, color: 'text-pink-400' };
    if (s.includes('gynecologist') || s.includes('female')) return { icon: Flower2, color: 'text-rose-300' };
    if (s.includes('obstetrician') || s.includes('pregnancy')) return { icon: HeartHandshake, color: 'text-pink-300' };
    if (s.includes('endocrinologist') || s.includes('hormone')) return { icon: Thermometer, color: 'text-yellow-400' };
    if (s.includes('ophthalmologist') || s.includes('eye')) return { icon: Eye, color: 'text-blue-300' };
    if (s.includes('psychiatrist') || s.includes('mental')) return { icon: BrainCircuit, color: 'text-teal-400' };
    if (s.includes('psychologist') || s.includes('behavior')) return { icon: Smile, color: 'text-teal-300' };
    if (s.includes('dentist') || s.includes('teeth')) return { icon: Zap, color: 'text-slate-100' };
    if (s.includes('surgeon') && !s.includes('ortho')) return { icon: Scissors, color: 'text-slate-400' };
    if (s.includes('physician') || s.includes('general')) return { icon: Stethoscope, color: 'text-blue-400' };
    if (s.includes('radiologist') || s.includes('x-ray')) return { icon: Scan, color: 'text-slate-500' };
    if (s.includes('anesthesiologist')) return { icon: Syringe, color: 'text-indigo-300' };
    if (s.includes('pathologist') || s.includes('biopsy')) return { icon: Microscope, color: 'text-rose-500' };
    if (s.includes('hematologist') || s.includes('blood')) return { icon: Droplets, color: 'text-red-600' };
    if (s.includes('rheumatologist') || s.includes('arthritis')) return { icon: Activity, color: 'text-orange-500' };
    if (s.includes('sexologist')) return { icon: Heart, color: 'text-pink-500' };
    if (s.includes('allergist') || s.includes('immune')) return { icon: Wind, color: 'text-green-300' };
    if (s.includes('veterinarian')) return { icon: Smile, color: 'text-amber-600' };
    if (s.includes('homeopathic')) return { icon: Leaf, color: 'text-green-400' };
    if (s.includes('ayurvedic')) return { icon: Sprout, color: 'text-green-600' };
    if (s.includes('emergency')) return { icon: AlertTriangle, color: 'text-red-500' };
    if (s.includes('family medicine')) return { icon: Home, color: 'text-blue-300' };
    if (s.includes('infectious')) return { icon: ShieldCheck, color: 'text-green-500' };
    if (s.includes('geriatrician') || s.includes('elderly')) return { icon: UserPlus, color: 'text-slate-300' };
    if (s.includes('neonatologist')) return { icon: Baby, color: 'text-pink-200' };
    if (s.includes('sports medicine')) return { icon: Zap, color: 'text-yellow-500' };
    if (s.includes('pain management')) return { icon: CloudRain, color: 'text-slate-400' };
    if (s.includes('pharmacologist')) return { icon: Pill, color: 'text-blue-400' };
    if (s.includes('geneticist')) return { icon: Dna, color: 'text-purple-500' };
    if (s.includes('sleep medicine')) return { icon: Moon, color: 'text-indigo-400' };
    if (s.includes('cardiothoracic') || s.includes('cardiac surgeon')) return { icon: HeartPulse, color: 'text-red-500' };
    if (s.includes('vascular')) return { icon: Waves, color: 'text-red-400' };
    if (s.includes('plastic')) return { icon: Sparkles, color: 'text-pink-400' };
    if (s.includes('maxillofacial')) return { icon: User, color: 'text-slate-400' };
    if (s.includes('palliative') || s.includes('comfort')) return { icon: HeartHandshake, color: 'text-emerald-300' };
    if (s.includes('occupational medicine')) return { icon: Briefcase, color: 'text-orange-300' };
    if (s.includes('reproductive')) return { icon: Dna, color: 'text-rose-200' };
    if (s.includes('interventional')) return { icon: Target, color: 'text-blue-500' };
    if (s.includes('transplant')) return { icon: HeartPulse, color: 'text-rose-600' };
    if (s.includes('bariatric') || s.includes('weight')) return { icon: Scale, color: 'text-indigo-300' };
    if (s.includes('audiologist') || s.includes('hearing')) return { icon: Volume2, color: 'text-blue-400' };
    if (s.includes('speech')) return { icon: MessageSquare, color: 'text-blue-300' };
    if (s.includes('critical care') || s.includes('intensivist')) return { icon: Activity, color: 'text-red-700' };
    if (s.includes('occupational therapist')) return { icon: Handshake, color: 'text-orange-400' };
    if (s.includes('physiatrist') || s.includes('rehabilitation')) return { icon: Accessibility, color: 'text-emerald-400' };
    if (s.includes('tropical')) return { icon: Palmtree, color: 'text-amber-500' };
    if (s.includes('biochemist')) return { icon: FlaskConical, color: 'text-cyan-500' };
    if (s.includes('internal medicine')) return { icon: Stethoscope, color: 'text-blue-400' };
    if (s.includes('uro-oncologist')) return { icon: ShieldAlert, color: 'text-rose-500' };
    if (s.includes('robotic surgeon')) return { icon: Zap, color: 'text-purple-400' };
    
    return { icon: Stethoscope, color: 'text-blue-400' };
};
