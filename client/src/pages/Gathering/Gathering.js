import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import { ADD_ARCANA } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import ModalContainer from "../../components/Modal/ModalContainer";

function addGatherAnimation() {
  document.getElementById("arcanaImage").classList.add("animate-spin");
}

function removeGatherAnimation() {
  document.getElementById("arcanaImage").classList.remove("animate-spin");
}

function addButtonAnimation() {
  document.getElementById("gatherButton").classList.add("hidden");
}

function removeButtonAnimation() {
  document.getElementById("gatherButton").classList.remove("hidden");
}

const Gathering = () => {
  const [arcana, setArcana] = useState();
  const { username: userParam } = useParams();

  // Query for mageAttributes
  const { data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
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
      addGatherAnimation();
      setTimeout(() => {
        removeGatherAnimation();
      }, 5000);
      addButtonAnimation();
      setTimeout(() => {
        removeButtonAnimation();
      }, 5000);
      setTimeout(() => {
        setArcana(data.addArcana.arcana);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <div>
          <img
            id="arcanaImage"
            className="mx-auto h-40 w-40 rounded-full border-4 border-black xl:w-56 xl:h-56"
            src="https://bn1303files.storage.live.com/y4m4aC5V7U5xCwrRaNBavZfxa6Mj8RxliXU5q4PpIGkjoaMWQzTjE98mbOHnOJLl3FhOJqhzI-DFN5iwbb_ALGRZHJ3lZlQ0xVDCb-EGFSbjZ9yH4osWC3No5dAO2iGFv3ACrhAZLli4VPR3cm1tk6K0UaqPlGOP9a3xSV1CSmFRhzBMqb7P-X6gFoFo6faXgrJmqEXRnk3qUNaqrb_sqMiwQ/SpellBook07_18.png?psid=1&width=152&height=152&cropMode=center"
            alt=""
          />
          <div id="gatherButton" className="button-div flex justify-center">
            <button className="button  text-white" onClick={handleClick}>
              Gather Arcana
            </button>
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

export default Gathering;
