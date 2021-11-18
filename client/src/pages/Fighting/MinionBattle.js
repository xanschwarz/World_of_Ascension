import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import { ADD_SCALE } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../../utils/auth';

//placeholder for the values, need to change each to be able to take in the value to start but not update
// initialHealth = (20 * Math.pow(5, data?.me.cloak));
const initialHealth = 20;
//   initial aP =(4* (Math.pow(5, data?.me.ring) / 5));
const aP = 4;

//sentences listed after the round, stating a win, loss or draw
const successSentences = [
  'Your Spell has Landed, and it was Supper Effective!',
  'A Remarkable shot, The minion has been hurt greatly',
];
const failureSentences = [
  'Your Spell Missed, The minion attacks you!',
  'Concentrate, your poor choice has hurt you',
];
const tieSentences = [
  'Your spell slightly landed, dealing reduced damage ',
  'Your spell was slightly effective',
];

//functions to call the sentences
function showRandomTieSentence() {
  const randomNumber = Math.floor(Math.random() * tieSentences.length);
  return tieSentences[randomNumber];
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
  let health = document.getElementById('userHealthBar');
  health.value -= 5;
}

//visual change of minion health bar
function minionHpDamagedFull() {
  let health = document.getElementById('minionHealthBar');
  health.value -= aP;
}
function minionHpDamagedHalf() {
  let health = document.getElementById('minionHealthBar');
  health.value -= aP / 2;
}

//animations for the user and minion
function addMinionDamagedAnimation() {
  document.getElementById('minionIcon').classList.add('animate-wiggle');
}

function removeMinionDamagedAnimation() {
  document.getElementById('minionIcon').classList.remove('animate-wiggle');
}

function addUserDamagedAnimation() {
  document.getElementById('userIcon').classList.add('animate-wiggle');
}

function removeUserDamagedAnimation() {
  document.getElementById('userIcon').classList.remove('animate-wiggle');
}

const MinionBattle = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
    onCompleted: (data) => {
      setScale(data.me.scale);
      console.log(scale);
    },
  });

  // const healthCoefficient = data?.me.maxHealth * Math.pow(5, data?.me.cloak);
  const [userAbility, setUserAbility] = useState(null);
  const [minionAbility, setMinionAbility] = useState(null);
  const [userHealth, setUserHealth] = useState(initialHealth);
  const [attackPower, setAttackPower] = useState();
  const [minionHealth, setMinionHealth] = useState(10);
  const [turnResult, setTurnResult] = useState(null);
  const [result, setResult] = useState('Battle In Progress');
  const [gameOver, setGameOver] = useState(false);
  const [scale, setScale] = useState();
  const choices = ['Bolt', 'Blast', 'Nova'];

  const [addScale, { error }] = useMutation(ADD_SCALE);

  const handleClick = (value) => {
    setUserAbility(value);
    generateMinionAbility();
  };

  const generateMinionAbility = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setMinionAbility(randomChoice);
  };

  const reset = () => {
    window.location.reload();
  };

  useEffect(() => {
    const comboMoves = userAbility + minionAbility;
    //If the User chooses correctly
    // setScale(data?.me.scale || 0);

    // setUserHealth(20 * Math.pow(5, data?.me.cloak));
    // setUserHealth(20);

    // setAttackPower(
    //   data?.me.attackPower * (Math.pow(5, data?.me.ring) / 5));
    // setAttackPower(10);

    if (userHealth > 0 && minionHealth > 0) {
      if (
        comboMoves === 'NovaBlast' ||
        comboMoves === 'BoltNova' ||
        comboMoves === 'BlastBolt'
      ) {
        const minionDamaged = minionHealth - aP;
        minionHpDamagedFull();
        setMinionHealth(minionDamaged);
        setTurnResult(showRandomSuccessSentence());
        addMinionDamagedAnimation();
        setTimeout(() => {
          removeMinionDamagedAnimation();
        }, 1000);

        if (minionDamaged <= 0) {
          setResult('You have Defeated the Minion!');
          const gameOff = true;
          const currentScaleId = data.me._id;
          try {
            const { data } = addScale({
              variables: {
                id: currentScaleId,
              },
            });
            setScale(data.addScale.scale);
          } catch (error) {
            console.log(error);
          }
          setGameOver(gameOff);
        }
      }
      //If the User chooses incorrectly
      if (
        comboMoves === 'BlastNova' ||
        comboMoves === 'NovaBolt' ||
        comboMoves === 'BoltBlast'
      ) {
        const userDamaged = userHealth - 5;
        userHpDamaged();
        setUserHealth(userDamaged);
        setTurnResult(showRandomFailureSentence());
        addUserDamagedAnimation();
        setTimeout(() => {
          removeUserDamagedAnimation();
        }, 1000);
        if (userDamaged <= 0) {
          setResult('You have been Defeated');
          const gameOff = true;
          console.log('data', data.me.scale);
          setGameOver(gameOff);
        }
      }
      //If its a tie
      if (
        comboMoves === 'BlastBlast' ||
        comboMoves === 'BoltBolt' ||
        comboMoves === 'NovaNova'
      ) {
        const minionDamaged = minionHealth - aP / 2;
        minionHpDamagedHalf();
        setMinionHealth(minionDamaged);
        setTurnResult(showRandomTieSentence());
        addMinionDamagedAnimation();
        setTimeout(() => {
          removeMinionDamagedAnimation();
        }, 1000);
        if (minionDamaged <= 0) {
          setResult('You have Defeated the Minion!');
          const gameOff = true;
          const currentScaleId = data.me._id;
          try {
            const { data } = addScale({
              variables: {
                id: currentScaleId,
              },
            });
            setScale(data.addScale.scale);
          } catch (error) {
            console.log(error);
          }
          setGameOver(gameOff);
        }
      }
    }
  }, [minionAbility, userAbility]);
  const enemies = [
    {
      name: "Pyro's Hatchlings ",
      pathName: 'MinionBattle',
      link: 'Battle Minnions',
      imageUrl:
        'https://bn1303files.storage.live.com/y4mbYENwrUcn-6FQDA5igqNOixmNCG3sjVSRWV24I0c_zD6ORnaOL3s3X7b4hg7-kKQwV76s4c85PObcRDCWhhqq73VjDMkXghzVszkXABYQnU17apgTyphn7PwJlG6mbORxvEwa8aWrdvNTjv0-QA_e1wMATtTi-1hFZHWJx4wF4DdshvazJAmZ-JEtX0EK3Kild4b465b2quiJqVMTJ5D8g/SpellBook03_20.png?psid=1&width=256&height=256&cropMode=center',
    },
  ];

  return (
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
                        value={userHealth}
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
                    <a className="text-white align-center px-4 mt-2">VS</a>
                    <div>
                      <progress
                        className="h-10 "
                        id="minionHealthBar"
                        value="10"
                        max="10"
                      ></progress>
                      <p className="-mt-9 mb-5 text-white flex justify-center">
                        Health: {minionHealth}
                      </p>

                      <img
                        id="minionIcon"
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
                            Fight Another Minion?
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
  );
};

export default MinionBattle;
