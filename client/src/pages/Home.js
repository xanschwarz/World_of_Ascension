import React from "react";
// import { useQuery } from '@apollo/client';

// import NavBar from '../components/NavBar.js';
// import StatsBar from '../components/StatsBar.js';
// import GameContainer from '../components/GameContainer.js';

// import { QUERY_THOUGHTS } from '../utils/queries';
/* This example requires Tailwind CSS v2.0+ */
import {
  HandIcon,
  SparklesIcon,
  BeakerIcon,
  ShoppingCartIcon,
  FireIcon,
  ChipIcon,
} from "@heroicons/react/outline";

const features = [
  {
    name: "Gathering",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: HandIcon,
  },
  {
    name: "Battle",
    description:
      "Lorem ipsum, sdfdolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: FireIcon,
  },
  {
    name: "Gear Shop",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: ShoppingCartIcon,
    title: "Currency",
  },
];
const currencies = [
  {
    name: "Arcana",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: BeakerIcon,
  },
  {
    name: "Essence",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: SparklesIcon,
  },
  {
    name: "Gobbldeygook",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: ChipIcon,
  },
];

const Home = () => {
  // const { loading, data } = useQuery(QUERY_THOUGHTS);
  // const thoughts = data?.thoughts || [];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Welcome to the World of Ascension
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
        </div>

        <div className="py-12 bg-white">
          <p className="flex items-center justify-center mb-10 mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Stuff to do
          </p>
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only"></h2>
            <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
              {features.map((feature) => (
                <div key={feature.name}>
                  <dt>
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="mt-5 text-lg leading-6 font-medium text-gray-900">
                      {feature.name}
                    </p>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    {feature.description}
                  </dd>
                  {features.title}
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="py-12 bg-white">
          <p className="flex items-center justify-center mb-10 mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Currencies
          </p>
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only"></h2>
            <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
              {currencies.map((currency) => (
                <div key={currency.name}>
                  <dt>
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <currency.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="mt-5 text-lg leading-6 font-medium text-gray-900">
                      {currency.name}
                    </p>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    {currency.description}
                  </dd>
                  {currencies.title}
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;