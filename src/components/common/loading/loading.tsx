import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress sx={{ color: "#2dfd7d" }} />
    </Box>
  );
};

export default Loading;
