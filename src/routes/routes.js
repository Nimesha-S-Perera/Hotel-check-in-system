import Checkin from "../Components/BookingComponent/Checkin";
import Login from "../Components/LoginComponent/Login";
import Forbidden from "../Components/ErrorStatus/Forbidden";
import User from "../Components/UserComponent/User";
import Rooms from "../Components/Roomcomponent/Rooms";
import SuiteTable from "../Components/SuiteComponent/SuiteTable";

const authRoutes = [
  { url: "/checkin", widget: Checkin },
  { url: "/user", widget: User },
  { url: "/rooms", widget: Rooms },
  { url: "/suites", widget: SuiteTable },
];

const guestRoutes = [
  { url: "/", widget: Login },
  { url: "403", widget: Forbidden },
];

export { authRoutes, guestRoutes };
