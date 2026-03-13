'use client';

import React, { useEffect, useRef, useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, User, Building, Phone } from 'lucide-react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    doctor: any;
    onBookingSuccess: (bookingData: any) => void;
    user: any;
}

export default function BookingModal({ isOpen, onClose, doctor, onBookingSuccess, user }: BookingModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [step, setStep] = useState<'details' | 'confirming' | 'success'>('details');
    
    // Patient Details
    const [patientName, setPatientName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        if (isOpen) {
            setStep('details');
            setPatientName('');
            setPhoneNumber('');
            gsap.fromTo(modalRef.current, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.3 }
            );
            gsap.fromTo(contentRef.current,
                { scale: 0.9, y: 20, opacity: 0 },
                { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
        }
    }, [isOpen]);

    if (!isOpen || !doctor) return null;

    const handleConfirm = async () => {
        if (!patientName || !phoneNumber) {
            alert('Please enter patient details to proceed.');
            return;
        }

        setStep('confirming');
        
        try {
            const bookingRequest = {
                user_id: user?.id || "demo-user", // Use actual user ID if available
                doctor_name: doctor.name,
                hospital: doctor.hospital,
                appointment_date: "Tomorrow, Oct 24" // Static for now as per UI
            };

            const response = await fetch('http://127.0.0.1:8000/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingRequest)
            });

            if (!response.ok) throw new Error('Booking failed');

            const result = await response.json();
            
            const bookingData = {
                id: result.data?.[0]?.id || Math.random().toString(36).substr(2, 9),
                doctorName: doctor.name,
                specialty: doctor.specialty,
                hospital: doctor.hospital,
                patientName,
                phoneNumber,
                date: 'Tomorrow, Oct 24',
                time: '10:30 AM',
                timestamp: new Date().toISOString()
            };
            
            onBookingSuccess(bookingData);
            setStep('success');
            
            gsap.fromTo('.success-icon', 
                { scale: 0, rotate: -180 }, 
                { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(1.5)" }
            );
        } catch (error) {
            console.error("Booking Error:", error);
            alert("Failed to secure slot. Please try again.");
            setStep('details');
        }
    };

    return (
        <div ref={modalRef} className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div ref={contentRef} className="w-full max-w-lg glass-card bg-slate-900/90 border-white/10 rounded-3xl shadow-2xl overflow-hidden relative">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-20"
                >
                    <X className="w-6 h-6" />
                </button>

                {step === 'details' && (
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                                <User className="w-8 h-8 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-white">{doctor.name}</h3>
                                <p className="text-blue-400 text-sm font-bold uppercase tracking-widest">{doctor.specialty}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Patient Inputs */}
                            <div className="space-y-3">
                                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Patient Information</label>
                                <div className="relative group/input">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover/input:text-blue-400 transition-colors" />
                                    <input 
                                        type="text" 
                                        placeholder="Full Name"
                                        value={patientName}
                                        onChange={(e) => setPatientName(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/5 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                                    />
                                </div>
                                <div className="relative group/input">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover/input:text-blue-400 transition-colors" />
                                    <input 
                                        type="tel" 
                                        placeholder="Phone Number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/5 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                <Building className="w-5 h-5 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Facility</p>
                                    <p className="text-sm text-slate-300">{doctor.hospital}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <Calendar className="w-5 h-5 text-emerald-400 mb-2" />
                                    <p className="text-xs text-slate-500 font-bold uppercase">Date</p>
                                    <p className="text-sm text-white font-medium">Tomorrow, Oct 24</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <Clock className="w-5 h-5 text-violet-400 mb-2" />
                                    <p className="text-xs text-slate-500 font-bold uppercase">Time</p>
                                    <p className="text-sm text-white font-medium">10:30 AM</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-500 font-bold uppercase">Consultation Fee</p>
                                <p className="text-2xl font-black text-white">{doctor.fees || '₹1000'}</p>
                            </div>
                            <button 
                                onClick={handleConfirm}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_40px_rgba(79,70,229,0.4)] hover:-translate-y-1 active:scale-95 cursor-pointer"
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                )}

                {step === 'confirming' && (
                    <div className="p-12 text-center py-24">
                        <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-8"></div>
                        <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Securing Slot...</h3>
                        <p className="text-slate-400">Finalizing appointment with {doctor.name}</p>
                    </div>
                )}

                {step === 'success' && (
                    <div className="p-12 text-center py-20 relative overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                        <CheckCircle2 className="success-icon w-24 h-24 text-emerald-400 mx-auto mb-8 shadow-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.3)] relative z-10" />
                        <h3 className="text-3xl font-black text-white mb-3 tracking-tight relative z-10">Appointment Secured!</h3>
                        <p className="text-slate-400 mb-10 leading-relaxed max-w-sm mx-auto relative z-10">
                            A confirmation has been sent to your registered phone. 
                            The hospital will contact you for final verification shortly.
                        </p>
                        <button 
                            onClick={onClose}
                            className="w-full py-4 glass bg-slate-800/40 hover:bg-slate-800/60 text-white font-black rounded-2xl transition-all border border-white/10 hover:border-white/20 relative z-10 shadow-xl cursor-pointer"
                        >
                            Back to Consultation
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
