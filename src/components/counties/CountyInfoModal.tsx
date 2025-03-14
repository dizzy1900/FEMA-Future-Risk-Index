import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { Datasource, Hazard, Scenario } from "@/schema/risk";
import { useCountyStore } from "@/state/county";
import { useFiltersStore } from "@/state/filters";
import { Button } from "@/components/ui/button";

// interface CountyInfoModalProps {
//   selectedCounty: CountyProperties | undefined;
//   onClose: () => void;
// }

const getValueField = (
  scenario: Scenario,
  hazard: Hazard,
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

  return valueField;
};

const CountyInfoModal = () => {
  const { selectedCounty, setSelectedCounty } = useCountyStore();
  const { scenario, hazard, datasource } = useFiltersStore();

  if (!selectedCounty) {
    return <></>;
  }

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          setSelectedCounty(undefined);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedCounty.COUNTY}, {selectedCounty.STATEABBRV}
          </DialogTitle>

          {scenario !== Scenario.BASE && (
            <>
              <p className="font-bold pt-4">
                {hazard} - {scenario}
              </p>

              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      {scenario} Emissions Projected Annual Loss Rating ($)
                    </TableCell>
                    <TableCell>
                      {
                        (selectedCounty as any)?.[
                          `${getValueField(scenario, hazard, datasource)}_PALR`
                        ]
                      }
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium">
                      {scenario} Emissions Projected Risk Rating
                    </TableCell>
                    <TableCell>
                      {
                        (selectedCounty as any)?.[
                          `${getValueField(
                            scenario,
                            hazard,
                            datasource
                          )}_PRISKR`
                        ]
                      }
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium">
                      {scenario} Emissions Hazard Multiplier
                    </TableCell>
                    <TableCell>
                      {(selectedCounty as any)?.[
                        `${getValueField(scenario, hazard, datasource)}_HM`
                      ]
                        ? Number(
                            (selectedCounty as any)?.[
                              `${getValueField(
                                scenario,
                                hazard,
                                datasource
                              )}_HM`
                            ]
                          ).toFixed(2)
                        : "Not Applicable"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </>
          )}

          <p className="font-bold pt-4">Base NRI</p>

          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Expected Annual Loss Rating</TableCell>
                <TableCell>
                  {
                    (selectedCounty as any)?.[
                      `${
                        Object.entries(Hazard).find(
                          ([_, value]) => value === hazard
                        )?.[0]
                      }_EALR`
                    ]
                  }
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Risk Rating</TableCell>
                <TableCell>
                  {
                    (selectedCounty as any)?.[
                      `${
                        Object.entries(Hazard).find(
                          ([_, value]) => value === hazard
                        )?.[0]
                      }_RISKR`
                    ]
                  }
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Button className="mt-4">
            <a href="https://habitual-dresser-4c4.notion.site/1b66fd9b85ac80469619f664f9440b86">
              Get Notified When The Data Changes
            </a>
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CountyInfoModal;
