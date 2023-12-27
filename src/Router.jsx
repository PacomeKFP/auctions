import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
const DashboardScreen = lazy(() => import("./screens/Dashboard"));
const HistoryScreen = lazy(() => import("./screens/History"));
const CreateAuctionScreen = lazy(() => import("./screens/CreateAuction"));
const ConfirmParticipationScreen = lazy(() =>
  import("./screens/ConfirmParticipation")
);
const AuctionScreen = lazy(() => import("./screens/AuctionScreen"));

export default function AppRouter() {
  const JSXRoutes = (
    <Route path="/" element={<Outlet />}>
      {/* Tableau de bord pour avoi un recap des encheres liées à l'utilisateur*/}
      <Route path="/" element={<DashboardScreen />} />

      {/* interface pour faire des encheres */}
      <Route path="/bid/:auctionCode" element={<AuctionScreen />} />{" "}
      
      {/* interface pour voir la retrospective d'une enchere*/}
      <Route path="/history/:auctionCode" element={<HistoryScreen />} />{" "}
      
      {/* interface pour creer une nouvelle enchere */}
      <Route path="/new" element={<CreateAuctionScreen />} />{" "}
      
      {/* interface pour confirmer sa participation à une enchere */}
      <Route
        path="/confirm/:auctionCode"
        element={<ConfirmParticipationScreen />}
      />
      
      {/* interface pour 404 page Not found*/}
      <Route path="*" element={<NotFound />} />
    </Route>
  );

  const routes = createRoutesFromElements(JSXRoutes);
  const router = createBrowserRouter(routes);

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  );
}

function NotFound() {
  return <div>404 | Page not Found</div>;
}
function Loading() {
  return <div>Loading...</div>;
}
