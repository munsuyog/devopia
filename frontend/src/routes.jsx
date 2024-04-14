import React from "react";

import { Icon, layout } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdFamilyRestroom,
  MdPieChart,
  MdAccountCircle,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import FamilyDashboard from "views/admin/family";
import AddMembers from "views/admin/addMembers";
import NFTMarketplace from "views/admin/marketplace";
import DataTables from "views/admin/dataTables";
import RiskManagement from "views/admin/riskManagement"
import RiskAssessment from "views/admin/riskAssessment"
// import ChatBot from "views/admin/chatBot/Index"
// Auth Imports
import SignInCentered from "views/auth/signIn";
import SignUpCentered from "views/auth/signup";
import { AddIcon } from "@chakra-ui/icons";
import LinkPlaid from "components/linkPlaid/LinkPlaid";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Link Account",
    layout: "/admin",
    path: "/link",
    icon: <Icon as={MdAccountCircle} width='20px' height='20px' color='inherit' />,
    component: LinkPlaid
  },
  {
    name: "Family Dashboard",
    layout: "/admin",
    path: "/family",
    icon: <Icon as={MdFamilyRestroom} width='20px' height='20px' color='inherit' />,
    component: FamilyDashboard,
  },
  {
    name: "Add Family Members",
    layout: "/admin",
    path: "/addMembers",
    icon: <Icon as={AddIcon} width='20px' height='20px' color='inherit' />,
    component: AddMembers,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "/nft-marketplace",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
  },
  // {
  //   name: "Risk Management",
  //   layout: "/admin",
  //   path: "/riskManagement",
  //   icon: <Icon as={MdPieChart} width='20px' height='20px' color='inherit' />,
  //   component: RiskManagement,
  // },
  {
    name: "Risk Assessment",
    layout: "/admin",
    path: "/riskAssessment",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    component: RiskAssessment,
  },
  // {
  //   name: "ChatBot",
  //   layout: "/auth",
  //   path: "/chatBot",
  //   icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
  //   component: ChatBot,
  // },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "/sign-up",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignUpCentered
  }
];

export default routes;
