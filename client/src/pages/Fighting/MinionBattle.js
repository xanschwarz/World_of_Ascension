import React, { useEffect, useState } from 'react'

const successSentences = ['Your Spell has Landed, and it was Supper Effective!', 'A Remarkable shot, The minion has been hurt greatly']
const failureSentences = ['Your Spell Missed, The minion attacks you!', 'Your spell was not very effective, and you have been punished']
const tieSenetences = ['Your spell slightly landed, dealing ', '']

function showRandomTieSentence() {
  const randomNumber = Math.floor(Math.random() * tieSenetences.length)
  return tieSenetences[randomNumber]
}

function showRandomSuccessSentence() {
  const randomNumber = Math.floor(Math.random() * successSentences.length)
  return successSentences[randomNumber]
}
function showRandomFailureSentence() {
  const randomNumber = Math.floor(Math.random() * failureSentences.length)
  return failureSentences[randomNumber]
}

const MinionBattle = () => {
  const [userAbility, setUserAbility] = useState(null)
  const [minionAbility, setMinionAbility] = useState(null)
  const [userHealth, setUserHealth] = useState(20)
  const [minionHealth, setMinionHealth] = useState(10)
  const [turnResult, setTurnResult] = useState(null)
  const [result, setResult] = useState('Battle In Progress')
  const [gameOver, setGameOver] = useState(false)
  const choices = ['Bolt', 'Blast', 'Nova']

  const handleClick = (value) => {
    setUserAbility(value)    
    generateMinionAbility()
  }

  const generateMinionAbility = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)]
    setMinionAbility(randomChoice)
  }

  const reset = () => {
    window.location.reload()
  }

  useEffect(() => {
    const comboMoves = userAbility + minionAbility
    //If the User chooses correctly
    if (userHealth > 0 && minionHealth > 0) {
      if (comboMoves === 'NovaBlast' || comboMoves === 'BoltNova' || comboMoves === 'BlastBolt') {
        const minionDamaged = minionHealth - 5
        setMinionHealth(minionDamaged)
        setTurnResult(showRandomSuccessSentence())
        if (minionDamaged <= 0){
          setResult('You have Defeated the Minion!')
          const gameOff = true
          setGameOver(gameOff)
        }
      }
      //If the User chooses incorrectly
      if (comboMoves === 'BlastNova' || comboMoves === 'NovaBolt' || comboMoves === 'BoltBlast') {
        const userDamaged = userHealth - 5
        setUserHealth(userDamaged)
        setTurnResult(showRandomFailureSentence())
        if (userDamaged <= 0) {
          setResult('You have been Defeated')
          const gameOff = true
          setGameOver(gameOff)
        }
      }
      //If its a tie
      if (comboMoves === 'BlastBlast' || comboMoves === 'BoltBolt' || comboMoves === 'NovaNova') {
        const minionDamaged = minionHealth - 2.5
        setMinionHealth(minionDamaged)
        setTurnResult(showRandomTieSentence())
        if (minionDamaged <= 0){
          setResult('You have Defeated the Minion!')
          const gameOff = true
          setGameOver(gameOff)
        }
      }
    }
  }, [minionAbility, userAbility])

  return (
    <div className="App">
      <h1 className='heading'>Minion Battle</h1>
      <div className='score'>
        <h1>Health: {userHealth}</h1>
        <h1>Minion Health: {minionHealth}</h1>
      </div>

      <div className='choice'>
        <div className='choice-user'>
          <img className='user-hand' src={`../images/${userAbility}.png`} alt=''></img>
        </div>
        <div className='choice-computer'>
          <img className='computer-hand' src={`../images/${minionAbility}.png`} alt=''></img>
        </div>
      </div>
      
      <div className='button-div'>
        {choices.map((choice, index) =>
          <button className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' key={index} onClick={() => handleClick(choice)} disabled={gameOver}>
            {choice} 
          </button>
        )}
      </div>
      
      <div className='result'>
        <h1>{turnResult}</h1>
        <h1>{result}</h1>
      </div>
      
      <div className='button-div'>
        {gameOver && 
          <button className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' onClick={() => reset()}>Restart Game?</button>
        }
      </div>
    </div>
  )
}

export default MinionBattle