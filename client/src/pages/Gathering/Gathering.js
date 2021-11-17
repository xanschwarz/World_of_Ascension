import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import { ADD_ARCANA } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import ModalContainer from "../../components/Modal/ModalContainer";
import { setArcana } from "../../components/StatsBar";

function addGatherAnimation() {
  document.getElementById("arcanaImage").classList.add("animate-spin");
}

function removeGatherAnimation() {
  document.getElementById("arcanaImage").classList.remove("animate-spin");
}
function addSunAnimation() {
  document.getElementById("sunImage").classList.add("animate-reverseSpin");
}

function removeSunAnimation() {
  document.getElementById("sunImage").classList.remove("animate-reverseSpin");
}

function addButtonAnimation() {
  document.getElementById("gatherButton").classList.add("hidden");
}

function removeButtonAnimation() {
  document.getElementById("gatherButton").classList.remove("hidden");
}
const reset = () => {
  window.location.reload();
};

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
  }, [data]);
  console.log(data);
  // Create handler for button
  const handleClick = async (event) => {
    const currentArcanaId = data.me._id;
    event.preventDefault();

    try {
      const { data } = await setTimeout(() => {
        addArcana({
          variables: {
            id: currentArcanaId,
          },
        });
      }, 5000);
      addGatherAnimation();
      setTimeout(() => {
        removeGatherAnimation();
      }, 5000);
      addSunAnimation();
      setTimeout(() => {
        removeSunAnimation();
      }, 5000);
      addButtonAnimation();
      setTimeout(() => {
        removeButtonAnimation();
      }, 5000);
      setTimeout(() => {
        reset();
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <div className="gathering">
          <div class="relative mb-20">
            <img
              id="sunImage"
              className="relative mx-auto mt-5 h-41 w-41 rounded-full"
              src="https://bn1303files.storage.live.com/y4pq8X5LqtFHD10_eJH_4a65nOmqkuHePgxfFTF0672ugKjJXu3Xu7urMeVh4SZtUXV3eb089mEeBSm2MuSvYZSN5dsRy4f77JCdP_lz8TWKd839qvlfNi8KDoDW7T_ZryaSeBK-26erqtUlb5UuM9G77sWFJSmw4KznmmIEpICoyrWkkvHaqkzLvsErH2QiNKaZYR1Y7WZ6aN24jWxEZoUScYxyPwfxao1t6fdEUfm7p4/b_39.PNG?psid=1&width=256&height=256&cropMode=center"
              alt="Arcana"
            />
            <img
              id="arcanaImage"
              className="relative mx-auto -mt-52 h-40 w-40  rounded-full "
              src="https://bn1303files.storage.live.com/y4m4aC5V7U5xCwrRaNBavZfxa6Mj8RxliXU5q4PpIGkjoaMWQzTjE98mbOHnOJLl3FhOJqhzI-DFN5iwbb_ALGRZHJ3lZlQ0xVDCb-EGFSbjZ9yH4osWC3No5dAO2iGFv3ACrhAZLli4VPR3cm1tk6K0UaqPlGOP9a3xSV1CSmFRhzBMqb7P-X6gFoFo6faXgrJmqEXRnk3qUNaqrb_sqMiwQ/SpellBook07_18.png?psid=1&width=152&height=152&cropMode=center"
              alt=""
            />
          </div>

          <div id="gatherButton" className="button-div flex justify-center">
            <button
              type="button"
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleClick}
            >
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
