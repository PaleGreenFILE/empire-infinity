"use client";
export default function NotFound() {
  return (
    <div className="text-center text-xl text-white p-20 mt-40">
      <div className="h-100 flex items-center pb-4 scroll-auto">
        <div className="mx-auto">
          <div className="flex flex-column flex-nowrap  items-center w-full">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/empire-infinity.appspot.com/o/t%C3%A9l%C3%A9chargement.svg?alt=media"
              alt="Oops, something went wrong"
              className="p-1 mb-1"
            />
            <h2 className="font-bold">Oops, something went wrong</h2>
            <span>There was a problem connecting to Empire-Infinity.</span>
            <span>
              Please{" "}
              <button type="button" className="link align-baseline text-left">
                refresh the page
              </button>{" "}
              or check your connection.
            </span>
            <div className="mt-1 p-0-5">
              Error: Servers are unreachable. Please try again in a few minutes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
