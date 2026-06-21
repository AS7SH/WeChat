import { Routes, Route } from "react-router-dom";
import { authRoutePaths, protectedRoutePaths } from "./routes";
import AppLayout from "@/layouts/AppLayout";
import BaseLayout from "@/layouts/BaseLayout";
import RouteGaurd from "./RouteGaurd";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<RouteGaurd requireAuth={false} />}>
                <Route element={<BaseLayout />}>
                    {authRoutePaths?.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Route>
            </Route>
            <Route path="/" element={<RouteGaurd requireAuth={true} />}>
                <Route element={<AppLayout />}>
                    {protectedRoutePaths?.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
