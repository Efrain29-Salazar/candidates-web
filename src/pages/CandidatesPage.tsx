import { useState } from 'react';
import { candidates } from '../data/candidates';
import { SearchBar } from '../components/SearchBar';
import { CandidateList } from '../components/CandidateList';
import './CandidatesPage.css';

const normalizeText = (text: string): string =>
  text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const CandidatesPage = () => {
  // El estado del texto que el usuario escribió.
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const handleToggleFavorite = (id: number) => {
    setFavoriteIds(
      favoriteIds.includes(id) ? favoriteIds.filter((favoriteId) => favoriteId !== id) : [...favoriteIds, id],
    );
  };

  const normalizedTerm = normalizeText(searchTerm.trim());

  const filteredCandidates = candidates.filter(
    (candidate) =>
      normalizeText(candidate.name).includes(normalizedTerm) || normalizeText(candidate.city).includes(normalizedTerm),
  );

  return (
    <section>
      <div className="candidates-page-header">
        <h2 className="candidates-page-title">Candidatos</h2>
        <p className="candidates-page-count" aria-live="polite">
          {filteredCandidates.length} {filteredCandidates.length === 1 ? 'resultado' : 'resultados'}
        </p>
      </div>

      <div className="candidates-page-search">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar por nombre o ciudad"
          label="Buscar candidatos"
        />
      </div>

      {filteredCandidates.length > 0 ? (
        <CandidateList
          candidates={filteredCandidates}
          favoriteIds={favoriteIds}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : (
        <p className="candidates-page-empty">No se encontraron candidatos con ese término.</p>
      )}
    </section>
  );
};
