// Style disabled buttons to be more obvious. Maybe an actual call out that they already own that.

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Auth from '../../utils/auth';
import ModalContainer from '../../components/Modal/ModalContainer';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import {
  UPGRADE_RING_TIER,
  RESET_RING_TIER,
  UPGRADE_CLOAK_TIER,
  RESET_CLOAK_TIER,
} from '../../utils/mutations';

const ringSRCTier1 =
  'https://bn1303files.storage.live.com/y4mW_O9K00YJzIbF-y8GckCr7qpnqZ6-TlPWhfXNDX1pWrpEcNkEI1jiMdTq1gTeg8mmZWFgmezdGVnV4tyJiMk-0ojBNSYOSx9_SyKxqbMWMqdHLezvj1DO0NlRMEjKFDjS2gHElyD3iQReigcPbeZuyz5qMSSfuklfVBnjYgHiFBEjiRWjDuQA4Yubs5AP0753zYdEBYaREhn08zQNXRt4Q/10_t.PNG?psid=1&width=175&height=175&cropMode=center';
const ringSRCTier2 =
  'https://bn1303files.storage.live.com/y4m_-cwHk39j7JYzYc8ma1mUhLw3MboUUwGEh0FJ5MHf1WSVGXcIFOa3-asJFtom5QYtW6fLNlX1GOx4px22WCvtDwz6fc7I-_Aj2FrrVqBJNxF2PeESK7vfF-GB5rvfc3JZbnN4VM0eVcHQTX5nEHsNUBeVHts_4bwXSn0wG6_FE3WQgMxzBvlKtKDW11XQu5MScd1b2WViTmfvSi8QkeP8w/77_t.PNG?psid=1&width=256&height=256&cropMode=center';

const cloakSRCTier1 =
  'https://bn1303files.storage.live.com/y4m7NkuUdV2Afgv2gXJGVW3tsjT7FD6nxuz1bkGTaL4nGcQvPai_QjMqd0vcBBOkGNT7A5CPR4Vne_NDaCrBI507nSQydtxVY_oDA12LMHkn5kq5irODHAqgz0JfEJkjwkebhU98LOgaP6tm0yQEXgUtS0YkXlpeOK7aeUPhJtBR1iOqxrjMh2hit7PbR5l1nxUNxckKP4qDgDPf9a2OOMOlA/cloaks_4.png?psid=1&width=175&height=175&cropMode=center';
const cloakSRCTier2 =
  'https://bn1303files.storage.live.com/y4mY-GHuM_KNjzq5qsL0LV1UVYgvUTwk7sbG7jhxhA0f0J-4wll8IekvlTxW8ws9Oh2K0QUg3_7CvtXC0MhPGI-ymCXB7oIYL-VjqKSeVO0e9GQO8euEDJIDKYPwItIZlXtR-YaeVXC9T5rJ99xxllTT6KCBBgslToQnRa_HJZGK7lc-n3SUUXePB-3NKkM7Rs3lUuGeA5kQWo27lGJA1_RpQ/cloaks_14.png?psid=1&width=256&height=256&cropMode=center';

