import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import { ADD_ARCANA } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import ModalContainer from "../../components/Modal/ModalContainer";
import { setArcana } from "../../components/StatsBar";
import { useTimer } from "use-timer";

//animation section
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
function removeTimer() {
  document.getElementById("timer").classList.add("hidden");
}

function addTimer() {
  document.getElementById("timer").classList.remove("hidden");
}
const reset = () => {
  window.location.reload();
};

const Gathering = () => {
  const { time, start } = useTimer({
    initialTime: 5,
    timerType: "DECREMENTAL",
    endTime: 0,
  });
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
      }, 5500);
      addTimer();
      setTimeout(() => {
        removeTimer();
      }, 6000);
      start();
      addGatherAnimation();
      setTimeout(() => {
        removeGatherAnimation();
      }, 6000);
      addSunAnimation();
      setTimeout(() => {
        removeSunAnimation();
      }, 6000);
      addButtonAnimation();
      setTimeout(() => {
        removeButtonAnimation();
      }, 6000);
      setTimeout(() => {
        reset();
      }, 5500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <div className="gathering">
          <div className="relative mb-20">
            <img
              id="sunImage"
              className="relative mx-auto mt-5 h-64 w-64 rounded-full"
              src="https://bn1303files.storage.live.com/y4pv0nX1QaRDNFblh6DkPH4opBOK_Cmq-vCIHRmrptEvfOs_mOyon1jR-bSAX3DL4e4yvfz3x5EZXp9R8Wjg8myQUbW_xyOSfshRh9CVR7X82XkxnxglqPc5f99H-tP6-vsx-PIYGi5DkDaGHCUkT6PnkcnQy5Gix6wLVqdZR9JAwsYTZyg4uo7LsSuApkvsSa8YJ4I2SV45Q_EZq66ZpExKg07dYGxFgczkz27dtByAow/SpellBookPage09_43.PNG?psid=1&width=181&height=181&cropMode=center"
              alt="Arcana"
            />
            <img
              id="arcanaImage"
              className="relative mx-auto -mt-52 h-40 w-40  rounded-full "
              src="https://bn1303files.storage.live.com/y4pYwuTWNor9QaMWCIqG39e9dLunr1_CXyqInhqh2VxHuV2GzKLJk-SrpsSE3AFws2F76xhaLABMYHuyDsefp1IP6cP1Us2Y1BMDqgwt86chuv9jH9LFnXsKdZ9SY83NWPWItIaL6gfEqeXw895D1sly8Enqj3wupGqoIulJyub3jFhZdjQBhGQ0X4DhK9BUFNwm0P0T_8nHM99Py65fF-LVSJOluPdWrJfDeCb6k1XFak/SpellBookPage09_10.PNG?psid=1&width=181&height=181&cropMode=center"
              alt=""
            />
          </div>

          <div
            id="gatherButton"
            className="mb-5 button-div flex justify-center"
          >
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleClick}
            >
              Gather Arcana
            </button>
          </div>
          <div className="flex justify-center">
            <span
              id="timer"
              className="text-center flex align-center justify-center  px-6 mb-5 py-3 border border-transparent font-medium rounded-md shadow-sm text-white bg-indigo-600  hidden
          "
            >
              {" "}
              {time}
            </span>
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
