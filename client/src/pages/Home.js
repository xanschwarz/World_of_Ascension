import React from "react";
// import { useQuery } from '@apollo/client';

// import NavBar from '../components/NavBar.js';
// import StatsBar from '../components/StatsBar.js';
// import GameContainer from '../components/GameContainer.js';


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
      "Gathering Arcana is just a matter of time—and patience. The World of Ascension is shrouded with unknown particles called Arcana. No one knows exactly what it is, but it is highly sought after by the inhabitants of our world.",
    icon: HandIcon,
  },
  {
    name: "Battle",
    description:
      "The Acscension realm is guarded by Pyro, a fire breathing dragon, and his hatchlings. Slay Pyro's hatchlings to obtain dragon scales and prove yourself to those you meet.",
    icon: FireIcon,
  },
  {
    name: "The Darth Trader",
    description:
      "The mysterious Darth Trader is a travelling merchant from an unknown land, who appears every two months in the Southwest section of the World of Ascension. He has a small stock of rings and cloaks that sell for astronomic prices. It is in your best interest to collect valuable reagents throughout the realm to upgrade your gear.",
    icon: ShoppingCartIcon,
    title: "Currency",
  },
];
const currencies = [
  {
    name: "Arcana",
    description:
      "Arcana appears to be a type of energy, similar to electricity. Some theorize that it's a type of energy from another dimension. It has been shown to have a lot of different, unique properties. Gather Arcana to barter with vendors, upgrade your gear, and increase your attack power!",
    icon: BeakerIcon,
  },
  {
    name: "Essence",
    description:
      "Essence is an extraordinarily rare element containing high concentrations of magical energy. The only way to obtain this element is by slaying a powerful enemy. The use of Essence in the World of Ascension is so fundamental that inhabitants will trade nearly anything to acquire it.",
    icon: SparklesIcon,
  },
  {
    name: "Scales",
    description:
      "The creatures of the Ascension realm grow scales as they mature. Slay dragon whelps to obtain scales and prove yourself to those you meet.",
    icon: ChipIcon,
  },
];

const Home = () => {
 
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