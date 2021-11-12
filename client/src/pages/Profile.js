import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div className="min-h-full">
      <main className="py-10">
        {/* Page header */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div className="flex items-center space-x-5">
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  className="h-16 w-16 rounded-full"
                  src="https://bn1303files.storage.live.com/y4pojGWdD9FtSsPn-o0Erl5QgfQa-Gshceltbm68ztIpUGCbshdo3u9e7AhUXIp7sLAyDgi6HPpzXyOCAF8Ssy1tdpg7zRpoOKvbBJ2MKzBQ4KZByHe6NmEaqMH3fN-cxtwuDcW_LW2NJ75UqfrtZ1xGPIIQkZo9h6ayCJAvBR_Qq76N4cwGuTiZknr6mXrVio_qHLCmdrmTcJ85U0Ifb6mkebuCx5ETs6F2BH-opob92s/Male_18_R.png?psid=1&width=188&height=188&cropMode=center"
                  alt=""
                />
                <span
                  className="absolute inset-0 shadow-inner rounded-full"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Magius Maximus</h1>
            </div>
          </div>
          <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500" onClick={logout}
            >
              Log Out
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
