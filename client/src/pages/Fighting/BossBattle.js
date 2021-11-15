import React, { useEffect, useState } from "react";
import Auth from "../../utils/auth";
import ModalContainer from "../../components/Modal/ModalContainer";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import { ADD_ESSENCE } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { Redirect, useParams } from "react-router-dom";

//placeholder for the values, need to change each to be able to take in the value to start but not update
// initialHealth = (20 * Math.pow(5, data?.me.cloak));
const initialHealth = 100;
//   initial aP =(20* (Math.pow(5, data?.me.ring) / 5));
const aP = 20;

//sentences listed after the round, stating a win, loss or draw
const successSentences = ["You have damaged the Boss", "A Remarkable shot"];
const failureSentences = [
  "Pyro Counter attacks",
  "Pyro dodges, and Swiftly attacks you",
];
const tieSenetences = [
  "Your spell didn't even cause a scratch",
  "The Boss Laughs at you",
];

//functions to call the sentences
function showRandomTieSentence() {
  const randomNumber = Math.floor(Math.random() * tieSenetences.length);
  return tieSenetences[randomNumber];
}

function showRandomSuccessSentence() {
  const randomNumber = Math.floor(Math.random() * successSentences.length);
  return successSentences[randomNumber];
}
function showRandomFailureSentence() {
  const randomNumber = Math.floor(Math.random() * failureSentences.length);
  return failureSentences[randomNumber];
}

//visual change of user health bar
function userHpDamaged() {
  let health = document.getElementById("userHealthBar");
  health.value -= 20;
}
//visual change of boss health bar
function bossHpDamagedFull() {
  let health = document.getElementById("bossHealthBar");
  health.value -= aP;
}

//animations for the user and boss
function addBossDamagedAnimation() {
  document.getElementById("bossIcon").classList.add("animate-wiggle");
}

function removeBossDamagedAnimation() {
  document.getElementById("bossIcon").classList.remove("animate-wiggle");
}

function addBossLaughAnimation() {
  document.getElementById("bossIcon").classList.add("animate-bounce");
}

function removeBossLaughAnimation() {
  document.getElementById("bossIcon").classList.remove("animate-bounce");
}

function addUserDamagedAnimation() {
  document.getElementById("userIcon").classList.add("animate-wiggle");
}

function removeUserDamagedAnimation() {
  document.getElementById("userIcon").classList.remove("animate-wiggle");
}

