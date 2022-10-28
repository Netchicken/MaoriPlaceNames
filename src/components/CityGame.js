import "../App.css";

import React, { useState, useEffect, useRef } from "react";
import Select from "react-select"; //for my select dropdown
import "bootstrap/dist/css/bootstrap.min.css"; //leatest v5
import Section from "./Section"; //shows country info
import Footer from "./Footer"; //shows country info

import Results from "./ResultsPage"; //shows the results
import { GetRandomNumber, alertItemName } from "../Operations/AllOperations";
//
//import { countryData, createCities } from "../Assets/cities"; //datalist of countries
import {quiz} from "../Assets/quiz";
import {  maoriPlaceNamesData,  createMaoriPlacenames,} from "../Assets/maoriPlaceNames"; //datalist of MaoriPlacenames

const CityGame = () => {
  const [allData, setAllData] = useState(quiz); //all the data of the countries

  const [gameData, setGameData] = useState({
    //for the game being currently played
    Q: "Start",
    A: "Start",
  });
  let selectedCity;
  
  const [number, setNumber] = useState(0); //random number
  const [citiesCorrect, setCitiesCorrect] = useState([]);
  const [citiesWrong, setCitiesWrong] = useState([]);
  //const [toggleTextIsHidden, setToggleTextIsHidden] = useState("true");
  const [selectCityData, setSelectCityData] = useState(createMaoriPlacenames);

  //this run only at the initial stage, AFTER the dom has loaded ,[] at the end makes it run once
  useEffect(() => {
    const fetchData = () => {
      setAllData(quiz);
      setSelectCityData(createMaoriPlacenames);
      console.log("useEffect allData ", quiz);
      LoadGamedata();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchData();
  }, []);

  const onClickHandlerNewGame = () => {
    console.log("onClickHandlerNewGame", "triggered");
    LoadGamedata();

    console.log("onClickHandlerNewGame Random number", number);
    console.log("onClickHandlerNewGame Selected Country Data", allData[number]);
  };

  const CheckForWinnerLoser = () => {
    console.log("CheckForWinnerLoser gameData.CapitalName", gameData.Placename);
    //setToggleTextIsHidden("true"); //hide the text

    console.log("CheckForWinnerLoser selectedCity", selectedCity);

    if (selectedCity != null && gameData.Placename !== null) {
      if (selectedCity === gameData.Placename) {
        alertItemName("Yes! You win! The place is " + selectedCity);
        // pass in the citiescorrect state, spread it,  and pass both to setCitiesCorrect

        let url = (
          <a
            href={"https://www.google.com/search?q=new+zealand+" + selectedCity}
          >
            Visit
          </a>
        );

        setCitiesCorrect((citiesCorrect) => [
          ...citiesCorrect,
          selectedCity + " is " + gameData.Components,
        ]);
      } else {
        alertItemName(
          "Sorry. The place is not " + selectedCity + ". Try again"
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

  const LoadGamedata = () => {
    let length = allData.length;
    let Rand = GetRandomNumber(length);
    setNumber(Rand);

    allData.map((item, id) => {
      var selecteditem = allData[number]; //get the data at that point
      setGameData({
        Q: selecteditem.Q,
        A: selecteditem.A
      });
    });
  };

  const handleCityChange = (e) => {
    console.log(" handleChange city Selected!!", e.value);
        selectedCity = e.value;
       CheckForWinnerLoser();
  };
  //for the dropdown select https://blog.logrocket.com/getting-started-with-react-select/
  const selectCustomStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px solid green",
      color: state.isSelected ? "yellow" : "black",
      backgroundColor: state.isSelected ? "green" : "white",
      padding: "0px",
    }),
  };

  const newplaceholder = () => {
    return selectedCity ? "Select a place " + selectedCity : "Select a place";
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <Section className='sectionTitle' props={gameData} />
        <div className='col-sm d-flex justify-content-center'>
          <button
            className='buttonSubmit btn btn-default'
            onClick={onClickHandlerNewGame}
          >
            Choose a random Place
          </button>
        </div>
        <div className='col-sm'>
            <Select
            styles={selectCustomStyles}
            options={selectCityData}
            className='selectDropDownStyle'
            value={selectedCity}
            onChange={handleCityChange}
            placeholder={newplaceholder()} //'Select the place'
            controlShouldRenderValue={true}
          />
        </div>
        
        <Results citiesCorrect={citiesCorrect} citiesWrong={citiesWrong} />
      </div>

      <Footer props={gameData} />
    </div>
  );
  // }
};

export default CityGame;
