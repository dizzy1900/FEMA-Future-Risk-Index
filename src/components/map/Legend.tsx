import { useMap } from "react-leaflet";
import { useEffect } from "react";
import * as d3 from "d3";
import L from "leaflet";
import { useIsMobile } from "@/lib/utils";
import { Rating } from "@/schema/risk";


type LegendProps = {
  rating: Rating;
};

const Legend: React.FC<LegendProps> = ({ rating }) => {
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
        categoryLabels = [
              'Not Applicable',
              'No Rating',       
              'Very Low (<55K)',
              'Relatively Low (55K - 932K)',
              'Relatively Moderate (932K - 5.96M)',
              'Relatively High (5.96M - 29.4M)',
              'Very High (>29.4M)'
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
  }, [map]);

  return null;
};

export default Legend;
