// Style disabled buttons to be more obvious. Maybe an actual call out that they already own that. Match styling of buttons elsewhere in app?
// Need a button to generate currencies to spend.
// Also make sure can't spend more than you have.

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Auth from '../../utils/auth';
import ModalContainer from '../../components/Modal/ModalContainer';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import {
  ADD_ARCANA,
  ADD_ESSENCE,
  ADD_SCALE,
  SUBTRACT_ARCANA,
  SUBTRACT_ESSENCE,
  SUBTRACT_SCALE,
  UPGRADE_RING_TIER,
  RESET_RING_TIER,
  UPGRADE_CLOAK_TIER,
  RESET_CLOAK_TIER,
} from '../../utils/mutations';

const ring = [
  {
    title: 'Tier 1 Ring',
    src: 'https://bn1303files.storage.live.com/y4mW_O9K00YJzIbF-y8GckCr7qpnqZ6-TlPWhfXNDX1pWrpEcNkEI1jiMdTq1gTeg8mmZWFgmezdGVnV4tyJiMk-0ojBNSYOSx9_SyKxqbMWMqdHLezvj1DO0NlRMEjKFDjS2gHElyD3iQReigcPbeZuyz5qMSSfuklfVBnjYgHiFBEjiRWjDuQA4Yubs5AP0753zYdEBYaREhn08zQNXRt4Q/10_t.PNG?psid=1&width=175&height=175&cropMode=center',
    tierCheck: 0,
    htmlId: 'buyRing1',
    cost: [2, 0, 2],
    costText: '2 Arcana and 2 Scales',
  },
  {
    title: 'Tier 2 Ring',
    src: 'https://bn1303files.storage.live.com/y4m_-cwHk39j7JYzYc8ma1mUhLw3MboUUwGEh0FJ5MHf1WSVGXcIFOa3-asJFtom5QYtW6fLNlX1GOx4px22WCvtDwz6fc7I-_Aj2FrrVqBJNxF2PeESK7vfF-GB5rvfc3JZbnN4VM0eVcHQTX5nEHsNUBeVHts_4bwXSn0wG6_FE3WQgMxzBvlKtKDW11XQu5MScd1b2WViTmfvSi8QkeP8w/77_t.PNG?psid=1&width=256&height=256&cropMode=center',
    tierCheck: 1,
    htmlId: 'buyRing2',
    cost: [4, 2, 4],
    costText: '4 Arcana, 4 Scales, and 2 Essence',
  },
];

const cloak = [
  {
    title: 'Tier 1 Cloak',
    src: 'https://bn1303files.storage.live.com/y4m7NkuUdV2Afgv2gXJGVW3tsjT7FD6nxuz1bkGTaL4nGcQvPai_QjMqd0vcBBOkGNT7A5CPR4Vne_NDaCrBI507nSQydtxVY_oDA12LMHkn5kq5irODHAqgz0JfEJkjwkebhU98LOgaP6tm0yQEXgUtS0YkXlpeOK7aeUPhJtBR1iOqxrjMh2hit7PbR5l1nxUNxckKP4qDgDPf9a2OOMOlA/cloaks_4.png?psid=1&width=175&height=175&cropMode=center',
    tierCheck: 0,
    htmlId: 'buyCloak1',
    cost: [4, 0, 4],
    costText: '4 Arcana and 4 Scales',
  },
  {
    title: 'Tier 2 Cloak',
    src: 'https://bn1303files.storage.live.com/y4mY-GHuM_KNjzq5qsL0LV1UVYgvUTwk7sbG7jhxhA0f0J-4wll8IekvlTxW8ws9Oh2K0QUg3_7CvtXC0MhPGI-ymCXB7oIYL-VjqKSeVO0e9GQO8euEDJIDKYPwItIZlXtR-YaeVXC9T5rJ99xxllTT6KCBBgslToQnRa_HJZGK7lc-n3SUUXePB-3NKkM7Rs3lUuGeA5kQWo27lGJA1_RpQ/cloaks_14.png?psid=1&width=256&height=256&cropMode=center',
    tierCheck: 1,
    htmlId: 'buyCloak2',
    cost: [8, 4, 8],
    costText: '8 Arcana, 8 Scales, and 4 Essence',
  },
];

