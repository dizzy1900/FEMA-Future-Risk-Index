import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

/*
Future Risk Index Guide
What Is It?
This is a rebuilt version of FEMA’s Future Risk Index, which was released on Dec. 12, 2024 and taken down on Jan. 19, 2025 when the Trump administration decided to suppress climate data. It is the first free tool to show how much climate change will cost American communities. 
The Future Risk Index adds a climate change multiplier to FEMA’s National Risk Index, which measures the economic impact of natural hazards. The Future Risk Index shows how those impacts change when you take climate change into account. 

What Does the Map Show?
The map shows one hazard, one output type, and one emissions scenario at a time. You can change these using the filters. 
The outputs:  
Ratings (see legend): A comparative score showing how a county’s projected losses or overall risk compare to those of all other counties. 
Projected Annual Loss: A county’s average yearly economic losses (as a dollar range) from a specific natural hazard in a future emissions scenario. 
Why the weird dollar ranges? Because FEMA used a clustering algorithm to group counties into risk tiers in the base National Risk Index. The Future Risk Index uses the same risk “bins” so you can compare today’s risk with future risk.
Projected Risk Rating: Like Projected Annual Loss, but also includes social vulnerability and community resilience, which adjust projected economic losses up or down. This offers a more holistic view of risk. The Risk Rating is based on economic projections but it is presented only as a comparative rating, not a dollar amount, because future social conditions are unpredictable and dollar estimates could be misleading. 
Hazard Multiplier: Shows change in expected economic losses from a given hazard between today and a future scenario. A multiplier of 4 means a county’s projected future losses are 4x their current losses. Some high-risk areas have low multipliers because their risk is already extreme. That’s why California’s wildfire multipliers are lower than the Midwest’s.

Where’s the Data From?
Input data come from NASA, NOAA, USDA, EPA, USGS, Applied Research Associates, and others. FEMA spent years selecting data sources and refining methodology. 
The Future Risk Index uses ICPP emissions scenarios: Representative Concentration Pathways (RCPs) or Shared Socioeconomic Pathways (SSPs), depending on the hazard. (We apologize for the acronyms). 
What’s not included: Future population growth, changing demographics, land use changes, adaptation. This tool shows how climate change will impact communities if all else is held the same. 
What’s the Graph in the Corner?
It shows national projected economic loss or risk rating, depending on your filter.
Upper line = Higher emissions scenario
Lower line = Lower emissions scenario

What Can I Do with This Information? 
People in mitigation, urban or community planning, emergency response, education, insurance, finance, research–you tell us. We’re excited to see where you go with this. 
For everyone else, here are some options.
Check risk before you move. A home that’s safe now might not be in 20 years.
Be ready for high-risk hazards. Now that you know which natural disasters are likely to do the most damage in your area, make a plan. Know where you’ll go. Don’t forget about pets and vulnerable friends and neighbors. See ready.gov.
Homeowners, prep your house. Does the Future Risk Index show stronger hurricanes? Reinforce the roof. Rising wildfire risk? Clear vegetation.
Renters, talk to your landlord. Show them the map. Ask what they’re doing about future risk.
Vote local. State and local governments control building codes, disaster funding, and infrastructure. Vote for people with climate plans.
Call out big polluters. Social media, conversations, protests, wherever. Show people the map. Emissions drive these numbers.
Join forces. Find a group working on climate solutions. Go to a meeting. Volunteer. Share your knowledge about future risk. 
Cut emissions where you can. Climate change is not an individual responsibility, but if you’re looking for individual interventions, the most impactful (in order): Fly less. Eat less beef and dairy. Buy less stuff. 
Most importantly—do what you're good at. Writers, write about climate. Data scientists and engineers, rebuild a government tool. Tradespeople, talk about how buildings and infrastructure will hold up in more extreme weather. Whatever your skillset, use it. 
The risks on this map aren’t theoretical. They’re coming. Do something, even if it’s a small thing. Protect what you love. 
*/

