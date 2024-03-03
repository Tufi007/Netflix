import Bodyitem from "./Bodyitem";
import "./Body.module.css";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moviesAction } from "../../Store/Mainstore";

function Body() {
  let movies = useLoaderData();
  const { fetched, fetching, searchdata } = useSelector(
    (store) => store.movies
  );
  const { loggedin, token } = useSelector((store) => store.user);
    console.log(loggedin,token,"heloouser");
    // localStorage.setItem('token',JSON.stringify(token));
    console.log(localStorage.getItem('token'));
  if (searchdata) {
    const data = searchdata;
    movies = data;
  }
  return (
    <>
      <div className="movie_container">
        {fetching ? (
          <h1>loading................</h1>
        ) : (
          movies.data.map((movie) => (
            <Bodyitem key={movie._id} movie={movie}></Bodyitem>
          ))
        )}
      </div>
    </>
  );
}
export const loadInitialData = async () => {
  const data = await axios.get("http://127.0.0.1:8000/");
  const movies = await data.data;
  console.log(movies);
  return movies;
};
export default Body;
