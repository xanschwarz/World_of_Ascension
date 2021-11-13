import React, { useState, useEffect } from "react";
import { QUERY_MAGE_ATTRIBUTES } from "../../utils/queries";
import { ADD_ARCANA } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";

const Gathering = () => {
  const [arcana, setArcana] = useState();

  // Query for mageAttributes
  const { loading, data } = useQuery(QUERY_MAGE_ATTRIBUTES, {
    onCompleted: (data) => setArcana(data.mage[0].arcana),
  });

  const [addArcana, { error }] = useMutation(ADD_ARCANA);

  useEffect(() => {
    setArcana(data?.mage[0].arcana || 0);
  }, []);

  // Create handler for button
  const handleClick = async (event) => {
    const currentArcanaId = data.mage[0]._id;
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
