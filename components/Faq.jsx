'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: '¿Cuándo inicia el torneo?',
    a: 'El próximo campeonato arranca en Enero 2027 en Lima, Perú. Las inscripciones ya están abiertas: escríbenos por WhatsApp para separar el cupo de tu equipo.',
  },
  {
    q: '¿Cuáles son las categorías participantes?',
    a: 'Las categorías oficiales son Sub-6, Sub-8, Sub-10, Sub-12, Sub-14 y Sub-16. El próximo torneo se jugará a partir de Enero 2027 con fixture y tabla por cada categoría.',
  },
  {
    q: '¿Cómo puedo inscribir a mi equipo?',
    a: 'Haz clic en el botón "Inscribirme" o contáctanos directamente por WhatsApp para enviar los datos de tu equipo.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="w-full max-w-2xl space-y-3 text-left">
      {FAQS.map((item, index) => {
        const open = openIndex === index;
        return (
          <div
            key={item.q}
            className={`overflow-hidden rounded-xl border transition ${
              open ? 'border-[#FFD700]/60 bg-white/10' : 'border-white/10 bg-white/5'
            }`}
          >
            <button
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-bold hover:bg-white/5 transition"
            >
              <span>{item.q}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-[#FFD700] transition-transform duration-300 ${
                  open ? 'rotate-180' : ''
                }`}
              />
            </button>
            {open && (
              <div className="border-t border-white/5 px-6 pb-4 pt-3 text-sm text-gray-300">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}