const BossBattle = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
    onCompleted: (data) => setEssence(data.me.essence),
  });

  const [userAbility, setUserAbility] = useState(null);
  const [bossAbility, setBossAbility] = useState(null);
  const [userHealth, setUserHealth] = useState(initialHealth);
  const [bossHealth, setBossHealth] = useState(100);
  const [turnResult, setTurnResult] = useState(null);
  const [result, setResult] = useState("Battle In Progress");
  const [gameOver, setGameOver] = useState(false);
  const [essence, setEssence] = useState();
  const choices = ["Bolt", "Blast", "Nova"];

  const [addEssence, { error }] = useMutation(ADD_ESSENCE);

  // function removebossAnimation() {
  //   document.getElementById("bossIcon").classList.remove("animate-wiggle");
  // }
  // function removeUserAnimation() {
  //   document.getElementById("bossIcon").classList.remove("animate-wiggle");
  // }
  const handleClick = (value) => {
    setUserAbility(value);
    generateBossAbility();
  };

  const generateBossAbility = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setBossAbility(randomChoice);
  };

  const reset = () => {
    window.location.reload();
  };

  useEffect(() => {
    const comboMoves = userAbility + bossAbility;
    //If the User chooses correctly
    if (userHealth > 0 && bossHealth > 0) {
      if (
        comboMoves === "NovaBlast" ||
        comboMoves === "BoltNova" ||
        comboMoves === "BlastBolt"
      ) {
        const bossDamaged = bossHealth - aP;
        bossHpDamagedFull();
        setBossHealth(bossDamaged);
        setTurnResult(showRandomSuccessSentence());
        addBossDamagedAnimation();
        setTimeout(() => {
          removeBossDamagedAnimation();
        }, 1000);
        if (bossDamaged === 0) {
          setResult("You have Defeated Pyro!");
          const gameOff = true;
          const currentEssenceId = data.me._id;
          try {
            const { data } = addEssence({
              variables: {
                id: currentEssenceId,
              },
            });
            setEssence(data.addEssence.essence);
          } catch (error) {
            console.log(error);
          }
          setGameOver(gameOff);
        }
      }
      //If the User chooses incorrectly
      if (
        comboMoves === "BlastNova" ||
        comboMoves === "NovaBolt" ||
        comboMoves === "BoltBlast"
      ) {
        const userDamaged = userHealth - 20;
        userHpDamaged();
        setUserHealth(userDamaged);
        setTurnResult(showRandomFailureSentence);
        addUserDamagedAnimation();
        setTimeout(() => {
          removeUserDamagedAnimation();
        }, 1000);
        if (userDamaged === 0) {
          setResult("You have been Defeated");
          const gameOff = true;
          setGameOver(gameOff);
        }
      }
      //If its a tie
      if (
        comboMoves === "BlastBlast" ||
        comboMoves === "BoltBolt" ||
        comboMoves === "NovaNova"
      ) {
        addBossLaughAnimation();
        setTimeout(() => {
          removeBossLaughAnimation();
        }, 1000);
        setTurnResult(showRandomTieSentence);
      }
    }
  }, [bossAbility, userAbility]);
  const enemies = [
    {
      name: "Pyro",
      pathName: "BossBattle",
      link: "Battle Boss",
      imageUrl:
        "https://bn1303files.storage.live.com/y4mxeAMRBLm8sIvOgs7s6oWJ0zml7dFL4eJQG2jRhxdswUihA1Ame46qR58SC4GKWghq9HA5zGz1eVZY_tS9bw5I4rztRPyUyIVALVt7ptZzvO06CmTA98-DmWCtfOxVFRW1cRVM-6oX2YTBcg2PcChw7OHfm9sSCIQOGOPMMrz9HXGGVx5YcaxlDywUxZ01hsAslsETGpp_yYEWOsWyo4b1A/SpellBook03_64.png?psid=1&width=256&height=256&cropMode=center",
    },
  ];

  //

  return (
    <div>
      {Auth.loggedIn() ? (
        <div className="bg-gray-900">
          <div className="mx-auto py-6 px-4 max-w-7xl sm:px-6 ">
            <div className="space-y-12">
              <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
                <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  Battle Pyro's Hatchling
                </h2>
                <p className="text-xl text-gray-300"></p>
              </div>
              <ul className="space-y-4 ">
                {enemies.map((enemy) => (
                  <li
                    key={enemy.name}
                    className="py-10 px-6 bg-gray-800 text-center align-center rounded-lg "
                  >
                    <div className="space-y-6 xl:space-y-10">
                      <div className="result">
                        <p className="text-white">{result}</p>
                      </div>

                      <div className="inline-flex mx-auto">
                        <div>
                          <progress
                            className="h-10 "
                            id="userHealthBar"
                            value={initialHealth}
                            max={initialHealth}
                          ></progress>
                          <p className="-mt-9 mb-5 text-white flex justify-center">
                            Health: {userHealth}
                          </p>
                          <img
                            id="userIcon"
                            className=" mx-auto h-40 w-40 rounded border-4 border-black xl:w-56 xl:h-56"
                            src="https://bn1303files.storage.live.com/y4mJyU2GJmDnv5nmFVwhxScRBNDB9WJgZMMC3Wbqi8Fi7JZfbkiOFJRi1aZZTRaTOf4EnmkFfnJjBDytJRwv9NW5fAwJxJtKzne9Dm3tfzpFnUuS0xRmGG3NCmUcvuQeJt--_iYvli6aCx6TaF_jhJIxLgtCRNrH92uWPSqtpnHxG2UY9Vgpxn6P1FEhFqLE8XU0tBcqlZXnHQs4Wa7E0Tj2A/Male_18_R.png?psid=1&width=188&height=188&cropMode=center"
                            alt=""
                          />
                        </div>
                        <span className="text-white align-center px-4 mt-2">
                          VS
                        </span>
                        <div>
                          <progress
                            className="h-10 "
                            id="bossHealthBar"
                            value="100"
                            max="100"
                          ></progress>
                          <p className="-mt-9 mb-5 text-white flex justify-center">
                            Health: {bossHealth}
                          </p>

                          <img
                            id="bossIcon"
                            className="mx-auto h-40 w-40 rounded border-4 border-black xl:w-56 xl:h-56"
                            src={enemy.imageUrl}
                            alt=""
                          />
                        </div>
                      </div>

                      {/* <img
                  className="mx-auto w-1/4"
                  src={`../../images/${userAbility}.png`}
                  alt=""
                /> */}

                      <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                        <div className="font-medium  break-words text-lg leading-6 space-y-1">
                          <h3 className="text-white">{turnResult}</h3>

                          <div className="button-div">
                            {choices.map((choice, index) => (
                              <button
                                className="inline-flex text-wrap items-center justify-center border w-1/4  mx-2 border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-900 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                key={index}
                                onClick={() => handleClick(choice)}
                                disabled={gameOver}
                              >
                                <div>
                                  <img
                                    className="flex justify-center mx-auto"
                                    src={`../../images/${choice}.png`}
                                    alt=""
                                  />
                                  {choice}
                                </div>
                              </button>
                            ))}
                          </div>

                          <div className="button-div">
                            {gameOver && (
                              <button
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-900 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={() => reset()}
                              >
                                Fight Another boss?
                              </button>
                            )}
                          </div>
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

export default BossBattle;
