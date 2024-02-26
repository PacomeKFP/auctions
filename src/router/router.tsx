import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { CenteredContentLoader } from "../components/common/ContentLoaderTemplates";
import { auctionScreenLoader, confirmParticipationScreenLoader, dashboardScreenDataLoader, historyLoader } from "./loaders";
const DashboardScreen = lazy(() => import("../screens/dashboard/Dashboard"));
const HistoryScreen = lazy(() => import("../screens/history/History"));
const CreateAuctionScreen = lazy(() => import("../screens/create/CreateAuction"));
const ConfirmParticipationScreen = lazy(() =>
  import("../screens/confirmParticipation/ConfirmParticipation")
);
const AuctionScreen = lazy(() => import("../screens/auction/AuctionScreen"));

export default function AppRouter() {
  const JSXRoutes = (
    <Route path="/" element={<Outlet />}>
      {/* Tableau de bord pour avoi un recap des encheres liées à l'utilisateur*/}
      <Route loader={dashboardScreenDataLoader} path="/" element={<DashboardScreen />} />

      {/* interface pour faire des encheres */}
      <Route loader={auctionScreenLoader} path="/bid/:auctionCode" element={<AuctionScreen />} />{" "}

      {/* interface pour voir la retrospective d'une enchere*/}
      <Route loader={historyLoader} path="/history/:auctionCode" element={<HistoryScreen />} />{" "}

      {/* interface pour creer une nouvelle enchere */}
      <Route path="/new" element={<CreateAuctionScreen />} />{" "}

      {/* interface pour confirmer sa participation à une enchere */}
      <Route
        path="/confirm/:auctionCode/:userId"
        loader={confirmParticipationScreenLoader}
        element={<ConfirmParticipationScreen />}
      />

      {/* interface pour 404 page Not found*/}
      <Route path="*" element={<NotFound />} />
    </Route>
  );

  const routes = createRoutesFromElements(JSXRoutes);
  const router = createBrowserRouter(routes);

  return (
    <Suspense fallback={<CenteredContentLoader />}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  );
}

function NotFound() {
  return <div>404 | Page not Found</div>;
}

