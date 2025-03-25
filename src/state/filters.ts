import { create } from 'zustand';
import { Hazard, Scenario, Datasource, Rating } from '@/schema/risk';

interface FiltersState {
  rating: Rating;
  hazard: Hazard;
  scenario: Scenario; 
  datasource: Datasource;
  setRating: (rating: Rating) => void;
  setHazard: (hazard: Hazard) => void;
  setScenario: (scenario: Scenario) => void;
  setDatasource: (datasource: Datasource) => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  rating: Rating.PRISK,
  hazard: Hazard.WFIR,
  scenario: Scenario.MID_LOWER,
  datasource: Datasource.L95,
  setRating: (rating) => set({ rating }),
  setHazard: (hazard) => set({ hazard }),
  setScenario: (scenario) => set({ scenario }),
  setDatasource: (datasource) => set({ datasource })
}));
