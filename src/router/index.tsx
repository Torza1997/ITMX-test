import { Suspense, lazy, useMemo } from "react";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Loading from "../components/common/loading";
import RootComponent from "./root-component";
import MainLayout from "@/components/Layout/main-layout";
import AppBar from "@/components/Layout/app-bar";

const Router = () => {
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          element: <MainLayout />,
          children: [
            {
              path: "/",
              index: true,
              element: (
                <RootComponent
                  title="products"
                  header={<AppBar />}
                  loader={lazy(() => import("@/pages/product"))}
                ></RootComponent>
              ),
            },
            {
              path: "/product-management",
              element: (
                <RootComponent
                  title="product management"
                  header={<AppBar />}
                  loader={lazy(() => import("@/pages/product-management"))}
                ></RootComponent>
              ),
            },
          ],
        },
      ]),
    []
  );
  return (
    <Suspense fallback={<Loading />}>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </Suspense>
  );
};

export default Router;
