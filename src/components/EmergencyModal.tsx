import React from 'react';
import { ShieldAlert, PhoneCall, X, AlertTriangle } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const helplines = [
    { number: "108", title: "Emergency medical & ambulance service", desc: "Toll free national emergency medical dispatch across India", urgent: true },
    { number: "102", title: "Free referral transport & maternity service", desc: "Specialized maternal and infant healthcare emergency transport", urgent: false },
    { number: "112", title: "National emergency unified helpline", desc: "Unified national emergency dispatch line", urgent: false },
    { number: "181", title: "Women helpline", desc: "Crisis response and medical support for women", urgent: false }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3A282B]/50 backdrop-blur-xs">
      <div className="bg-white max-w-md w-full p-6 sm:p-8 border border-[#F6D9D4] rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#806669] hover:text-[#8C2432] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4 border-b border-[#F6D9D4] pb-3">
          <div className="p-2.5 bg-red-100 text-red-800 rounded-xl shrink-0">
            <ShieldAlert className="w-5 h-5 text-red-700" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#8C2432]">
              Emergency Helplines
            </h3>
            <p className="text-xs text-[#806669] font-normal">
              National emergency contact directory
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-[#FFF0EC] border border-[#FDC4B5] text-[#3A282B] text-xs flex items-start gap-2.5 mb-4 rounded-xl">
          <AlertTriangle className="w-4 h-4 text-[#FA6A48] shrink-0 mt-0.5" />
          <p className="leading-normal [text-wrap:pretty]">
            Sakhi cannot dial emergency dispatch or contact your doctor automatically. If you are experiencing acute pain, severe bleeding, or breathing difficulty, call immediately from your telephone.
          </p>
        </div>

        <div className="space-y-2.5 mb-6">
          {helplines.map((h, i) => (
            <div 
              key={i}
              className={`p-3.5 border rounded-xl flex items-center justify-between ${
                h.urgent ? 'bg-red-50/70 border-red-300' : 'bg-white border-[#F6D9D4]'
              }`}
            >
              <div>
                <h4 className="text-xs font-semibold text-[#3A282B]">{h.title}</h4>
                <p className="text-[11px] text-[#806669] font-normal">{h.desc}</p>
              </div>
              <a
                href={`tel:${h.number}`}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FA6A48] hover:bg-[#EE5A36] text-white font-bold text-xs uppercase transition-all rounded-full shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{h.number}</span>
              </a>
            </div>
          ))}
        </div>

        <div className="flex justify-end border-t border-[#F6D9D4] pt-4">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#3A282B] hover:bg-[#2D1B20] text-white uppercase tracking-wider font-semibold text-xs transition-colors rounded-full"
          >
            Close directory
          </button>
        </div>
      </div>
    </div>
  );
};
