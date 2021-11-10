import React, { useState } from 'react'
import { QUERY_MAGE_ATTRIBUTES } from "../../utils/queries"
import { useQuery } from '@apollo/client';


const Gathering = () => {

  const [count, setCount] = useState();

  // Query for mageAttributes
  const { loading, data } = useQuery(QUERY_MAGE_ATTRIBUTES, {
    onCompleted: data => setCount(data.mage[0].arcana)
  })


  // Create handler for button
  const handleClick = () => {
    setCount((count + 1));

    console.log(`New value of count: ${count}`);
    console.log("Arcana +1")
  };

return (
  <div>
    <h3>Gathering</h3>
    <p>Arcana: {count}</p>
    <div className='button-div'>
      <button className='button' onClick={handleClick}>
        Gather Arcana
      </button>
    </div>
  </div>
);

}
export default Gathering