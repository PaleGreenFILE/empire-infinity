// noinspection Annotator,HtmlUnknownTarget,JSUnusedGlobalSymbols

"use client";
import Link from "next/link";
import { logOut } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useNotification } from "@/components/Toast";

function DashBoard() {
  const router = useRouter();
  const notify = useNotification();

  const handleLogout = async () => {
    try {
      await logOut(router, notify);
      console.log("Vous avez bien été déconnecter");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex max-w-7xl mx-auto p-10 items-center justify-center">
      <div className="flex flex-col items-center justify-center"></div>
      <div className="p-10">
        <Link href="en/dashboard/refferal">
          <button className="bg-[rgb(3,161,126)] text-white p-2 cursor-pointer h-10 mt-12 rounded-lg shadow-black shadow-lg">
            Go to Referral Page
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="bg-[rgb(3,161,126)] text-white p-2 mx-10 cursor-pointer h-10 mt-12 rounded-lg shadow-black shadow-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default DashBoard;
