'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-3xl w-full mx-auto space-y-4">
      {FAQS.map((item, index) => {
        const open = openIndex === index;
        return (
          <motion.div
            key={item.q}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card overflow-hidden"
            style={{ borderColor: open ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255, 215, 0, 0.12)' }}
          >
            <button
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-bold text-white transition-colors hover:bg-white/[0.02]"
            >
              <span>{item.q}</span>
              <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-5 w-5 shrink-0 text-[var(--gold)]"
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="border-t border-white/10 px-6 pb-5 pt-3 text-sm text-gray-300"
                >
                  {item.a}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}