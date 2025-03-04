import { useMemo } from "react";

import RatingSelector from "@/components/filters/RatingSelector";
import HazardSelector from "@/components/filters/HazardSelector";
import ScenarioSelector from "@/components/filters/ScenarioSelector";
import Search from "@/components/filters/Search";
import { Button } from "@/components/ui/button";
import DatasourceSelector from "@/components/filters/DatasourceSelector";
import MobileFilterDropdowns from "@/components/filters/MobileFilterDropdowns";
import Map from "@/components/map/Map";
import { useFiltersStore } from "@/state/filters";
import { Datasource, Hazard, Rating } from "@/schema/risk";
import Info from "@/components/map/Info";
export default function Home() {
  const { hazard, datasource, rating } = useFiltersStore();

  // TODO: URL routing to make easier to share

  const hazardGraphImageUrl = useMemo(() => {
    let imageUrl = "/nri-future-risk/";

    if (hazard === Hazard.CFLD) {
      imageUrl += "CFLD";
    } else if (hazard === Hazard.EXHT) {
      imageUrl += "EXHT";

      if (datasource === Datasource.L95) {
        imageUrl += "_L95";
      } else if (datasource === Datasource.L99) {
        imageUrl += "_L99";
      } else if (datasource === Datasource.N95) {
        imageUrl += "_N95";
      } else if (datasource === Datasource.N99) {
        imageUrl += "_N99";
      }
    } else if (hazard === Hazard.HRCN) {
      imageUrl += "HRCN";
    } else if (hazard === Hazard.DRGT) {
      imageUrl += "DRGT";
    } else if (hazard === Hazard.WFIR) {
      imageUrl += "WFIR";
    }

    if (rating === Rating.PRISK) {
      imageUrl += "_PRISK";
    } else if (rating === Rating.PALR) {
      imageUrl += "_PALR";
    }

    return imageUrl + ".png";
  }, [hazard, rating, datasource]);

  return (
    <>
      <div className="absolute inset-0 z-0 h-screen w-full">
        <Map />
      </div>

      <div className="relative p-4 z-10 pointer-events-none h-screen flex flex-col justify-between">
        <div className="flex flex-col items-center space-y-4 justify-center">
          <div className="hidden md:flex flex-row gap-4 pointer-events-auto">
            <RatingSelector />
            <HazardSelector />
            <ScenarioSelector />
            <DatasourceSelector />
          </div>

          <div className="hidden md:flex flex-row gap-4 pointer-events-auto w-1/4">
            <div className="relative w-full">
              <Search />
            </div>
          </div>

          <div className="md:hidden flex flex-row gap-4 pointer-events-auto w-4/5 items-center justify-center">
            <MobileFilterDropdowns />
          </div>
        </div>

        <div className="hidden md:flex flex-grow flex-col items-end justify-end py-16 px-4 space-y-4">
          <img
            src={hazardGraphImageUrl}
            alt="hazardGraph"
            width={300}
            height={200}
          />

          <div className="flex flex-col gap-4 pointer-events-auto">
            <Button>
              <a href="https://github.com/fulton-ring/nri-future-risk/tree/main/public">
                View Datasets
              </a>
            </Button>
          </div>
        </div>

        <Info />
      </div>
    </>
  );
}
