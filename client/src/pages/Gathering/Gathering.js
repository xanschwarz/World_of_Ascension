import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import { ADD_ARCANA } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";



  



const Gathering = () => {
  const [arcana, setArcana] = useState();
  const { username: userParam } = useParams();


  // Query for mageAttributes
  const { data } = useQuery(userParam ? QUERY_USER : QUERY_ME , {
    variables: { username: userParam },
    onCompleted: (data) => setArcana(data.me.arcana),
  });
  
  const [addArcana, { error }] = useMutation(ADD_ARCANA);

  useEffect(() => {
    setArcana(data?.me.arcana || 0);
  }, []);
  console.log(data);
  // Create handler for button
  const handleClick = async (event) => {
    const currentArcanaId = data.me._id;
  
    event.preventDefault();
    try {
      const { data } = await addArcana({
        variables: {
          id: currentArcanaId,
        },
      });
      setArcana(data.addArcana.arcana);
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <div>
      <h3>Gathering</h3>
      <p className="text-white">Arcana: {arcana}</p>
      <div className="button-div">
        <button className="button text-white" onClick={handleClick}>
          Gather Arcana
        </button>
      </div>
    </div>
  );
};
export default Gathering;
