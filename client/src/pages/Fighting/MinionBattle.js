import React, { useEffect, useState } from "react";

const successSentences = [
  "Your Spell has Landed, and it was Supper Effective!",
  "A Remarkable shot, The minion has been hurt greatly",
];
const failureSentences = [
  "Your Spell Missed, The minion attacks you!",
  "Your spell was not very effective, and you have been punished",
];
const tieSentences = ["Your spell slightly landed, dealing reduced damage ", "Your spell was slightly effective"];

function damageMinion(){
  document.getElementById("minionIcon").classList.remove("animate-wiggle")
}

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

const MinionBattle = () => {
  const [userAbility, setUserAbility] = useState(null);
  const [minionAbility, setMinionAbility] = useState(null);
  const [userHealth, setUserHealth] = useState(20);
  const [minionHealth, setMinionHealth] = useState(10);
  const [turnResult, setTurnResult] = useState(null);
  const [result, setResult] = useState("Battle In Progress");
  const [gameOver, setGameOver] = useState(false);
  const choices = ["Bolt", "Blast", "Nova"];

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
    if (userHealth > 0 && minionHealth > 0) {
      if (
        comboMoves === "NovaBlast" ||
        comboMoves === "BoltNova" ||
        comboMoves === "BlastBolt"
      ) {
        const minionDamaged = minionHealth - 5;
        setMinionHealth(minionDamaged);
        setTurnResult(showRandomSuccessSentence());
        document.getElementById("minionIcon").classList.add("animate-wiggle")
        setTimeout(damageMinion(),1000)
        if (minionDamaged <= 0) {
          setResult("You have Defeated the Minion!");
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
        const userDamaged = userHealth - 5;
        setUserHealth(userDamaged);
        setTurnResult(showRandomFailureSentence());
        if (userDamaged <= 0) {
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
        const minionDamaged = minionHealth - 2.5;
        setMinionHealth(minionDamaged);
        setTurnResult(showRandomTieSentence());
        document.getElementById("minionIcon").classList.add("animate-wiggle")
        setTimeout(damageMinion(),1000)
        if (minionDamaged <= 0) {
          setResult("You have Defeated the Minion!");
          const gameOff = true;
          setGameOver(gameOff);
        }
      }
    }
  }, [minionAbility, userAbility]);
  const enemies = [
    {
      name: "Pyro's Hatchlings ",
      pathName: "MinionBattle",
      link: "Battle Minnions",
      imageUrl:
        "https://bn1303files.storage.live.com/y4mbYENwrUcn-6FQDA5igqNOixmNCG3sjVSRWV24I0c_zD6ORnaOL3s3X7b4hg7-kKQwV76s4c85PObcRDCWhhqq73VjDMkXghzVszkXABYQnU17apgTyphn7PwJlG6mbORxvEwa8aWrdvNTjv0-QA_e1wMATtTi-1hFZHWJx4wF4DdshvazJAmZ-JEtX0EK3Kild4b465b2quiJqVMTJ5D8g/SpellBook03_20.png?psid=1&width=256&height=256&cropMode=center",
    },
  ];
  //   return (
  //     <div className="App">
  //       <h1 className='heading'>Minion Battle</h1>
  //       <div className='score'>
  //         <h1>Health: {userHealth}</h1>
  //         <h1>Minion Health: {minionHealth}</h1>
  //       </div>

  // <div className='choice'>
  // <div className='choice-user'>
  //   <img className='user-choice' src={`../images/${userAbility}.png`} alt=''></img>
  // </div>
  //         <div className='choice-computer'>
  //           <img className='computer-choice' src={`../images/${minionAbility}.png`} alt=''></img>
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
            className="space-y-4 "
          >
            {enemies.map((enemy) => (
              <li
                key={enemy.name}
                className="py-10 px-6 bg-gray-800 text-center rounded-lg xl:px-10 xl:text-left"
              >
                <div className="space-y-6 xl:space-y-10">

                  <div className="inline-flex mx-auto">
                 <div>
                 <p className="text-indigo-400 flex justify-center">
                    Health: {userHealth}
                  </p>
                  <img id="userIcon"
                    className="animate-wiggle mx-auto h-40 w-40 rounded border-4 border-black xl:w-56 xl:h-56"
                    src="https://bn1303files.storage.live.com/y4mJyU2GJmDnv5nmFVwhxScRBNDB9WJgZMMC3Wbqi8Fi7JZfbkiOFJRi1aZZTRaTOf4EnmkFfnJjBDytJRwv9NW5fAwJxJtKzne9Dm3tfzpFnUuS0xRmGG3NCmUcvuQeJt--_iYvli6aCx6TaF_jhJIxLgtCRNrH92uWPSqtpnHxG2UY9Vgpxn6P1FEhFqLE8XU0tBcqlZXnHQs4Wa7E0Tj2A/Male_18_R.png?psid=1&width=188&height=188&cropMode=center"
                    alt=""
                  />
                  </div>
                  <a className="text-white align-center mt-20">VS</a>
                  <div>
                  <p className="text-indigo-400 flex justify-center">
                    Minion Health: {minionHealth}
                  </p>
                  
                  <img id ="minionIcon"
                    className="mx-auto h-40 w-40 rounded border-4 border-black xl:w-56 xl:h-56"
                    src={enemy.imageUrl}
                    alt=""
                  />
                  </div>
</div>
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
                              <img className="flex justify-center" src={`../../images/${choice}.png`} />
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

export default MinionBattle;
