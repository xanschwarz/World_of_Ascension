import React from "react";
// import BossBattle from './BossBattle';
import { Link } from "react-router-dom";
// import MinionBattle from './MinionBattle';
import { ChipIcon, SparklesIcon } from "@heroicons/react/solid";
import Auth from "../../utils/auth";
import ModalContainer from "../../components/Modal/ModalContainer";

/* This example requires Tailwind CSS v2.0+ */
const enemies = [
  {
    name: "Pyro's Hatchlings ",
    pathName: "MinionBattle",
    link: "Battle Pyro's Hatchlings",
    drop: "1",
    icon: (
      <ChipIcon
        className=" ml-2 justify-center h-5 w-5 text-gray-500"
        aria-hidden="true"
      />
    ),
    imageUrl:
      "https://bn1303files.storage.live.com/y4mbYENwrUcn-6FQDA5igqNOixmNCG3sjVSRWV24I0c_zD6ORnaOL3s3X7b4hg7-kKQwV76s4c85PObcRDCWhhqq73VjDMkXghzVszkXABYQnU17apgTyphn7PwJlG6mbORxvEwa8aWrdvNTjv0-QA_e1wMATtTi-1hFZHWJx4wF4DdshvazJAmZ-JEtX0EK3Kild4b465b2quiJqVMTJ5D8g/SpellBook03_20.png?psid=1&width=256&height=256&cropMode=center",
  },

  {
    name: "Pyro",
    pathName: "BossBattle",
    link: "Battle Pyro",
    drop: "1",
    icon: (
      <SparklesIcon
        className=" ml-2 justify-center h-5 w-5 text-gray-500"
        aria-hidden="true"
      />
    ),
    imageUrl:
      "https://bn1303files.storage.live.com/y4mxeAMRBLm8sIvOgs7s6oWJ0zml7dFL4eJQG2jRhxdswUihA1Ame46qR58SC4GKWghq9HA5zGz1eVZY_tS9bw5I4rztRPyUyIVALVt7ptZzvO06CmTA98-DmWCtfOxVFRW1cRVM-6oX2YTBcg2PcChw7OHfm9sSCIQOGOPMMrz9HXGGVx5YcaxlDywUxZ01hsAslsETGpp_yYEWOsWyo4b1A/SpellBook03_64.png?psid=1&width=256&height=256&cropMode=center",
  },
  {
    name: "Lich's Minion",
    pathName: "MinionBattle2",
    link: "Battle Lich's Minion",
    drop: "5",
    icon: (
      <ChipIcon
        className=" ml-2 justify-center h-5 w-5 text-gray-500"
        aria-hidden="true"
      />
    ),
    imageUrl:
      "https://bn1303files.storage.live.com/y4mJbEIP_pW0wVVrMCLzDevi5oGPyhH4GgCaDixmuHzRjejbEqERa_JFRBGE9YvktReihEAmF9YG3d6VFklTboPPEi5QiB7GV0uPMQ552YRfgo7fvi7gQ-r8mWzOSoDZ1HrpwgHqDbOG_gNHsonOEs6GQ9FpfGHYhdceBgTvOVXuOItj-zs8R9h6_NXiHrVMcvhkjpAeSAyXtaXzd2Xt9mpSA/SpellBook07_60.png?psid=1&width=205&height=205&cropMode=center",
  },
  {
    name: "Lich",
    pathName: "BossBattle2",
    link: "Battle Lich",
    drop: "5",
    icon: (
      <SparklesIcon
        className=" ml-2 justify-center h-5 w-5 text-gray-500"
        aria-hidden="true"
      />
    ),
    imageUrl:
      "https://bn1303files.storage.live.com/y4mtqs9PaGm_1GFXe8y4oN3os0A5aIXO28KEXWt1g-mR5yu3wxW_jGeosyqFIz6Q9BduOE_UsePzHFH1wX0kU4GwVPETa82t17I8_h3YqlsD68hFLcogi_zACNzHqnIqyC_KwX09dh8Y4LFHett-VB9CSltaAhWkxIxAOP-fez8Efw1xdZcBhLGKWpJ56Es0WR4nI5fsHAA0pvcUa8hCqAYPw/SpellBook07_59.png?psid=1&width=256&height=256&cropMode=center",
  },

  {
    name: "Demio's Harpy",
    pathName: "MinionBattle3",
    link: "Battle Demio's Harpy",
    drop: "25",
    icon: (
      <ChipIcon
        className=" ml-2 justify-center h-5 w-5 text-gray-500"
        aria-hidden="true"
      />
    ),
    imageUrl:
      "https://bn1303files.storage.live.com/y4m5UWVxwPkA_jz7TeNtBSj4ZR5NMMymiQ8na3uXp4b8Spvx4gMXPJU5QidnKyf3O-AvxaVUZwpFHoSI-iKSTVCEWWU9Qw6aR2Ur4WbsrohI_9qaG4eLYwkhT_44bngv3zbLFui5OAKQOpx9KXUrJN0m1DhgEn9fo6Q9iH4O6fE5rjNvLLcDiuWQG5jgDgr7DlnKAl6QRyvPmKkyaP6ai6Lrg/SpellBook07_02.png?psid=1&width=256&height=256&cropMode=center",
  },
  {
    name: "Demio",
    pathName: "BossBattle3",
    link: "Battle Demio",
    drop: "25",
    icon: (
      <SparklesIcon
        className=" ml-2 justify-center h-5 w-5 text-gray-500"
        aria-hidden="true"
      />
    ),
    imageUrl:
      "https://bn1303files.storage.live.com/y4mGQjPiuuRVVhWzb9OEu7xLkF1iROyAI2IseY2cU-aeem0LsvIEYaeTVJhrryhPMrBD5RaV0GA5jVaO503waHv_oMMrC1o3bdjVjgggBTc-hv5M9KirVcZj7zxf-hZeAN6z1M_D8wj4lye-u7tgJqygX44v234LRKoQVAx81IEjrDj9uZbR-zMn1ZRKGgOsGnMtttoYK7HdcUofmnCyYoRrQ/SpellBook07_58.png?psid=1&width=256&height=256&cropMode=center",
  },
  {
    name: "Ghastly's Whisp",
    pathName: "MinionBattle4",
    link: "Battle Ghastly's Whisp",
    drop: "125",
    icon: (
      <ChipIcon
        className=" ml-2 justify-center h-5 w-5 text-gray-500"
        aria-hidden="true"
      />
    ),
    imageUrl:
      "https://bn1303files.storage.live.com/y4mIX-LLBtSeZWjx3nhQAFW9nxcAnvlfV5xRf6RXucSx-QiDmjaiEI8IAzL6QiPPO1OFJ7gACYRHRpggKDxeuex1jSTNLT0-3iMun4rrbQDkajQm1NZXsKYoRGHrpToDWFjJUHicoMAG96iQPdczMRdH4DU-Gs3bToOq4c7If3kwxwfm4YOzDYMXUGyWCF2V3bfpkyfCj5c7SrFtpM2qwiqLA/SpellBook07_47.png?psid=1&width=256&height=256&cropMode=center",
  },
  {
    name: "Ghastly",
    pathName: "BossBattle4",
    link: "Battle Ghastly",
    drop: "125",
    icon: (
      <SparklesIcon
        className=" ml-2 justify-center h-5 w-5 text-gray-500"
        aria-hidden="true"
      />
    ),
    imageUrl:
      "https://bn1303files.storage.live.com/y4mGamsWSdQY-dzQkqnVwhZ_wyImMiNc1PbFHJGNGX9TEfyfFCrCa0VlM0f6tzFl0UztdR5meZOgkb3isZtuWV7WyApeF_C_K8Vguy1akOZRHU5l7tmOj4fb1XbPJhyzmusUyb9_fOafNo7tAedM6j1udzfxNnRNbTV7AAabVdXIslxxPV0sVVLV4uiQtvu98c8UFQ0jVf9YdkPWwme_G27Cg/SpellBook07_56.png?psid=1&width=205&height=205&cropMode=center",
  },
  {
    name: "Master's Minion",
    pathName: "MinionBattle5",
    link: "Master's Minion",
    drop: "1000",
    icon: (
      <ChipIcon
        className=" ml-2 justify-center h-5 w-5 text-gray-500"
        aria-hidden="true"
      />
    ),
    imageUrl:
      "https://bn1303files.storage.live.com/y4mHSAsLVCsZ0Y46kJGrRBHeuKSsum6LngbldPAuCmU3qOMFS8lyEGl0lbjca9xorBzqALKVKcm04RgfjfAC3krBVsCHDMkd2mihQ4WiTNKZk7NFTHKjWiuxAnVPXoQWeQDg6GJ_BKxDpiBE7CI2ESHmZKgG62-1572tQgF5h_a6qKjRiBM1ai9FNn81rPzsIOBDpaRzh9AaKiZnsKwoRlJGw/SpellBook07_63.png?psid=1&width=256&height=256&cropMode=center",
  },
  {
    name: "Master",
    pathName: "BossBattle5",
    link: "Battle Master",
    drop: "1000",
    icon: (
      <SparklesIcon
        className=" ml-2 justify-center h-5 w-5 text-gray-500"
        aria-hidden="true"
      />
    ),
    imageUrl:
      "https://bn1303files.storage.live.com/y4mbhNs6Mzfsv3Osush607LiFl9hNaJUU3ud_vbDSw_1VdvyZt6VA_BjpzB_mUQuzYQBJSt38h0djhAY8ne1MhfbBJXz2pEm-j8LJKyp23y4UVSX0P-rGFtMY8s3MUT3tH6HDGfXQBBwlCG6B8_Czb2OsXfQztUeD7ZJC05w2fBZVBLlTUQizVUkTq32UsisXMbzQWgyiW5IT537IOfOhMnCQ/SpellBook07_88.png?psid=1&width=256&height=256&cropMode=center",
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
