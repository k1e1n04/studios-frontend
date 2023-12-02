import { TextField } from "@mui/material";

type Props = {
  label: string;
  searchTarget: string;
  setSearchTarget: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchTextField: React.FC<Props> = ({
  label,
  searchTarget,
  setSearchTarget,
}) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      value={searchTarget}
      onChange={(e) => setSearchTarget(e.target.value)}
      sx={{ width: "100%", backgroundColor: "#fff" }}
      InputProps={{
        sx: {
          height: "40px",
        },
      }}
      InputLabelProps={{
        sx: {
          fontSize: "0.6rem",
        },
      }}
    />
  );
};
