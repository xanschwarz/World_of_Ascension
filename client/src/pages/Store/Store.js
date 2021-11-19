// Make it so you can't spend more than you have.
// Style disabled buttons to be more obvious. Maybe an actual call out that they already own that. Match styling of buttons elsewhere in app?

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
    src: 'https://bn1303files.storage.live.com/y4m68m2lDqbAMi51c3m4AwTN0MMunsgFsew3HzLrqYUtR5u1SZEijajd8gzhTuRmr4j44X3_Cr2zf8RyflGQznKa1oXDdUa50-7FsKMA35hxshMO3-iJyFFbHvbUTsTd4iEKAtf4PZ9MS-0ERKnQUOEa3pHFVRGg-9MCoGKzfXOQUQ_TlJB0oDtyCrJYg8pAkMslzx4SZT2qnred5R3NOfppg/32_t.PNG?psid=1&width=256&height=256&cropMode=center',
    tierCheck: 0,
    htmlId: 'buyRing1',
    cost: [10, 0, 10],
    costText: '10 Arcana and 10 Scales',
  },
  {
    title: 'Tier 2 Ring',
    src: 'https://bn1303files.storage.live.com/y4mMzDECsxHZBP0wiOS7HPGp7YyYXBaQF6dBNoc7751bkkUMotJsMYq1qgQBxwMkktSXx4LOSSeL5RRlumBDFiAExtbBjGTR2wn35xEinqhqYJ_t1aJyXLC3eiSHJEcbE6VcTRwEpY-nA4jDhc7Wz5vuzW7ME0cBlm2kYzokj0G2Wt1Oc7hbT6lz9umRbSDib4VZ1x7xCsGNwLoydG8Qw1HuA/96_t.PNG?psid=1&width=256&height=256&cropMode=center',
    tierCheck: 1,
    htmlId: 'buyRing2',
    cost: [25, 25, 50],
    costText: '25 Arcana, 50 Essence, and 25 Scales',
  },
  {
    title: 'Tier 3 Ring',
    src: 'https://bn1303files.storage.live.com/y4mieKir4R3eLS6_iXVpYcsLHKPZhtTPVL1atmBB3PMbNuU3BC_XwM-ah1DHLLw1A7so4oI0umfBio_iSHqhG0NPsjItcd3eADYtPDf7_E1zdDb089mqhriMjOxHcKdg8d3agjxkV1p0UPECSRQrAqoRU1OVUVzjjGuC60RlJUjWbafahwdGVWCoXCgSZhPzVW9MMJ8I8p8VRF0UG-JpQdrsw/10_t.PNG?psid=1&width=256&height=256&cropMode=center',
    tierCheck: 2,
    htmlId: 'buyRing3',
    cost: [50, 125, 250],
    costText: '50 Arcana, 125 Essence, and 250 Scales',
  },
  {
    title: 'Tier 4 Ring',
    src: 'https://bn1303files.storage.live.com/y4mYJZoZBNJ2gyh6opC0IPdXuM7OnysF19Uhaswbn8jU_MS-9IWJlyK0i2-tO-Ht8_FNlKY_HdW3aPO8tvLZANQB23ApR99mkS8pnXzffa1W76vRD6XTYkRXGQUDJx5-zIvBx48wXCJXe3p01K9jV6Jmb8qO1wlSg5jhekG1QWwmwfhi83l1PXYqFhFllbZeHcVrv4vS7ihojIjoFHOZe9GaA/rng_04_t.png?psid=1&width=256&height=256&cropMode=center',
    tierCheck: 3,
    htmlId: 'buyRing4',
    cost: [75, 625, 1250],
    costText: '75 Arcana, 625 Essence, and 1250 Scales',
  },
  {
    title: 'Tier 5 Ring',
    src: 'https://bn1303files.storage.live.com/y4mGjdLoPr4mrjMJclv_J4H4WorIZubUy2nEh8TJAdDwDwXRy-3Cuf49y05eJbkOR2rPmqbJOR0ChzxxlV2CHLa6FwxKl2QwhNGd1yYh1j2aqvgaCmdX2ti2UDVVBskakPd0UurJiIldVX4b3godXWwdWSwpUDToH-rD9q63VvOK4MGe7_TtEQsCJpKkJHmSAyznUQ5qWM2e-vv_gBu-BkFKA/77_t.PNG?psid=1&width=256&height=256&cropMode=center',
    tierCheck: 4,
    htmlId: 'buyRing5',
    cost: [100, 5000, 10000],
    costText: '100 Arcana, 5000 Essence, and 10000 Scales',
  },
];

