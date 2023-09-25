import {
  createContext,
  FunctionComponent,
  LazyExoticComponent,
  ReactNode,
  Suspense,
} from "react";
import { Helmet } from "react-helmet-async";
import Loading from "../components/common/loading";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

interface LazyComponentProps {
  loader:
    | LazyExoticComponent<(() => JSX.Element) | FunctionComponent<any>>
    | FunctionComponent<any>;
  title?: string;
  header?: ReactNode;
}

export const RootCompContext = createContext({ title: "" });

const RootComponent = ({
  loader: ElementLoader,
  title = "ITMX test",
  header: Header,
}: LazyComponentProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <RootCompContext.Provider value={{ title }}>
        {Header}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              maxWidth: "1980px",
              paddingY: 10,
              paddingX: { xs: 3, md: 10 },
            }}
          >
            <ElementLoader />
            <Outlet />
          </Box>
        </Box>
      </RootCompContext.Provider>
    </Suspense>
  );
};

export default RootComponent;
