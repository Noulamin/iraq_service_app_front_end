"use client";

import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import InvoiceIcon from "@/components/icons/InvoiceIcon";
import GroupIcon from "@/components/icons/GroupIcon";
import IndividualIcons from "@/components/icons/IndividualIcons";
import GridsIcon from "@/components/icons/GridsIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import clsx from "clsx";
import BuildingIcon from "@/components/icons/BuildingIcon";
import { useMyInfo } from "@/utils/user-info/getUserInfo";
import { cn } from "@/utils/cn";
import ChevronDown from "@/components/icons/ChevronDown";
import * as consts from "@/consts";
import SignOutIcon from "../svg/SignOutIcon";
import AffiliateIcon from "../svg/AffiliateIcon";
import RocketIcon from "../svg/RocketIcon";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const Sidebar = useMemo(() => {
    if (
      pathname.startsWith("/clients/") &&
      !pathname.startsWith("/clients/new")
    ) {
      // return <ClientMenu />;
    } else if (
      pathname.startsWith("/employees/") &&
      !pathname.startsWith("/employees/new")
    ) {
      // return <EmployeeMenu />;
    } else {
      return <GlobalMenu />;
    }
  }, [pathname]);

  return (
    <aside
      ref={sidebar}
      className={`absolute bg-black left-0 top-0 z-9999 flex justify-center h-screen w-72.5 flex-col overflow-y-hidden duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      {/* <div className="mb-[150px] flex flex-col"> */}
      <div className="flex items-center justify-between mt-18">
        <a
          href="/dashboard"
          className="flex w-full flex-col justify-center items-center"
        >
          <Image
            width={50}
            height={50}
            src={"/images/logo/logo.ico"}
            alt="Logo"
          />
          <p className="py-4 text-[22px] text-white">
            <span className="font-bold"> App</span>
          </p>
        </a>
      </div>
      {Sidebar}
      {/* </div> */}
      <div className="absolute bottom-0 w-full flex justify-center">
        <button onClick={() => { window.open("https://wa.me/212681812440", "_blank") }} className="w-[70%] mb-7 rounded-md py-2 bg-[#1C2434] border-[2px] border-[#65A8F6] hover:bg-[#65A8F6] transition-all text-white">
          Need Help ?
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

type SidebarDropdownProps = {
  isDropdown: true;
  completeHref?: undefined;
  children: React.ReactNode;
  icon: React.ReactNode;
  getIsActive?: undefined;
  subItems: SidebarLinkProps[];
  permission?: Boolean;
};

type SidebarLinkProps =
  | {
    isDropdown?: false;
    completeHref: string;
    children: React.ReactNode;
    icon: React.ReactNode;
    getIsActive?: (pathname: string, completeHref: string) => boolean;
    permission?: Boolean;
  }
  | SidebarDropdownProps;

const SidebarLink: FunctionComponent<SidebarLinkProps> = ({
  completeHref,
  children,
  icon,
  getIsActive,
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={completeHref}
      className={clsx(
        "group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4",
        {
          "bg-graydark dark:bg-meta-4": getIsActive
            ? getIsActive(pathname, completeHref)
            : pathname.startsWith(completeHref),
        }
      )}
    >
      {icon}
      {children}
    </Link>
  );
};

const SidebarDropdown: FunctionComponent<SidebarDropdownProps> = ({
  completeHref,
  getIsActive,
  icon,
  children,
  subItems,
}) => {
  const pathname = usePathname();
  const inferOpen = useMemo(() => {
    return subItems.some((item) => {
      if (item.getIsActive) {
        return item.getIsActive(pathname, completeHref);
      } else {
        return pathname.startsWith(item.completeHref);
      }
    });
  }, [subItems, pathname]);
  const [isOpen, setIsOpen] = useState(inferOpen);

  return (
    <>
      <button
        className={clsx(
          "group relative w-full flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4",
          {
            "bg-graydark dark:bg-meta-4": inferOpen || isOpen,
          }
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {icon}
        {children}
        <ChevronDown
          className={cn("ml-auto text-white", {
            "transform rotate-180": isOpen,
          })}
        />
      </button>
      {isOpen && (
        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
          {subItems.map((item) => (
            <li key={item.completeHref}>
              <Link
                href={item.completeHref}
                className={cn(
                  "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white",
                  {
                    "text-white":
                      item.getIsActive?.(pathname, item.completeHref) ??
                      pathname.startsWith(item.completeHref),
                  }
                )}
              >
                {item.children}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

type SidebarMenuProps = {
  items: SidebarLinkProps[];
  title: string | React.ReactNode;
};

const SidebarMenu: FunctionComponent<SidebarMenuProps> = ({ items, title }) => {
  return (
    <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar h-full relative">
      {/* <!-- Sidebar Menu --> */}
      <nav className="px-4 py-4 mt-5 lg:mt-9 lg:px-6">
        {/* <!-- Menu Group --> */}
        <div>
          <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
            {title}
          </h3>

          <ul className="mb-6 flex flex-col gap-1.5">
            {/* <!-- Menu Item Dashboard --> */}
            {items.map(
              (item) =>
                // <SecureFragment
                //   permission={item.permission}
                //   key={item.completeHref}
                // >
                item.permission && (
                  <li key={item.completeHref}>
                    {item.isDropdown ? (
                      <SidebarDropdown {...item}>
                        {item.children}
                      </SidebarDropdown>
                    ) : (
                      <SidebarLink {...item}>{item.children}</SidebarLink>
                    )}
                  </li>
                )
              // </SecureFragment>
            )}
          </ul>
        </div>
      </nav>
      {/* <!-- Sidebar Menu --> */}

      {/* <div className="absolute bottom-7 w-full flex justify-center">
        <button className="w-[146px] h-[51px] text-sm border rounded-lg">
          Dear Admin,
          Thank you for using our beta platform,
        </button>
      </div> */}
    </div>
  );
};

const GlobalMenu: FunctionComponent = () => {
  const { data } = useMyInfo();

  if (data)
    return (
      <SidebarMenu
        items={[
          {
            completeHref: "/dashboard",
            icon: <GridsIcon />,
            children: "Tools & Apps",
            permission: true,
          },
          {
            completeHref: "/subscriptions",
            icon: <IndividualIcons width={18} height={18} />,
            children: "Subscriptions",
            permission: true,
          },
          {
            completeHref: "/plans",
            icon: <RocketIcon width={18} height={18} />,
            children: "Buy Plan",
            permission: true,
          },
          {
            completeHref: "/orders",
            icon: <InvoiceIcon className={"w-4.5 h-5"} />,
            children: "Orders",
            permission: true,
          },
          {
            completeHref: "/affiliate",
            icon: <AffiliateIcon className={"w-4.5 h-5"} />,
            children: "Affiliate",
            permission: true,
          },
          {
            completeHref: "/admin",
            icon: <BuildingIcon className={"w-4.5 h-5"} />,
            children: "Admin",
            permission: data?.userRole === "admin" ? true : false,
          },
          // {
          //   isDropdown: true,
          //   icon: <HeartIcon width={18} height={18} />,
          //   children: "Admin",
          //   subItems: [
          //     {
          //       completeHref: "/manage-tools",
          //       icon: <BuildingIcon className={"w-4.5 h-5"} />,
          //       children: "Tools",
          //     },
          //     {
          //       completeHref: "/contracts",
          //       icon: <InvoiceIcon className={"w-4.5 h-5"} />,
          //       children: "Contracten",
          //     },
          //   ],
          //   permission: consts.CARE_COORDINATION_VIEW,
          // },
          {
            completeHref: "/logout",
            icon: <SignOutIcon />,
            children: "Sign Out",
            permission: true,
          },
        ]}
        title={"MENU"}
      />
    );
};

// const ClientMenu: FunctionComponent = () => {
//   const { clientId } = useParams();

//   return (
//     <>
//       <ClientSidebarBriefing clientId={parseInt(clientId as string)} />
//       <SidebarMenu
//         items={[
//           {
//             completeHref: `/clients/${clientId}`,
//             icon: <IndividualIcons width={18} height={18} />,
//             children: "Overzicht",
//             permission: consts.CLIENT_VIEW,
//             getIsActive: (pathname) => {
//               return pathname === `/clients/${clientId}`;
//             },
//           },
//           {
//             completeHref: `/clients/${clientId}/medical-record`,
//             icon: <HeartIcon width={18} height={18} />,
//             children: "Medisch Dossier",
//             permission: consts.CLIENT_VIEW,
//             getIsActive: (pathname) => {
//               return (
//                 pathname.startsWith(`/clients/${clientId}/medical-record`) ||
//                 pathname.startsWith(`/clients/${clientId}/diagnosis`) ||
//                 pathname.startsWith(`/clients/${clientId}/medications`) ||
//                 pathname.startsWith(`/clients/${clientId}/allergies`) ||
//                 pathname.startsWith(`/clients/${clientId}/episodes`)
//               );
//             },
//           },
//           {
//             completeHref: `/clients/${clientId}/client-network`,
//             icon: <GroupIcon width={18} height={18} />,
//             children: "Cliëntennetwerk",
//             permission: consts.CLIENT_VIEW,
//             getIsActive: (pathname) => {
//               return (
//                 pathname.startsWith(`/clients/${clientId}/client-network`) ||
//                 pathname.startsWith(`/clients/${clientId}/emergency`) ||
//                 pathname.startsWith(`/clients/${clientId}/involved-employees`)
//               );
//             },
//           },
//           {
//             completeHref: `/clients/${clientId}/reports`,
//             icon: <ReportIcon height={18} width={18} />,
//             children: "Rapporten",
//             permission: consts.CLIENT_VIEW,
//           },
//           {
//             completeHref: `/clients/${clientId}/document`,
//             icon: <DocumentIcon height={18} width={18} />,
//             children: "Documenten",
//             permission: consts.CLIENT_VIEW,
//           },
//           {
//             completeHref: `/clients/${clientId}/goals`,
//             icon: <GoalIcon height={18} width={18} />,
//             children: "Doelen",
//             permission: consts.CLIENT_VIEW,
//           },
//         ]}
//         title={
//           <Link href={"/clients"} className="flex items-center">
//             <ArrowRight className="rotate-180" />
//             <span className="ml-2">TERUG NAAR CLIËNTENLIJST</span>
//             {/* BACK TO CLIENTS LIST */}
//           </Link>
//         }
//       />
//     </>
//   );
// };

// const EmployeeMenu: FunctionComponent = () => {
//   const { employeeId } = useParams();
//   return (
//     <SidebarMenu
//       items={[
//         {
//           completeHref: `/employees/${employeeId}`,
//           icon: <IndividualIcons width={18} height={18} />,
//           children: "Overzicht",
//           permission: consts.EMPLOYEE_VIEW,
//           getIsActive: (pathname) => {
//             return pathname === `/employees/${employeeId}`;
//           },
//         },
//         {
//           completeHref: `/employees/${employeeId}/certificates`,
//           icon: <CertifIcon width={18} height={18} />,
//           children: "Certificaten",
//           permission: consts.EMPLOYEE_VIEW,
//           getIsActive: (pathname) => {
//             return pathname.startsWith(`/employees/${employeeId}/certificates`);
//           },
//         },
//         {
//           completeHref: `/employees/${employeeId}/educations`,
//           icon: <EducationIcon width={18} height={18} />,
//           children: "Opleidingen",
//           permission: consts.EMPLOYEE_VIEW,
//           getIsActive: (pathname) => {
//             return pathname.startsWith(`/employees/${employeeId}/educations`);
//           },
//         },
//         {
//           completeHref: `/employees/${employeeId}/experiences`,
//           icon: <ExperienceIcon width={18} height={18} />,
//           children: "Ervaringen",
//           permission: consts.EMPLOYEE_VIEW,
//           getIsActive: (pathname) => {
//             return pathname.startsWith(`/employees/${employeeId}/experiences`);
//           },
//         },
//         {
//           completeHref: `/employees/${employeeId}/teams`,
//           icon: <RoleIcon width={18} height={18} />,
//           children: "Rollen",
//           permission: consts.ROLE_VIEW,
//           getIsActive: (pathname) => {
//             return pathname.startsWith(`/employees/${employeeId}/teams`);
//           },
//         },
//       ]}
//       title={
//         <Link href={"/employees"} className="flex items-center">
//           <ArrowRight className="rotate-180" />
//           <span className="ml-2">TERUG NAAR MEDEWERKERSLIJST</span>
//           {/* BACK TO EMPLOYEES LIST */}
//         </Link>
//       }
//     />
//   );
// };
