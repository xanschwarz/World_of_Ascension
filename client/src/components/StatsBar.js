import React, { useState } from "react";
import Auth from "../utils/auth";
import { Redirect, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_MAGE_ATTRIBUTES, QUERY_ME, QUERY_USER } from "../utils/queries";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Fragment } from "react";
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
  const { data } = useQuery(QUERY_ME, {
    // pass URL parameter
    variables: { username: userParam },
  });
  
  // const { data } = useQuery(userParam ? QUERY_USER : QUERY_MAGE_ATTRIBUTES, {
  //   variables: { username: userParam },
  // });
  console.log(data);
  return (
    <div className="lg:flex lg:items-center lg:justify-between bg-gray-800">
      <div className="flex-1 min-w-0">
        <h2 className="mt-2 text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
          {/* <div>
        {Auth.getProfile().data.username}
        </div> */}
        </h2>
        <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-300">
            <BeakerIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />

            {/* Arcana: {data.me.arcana} */}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-300">
            <SparklesIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
            {/* Essence:{data.me.essence} */}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-300">
            <ChipIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
            {/* Scale: {data.me.scale} */}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-300">
            <HeartIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
            {/* Health: {data.me.health} */}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-300">
            <LightningBoltIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
            {/* Power: {data.me.attackPower} */}
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4"></div>
    </div>
  );
}
