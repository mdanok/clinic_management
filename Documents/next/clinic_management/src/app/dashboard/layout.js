import { Header } from "@/components/Dashboard/Header";
import { SideBar } from "@/components/Dashboard/Sidebar";
import { getNextAuthSession } from "../api/auth/[...nextauth]/route";
export const metadata = {
  title: "Profile",
  description: "User Profile",
};

export default async function DashboardLayout({ children }) {
  const session = await getNextAuthSession();
  return (
    <div>
      <Header session={session} />
      <SideBar />
      <main className="relative z-0 flex-1 p-4 ml-64 overflow-y-auto focus:outline-none max-sm:ml-0">
        {children}
      </main>
    </div>
  );
}
