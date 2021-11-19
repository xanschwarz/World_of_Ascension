import React from "react";
// import BossBattle from './BossBattle';
import { Link } from "react-router-dom";
// import MinionBattle from './MinionBattle';
import { BeakerIcon } from "@heroicons/react/solid";
import Auth from "../../utils/auth";
import ModalContainer from "../../components/Modal/ModalContainer";

/* This example requires Tailwind CSS v2.0+ */
const enemies = [
  {
    name: "5 Sec Gather",
    pathName: "Gathering",
    link: "Gather Arcana",
    drop: "2",
    icon: (
      <BeakerIcon
        className=" ml-2 justify-center h-5 w-5 text-gray-500"
        aria-hidden="true"
      />
    ),
    imageUrl:
      "https://bn1303files.storage.live.com/y4m4aC5V7U5xCwrRaNBavZfxa6Mj8RxliXU5q4PpIGkjoaMWQzTjE98mbOHnOJLl3FhOJqhzI-DFN5iwbb_ALGRZHJ3lZlQ0xVDCb-EGFSbjZ9yH4osWC3No5dAO2iGFv3ACrhAZLli4VPR3cm1tk6K0UaqPlGOP9a3xSV1CSmFRhzBMqb7P-X6gFoFo6faXgrJmqEXRnk3qUNaqrb_sqMiwQ/SpellBook07_18.png?psid=1&width=152&height=152&cropMode=center",
  },

  {
    name: "1 Min Gather",
    pathName: "Gathering2",
    link: "Gather Arcana",
    drop: "10",
    icon: (
      <BeakerIcon
        className=" ml-2 justify-center h-5 w-5 text-gray-500"
        aria-hidden="true"
      />
    ),
    imageUrl:
      "https://bn1303files.storage.live.com/y4paIQWZtNeC6XpcQQv35fJN5WpCdxwrueLbfNZ7llbPof2kxxaAONdLRGsyQqLrdD0SxfnPvnGMtolDvAtrTiPsfhoiSV5fma8BfBCAMwLa7fTlTTX_R_JDaj-B_BZBRFk1FM8NC-KnaMItroDtLkrpYogxFSzFssAQvjwGvWeV2pChoCpBLxEl5NYPYhJqLR9SXu7FS1u_aJPTVk4hkkrnUp1E9_-zv3duW-3Uf0RLCM/SpellBook06_103.png?psid=1&width=172&height=172&cropMode=center",
  },
  {
    name: "15 Min Gather",
    pathName: "Gathering3",
    link: "Gather Arcana",
    drop: "75",
    icon: (
      <BeakerIcon
        className=" ml-2 justify-center h-5 w-5 text-gray-500"
        aria-hidden="true"
      />
    ),
    imageUrl:
      "https://bn1303files.storage.live.com/y4mpEkUg_IgL0IQHIWL9k1h9MrIErk-3mGdoFMh0rlvxISZs7BYHE4NTQx_0TmVKyUagNWeTyS9KRxZogPxSkHHROFOVJfQFvuWcMjiFybcuxVFffyYBR1eP2lmAy_Tt9k3NfKT5OW5Y1PCkJtBAwlxts14BnGWV8MO_5pCLxjv0M4oUaOiKAhJK_jMaj71nDfN1xM7L-DAwV3kJfobEg5fwg/SpellBookPage09_01.PNG?psid=1&width=140&height=140&cropMode=center",
  },
  {
    name: "1 Hour Gather",
    pathName: "Gathering4",
    link: "Gather Arcana",
    drop: "150",
    icon: (
      <BeakerIcon
        className=" ml-2 justify-center h-5 w-5 text-gray-500"
        aria-hidden="true"
      />
    ),
    imageUrl:
      "https://bn1303files.storage.live.com/y4mvA9MRWdbrZMyBUd-U538DDuM3XjQ8nSL8oWPftYP8C-MQ0PeqIbvzVcfyFD01JI_1OyCvr59LohLb8-SoYioychT9n7sgWUxcNaludYbLreonqWSTxc0cUnv7Z1msybroxSk_KGZtzTJUkxgf4yP6AUfY-KIXl56t9DiFGbjsJdUfVLX9w9UKPDKSyseYOXsM1ewhwwfhbTZtBJUxWYcxg/SpellBook06_58.png?psid=1&width=140&height=140&cropMode=center",
  },
];

export default function GatherChoice() {
  return (
    <div>
      {Auth.loggedIn() ? (
        <div className="bg-gray-900">
          <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
            <div className="space-y-12">
              <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
                <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  Gather Arcana
                </h2>
                <p className="text-xl text-gray-300">
                  Choose a speed in which to gather, determination.
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
                            Rewards {enemy.drop} {enemy.icon}{" "}
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