const cloak = [
  {
    title: 'Tier 1 Cloak',
    src: 'https://bn1303files.storage.live.com/y4mtN_nlP9FODKv-xSWIXzwLO328QL8R5zIRXtb7soDcQ7EiT9IUQrca5zD8GwJkexiPfKF4lkIVys-AIJ9qMSooczU0xN_KYtsTRAjdn7tUQ--aBO2NJHd9gHnQCA_g5VZ297_jJlVA2jV9laTkL3cr8Wvj_5ewpDODqFHayvEZozxKbJUyrb3pa9-KXGu1btUFHWxKGFqOQD2FWbY7ryhtA/cloaks_7.png?psid=1&width=256&height=256&cropMode=center',
    tierCheck: 0,
    htmlId: 'buyCloak1',
    cost: [10, 0, 10],
    costText: '10 Arcana and 10 Scales',
  },
  {
    title: 'Tier 2 Cloak',
    src: 'https://bn1303files.storage.live.com/y4mCx-I1n9bWK9KJzL46EGUe2UXFGgigMssv9-L_w1raW3PPUVk5nJjy70nLJ7CnX_4zGUThNwc1BJNCyl_ZIDRXz8FatVMYAsKekEze4tSsIoHguhYMFuo0u9rBJnnrsZhC1SrkvzyyRt43fi__yvqMm3rC0F1qgzQGl2ytenoZR4YLLITuawNLTDI3Mc6GVcbs52Ee6aj1dMkaL-onT712g/cloaks_18.png?psid=1&width=256&height=256&cropMode=center',
    tierCheck: 1,
    htmlId: 'buyCloak2',
    cost: [25, 25, 50],
    costText: '25 Arcana, 50 Essence, and 25 Scales',
  },
  {
    title: 'Tier 3 Cloak',
    src: 'https://bn1303files.storage.live.com/y4mv8jJZ7YgBx1Ao2b_MHikQ9A2MCk3xLpCaQuapUn1jIeX2dCssTrRFB0Q90r1DXi8pBiKALQd3lE-yAofVkiPKVrJdz8_8KxCpTt8eGo2jZceR6U-irhqs9fa0MLkwT4v7UR36sO7QeQhUTHaW3us9ApOm3VZ70JCOSqZPy4JsO3J3RiSeWhkJoQJZM8ZPE3kBK6kCrTNwlSX8BzCcC6miw/cloaks_1.PNG?psid=1&width=256&height=256&cropMode=center',
    tierCheck: 2,
    htmlId: 'buyCloak3',
    cost: [50, 125, 250],
    costText: '50 Arcana, 125 Essence, and 250 Scales',
  },
  {
    title: 'Tier 4 Cloak',
    src: 'https://bn1303files.storage.live.com/y4mpAvzvyUa6pAF2uVv-_CIqhyHfxNjeSOkqjo9KPHIcrm8AffAQmxigNAMLH76hpWVr5wU0ZMDmbxoFVgOZW4hCvwO73EiZchbt4a2K9eP_8nKbJFRX2U4HGaaotZ496t7PhAC2K6DhrlL8lM32eLrSCFXuzsP05dUhtLBLFG3m6DM29LUm29SoZrUQ47A25YWFWB4OdRjIUL13OQL69iCsw/cloaks_5.png?psid=1&width=256&height=256&cropMode=center',
    tierCheck: 3,
    htmlId: 'buyCloak4',
    cost: [75, 625, 1250],
    costText: '75 Arcana, 625 Essence, and 1250 Scales',
  },
  {
    title: 'Tier 5 Cloak',
    src: 'https://bn1303files.storage.live.com/y4m8mQOvFuL-UruEVd2c83LkIsDujIj0FdkqzB4zA4GDR1DkmYGahxwPezwJJ7_eRgu6YIYa7L6fwKEG2i1Y2UP1FaXsnI36TvtfwB_R5taxvhM6DOjzRKhEBBUR2F1rmbrCpn-CHetFSOHDOlAKBs2c7GiY7kL_uYlc8BfP-_ZQbQ3YXRPDuevgkaaGusRDMLLL0CgANcMnc4waXFDgRI7AQ/cloaks_14.png?psid=1&width=256&height=256&cropMode=center',
    tierCheck: 4,
    htmlId: 'buyCloak5',
    cost: [100, 5000, 10000],
    costText: '100 Arcana, 5000 Essence, and 10000 Scales',
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

  const addCurrency = async (totals) => {
    console.log(
      "You've added X Arcana, Essence, and Scale for testing purposes."
    );

    const currentId = data.me._id;

    for (let i = 0; i < totals[0]; i++) {
      try {
        const { data } = await addArcana({
          variables: {
            id: currentId,
          },
        });
      } catch (err) {
        console.error(err);
      }
    }

    for (let i = 0; i < totals[1]; i++) {
      try {
        const { data } = await addEssence({
          variables: {
            id: currentId,
          },
        });
      } catch (err) {
        console.error(err);
      }
    }

    for (let i = 0; i < totals[2]; i++) {
      try {
        const { data } = await addScale({
          variables: {
            id: currentId,
          },
        });
      } catch (err) {
        console.error(err);
      }
    }
    window.location.reload();
  };

  const buyRing = async (purchaseCost) => {
    console.log('You bought a ring!');

    const currentId = data.me._id;

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
                onClick={() => addCurrency([10, 0, 10])}
              >
                Add 10 Arcana, Scales
              </button>
              <button
                type="button"
                id="instantCurrency"
                className="inline-flex items-center m-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => addCurrency([25, 25, 50])}
              >
                25 Arcana, 50 Essence, and 25 Scales
              </button>
              {/* <button
                type="button"
                id="instantCurrency"
                className="inline-flex items-center m-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => addCurrency([50, 125, 250])}
              >
                50 Arcana, 125 Essence, and 250 Scales
              </button>
              <button
                type="button"
                id="instantCurrency"
                className="inline-flex items-center m-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => addCurrency([75, 625, 1250])}
              >
                75 Arcana, 625 Essence, and 1250 Scales
              </button>
              <button
                type="button"
                id="instantCurrency"
                className="inline-flex items-center m-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => addCurrency([100, 5000, 10000])}
              >
                100 Arcana, 5000 Essence, and 10000 Scales
              </button> */}
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
