import { useMap } from "react-leaflet";
import { useEffect } from "react";
import * as d3 from "d3";
import L from "leaflet";
import { useIsMobile } from "@/lib/utils";
import { Rating, Hazard } from "@/schema/risk";

type LegendProps = {
  rating: Rating;
  hazard: Hazard;
  colorScale:
    | d3.ScaleSequential<string, never>
    | d3.ScaleOrdinal<string, string, never>;
};

const generateSequentialColors = (
  colorScale: d3.ScaleSequential<string, never>,
  steps: number
) => {
  const [min, max] = colorScale.domain();
  const stepSize = (max - min) / (steps - 1);
  return Array.from({ length: steps }, (_, i) => {
    const value = min + i * stepSize;
    return { value, color: colorScale(value) };
  });
};

const generateOrdinalColors = (
  colorScale: d3.ScaleOrdinal<string, string, never>,
  categories: string[]
) => {
  return Array.from({ length: categories.length }, (_, i) => {
    return { value: categories[i], color: colorScale(categories[i]) }; // Map to color
  });
};

const Legend: React.FC<LegendProps> = ({ rating, hazard, colorScale }) => {
  const map = useMap(); // Get the Leaflet map instance
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!map) return;

    const legend = new L.Control({
      position: isMobile ? "bottomright" : "topleft",
    });

    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "info legend");

      if (isMobile) {
        div.style.marginBottom = `calc(env(safe-area-inset-bottom) + 32px)`;
      }

      let colors: { value: any; color: string }[];

      // Define category labels
      let categoryLabels: string[];
      if (rating === Rating.PALR) {
        if (hazard === Hazard.DRGT) {
          categoryLabels = [
            "Not Applicable",
            "No Rating",
            "Very Low (<21.9K)",
            "Relatively Low (21.9K - 292K)",
            "Relatively Moderate (292K - 2.74M)",
            "Relatively High (2.74M - 25.1M)",
            "Very High (>25.1M)",
          ];
        } else if (hazard === Hazard.CFLD) {
          categoryLabels = [
            "Not Applicable",
            "No Rating",
            "Very Low (<55K)",
            "Relatively Low (55K - 932K)",
            "Relatively Moderate (932K - 5.96M)",
            "Relatively High (5.96M - 29.4M)",
            "Very High (>29.4M)",
          ];
        } else if (hazard === Hazard.EXHT) {
          categoryLabels = [
            "Not Applicable",
            "No Rating",
            "Very Low (<10.9K)",
            "Relatively Low (10.9K - 241K)",
            "Relatively Moderate (241K - 1.87M)",
            "Relatively High (1.87M - 17.3M)",
            "Very High (>17.3M)",
          ];
        } else if (hazard === Hazard.HRCN) {
          categoryLabels = [
            "Not Applicable",
            "No Rating",
            "Very Low (<625K)",
            "Relatively Low (625K - 7.36M)",
            "Relatively Moderate (7.36M - 43M)",
            "Relatively High (43M - 191M)",
            "Very High (>191M)",
          ];
        } else if (hazard === Hazard.WFIR) {
          categoryLabels = [
            "Not Applicable",
            "No Rating",
            "Very Low (<85.9K)",
            "Relatively Low (85.9K - 842K)",
            "Relatively Moderate (842K - 5.88M)",
            "Relatively High (5.88M - 49.5M)",
            "Very High (>49.5M)",
          ];
        } else {
          throw new Error(`Unexpected hazard type: ${hazard}`);
        }
        colors = generateOrdinalColors(
          colorScale as d3.ScaleOrdinal<string, string, never>,
          categoryLabels.slice(-5)
        );
      } else {
        colors = generateSequentialColors(
          colorScale as d3.ScaleSequential<string, never>,
          5
        );
        categoryLabels = [
          "Not Applicable",
          "No Rating",
          "Very Low",
          "Relatively Low",
          "Relatively Moderate",
          "Relatively High",
          "Very High",
        ];
      }

      // Style the legend container with a white background
      div.style.background = "#FFFFFF";
      div.style.padding = "10px";
      div.style.borderRadius = "8px";
      div.style.boxShadow = "0px 0px 6px rgba(0,0,0,0.2)";
      div.style.fontFamily = "Arial, sans-serif";

      // Add title
      div.innerHTML = `<strong style="display: block; text-align: center; margin-bottom: 8px;">Legend</strong>`;

      // Generate legend items
      let labels = [];

      // Add "No Applicable" category manually with gray color
      labels.push(
        `<div style="display: flex; align-items: center; margin-bottom: 4px;">
          <div style="width: 20px; height: 20px; background:#B0B0B0; margin-right: 8px; border: 1px solid #999;"></div>
          <span>${categoryLabels[0]}</span>
        </div>`
      );

      // Add "No Rating" category manually with white color
      labels.push(
        `<div style="display: flex; align-items: center; margin-bottom: 4px;">
          <div style="width: 20px; height: 20px; background:#FFFFFF; margin-right: 8px; border: 1px solid #999;"></div>
          <span>${categoryLabels[1]}</span>
        </div>`
      );

      // Generate the rest using d3 color scale
      for (let i = 0; i <= colors.length - 1; i++) {
        const color: string = colors[i].color;
        const label = categoryLabels[i + 2]; // Shift labels to match colors

        labels.push(
          `<div style="display: flex; align-items: center; margin-bottom: 4px;">
            <div style="width: 20px; height: 20px; background:${color}; margin-right: 8px; border: 1px solid #999;"></div>
            <span>${label}</span>
          </div>`
        );
      }

      labels.push(
        `<div style="display: flex; align-items: center; margin-top: 8px; border-top: 1px solid #ddd; padding-top: 8px; justify-content: center;">
          <a href="https://buymeacoffee.com/herzo175" target="_blank" style="color: #666; text-decoration: underline; font-size: 0.9em;">
            Buy us a coffee ☕
          </a>
        </div>`
      );

      div.innerHTML += labels.join("");
      return div;
    };

    legend.addTo(map);

    return () => {
      map.removeControl(legend);
    };
  }, [map, rating, hazard, colorScale]);

  return null;
};

export default Legend;
