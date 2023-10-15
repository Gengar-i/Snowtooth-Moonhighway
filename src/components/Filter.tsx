import { useMemo, useCallback } from "react";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { LiftsStatus } from "./Main";
import { LiftStatus } from "./Card";
import { LIFT_STATUS, LIFTS_STATUS } from "../helpers";

type FilterProps = {
  status: LiftStatus | LiftsStatus;
  setStatus:
    | React.Dispatch<React.SetStateAction<LiftStatus>>
    | React.Dispatch<React.SetStateAction<LiftsStatus>>;
  withAll?: boolean;
};

const Filter = ({ status, setStatus, withAll = false }: FilterProps) => {
  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      setStatus(event.target.value as LiftStatus);
    },
    [setStatus]
  );
  const label: string = useMemo(() => {
    return withAll ? "Filter by Status" : "Change Status";
  }, [withAll]);

  return (
    <FormControl className="sw-filter">
      <InputLabel id="status-input">{label}</InputLabel>
      <Select
        labelId="status-input"
        id="status-select"
        value={status}
        label={label}
        onChange={handleChange}
      >
        {Object.values(withAll ? LIFTS_STATUS : LIFT_STATUS).map(
          (statusValue) => (
            <MenuItem key={statusValue} value={statusValue}>
              {statusValue.toLowerCase()}
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
};

export default Filter;
