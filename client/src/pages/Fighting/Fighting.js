import React from 'react';
import BossBattle from './BossBattle';
import { Link } from 'react-router-dom';
import MinionBattle from './MinionBattle';
import {
  BeakerIcon,
  HeartIcon,
  ChevronDownIcon,
  ChipIcon,
  LightningBoltIcon,
  SparklesIcon,
} from '@heroicons/react/solid';
import Auth from '../../utils/auth';
import ModalContainer from '../../components/Modal/ModalContainer';

/* This example requires Tailwind CSS v2.0+ */
const enemies = [
  {
    name: 'Pyro',
    pathName: 'BossBattle',
    link: 'Battle Boss',
    icon: (
      <SparklesIcon
        className=" ml-2 justify-center h-5 w-5 text-gray-500"
        aria-hidden="true"
      />
    ),
    imageUrl:
      'https://bn1303files.storage.live.com/y4mxeAMRBLm8sIvOgs7s6oWJ0zml7dFL4eJQG2jRhxdswUihA1Ame46qR58SC4GKWghq9HA5zGz1eVZY_tS9bw5I4rztRPyUyIVALVt7ptZzvO06CmTA98-DmWCtfOxVFRW1cRVM-6oX2YTBcg2PcChw7OHfm9sSCIQOGOPMMrz9HXGGVx5YcaxlDywUxZ01hsAslsETGpp_yYEWOsWyo4b1A/SpellBook03_64.png?psid=1&width=256&height=256&cropMode=center',
  },
  {
    name: "Pyro's Hatchlings ",
    pathName: 'MinionBattle',
    link: 'Battle Minnions',
    icon: (
      <ChipIcon
        className=" ml-2 justify-center h-5 w-5 text-gray-500"
        aria-hidden="true"
      />
    ),
    imageUrl:
      'https://bn1303files.storage.live.com/y4mbYENwrUcn-6FQDA5igqNOixmNCG3sjVSRWV24I0c_zD6ORnaOL3s3X7b4hg7-kKQwV76s4c85PObcRDCWhhqq73VjDMkXghzVszkXABYQnU17apgTyphn7PwJlG6mbORxvEwa8aWrdvNTjv0-QA_e1wMATtTi-1hFZHWJx4wF4DdshvazJAmZ-JEtX0EK3Kild4b465b2quiJqVMTJ5D8g/SpellBook03_20.png?psid=1&width=256&height=256&cropMode=center',
  },
];

export default function Fighting() {
  return (
    <div>
      {Auth.loggedIn() ? (
        <div className="bg-gray-900">
          <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
            <div className="space-y-12">
              <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
                <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  Prove Your Worth
                </h2>
                <p className="text-xl text-gray-300">
                  Battle against the minions and bosses to prove your worth.
                </p>
              </div>
              <ul
                role="list"
                className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8"
              >
                {enemies.map((enemy) => (
                  <li
                    key={enemy.name}
                    className="py-10 px-6 bg-gray-800 text-center rounded-lg xl:px-10 xl:text-left"
                  >
                    <div className="space-y-6 xl:space-y-10">
                      <img
                        className="mx-auto h-40 w-40 rounded border-4 border-black xl:w-56 xl:h-56"
                        src={enemy.imageUrl}
                        alt=""
                      />
                      <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                        <div className="font-medium text-lg leading-6 space-y-1">
                          <h3 className="text-white">{enemy.name}</h3>
                          <p className="text-indigo-400 flex justify-center">
                            Rewards 1 {enemy.icon}{' '}
                          </p>
                          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-900 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <Link to={`/${enemy.pathName}`}>{enemy.link}</Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <ModalContainer />
        </div>
      )}
    </div>
  );
}