const Store = () => {
  const { username: userParam } = useParams();
  const { data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  console.log(data);
  const storeData = data?.me || {};

  const [upgradeRingTier, { errUpgradeRing }] = useMutation(UPGRADE_RING_TIER);
  const [upgradeCloakTier, { errUpgradeCloak }] =
    useMutation(UPGRADE_CLOAK_TIER);
  const [resetRingTier, { errResetRing }] = useMutation(RESET_RING_TIER);
  const [resetCloakTier, { errResetCloak }] = useMutation(RESET_CLOAK_TIER);

  const buyRing = async () => {
    console.log('You bought a ring!');

    const currentRingId = data.me._id;

    try {
      const { data } = await upgradeRingTier({
        variables: {
          id: currentRingId,
        },
      });
    } catch (err) {
      console.error(err);
    }
    console.log(data.me.ring);
    window.location.reload();
  };

  const resetRing = async () => {
    const currentRingId = data.me._id;

    try {
      const { data } = await resetRingTier({
        variables: {
          id: currentRingId,
        },
      });
    } catch (err) {
      console.error(err);
    }
    console.log(data.me.ring);
    window.location.reload();
  };

  const buyCloak = async () => {
    console.log('You bought a cloak!');

    const currentCloakId = data.me._id;

    try {
      const { data } = await upgradeCloakTier({
        variables: {
          id: currentCloakId,
        },
      });
    } catch (err) {
      console.error(err);
    }
    console.log(data.me.cloak);
    window.location.reload();
  };

  const resetCloak = async () => {
    const currentCloakId = data.me._id;

    try {
      const { data } = await resetCloakTier({
        variables: {
          id: currentCloakId,
        },
      });
    } catch (err) {
      console.error(err);
    }
    console.log(data.me.cloak);
    window.location.reload();
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <div className="bg-gray-900">
          <div className="mx-auto px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-12">
            <div className="space-y-12">
              <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
                <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  Buy Rings and Cloaks to Upgrade Your Gear
                </h2>
              </div>
              <ul className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
                {/* Ring Tier 1 */}
                <li className="py-10 px-6 bg-gray-800 text-center rounded-lg xl:px-10 xl:text-left">
                  <div className="space-y-6 xl:space-y-10">
                    <h4 className="text-white text-center font-medium text-xl m-4">
                      Tier 1 Ring
                    </h4>
                    <img
                      className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
                      src={ringSRCTier1}
                      alt=""
                    ></img>
                    <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                      <div className="font-medium text-lg leading-6 space-y-1">
                        {storeData.ring === 0 ? (
                          <button
                            type="button"
                            id="buyRingT1"
                            className="inline-flex items-center m-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => {
                              buyRing();
                            }}
                          >
                            Buy for 2 Arcana, 2 Scales.
                          </button>
                        ) : (
                          <button
                            type="button"
                            id="buyRingT1"
                            className="inline-flex items-center m-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-not-allowed"
                            onClick={() => buyRing()}
                            disabled
                          >
                            Buy for 2 Arcana, 2 Scales.
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

                {/* Ring Tier 2 */}
                <li className="py-10 px-6 bg-gray-800 text-center rounded-lg xl:px-10 xl:text-left">
                  <div className="space-y-6 xl:space-y-10">
                    <h4 className="text-white text-center font-medium text-xl m-4">
                      Tier 2 Ring
                    </h4>
                    <img
                      className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
                      src={ringSRCTier2}
                      alt=""
                    ></img>
                    <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                      <div className="font-medium text-lg leading-6 space-y-1">
                        {storeData.ring === 1 ? (
                          <button
                            type="button"
                            id="buyRingT2"
                            className="inline-flex items-center m-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => buyRing()}
                          >
                            Buy for 4 Arcana, 4 Scales, 2 Essence.
                          </button>
                        ) : (
                          <button
                            type="button"
                            id="buyRingT2"
                            className="inline-flex items-center m-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-not-allowed"
                            onClick={() => buyRing()}
                            disabled
                          >
                            Buy for 4 Arcana, 4 Scales, 2 Essence.
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </li>

                {/* Cloak Tier 1 */}
                <li className="py-10 px-6 bg-gray-800 text-center rounded-lg xl:px-10 xl:text-left">
                  <div className="space-y-6 xl:space-y-10">
                    <h4 className="text-white text-center font-medium text-xl m-4">
                      Tier 1 Cloak
                    </h4>
                    <img
                      className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
                      src={cloakSRCTier1}
                      alt=""
                    ></img>
                    <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                      <div className="font-medium text-lg leading-6 space-y-1">
                        {storeData.cloak === 0 ? (
                          <button
                            type="button"
                            id="buyCloakT1"
                            className="inline-flex items-center m-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => buyCloak()}
                          >
                            Buy for 4 Arcana, 4 Scales, 2 Essence.
                          </button>
                        ) : (
                          <button
                            type="button"
                            id="buyCloakT1"
                            className="inline-flex items-center m-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-not-allowed"
                            onClick={() => buyCloak()}
                            disabled
                          >
                            Buy for 4 Arcana, 4 Scales, 2 Essence.
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

                {/* Cloak Tier 2 */}
                <li className="py-10 px-6 bg-gray-800 text-center rounded-lg xl:px-10 xl:text-left">
                  <div className="space-y-6 xl:space-y-10">
                    <h4 className="text-white text-center font-medium text-xl m-4">
                      Tier 2 Cloak
                    </h4>
                    <img
                      className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
                      src={cloakSRCTier2}
                      alt=""
                    ></img>
                    <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                      <div className="font-medium text-lg leading-6 space-y-1">
                        {storeData.cloak === 1 ? (
                          <button
                            type="button"
                            id="buyCloakT2"
                            className="inline-flex items-center m-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => buyCloak()}
                          >
                            Buy for 4 Arcana, 4 Scales, 2 Essence.
                          </button>
                        ) : (
                          <button
                            type="button"
                            id="buyCloakT2"
                            className="inline-flex items-center m-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-not-allowed"
                            onClick={() => buyCloak()}
                            disabled
                          >
                            Buy for 4 Arcana, 4 Scales, 2 Essence.
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
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
