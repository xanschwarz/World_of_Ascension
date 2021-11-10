import React, { useEffect, useState } from 'react'

const successSentences = ['You have damaged the Boss', 'A Remarkable shot']
const failureSentences = ['Your Spell Missed!', 'Your spell was not very effective']
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

const BossBattle = () => {
  const [userAbility, setUserAbility] = useState(null)
  const [bossAbility, setBossAbility] = useState(null)
  const [userHealth, setUserHealth] = useState(20)
  const [bossHealth, setBossHealth] = useState(100)
  const [turnResult, setTurnResult] = useState(null)
  const [result, setResult] = useState('Battle In Progress')
  const [gameOver, setGameOver] = useState(false)
  const choices = ['Bolt', 'Blast', 'Nova']

  const handleClick = (value) => {
    setUserAbility(value)    
    generateBossAbility()
  }

  const generateBossAbility = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)]
    setBossAbility(randomChoice)
  }

  const reset = () => {
    window.location.reload()
  }

  useEffect(() => {
    const comboMoves = userAbility + bossAbility
    //If the User chooses correctly
    if (userHealth > 0 && bossHealth > 0) {
      if (comboMoves === 'NovaBlast' || comboMoves === 'BoltNova' || comboMoves === 'BlastBolt') {
        const bossDamaged = bossHealth - 5
        setBossHealth(bossDamaged)
        setTurnResult(showRandomSuccessSentence())
        if (bossDamaged === 0){
          setResult('You have Defeated the Dragon!')
          const gameOff = true
          setGameOver(gameOff)
        }
      }
      //If the User chooses incorrectly
      if (comboMoves === 'BlastNova' || comboMoves === 'NovaBolt' || comboMoves === 'BoltBlast') {
        const userDamaged = userHealth - 20
        setUserHealth(userDamaged)
        setTurnResult(showRandomFailureSentence)
        if (userDamaged === 0) {
          setResult('You have been Defeated')
          const gameOff = true
          setGameOver(gameOff)
        }
      }
      //If its a tie
      if (comboMoves === 'BlastBlast' || comboMoves === 'BoltBolt' || comboMoves === 'NovaNova') {
        setTurnResult(showRandomTieSentence)
      }
    }
  }, [bossAbility, userAbility])

  return (
    <div className="App">
      <h1 className='heading'>Dragon Battle</h1>
      <div className='score'>
        <h1>Health: {userHealth}</h1>
        <h1>Dragon Health: {bossHealth}</h1>
      </div>

      <div className='choice'>
        <div className='choice-user'>
          <img className='user-hand' src={`../images/${userAbility}.png`} alt=''></img>
        </div>
        <div className='choice-computer'>
          <img className='computer-hand' src={`../images/${bossAbility}.png`} alt=''></img>
        </div>
      </div>
      
      <div className='button-div'>
        {choices.map((choice, index) =>
          <button className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-900 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' key={index} onClick={() => handleClick(choice)} disabled={gameOver}>
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
          <button className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-900 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' onClick={() => reset()}>Restart Game?</button>
        }
      </div>
    </div>
  )
}

export default BossBattle