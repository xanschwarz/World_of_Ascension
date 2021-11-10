import React, { useEffect, useState } from "react";

const successSentences = ["You have damaged the Boss", "A Remarkable shot"];
const failureSentences = [
  "Pyro Counter attacks",
  "Pyro dodges, and Swiftly attacks you",
];
const tieSenetences = [
  "Your spell didn't even cause a scratch",
  "The Boss Laughs at you",
];

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

const BossBattle = () => {
  const [userAbility, setUserAbility] = useState(null);
  const [bossAbility, setBossAbility] = useState(null);
  const [userHealth, setUserHealth] = useState(20);
  const [bossHealth, setBossHealth] = useState(100);
  const [turnResult, setTurnResult] = useState(null);
  const [result, setResult] = useState("Battle In Progress");
  const [gameOver, setGameOver] = useState(false);
  const choices = ["Bolt", "Blast", "Nova"];

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
        const bossDamaged = bossHealth - 5;
        setBossHealth(bossDamaged);
        setTurnResult(showRandomSuccessSentence());
        if (bossDamaged === 0) {
          setResult("You have Defeated the Dragon!");
          const gameOff = true;
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
        setUserHealth(userDamaged);
        setTurnResult(showRandomFailureSentence);
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

  //   return (
  //     <div className="App">
  //       <h1 className='heading'>Dragon Battle</h1>
  //       <div className='score'>
  //         <h1>Health: {userHealth}</h1>
  //         <h1>Dragon Health: {bossHealth}</h1>
  //       </div>

  //       <div className='choice'>
  //         <div className='choice-user'>
  //           <img className='user-choice' src={`../images/${userAbility}.png`} alt=''></img>
  //         </div>
  //         <div className='choice-computer'>
  //           <img className='computer-choice' src={`../images/${bossAbility}.png`} alt=''></img>
  //         </div>
  //       </div>

  //       <div className='button-div'>
  //         {choices.map((choice, index) =>
  //           <button className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-900 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' key={index} onClick={() => handleClick(choice)} disabled={gameOver}>
  //             {choice}
  //           </button>
  //         )}
  //       </div>

  //       <div className='result'>
  //         <h1>{turnResult}</h1>
  //         <h1>{result}</h1>
  //       </div>

  //       <div className='button-div'>
  //         {gameOver &&
  //           <button className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-900 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' onClick={() => reset()}>Restart Game?</button>
  //         }
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="bg-gray-900">
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
              Battle Pyro's Hatchling
            </h2>
            <p className="text-xl text-gray-300"></p>
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
                  <p className="text-indigo-400 flex justify-center">
                    Boss Health: {bossHealth}
                  </p>
                  <img
                    className="mx-auto h-40 w-40 rounded border-4 border-black xl:w-56 xl:h-56"
                    src={enemy.imageUrl}
                    alt=""
                  />
                  <p className="text-indigo-400 flex justify-center">
                    Health: {userHealth}
                  </p>
                  {/* ${userAbility} */}

                  <img
                    className="mx-auto w-1/4"
                    src={`../../images/${userAbility}.png`}
                    alt=""
                  />

                  <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                    <div className="font-medium text-lg leading-6 space-y-1">
                      <h3 className="text-white">{turnResult}</h3>

                      <div className="button-div">
                        {choices.map((choice, index) => (
                          <button
                            className="inline-flex items-center border w-1/4  mx-2 border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-900 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            key={index}
                            onClick={() => handleClick(choice)}
                            disabled={gameOver}
                          >
                            <div>
                              <img src={`../../images/${choice}.png`} />
                              {choice}
                            </div>
                          </button>
                        ))}
                      </div>

                      <div className="result">
                        <p className="text-white">{result}</p>
                      </div>

                      <div className="button-div">
                        {gameOver && (
                          <button
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-900 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => reset()}
                          >
                            Restart Game?
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

export default BossBattle;
