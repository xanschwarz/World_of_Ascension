import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import { ADD_150_ARCANA } from "../../utils/mutations";
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
    initialTime: 3600,
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

  const [addArcana, { error }] = useMutation(ADD_150_ARCANA);
  useEffect(() => {
    setArcana(data?.me.arcana || 0);
  }, [data]);
  // console.log(data);
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
      }, 3599500);
      addTimer();
      setTimeout(() => {
        removeTimer();
      }, 3600000);
      start();
      addGatherAnimation();
      setTimeout(() => {
        removeGatherAnimation();
      }, 3600000);
      addSunAnimation();
      setTimeout(() => {
        removeSunAnimation();
      }, 3600000);
      addButtonAnimation();
      setTimeout(() => {
        removeButtonAnimation();
      }, 3600000);
      setTimeout(() => {
        reset();
      }, 3599500);
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
              className="relative mx-auto mt-5 h-41 w-41 rounded-full"
              src="https://bn1303files.storage.live.com/y4mbozS6MJVK1F4y1ey3PHzRdsg_xsdPBaWhe2puNbxECfjauiPRn5FUnvCo6Vq1k6k4M6Eq6gOsVDD9Qke1GGK2ZrKHgZj7B-XNSDvyAcGI_NhVgjyexaPLFJzCYvMLEmXVkdfQyKEX9QJHu8FggJTJBcDcNVJBBGFLq00IinBfVAUB6LgSLSV0ZtPfUbepvHyR9pZnd6DDObz_Vr4E3ZMHA/SpellBook06_75.png?psid=1&width=256&height=256&cropMode=center"
              alt="Arcana"
            />
            <img
              id="arcanaImage"
              className="relative mx-auto -mt-52 h-40 w-40  rounded-full "
              src="https://bn1303files.storage.live.com/y4mvA9MRWdbrZMyBUd-U538DDuM3XjQ8nSL8oWPftYP8C-MQ0PeqIbvzVcfyFD01JI_1OyCvr59LohLb8-SoYioychT9n7sgWUxcNaludYbLreonqWSTxc0cUnv7Z1msybroxSk_KGZtzTJUkxgf4yP6AUfY-KIXl56t9DiFGbjsJdUfVLX9w9UKPDKSyseYOXsM1ewhwwfhbTZtBJUxWYcxg/SpellBook06_58.png?psid=1&width=140&height=140&cropMode=center"
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
