'use client';

import { FiMapPin } from 'react-icons/fi';

interface ContactMapProps {
  lat: string;
  long: string;
  title?: string;
  address?: string;
}

export const ContactMap = ({ lat, long, title, address }: ContactMapProps) => {
  const bbox = `${Number(long) - 0.01},${Number(lat) - 0.01},${Number(long) + 0.01},${Number(lat) + 0.01}`;
  const marker = `${lat},${long}`;

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;

  return (
    <div className="bg-white rounded-2xl border border-[#E6E8ED] overflow-hidden shadow-lg">
      {/* ===== الخريطة ===== */}
      <iframe
        src={mapUrl}
        className="w-full h-[400px] border-0"
        loading="lazy"
        title="Company Location"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* ===== العنوان تحت الخريطة ===== */}
      {address && (
        <div className="p-5 md:p-6 border-t border-[#E6E8ED] bg-gray-50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <FiMapPin className="text-primary text-lg" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm md:text-base font-bold text-[#171A21] mb-1">
                {title || 'Our Location'}
              </h3>
              <p className="text-sm md:text-base text-[#667085] leading-relaxed">
                {address}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};