import { Outlet } from "react-router-dom";

const RouteGaurd = ({ requireAuth }) => {
    console.log(requireAuth);
    return <Outlet />;
};

export default RouteGaurd;
