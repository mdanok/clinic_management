import { getNextAuthSession } from "@/app/api/auth/[...nextauth]/route";
import { Form } from "@/components/Dashboard/Profile/Form";
export default async function Profile() {
  const session = await getNextAuthSession();
  const response = await fetch("http://localhost:3000/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ doctorId: session.user.id }),
  });
  const userData = await response.json();

  return (
    <div class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <h3 class="mb-4 text-xl font-semibold dark:text-white">
        Personal information
      </h3>
      <Form userData={userData} />
    </div>
  );
}
