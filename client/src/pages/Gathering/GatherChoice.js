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
    name: "Gather 1 ",
    pathName: "Gathering",
    link: "Gather 1",
    drop: "1",
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
    name: "Gather 2",
    pathName: "Gathering2",
    link: "Gather 2",
    drop: "1",
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
    name: "Gather 3",
    pathName: "Gathering3",
    link: "Gather 3",
    drop: "5",
    icon: (
      <BeakerIcon
        className=" ml-2 justify-center h-5 w-5 text-gray-500"
        aria-hidden="true"
      />
    ),
    imageUrl:
      "https://bn1303files.storage.live.com/y4mJbEIP_pW0wVVrMCLzDevi5oGPyhH4GgCaDixmuHzRjejbEqERa_JFRBGE9YvktReihEAmF9YG3d6VFklTboPPEi5QiB7GV0uPMQ552YRfgo7fvi7gQ-r8mWzOSoDZ1HrpwgHqDbOG_gNHsonOEs6GQ9FpfGHYhdceBgTvOVXuOItj-zs8R9h6_NXiHrVMcvhkjpAeSAyXtaXzd2Xt9mpSA/SpellBook07_60.png?psid=1&width=205&height=205&cropMode=center",
  },
  {
    name: "Gather 4",
    pathName: "Gathering4",
    link: "Gather 4",
    drop: "5",
    icon: (
      <BeakerIcon
        className=" ml-2 justify-center h-5 w-5 text-gray-500"
        aria-hidden="true"
      />
    ),
    imageUrl:
      "https://bn1303files.storage.live.com/y4mtqs9PaGm_1GFXe8y4oN3os0A5aIXO28KEXWt1g-mR5yu3wxW_jGeosyqFIz6Q9BduOE_UsePzHFH1wX0kU4GwVPETa82t17I8_h3YqlsD68hFLcogi_zACNzHqnIqyC_KwX09dh8Y4LFHett-VB9CSltaAhWkxIxAOP-fez8Efw1xdZcBhLGKWpJ56Es0WR4nI5fsHAA0pvcUa8hCqAYPw/SpellBook07_59.png?psid=1&width=256&height=256&cropMode=center",
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