const Store = () => {
  const { username: userParam } = useParams();
  const { data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  console.log(data);
  const storeData = data?.me || {};

  const [upgradeRingTier, { errUpRing }] = useMutation(UPGRADE_RING_TIER);
  const [upgradeCloakTier, { errUpCloak }] = useMutation(UPGRADE_CLOAK_TIER);
  const [addArcana, { errAddArcana }] = useMutation(ADD_ARCANA);
  const [addEssence, { errAddEssence }] = useMutation(ADD_ESSENCE);
  const [addScale, { errAddScale }] = useMutation(ADD_SCALE);
  const [subtractArcana, { errSubArcana }] = useMutation(SUBTRACT_ARCANA);
  const [subtractEssence, { errSubEssence }] = useMutation(SUBTRACT_ESSENCE);
  const [subtractScale, { errSubScale }] = useMutation(SUBTRACT_SCALE);
  const [resetRingTier, { errResRing }] = useMutation(RESET_RING_TIER);
  const [resetCloakTier, { errResCloak }] = useMutation(RESET_CLOAK_TIER);

  const addCurrency = async () => {
    console.log(
      "You've added X Arcana, Essence, and Scale for testing purposes."
    );

    const currentId = data.me._id;

    try {
      const { data } = await addArcana({
        variables: {
          id: currentId,
        },
      });
    } catch (err) {
      console.error(err);
    }

    try {
      const { data } = await addEssence({
        variables: {
          id: currentId,
        },
      });
    } catch (err) {
      console.error(err);
    }

    try {
      const { data } = await addScale({
        variables: {
          id: currentId,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const buyRing = async (purchaseCost) => {
    console.log('You bought a ring!');

    const currentId = data.me._id;

    // for (let i = 0; i < purchaseCost[0]; i++) {
    try {
      const { data } = await subtractArcana({
        variables: {
          id: currentId,
          amount: purchaseCost[0],
        },
      });
    } catch (err) {
      console.error(err);
    }
    // }

    // for (let i = 0; i < purchaseCost[1]; i++) {
    try {
      const { data } = await subtractEssence({
        variables: {
          id: currentId,
          amount: purchaseCost[1],
        },
      });
    } catch (err) {
      console.error(err);
    }
    // }

    // for (let i = 0; i < purchaseCost[2]; i++) {
    try {
      const { data } = await subtractScale({
        variables: {
          id: currentId,
          amount: purchaseCost[2],
        },
      });
    } catch (err) {
      console.error(err);
    }
    // }

    try {
      const { data } = await upgradeRingTier({
        variables: {
          id: currentId,
        },
      });
    } catch (err) {
      console.error(err);
    }
    window.location.reload();
  };

  const resetRing = async () => {
    const currentId = data.me._id;

    try {
      const { data } = await resetRingTier({
        variables: {
          id: currentId,
        },
      });
    } catch (err) {
      console.error(err);
    }
    window.location.reload();
  };

  const buyCloak = async (purchaseCost) => {
    console.log('You bought a cloak!');

    const currentId = data.me._id;

    for (let i = 0; i < purchaseCost[0]; i++) {
      try {
        const { data } = await subtractArcana({
          variables: {
            id: currentId,
          },
        });
      } catch (err) {
        console.error(err);
      }
    }

    for (let i = 0; i < purchaseCost[1]; i++) {
      try {
        const { data } = await subtractEssence({
          variables: {
            id: currentId,
          },
        });
      } catch (err) {
        console.error(err);
      }
    }

    for (let i = 0; i < purchaseCost[2]; i++) {
      try {
        const { data } = await subtractScale({
          variables: {
            id: currentId,
          },
        });
      } catch (err) {
        console.error(err);
      }
    }

    try {
      const { data } = await upgradeCloakTier({
        variables: {
          id: currentId,
        },
      });
    } catch (err) {
      console.error(err);
    }
    window.location.reload();
  };

  const resetCloak = async () => {
    const currentId = data.me._id;

    try {
      const { data } = await resetCloakTier({
        variables: {
          id: currentId,
        },
      });
    } catch (err) {
      console.error(err);
    }
    window.location.reload();
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <div className="bg-gray-900">
          <div className="mx-auto px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-12">
            <div className="space-y-12">
              <button
                type="button"
                id="instantCurrency"
                className="inline-flex items-center m-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => addCurrency()}
              >
                Add currency to user.
              </button>
              <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
                <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  Buy Rings and Cloaks to Upgrade Your Gear
                </h2>
              </div>
              <ul className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
                {/* Map to render ring cards */}
                {ring.map((item) => (
                  <li className="py-10 px-6 bg-gray-800 text-center rounded-lg xl:px-10 xl:text-left">
                    <div className="space-y-6 xl:space-y-10">
                      <h4 className="text-white text-center font-medium text-xl m-4">
                        {item.title}
                      </h4>
                      <img
                        className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
                        src={item.src}
                        alt=""
                      ></img>
                      <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                        <div className="font-medium text-lg leading-6 space-y-1">
                          {storeData.ring === item.tierCheck ? (
                            <button
                              type="button"
                              id={item.htmlId}
                              className="inline-flex items-center m-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              onClick={() => {
                                buyRing(item.cost);
                              }}
                            >
                              Buy for {item.costText}.
                            </button>
                          ) : (
                            <button
                              type="button"
                              id={item.htmlId}
                              className="inline-flex items-center m-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-not-allowed"
                              onClick={() => buyRing(item.cost)}
                              disabled
                            >
                              Buy for {item.costText}.
                            </button>
                          )}
                          <button
                            type="button"
                            id="resetRing"
                            className="inline-flex items-center m-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => resetRing()}
                          >
                            Reset ring
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}

                {/* Map to render cloak cards */}
                {cloak.map((item) => (
                  <li className="py-10 px-6 bg-gray-800 text-center rounded-lg xl:px-10 xl:text-left">
                    <div className="space-y-6 xl:space-y-10">
                      <h4 className="text-white text-center font-medium text-xl m-4">
                        {item.title}
                      </h4>
                      <img
                        className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
                        src={item.src}
                        alt=""
                      ></img>
                      <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                        <div className="font-medium text-lg leading-6 space-y-1">
                          {storeData.cloak === item.tierCheck ? (
                            <button
                              type="button"
                              id={item.htmlId}
                              className="inline-flex items-center m-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              onClick={() => {
                                buyCloak(item.cost);
                              }}
                            >
                              Buy for {item.costText}.
                            </button>
                          ) : (
                            <button
                              type="button"
                              id={item.htmlId}
                              className="inline-flex items-center m-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-not-allowed"
                              onClick={() => buyCloak(item.cost)}
                              disabled
                            >
                              Buy for {item.costText}.
                            </button>
                          )}
                          <button
                            type="button"
                            id="resetCloak"
                            className="inline-flex items-center m-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => resetCloak()}
                          >
                            Reset cloak
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
};

export default Store;
