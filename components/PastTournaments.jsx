'use client';
import { Trophy, Award, ChevronDown, ChevronUp, Medal } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import pastTournaments from '../data/past_tournaments.json';

const CupBadge = ({ type, children }) => {
  const styles = type === 'gold'
    ? 'badge-gold'
    : 'badge-silver';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-black ${styles} shadow-[0_0_16px_rgba(255,215,0,0.3)]`}>
      {children}
    </span>
  );
};

export default function PastTournaments() {
  const [openEdition, setOpenEdition] = useState(null);

  const toggleEdition = (id) => {
    setOpenEdition(openEdition === id ? null : id);
  };

  return (
    <section id="historial" className="section-premium">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-16">
          <h2 className="mb-4 flex items-center justify-center gap-3 text-4xl font-black heading-3d md:text-5xl">
            <Trophy className="text-[var(--gold)]" /> Historial de Campeones
          </h2>
          <p className="text-gray-300 text-lg">Revive las ediciones pasadas del torneo</p>
        </div>

        <div className="space-y-4">
          {pastTournaments.map((edition, editionIndex) => {
            const isOpen = openEdition === edition.id;
            return (
              <motion.article
                key={edition.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: editionIndex * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => toggleEdition(edition.id)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left font-bold transition-colors hover:bg-white/[0.02]"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--gold)]/20 to-[var(--gold-dim)]/10 text-[var(--gold)] border border-[var(--gold)]/30">
                      <Trophy className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="text-xl text-white">{edition.title}</p>
                      <p className="text-sm text-gray-400">Año {edition.year}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="h-6 w-6 text-[var(--gold)]"
                  >
                    <ChevronDown className="h-6 w-6" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="border-t border-white/10 pt-6"
                    >
                      <div className="grid gap-6 md:grid-cols-2">
                        {edition.categories.map((cat, idx) => (
                          <motion.div
                            key={`${edition.id}-${idx}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-6"
                          >
                            <div className="flex items-center gap-2">
                              <Award className="h-5 w-5 text-[var(--gold)]" />
                              <span className="font-bold text-lg text-white">{cat.category}</span>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                              <motion.div
                                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(255, 215, 0, 0.3), 0 16px 32px rgba(0,0,0,0.4)' }}
                                transition={{ duration: 0.3 }}
                                className="glass-card-gold p-5 relative overflow-hidden"
                              >
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative mb-4 flex items-center gap-2">
                                  <Trophy className="h-5 w-5 text-[var(--gold)] drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
                                  <CupBadge type="gold">Copa Oro</CupBadge>
                                </div>
                                <div className="relative space-y-3 text-sm">
                                  <div className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg">
                                    <span className="text-gray-300">Campeón</span>
                                    <span className="font-semibold text-[var(--gold)] drop-shadow-[0_0_4px_rgba(255,215,0,0.5)]">{cat.gold.champion}</span>
                                  </div>
                                  <div className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg">
                                    <span className="text-gray-300">Subcampeón</span>
                                    <span className="font-semibold text-gray-200">{cat.gold.runnerUp}</span>
                                  </div>
                                </div>
                              </motion.div>

                              <motion.div
                                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(180,180,200,0.2), 0 16px 32px rgba(0,0,0,0.4)' }}
                                transition={{ duration: 0.3 }}
                                className="glass-card-silver p-5 relative overflow-hidden"
                              >
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyber-green)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative mb-4 flex items-center gap-2">
                                  <Medal className="h-5 w-5 text-gray-400 drop-shadow-[0_0_8px_rgba(180,180,200,0.4)]" />
                                  <CupBadge type="silver">Copa Plata</CupBadge>
                                </div>
                                <div className="relative space-y-3 text-sm">
                                  <div className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg">
                                    <span className="text-gray-300">Campeón</span>
                                    <span className="font-semibold text-gray-300">{cat.silver.champion}</span>
                                  </div>
                                  <div className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg">
                                    <span className="text-gray-300">Subcampeón</span>
                                    <span className="font-semibold text-gray-400">{cat.silver.runnerUp}</span>
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>

        {pastTournaments.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-12 text-center"
          >
            <Trophy className="mx-auto mb-4 h-12 w-12 text-[var(--gold)]" />
            <p className="mb-2 text-xl font-black uppercase tracking-wider">Historial en construcción</p>
            <p className="text-gray-300">Los campeonatos anteriores se publicarán aquí.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}