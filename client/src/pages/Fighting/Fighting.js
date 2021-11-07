import React from 'react';
import BossBattle from './BossBattle';
import { Link } from 'react-router-dom';
import MinionBattle from './MinionBattle';

const Fighting = () =>{
  return (
    <div>
      <h3>Fighting</h3>
      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <Link to="/BossBattle">Boss Battle</Link>
        </button>
        <button className ="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
       <Link to="/MinionBattle">Minion Battle</Link>
        </button>
    </div>
  );
}
export default Fighting;