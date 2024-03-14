import { ExitToApp, Receipt } from "@material-ui/icons";
import AddIcon from "@mui/icons-material/Add";
import ConstructionIcon from '@mui/icons-material/Construction';
import ContactsIcon from "@mui/icons-material/Contacts";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import Edit from "@mui/icons-material/Edit";
import EngineeringIcon from '@mui/icons-material/Engineering';
import HomeIcon from "@mui/icons-material/Home";
import LightbulbCircleSharpIcon from "@mui/icons-material/LightbulbCircleSharp";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import PersonIcon from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import Watch from "@mui/icons-material/Watch";

export const SidebarData = [
  { icon: HomeIcon, heading: "Home", route: "/Home" },
  // { icon: DashboardIcon, heading: "Dashboard", route:"/MainDash" },
  { icon: AddIcon, heading: "New Request", route: "/requests/new" },
  { icon: ManageAccountsIcon, heading: "Request History", route: "/requesthistory" },
  { icon: ConstructionIcon, heading: "Alert History", route: "/alerthistory" },
  { icon: ContactsIcon, heading: "Add Tenant", route: "/tenants" },
  { icon: EngineeringIcon, heading: "Add Contractor", route: "/contractors" },
  { icon: PersonIcon, heading: "Profile", route: "/profile" },
  { icon: Receipt, heading: "Utility Billing", route: "/utility" },
  { icon: ExitToApp, heading: "Logout", route: "/login" }
];

export const SidebarData2 = [
  { title: "Health/Safety", barValue: 40, icon: DirectionsRunIcon },
  { title: "Resource Efficiency", barValue: 29, icon: LightbulbCircleSharpIcon },
  { title: "Service Check ", barValue: 88, icon: ManageAccountsIcon },
  { title: "Notification", barValue: 12, icon: NotificationImportantIcon },
];

export const ContractorData = [
  { icon: Edit, heading: "Create a Request", route: "/requests/new" },
  { icon: Watch, heading: "Alert Management", route: "/alerts/manage" },
  { icon: Settings, heading: "Request Management", route: "/requests/manage" },
];

export const SidebarData3 = [
  {
    address: "Address 1",
    office: "Office 1",
    data: [
      { title: "Health/Safety", barValue: 40, icon: DirectionsRunIcon },
      { title: "Resource Efficiency", barValue: 29, icon: LightbulbCircleSharpIcon },
      { title: "Service Check ", barValue: 88, icon: ManageAccountsIcon },
      { title: "Notification", barValue: 12, icon: NotificationImportantIcon },
    ]
  },
  {
    address: "Address 1",
    office: "Office 2",
    data: [
      { title: "Health/Safety", barValue: 35, icon: DirectionsRunIcon },
      { title: "Resource Efficiency", barValue: 39, icon: LightbulbCircleSharpIcon },
      { title: "Service Check ", barValue: 78, icon: ManageAccountsIcon },
      { title: "Notification", barValue: 22, icon: NotificationImportantIcon },
    ]
  },
  {
    address: "Address 2",
    office: "Office 1",
    data: [
      { title: "Health/Safety", barValue: 50, icon: DirectionsRunIcon },
      { title: "Resource Efficiency", barValue: 39, icon: LightbulbCircleSharpIcon },
      { title: "Service Check ", barValue: 68, icon: ManageAccountsIcon },
      { title: "Notification", barValue: 32, icon: NotificationImportantIcon },
    ]
  },
  {
    address: "Address 2",
    office: "Office 2",
    data: [
      { title: "Health/Safety", barValue: 45, icon: DirectionsRunIcon },
      { title: "Resource Efficiency", barValue: 49, icon: LightbulbCircleSharpIcon },
      { title: "Service Check ", barValue: 98, icon: ManageAccountsIcon },
      { title: "Notification", barValue: 42, icon: NotificationImportantIcon },
    ]
  },
];