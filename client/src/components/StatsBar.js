import React, { useState } from "react";
import Auth from "../utils/auth";
import {  useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../utils/queries";

import {
  BeakerIcon,
  HeartIcon,
  ChevronDownIcon,
  ChipIcon,
  LightningBoltIcon,
  SparklesIcon,
} from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function StatsBar() {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME , {
    variables: { username: userParam },
    // pass URL parameter
  });
  if (loading) {
    return <div>Loading...</div>;
  }

  const statBarData = data?.me || {};

  console.log(data);
  return (
    <div className="lg:flex lg:items-center lg:justify-between bg-gray-800">
      <div className="flex-1 min-w-0">
        <h2 className="mt-2 text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
         {statBarData.username}
        </h2>
        <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-300">
            <BeakerIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />

           Arcana: {statBarData.arcana}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-300">
            <SparklesIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
            Essence:{statBarData.essence}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-300">
            <ChipIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
           Scale: {statBarData.scale}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-300">
            <HeartIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
            Health: {statBarData.health}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-300">
            <LightningBoltIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
            Power: {statBarData.attackPower}
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4"></div>
    </div>
  );
}
