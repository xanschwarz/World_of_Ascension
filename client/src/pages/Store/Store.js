// Once the buttons are working, make it so once you buy an item the buy button changes to an upgrade button.

import React from 'react';
import ring from './ring.PNG';
import robe from './robe.png';

const Store = () => {
  let riches = 0;
  let ringTier = 0;
  let robeTier = 0;
  // const richesBtn = document.getElementById('addRiches');
  // const macguffinsBtn = document.getElementById('MacGuffins');
  // const buyRingBtn = document.getElementById('buyRing');
  // const upgradeRingBtn = document.getElementById('upgradeRing');
  // const buyRobeBtn = document.getElementById('buyRobe');
  // const upgradeRobeBtn = document.getElementById('upgradeRobe');

  function addCurrency() {
    riches += 100;
    document.getElementById('MacGuffins').innerHTML = riches;
    console.log('Your amount of currency is ' + riches);
  }

  function buyRing() {
    riches -= 100;
    document.getElementById('MacGuffins').innerHTML = riches;
    console.log('You bought a ring!');
  }

  function upgradeRing() {
    riches -= 10;
    ringTier += 1;
    document.getElementById('MacGuffins').innerHTML = riches;
    document.getElementById('ringTierDisplay').innerHTML = ringTier;
    console.log('You upgraded your ring! It is now tier ' + ringTier);
  }

  function buyRobe() {
    riches -= 200;
    document.getElementById('MacGuffins').innerHTML = riches;
    console.log('You bought a robe!');
  }

  function upgradeRobe() {
    riches -= 20;
    robeTier += 1;
    document.getElementById('MacGuffins').innerHTML = riches;
    document.getElementById('robeTierDisplay').innerHTML = robeTier;
    console.log('You upgraded your robe! It is now tier ' + robeTier);
  }

  return (
    <div className="bg-gray-900">
      <button
        type="button"
        id="addRiches"
        className="inline-flex items-center m-4 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => addCurrency()}
      >
        Endless riches!!!!
      </button>
      <div className="flex">
        <h4 className="text-white m-4">
          You have <span id="MacGuffins">{riches}</span> magic MacGuffins!
        </h4>
      </div>
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
              Buy and Upgrade Your Gear
            </h2>
          </div>
          <ul
            // role="list"
            className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8"
          >
            <li className="py-10 px-6 bg-gray-800 text-center rounded-lg xl:px-10 xl:text-left">
              <div className="space-y-6 xl:space-y-10">
                <img
                  className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
                  src={ring}
                  alt=""
                ></img>
                <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                  <div className="font-medium text-lg leading-6 space-y-1">
                    <button
                      type="button"
                      id="buyRing"
                      className="inline-flex items-center m-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => buyRing()}
                    >
                      Buy your ring for 100 magic MacGuffins!
                    </button>
                    <button
                      type="button"
                      id="upgradeRing"
                      className="inline-flex items-center m-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => upgradeRing()}
                    >
                      Upgrade your ring for 10 magic MacGuffins!
                    </button>
                    <h4 className="text-white m-4">
                      You ring is tier{' '}
                      <span id="ringTierDisplay">{ringTier}</span> now.
                    </h4>
                  </div>
                </div>
              </div>
            </li>
            <li className="py-10 px-6 bg-gray-800 text-center rounded-lg xl:px-10 xl:text-left">
              <div className="space-y-6 xl:space-y-10">
                <img
                  className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
                  src={robe}
                  alt=""
                ></img>
                <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                  <div className="font-medium text-lg leading-6 space-y-1">
                    <button
                      type="button"
                      id="buyRobe"
                      className="inline-flex items-center m-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => buyRobe()}
                    >
                      Buy your robe for 200 magic MacGuffins!
                    </button>
                    <button
                      type="button"
                      id="upgradeRobe"
                      className="inline-flex items-center m-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => upgradeRobe()}
                    >
                      Upgrade your robe for 20 magic MacGuffins!
                    </button>
                    <h4 className="text-white m-4">
                      You robe is tier{' '}
                      <span id="robeTierDisplay">{robeTier}</span> now.
                    </h4>
                  </div>
                </div>
              </div>
            </li>

            {/* More people... */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Store;
