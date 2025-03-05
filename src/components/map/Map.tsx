import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { Feature, Geometry } from "geojson";
import { useMemo, useState } from "react";
import { Layer } from "leaflet";
import * as d3 from "d3";

import { CountyProperties } from "@/schema/county";
import CountyInfoModal from "@/components/counties/CountyInfoModal";
import { useCountyStore } from "@/state/county";
import { useFiltersStore } from "@/state/filters";
import { useCounties } from "@/clients/api";
import { Datasource, Hazard, Rating, Scenario } from "@/schema/risk";
import Legend from "@/components/map/Legend";

// Centered over continental US
const center = { lat: 39.8283, lng: -98.5795 };

const getValueField = (
  hazard: Hazard,
  scenario: Scenario,
  rating: Rating,
  datasource: Datasource
) => {
  let valueField = "";

  if (hazard === Hazard.CFLD) {
    valueField += "CFLD";
  } else if (hazard === Hazard.DRGT) {
    valueField += "DRGT";
  } else if (hazard === Hazard.EXHT) {
    valueField += "EXHT";

    if (datasource === Datasource.L95) {
      valueField += "_L95";
    } else if (datasource === Datasource.L99) {
      valueField += "_L99";
    } else if (datasource === Datasource.N95) {
      valueField += "_N95";
    } else if (datasource === Datasource.N99) {
      valueField += "_N99";
    }
  } else if (hazard === Hazard.HRCN) {
    valueField += "HRCN";
  } else if (hazard === Hazard.WFIR) {
    valueField += "WFIR";
  }

  if (scenario === Scenario.MID_LOWER) {
    valueField += "_MID_LOWER";
  } else if (scenario === Scenario.MID_HIGHER) {
    valueField += "_MID_HIGHER";
  } else if (scenario === Scenario.LATE_LOWER) {
    valueField += "_LATE_LOWER";
  } else if (scenario === Scenario.LATE_HIGHER) {
    valueField += "_LATE_HIGHER";
  }

  if (rating === Rating.PRISK) {
    if (scenario === Scenario.BASE) {
      valueField += "_RISKS";
    } else {
      valueField += "_PRISKS";
    }
  } else if (rating === Rating.PALR) {
    if (scenario === Scenario.BASE) {
      valueField += "_EALR";
    } else {
      valueField += "_PALR";
    }
  } else if (rating === Rating.HM) {
    valueField += "_HM";
  }

  return valueField;
};

const Map = () => {
  const [hoveredCounty, setHoveredCounty] = useState<string | undefined>();
  const { setSelectedCounty } = useCountyStore();
  const { rating, hazard, scenario, datasource } = useFiltersStore();

  const { data } = useCounties();

  const valueField = useMemo(
    () => getValueField(hazard, scenario, rating, datasource),
    [hazard, scenario, rating, datasource]
  );

  const colorScale = useMemo(() => {
    if (!data) {
      return d3.scaleSequential(d3.interpolateOrRd).domain([0, 10_000]);
    }

    const values = data.features.map(
      (feature) => (feature.properties as any)?.[valueField] ?? 0
    );

    if (rating === Rating.PALR) {
      let categories: string[];
      if (hazard === Hazard.DRGT) {
        categories = [
          'Very Low (<21.9K)', 
          'Relatively Low (21.9K - 292K)',
          'Relatively Moderate (292K - 2.74M)',
          'Relatively High (2.74M - 25.1M)',
          'Very High (>25.1M)',
        ]
      } else if (hazard === Hazard.CFLD) {
        categories = [
          'Very Low (<55K)',
          'Relatively Low (55K - 932K)',
          'Relatively Moderate (932K - 5.96M)',
          'Relatively High (5.96M - 29.4M)',
          'Very High (>29.4M)'
        ]
    } else if (hazard === Hazard.EXHT){
      categories = [
        'Very Low (<10.9K)',
        'Relatively Low (10.9K - 241K)',
        'Relatively Moderate (241K - 1.87M)',
        'Relatively High (1.87M - 17.3M)', 
        'Very High (>17.3M)',
      ]
    } else if (hazard === Hazard.HRCN){
      categories = [
        'Very Low (<625K)',
        'Relatively Low (625K - 7.36M)', 
        'Relatively Moderate (7.36M - 43M)',
        'Relatively High (43M - 191M)',
        'Very High (>191M)',
      ]
    } else if (hazard === Hazard.WFIR){
      categories = [
        'Very Low (<85.9K)',
        'Relatively Low (85.9K - 842K)', 'No Rating',
        'Relatively Moderate (842K - 5.88M)',
        'Relatively High (5.88M - 49.5M)',
        'Very High (>49.5M)',
      ]
    }
      return d3
        .scaleOrdinal(d3.schemeOrRd[categories.length])
        .domain(categories);
    }
    const extent = d3.extent(values) as [number, number];
    return d3.scaleSequential(d3.interpolateOrRd).domain(extent);
  }, [data, valueField]);

  // Function to style each county
  const countyStyle = (feature?: Feature<Geometry, CountyProperties>) => {
    if (!feature) {
      return {
        fillColor: "#bdbdbd",
        weight: 1,
        opacity: 0.7,
        color: "gray",
        fillOpacity: 0.7,
      };
    }

    let value = (feature.properties as any)?.[valueField] ?? null;

    if (value === "Not Applicable") {
      value = null;
    }

    return {
      fillColor: !value ? "#bdbdbd" : value != "No Rating" ? colorScale(value) : '#FFFFFF',
      weight: 1,
      opacity: 0.7,
      color: "gray",
      fillOpacity: hoveredCounty === feature.properties.STCOFIPS ? 0.9 : 0.7,
    };
  };

  // TODO: make pinch to zoom smoother
  // TODO: improve hover styling performance (useMemo, maybe maintain some state of styles)

  return (
    <MapContainer
      center={center}
      zoom={4}
      // zoomDelta={0.5}
      scrollWheelZoom={true}
      // style={{ height: 800, width: 1200 }}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution={`
          Made By <a href="https://www.fultonring.com/">Fulton Ring</a>, 
          &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a>, 
          &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, 
          Data from US Census Bureau, FEMA, and NOAA.
          <a href="https://github.com/fulton-ring/nri-future-risk">View Source on GitHub</a>
          <a href="https://buymeacoffee.com/herzo175">Donate To The Developers</a>
        `}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
      />

      {data && (
        <GeoJSON
          key={valueField} // Add key to force re-render when data changes
          data={data}
          style={countyStyle}
          onEachFeature={(
            feature: Feature<Geometry, CountyProperties>,
            layer: Layer
          ) => {
            layer.on("mouseover", () => {
              setHoveredCounty(feature.properties.STCOFIPS);
            });

            layer.on("mouseout", () => {
              setHoveredCounty(undefined);
            });

            layer.on("click", () => {
              setSelectedCounty(feature.properties);
            });
          }}
        />
      )}

      <Legend rating={rating} hazard={hazard} />
      <CountyInfoModal />
    </MapContainer>
  );
};

export default Map;
