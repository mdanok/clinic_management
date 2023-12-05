import {
  CalendarIcon,
  UsersIcon,
  UserPlusIcon,
  ChartBarIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import { Header } from "@/components/Dashboard/Header";
import { SideBar } from "@/components/Dashboard/Sidebar";
import { Stats } from "@/components/Dashboard/Stats";
import { getNextAuthSession } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getNextAuthSession();
  if (!session) {
    redirect("/");
  }
  return (
    <div>
      <div className="flex flex-col">
        {/*<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Stats
              title="Daily Appointments"
              Icon={CalendarIcon}
              text="15"
              sub="+2 from yesterday"
            />
            <Stats
              title="Patient Demographics"
              Icon={UsersIcon}
              text="60% Female"
              sub="+10% from last month"
            />
            <Stats
              title="Inventory Status"
              Icon={UserPlusIcon}
              text="95% On-Time"
              sub="+5% from last month"
            />
            <Stats
              title="Staff Performance"
              Icon={ArchiveBoxIcon}
              text="20 Items Low"
              sub="-5 since last week"
            />
          </div>
  </main>*/}
      </div>
    </div>
  );
}
