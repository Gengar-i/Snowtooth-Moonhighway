import { useCallback } from "react";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { LiftsStatus } from "./Main";
import { LIFTS_STATUS } from "../helpers/helpers";

type FilterProps = {
  status: LiftsStatus;
  setStatus: React.Dispatch<React.SetStateAction<LiftsStatus>>;
};

const Filter = ({ status, setStatus }: FilterProps) => {
  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      setStatus(event.target.value as LiftsStatus);
    },
    [setStatus]
  );

  return (
    <FormControl className="sm-filter">
      <InputLabel id="lifts-status-input">Filter by Status</InputLabel>
      <Select
        labelId="lifts-status-input"
        id="lifts-status-select"
        value={status}
        label="Filter by Status"
        onChange={handleChange}
      >
        {Object.values(LIFTS_STATUS).map((statusValue) => (
          <MenuItem key={statusValue} value={statusValue}>
            {statusValue.toLowerCase()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Filter;
