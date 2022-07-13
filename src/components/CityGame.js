import "../App.css";

import React, { useState, useEffect } from "react";
import Select from "react-select"; //for my select dropdown
import "bootstrap/dist/css/bootstrap.min.css"; //leatest v5
import Section from "./Section"; //shows country info
//import { countryData, createCities } from "../Assets/cities"; //datalist of countries
import {
  maoriPlaceNamesData,
  createMaoriPlacenames,
} from "../Assets/maoriPlaceNames"; //datalist of MaoriPlacenames
import Swal from "sweetalert2"; //makes cool popups.

const CityGame = () => {
  const [allData, setAllData] = useState(maoriPlaceNamesData); //all the data of the countries

  const [gameData, setGameData] = useState({
    //for the game being currently played
    Placename: "Start",
    Components: "Start",
    Meaning: "Start",
  });
  const [selectedCity, setSelectedCity] = useState(null); //selected city
  const [number, setNumber] = useState(0); //random number
  const [citiesCorrect, setCitiesCorrect] = useState(["Correct"]);
  const [citiesWrong, setCitiesWrong] = useState(["Incorrect"]);
  const [toggleTextIsHidden, setToggleTextIsHidden] = useState("true");
  const [selectCityData, setSelectCityData] = useState(createMaoriPlacenames);

  //this run only at the initial stage, AFTER the dom has loaded ,[] at the end makes it run once
  useEffect(() => {
    //https://javascript.plainenglish.io/what-is-the-equivalent-of-the-componentdidmount-method-in-a-react-function-hooks-component-703df5aed7f6
    //https://dmitripavlutin.com/react-useeffect-explanation/
    //https://daveceddia.com/useeffect-hook-examples/

    const fetchData = () => {
      setAllData(maoriPlaceNamesData);
      setSelectCityData(createMaoriPlacenames);
      console.log("useEffect allData ", allData);
      console.log("useEffect selectCityData ", selectCityData);
      LoadGamedata();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchData();
  }, []);

  // this runs whenever cityData changes
  // useEffect(() => {
  //   setSelectCityData(createCities);
  //   // console.log("useEffect allcities ", selectCityData);
  // }, [createCities]);

  const onClickHandlerNewGame = () => {
    console.log("onClickHandlerNewGame", "triggered");
    LoadGamedata();

    console.log("onClickHandlerNewGame Random number", number);
    console.log("onClickHandlerNewGame Selected Country Data", allData[number]);
  };
  const CheckForWinnerLoser = () => {
    console.log("CheckForWinnerLoser gameData.CapitalName", gameData.Placename);
    setToggleTextIsHidden("true"); //hide the text

    console.log("CheckForWinnerLoser selectedCity", selectedCity);

    if (selectedCity != null && gameData.Placename !== null) {
      if (selectedCity === gameData.Placename) {
        alertItemName("Yes! You win! The place is " + selectedCity);
        // pass in the citiescorrect state, spread it,  and pass both to setCitiesCorrect
        setCitiesCorrect((citiesCorrect) => [...citiesCorrect, selectedCity]);
      } else {
        alertItemName(
          "Nope, Sorry. The place is " +
            gameData.Meaning +
            " " +
            gameData.Components +
            " not " +
            selectedCity +
            ", good guess though"
        );
        // pass in the citiesWrong state, spread it,  and pass both to setCitiesWrong
        setCitiesWrong((citiesWrong) => [
          ...citiesWrong,
          selectedCity + " is not " + gameData.Meaning,
        ]);
      }
    }
  };

  //win lose toast message
  // const showToastWithGravity = (msg) => {
  //   ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  // };

  //getting the random number to select the current country data
  const GetRandomNUmber = () => {
    var randomNumber = getRandomNumberBetween(0, allData.length - 1);
    setNumber(randomNumber);
  };

  const getRandomNumberBetween = (min, max) => {
    console.log("getRandomNumberBetween allData.length", max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const LoadGamedata = () => {
    GetRandomNUmber();
    // var Length =  allData.length;
    // setNumber({ GetRandomNumber(length = Length)});

    allData.map((item, id) => {
      var selecteditem = allData[number]; //get the data at that point
      setGameData({
        Placename: selecteditem.Placename,
        Components: selecteditem.Components,
        Meaning: selecteditem.Meaning,
      });
    });
  };

  const onClickSubmit = () => {
    CheckForWinnerLoser();
  };
  const alertItemName = (item) => {
    Swal.fire({
      title: "Did you guess correctly?",
      text: item,
      icon: "question",
      confirmButtonText: "Cool",
      toast: "OK",
      position: "top",
      timer: "7000",
      showCloseButton: "false",
    });

    // alert(item);
  };
  const handleCityChange = (e) => {
    console.log(" handleChange city Selected!!", e.value);
    setSelectedCity(e.value);
    setToggleTextIsHidden("false"); //unhide the text
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          <button
            className='buttonSubmit btn btn-default'
            onClick={onClickHandlerNewGame}
          >
            Choose a random Place
          </button>
        </div>
        <div className='col'>
          {/* We need to show and hide the text below */}

          <div className='headingoutome'>
            {toggleTextIsHidden === "false"
              ? "You have chosen " + selectedCity
              : "Select a Place Name"}
          </div>

          <Select
            options={selectCityData}
            className='optioncity'
            value={selectedCity}
            onChange={handleCityChange}
          />
        </div>
        <div className='col'>
          <button
            className='buttonSubmit btn btn-default'
            onClick={onClickSubmit}
          >
            Submit your answer
          </button>
        </div>
        <Section className='sectionTitle' props={gameData} />
        <div className='container'>
          {/* <div className='headingoutome'>Results</div> */}
          <div className='row'>
            <div className='resultcontainer'>
              <div className='col'>
                {/* <div className='headingoutome'>Correct Cities</div> */}
                {citiesCorrect.map((item) => {
                  return (
                    <div className='cardBody' key={item}>
                      {item}
                    </div>
                  );
                })}
              </div>
              <div className='col'>
                {/* <div className='headingoutome'>Wrong Countries</div> */}

                {citiesWrong.map((item) => {
                  return (
                    <div key={item} className='cardBody'>
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // }
};

export default CityGame;
