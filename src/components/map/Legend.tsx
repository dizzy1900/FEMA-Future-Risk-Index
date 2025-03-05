import { useMap } from "react-leaflet";
import { useEffect } from "react";
import * as d3 from "d3";
import L from "leaflet";
import { useIsMobile } from "@/lib/utils";
import { Rating, Hazard } from "@/schema/risk";


type LegendProps = {
  rating: Rating,
  hazard: Hazard,
};

const Legend: React.FC<LegendProps> = ({ rating, hazard}) => {
  const map = useMap(); // Get the Leaflet map instance
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!map) return;

    const legend = new L.Control({
      position: isMobile ? "bottomright" : "topleft",
    });

    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "info legend");

      const numColors = 5; // Use only  segments from d3.interpolateOrRd
      const colorScale = d3.interpolateOrRd; // d3 color interpolation


      // Define category labels
      let categoryLabels: string[];
      if (rating === Rating.PALR) {
          if (hazard === Hazard.DRGT) {
            categoryLabels = [
              'Not Applicable',
              'No Rating',
              'Very Low (<21.9K)', 
              'Relatively Low (21.9K - 292K)',
              'Relatively Moderate (292K - 2.74M)',
              'Relatively High (2.74M - 25.1M)',
              'Very High (>25.1M)',
            ]
          } else if (hazard === Hazard.CFLD) {
            categoryLabels = [
              'Not Applicable',
              'No Rating',
              'Very Low (<55K)',
              'Relatively Low (55K - 932K)',
              'Relatively Moderate (932K - 5.96M)',
              'Relatively High (5.96M - 29.4M)',
              'Very High (>29.4M)'
            ]
        } else if (hazard === Hazard.EXHT){
          categoryLabels = [
            'Not Applicable',
            'No Rating',
            'Very Low (<10.9K)',
            'Relatively Low (10.9K - 241K)',
            'Relatively Moderate (241K - 1.87M)',
            'Relatively High (1.87M - 17.3M)', 
            'Very High (>17.3M)',
          ]
        } else if (hazard === Hazard.HRCN){
          categoryLabels = [
            'Not Applicable',
            'No Rating',
            'Very Low (<625K)',
            'Relatively Low (625K - 7.36M)', 
            'Relatively Moderate (7.36M - 43M)',
            'Relatively High (43M - 191M)',
            'Very High (>191M)',
          ]
        } else if (hazard === Hazard.WFIR) {
          categoryLabels = [
            'Not Applicable',
            'No Rating',
            'Very Low (<85.9K)',
            'Relatively Low (85.9K - 842K)',
            'Relatively Moderate (842K - 5.88M)',
            'Relatively High (5.88M - 49.5M)',
            'Very High (>49.5M)',
          ]
          } else {
            categoryLabels = [
              'Not Applicable',
              'No Rating',
              'Very Low',
              'Relatively Low',
              'Relatively Moderate',
              'Relatively High',
              'Very High',
            ]
          }
        } else {
          categoryLabels = [
            'Not Applicable',
            'No Rating',
            'Very Low (<21.9K)', 
            'Relatively Low (21.9K - 292K)',
            'Relatively Moderate (292K - 2.74M)',
            'Relatively High (2.74M - 25.1M)',
            'Very High (>25.1M)',
          ]
        }

      const categories = categoryLabels.slice(-5)
      
      // Generate numerical thresholds
      const thresholds = categories.map((_, i) => (i / (categories.length - 1)) * 0.9);

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
      for (let i = 0; i <= (numColors - 1); i++) {
        const color = colorScale(thresholds[i]);
        const label = categoryLabels[i + 2]; // Shift labels to match colors

        labels.push(
          `<div style="display: flex; align-items: center; margin-bottom: 4px;">
            <div style="width: 20px; height: 20px; background:${color}; margin-right: 8px; border: 1px solid #999;"></div>
            <span>${label}</span>
          </div>`
        );
      }

      div.innerHTML += labels.join("");
      return div;
    };

    legend.addTo(map);

    return () => {
      map.removeControl(legend);
    };
  }, [map, rating, hazard]);

  return null;
};

export default Legend;
