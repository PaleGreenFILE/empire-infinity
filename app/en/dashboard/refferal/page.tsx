"use client";
import { useEffect, useState } from "react";
import { getAuth } from "@firebase/auth";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User } from "@/types";
function ReferralPage() {
  const [affiliates, setAffiliates] = useState<User[]>([]);
  const [refId, setMyRefId] = useState<User | null>(null);
  const [dataUserCurrent, setDataCurrentUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const auth = getAuth();
  const userRefId = auth.currentUser?.uid;

  const handleRefresh = async () => {
    const docRef = doc(db, "users", `${userRefId}`);
    await getDoc(docRef).then(async (docSnapshot) => {
      try {
        if (docSnapshot.exists()) {
          const data: User = docSnapshot.data() as User;
          setDataCurrentUser(data);
          // @ts-ignore
          setMyRefId(data.refId);
          //console.log(docSnapshot.id, " => ", docSnapshot.data());
          //console.log("documents: ", data.refId);
          if (dataUserCurrent?.refId) {
            const myFilleuls = query(
              collection(db, "users"),
              where("refBy", "==", refId)
            );
            await getDocs(myFilleuls).then((querySnapshot: any) => {
              if (querySnapshot.empty) {
                console.log("No matching documents.");
                return;
              } else {
                querySnapshot.forEach((doc: any) => {
                  const affiliateData = querySnapshot.docs.map((doc: any) =>
                    doc.data()
                  );
                  setAffiliates(affiliateData);
                  console.log("filleul trouve", affiliateData);
                  console.log(doc.id, " => ", doc.data());
                });
              }
            });
            console.log("refId", refId);
            console.log("myFilleul", myFilleuls);
          }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (err) {
        console.log("Error getting documents: ", error);
      }
    });
  };

  useEffect(() => {
    handleRefresh().then((r) => r);
  }, []);

  return (
    <div className="flex p-10 items-center justify-center bg-[rgb(16,18,19)] h-screen relative w-full mx-auto max-w-7xl  ">
      <div className="flex absolute border-b-cyan-600 flex-col shadow shadow-black bg-[rgb(28,31,34)] md:inline-flex text-center items-center justify-center text-white text-lg">
        <div className={"bg-[rgb(28,31,34)]  border border-black "}>
          <div className={"mt-5"}>
            <h1>
              Welcome{" "}
              <span className={"text-[rgb(3,161,156)]"}>
                {dataUserCurrent?.firstName}
              </span>{" "}
              to your Dashboard Affilliate
            </h1>
          </div>
          <div
            className={
              "flex w-full py-10 space-x-10 items-center justify-center "
            }
          >
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <span className={"flex font-semibold text-lg"}>
              {" "}
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Your Referral Link :
            </span>
            <span className={"flex  "}>Level : {dataUserCurrent?.level}</span>
            <span className={"flex "}>ID : {dataUserCurrent?.refId}</span>
            <span className={"flex "}>
              Country : {dataUserCurrent?.country}
            </span>
          </div>
          <div className={"flex flex-col px-5 w-full"}>
            <input
              className={
                "flex flex-col  p-2 text-center text-sm mx-auto items-center justify-center text-gray-900 border border-gray-300 rounded-lg w-full  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }
              value={`${dataUserCurrent?.linkReferrer}`}
            />
          </div>

          <div className="relative max-w-7xl mx-auto overflow-x-auto mt-20 shadow-xl shadow sm:rounded-lg">
            <div className="flex items-center justify-center  pb-4 md:inline-flex">
              <div className="flex items-center justify-center ">
                <div className="flex items-center justify-center mx-10">
                  <button
                    id="dropdownRadioButton"
                    data-dropdown-toggle="dropdownRadio"
                    className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-gray-400"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Last 30 days
                    <svg
                      className="w-3 h-3 ml-2"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                  <div
                    id="dropdownRadio"
                    className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute"
                    data-popper-reference-hidden=""
                    data-popper-escaped=""
                    data-popper-placement="top"
                  >
                    <ul
                      className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownRadioButton"
                    >
                      <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input
                            id="filter-radio-example-1"
                            type="radio"
                            value=""
                            name="filter-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="filter-radio-example-1"
                            className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                          >
                            Last day
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input
                            defaultChecked={false}
                            id="filter-radio-example-2"
                            type="radio"
                            value=""
                            name="filter-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="filter-radio-example-2"
                            className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                          >
                            Last 7 days
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input
                            id="filter-radio-example-3"
                            type="radio"
                            value=""
                            name="filter-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="filter-radio-example-3"
                            className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                          >
                            Last 30 days
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input
                            id="filter-radio-example-4"
                            type="radio"
                            value=""
                            name="filter-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="filter-radio-example-4"
                            className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                          >
                            Last month
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input
                            id="filter-radio-example-5"
                            type="radio"
                            value=""
                            name="filter-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="filter-radio-example-5"
                            className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                          >
                            Last year
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <button
                  onClick={handleRefresh}
                  className="bg-[rgb(40,48,56)] text-sm mx-10 rounded-lg border-[rgb(3,161,126)] border-2 text-[rgb(3,161,126)] px-5 py-2 transform hover:scale-105"
                >
                  Refresh
                </button>
                <label htmlFor="table-search" className="sr-only">
                  Search
                </label>
              </div>
              <div className=" relative max-w-7xl max-h-20">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for items"
                />
              </div>
            </div>
            {affiliates.length > 0 ? (
              <table className="text-sm text-left text-gray-500 dark:text-white ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[rgb(40,48,56)] dark:text-white">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all-search"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-black rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-all-search"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Level
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Country
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Referral ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Commission Rate
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Register At
                    </th>
                  </tr>
                </thead>

                <tbody
                  className={"max-w-7xl mx-auto items-center justify-center"}
                >
                  {affiliates.map((affiliate: any) => (
                    <tr
                      key={affiliate.id}
                      className="bg-black max-w-7xl mx-48 items-center justify-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="checkbox-table-search-1"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>

                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {affiliate.firstName}
                      </th>
                      <td className="px-6 py-4">{affiliate.email}</td>
                      <td className="px-6 py-4">+{affiliate.phone}</td>
                      <td className="px-6 py-4">{affiliate.level}</td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {affiliate.country}
                      </th>

                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {affiliate.refId}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        10%
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {new Intl.DateTimeFormat("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                        }).format(affiliate.createdAt)}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="max-w-7xl mx-auto animate-pulse text-center items-center justify-center text-white text-2xl p-40">
                No affiliates found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReferralPage;
