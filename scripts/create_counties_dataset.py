import json

import polars as pl

# NOTE: assumes running the script from the root directory
with open("./public/tiny-usa-county-borders.json", "r", encoding="ISO-8859-1") as f:
    counties = json.load(f)

climate_data_df = pl.read_excel(
    "./public/NRI_Future_Risk_Master_Datasheet_12052024.xlsx"
)

# print(counties)
# print(climate_data_df.head())

# Create lookup dict of climate data by county FIPS code
# Filter and combine datasets directly
combined_features = []
for feature in counties["features"]:
    county_fips = feature["properties"]["STATE"] + feature["properties"]["COUNTY"]

    # Look up climate data directly from dataframe
    climate_rows = climate_data_df.filter(pl.col("STCOFIPS") == county_fips)

    if len(climate_rows) > 0:
        # Add first matching climate row to county properties
        climate_row = climate_rows.row(0, named=True)
        feature["properties"].update(climate_row)
        combined_features.append(feature)

# Create new GeoJSON with combined data
combined_geojson = {"type": "FeatureCollection", "features": combined_features}

# print(json.dumps(combined_geojson["features"][0], indent=2))

# Save combined dataset
with open("./public/combined_nri_counties_borders.json", "w") as f:
    json.dump(combined_geojson, f)
