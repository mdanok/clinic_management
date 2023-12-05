import Link from "next/link";

import {
  CalendarIcon,
  HomeIcon,
  UsersIcon,
  UserPlusIcon,
  ChartBarIcon,
  ArchiveBoxIcon,
  ChartPieIcon,
  AdjustmentsVerticalIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid";
const ButtonItem = ({ href, Icon, title }) => {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        <Icon className="w-6 h-6 text-gray-500" />
        <span className="ml-3">{title}</span>
      </Link>
    </li>
  );
};

export const SideBar = () => {
  return (
    <aside className="fixed w-64 transition-transform -translate-x-full lg:h-5/6 sm:translate-x-0">
      <div className="h-full px-3 py-5 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <ul className="space-y-2">
          <ButtonItem href="#" Icon={HomeIcon} title="Home" />
          <ButtonItem href="#" Icon={CalendarIcon} title="Calendar" />
          <ButtonItem href="#" Icon={UsersIcon} title="Patients" />
          <ButtonItem href="#" Icon={UserPlusIcon} title="Add Patient" />
          <ButtonItem href="#" Icon={ChartBarIcon} title="Reports" />
          <ButtonItem href="#" Icon={ArchiveBoxIcon} title="Inventory" />
        </ul>
      </div>
      <div className="bottom-0 left-0 z-20 justify-center w-full p-4 space-x-4 bg-white border-r border-gray-200 lg:flex dark:bg-gray-800 dark:border-gray-700">
        <a
          href="#"
          className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <AdjustmentsVerticalIcon className="w-6 h-6" />
        </a>
        <a
          href="#"
          data-tooltip-target="tooltip-settings"
          className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <Cog8ToothIcon className="w-6 h-6" />
        </a>
      </div>
    </aside>
  );
};
