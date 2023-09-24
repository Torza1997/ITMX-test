import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Box
      bgcolor="#E5EDF5"
      minHeight="100vh"
      minWidth="100vw"
      sx={{
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      <Outlet />
    </Box>
  );
};

export default MainLayout;