const Info = () => {
  const [open, setOpen] = useState(true);

  // NOTE: there is no trigger, so this will be open on page load and close permanently on click
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-y-scroll max-h-[60vh]">
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle>Welcome to the Future Risk Index</DialogTitle>
          <DialogDescription className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <p className="font-bold">What Is It?</p>
              <p className="text-sm">
                This is a rebuilt version of FEMA’s Future Risk Index, which was
                released on Dec. 12, 2024 and taken down on Jan. 19, 2025 when
                the Trump administration decided to suppress climate data. It is
                the first free tool to show how much climate change will cost
                American communities.
              </p>
              <p className="text-sm">
                The Future Risk Index adds a climate change multiplier to FEMA’s
                National Risk Index, which measures the economic impact of
                natural hazards. The Future Risk Index shows how those impacts
                change when you take climate change into account.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-bold">What Does the Map Show?</p>
              <p className="text-sm">
                The map shows{" "}
                <strong>
                  one hazard, one output type, and one emissions scenario at a
                  time.
                </strong>{" "}
                You can change these using the <strong>filters.</strong>
              </p>
              <p className="text-sm">The outputs:</p>
              <ul className="list-disc pl-4 space-y-2">
                <li>
                  <strong>Ratings (see legend):</strong> A comparative score
                  showing how a county’s projected losses or overall risk
                  compare to those of all other counties.
                </li>
                <li>
                  <strong>Projected Annual Loss:</strong> A county’s average
                  yearly economic losses (as a dollar range) from a specific
                  natural hazard in a future emissions scenario. Why the weird
                  dollar ranges? Because FEMA used a clustering algorithm to
                  group counties into risk tiers in the base National Risk
                  Index. The Future Risk Index uses the same risk “bins” so you
                  can compare today’s risk with future risk.
                </li>
                <li>
                  <strong>Projected Risk Rating:</strong> Like Projected Annual
                  Loss, but also includes social vulnerability and community
                  resilience, which adjust projected economic losses up or down.
                  This offers a more holistic view of risk. The Risk Rating is
                  based on economic projections but it is presented only as a
                  comparative rating, not a dollar amount, because future social
                  conditions are unpredictable and dollar estimates could be
                  misleading.
                </li>
                <li>
                  <strong>Hazard Multiplier:</strong> Shows change in expected
                  economic losses from a given hazard between today and a future
                  scenario. A multiplier of 4 means a county’s projected future
                  losses are 4x their current losses. Some high-risk areas have
                  low multipliers because their risk is already extreme. That’s
                  why California’s wildfire multipliers are lower than the
                  Midwest’s.
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-bold">Where’s the Data From?</p>
              <p className="text-sm">
                Input data come from NASA, NOAA, USDA, EPA, USGS, Applied
                Research Associates, and others. FEMA spent years selecting data
                sources and refining methodology.
              </p>
              <p className="text-sm">
                The Future Risk Index uses ICPP emissions scenarios:
                Representative Concentration Pathways (RCPs) or Shared
                Socioeconomic Pathways (SSPs), depending on the hazard. (We
                apologize for the acronyms).
              </p>
              <p className="text-sm">
                What’s not included: Future population growth, changing
                demographics, land use changes, adaptation. This tool shows how
                climate change will impact communities if all else is held the
                same.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-bold">What’s the Graph in the Corner?</p>
              <p className="text-sm">
                It shows{" "}
                <strong>
                  national projected economic loss or risk rating,
                </strong>{" "}
                depending on your filter.
              </p>
              <ul className="list-disc pl-4 space-y-2">
                <li>Upper line = Higher emissions scenario</li>
                <li>Lower line = Lower emissions scenario</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-bold">What Can I Do with This Information?</p>
              <p className="text-sm">
                People in mitigation, urban or community planning, emergency
                response, education, insurance, finance, research–you tell us.
                We’re excited to see where you go with this.
              </p>
              <p className="text-sm">
                For everyone else, here are some options:
              </p>
              <ul className="list-disc pl-4 space-y-2">
                <li>
                  <strong>Check risk before you move.</strong> A home that’s
                  safe now might not be in 20 years.
                </li>
                <li>
                  <strong>Be ready for high-risk hazards.</strong> Now that you
                  know which natural disasters are likely to do the most damage
                  in your area, make a plan. Know where you’ll go. Don’t forget
                  about pets and vulnerable friends and neighbors. See
                  ready.gov.
                </li>
                <li>
                  <strong>Homeowners, prep your house.</strong> Does the Future
                  Risk Index show stronger hurricanes? Reinforce the roof.
                  Rising wildfire risk? Clear vegetation.
                </li>
                <li>
                  <strong>Renters, talk to your landlord.</strong> Show them the
                  map. Ask what they’re doing about future risk.
                </li>
                <li>
                  <strong>Vote local.</strong> State and local governments
                  control building codes, disaster funding, and infrastructure.
                  Vote for people with climate plans.
                </li>
                <li>
                  <strong>Call out big polluters.</strong>Social media,
                  conversations, protests, wherever. Show people the map.
                  Emissions drive these numbers.
                </li>
                <li>
                  <strong>Join forces.</strong> Find a group working on climate
                  solutions. Go to a meeting. Volunteer. Share your knowledge
                  about future risk.
                </li>
                <li>
                  <strong>Cut emissions where you can.</strong> Climate change
                  is not an individual responsibility, but if you’re looking for
                  individual interventions, the most impactful (in order): Fly
                  less. Eat less beef and dairy. Buy less stuff.
                </li>
                <li>
                  <strong>Most importantly—do what you're good at.</strong>{" "}
                  Writers, write about climate. Data scientists and engineers,
                  rebuild a government tool. Tradespeople, talk about how
                  buildings and infrastructure will hold up in more extreme
                  weather. Whatever your skillset, use it.
                </li>
              </ul>
              <p className="text-sm font-bold">
                The risks on this map aren’t theoretical. They’re coming. Do
                something, even if it’s a small thing. Protect what you love.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Info;
