import Bodyitem from "./Bodyitem";
import "./Body.module.css";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

function Body() {
  const movies = useLoaderData();

  return (
    <>
      <div className="movie_container">
        {console.log(movies)}
        {movies.data.map((movie) => (
          <Bodyitem key={movie._id} movie={movie}></Bodyitem>
        ))}
      </div>
    </>
  );
}
export const loadInitialData = async () => {
  const data = await axios.get("http://127.0.0.1:8000/");

  const movies = await data.data;

  return movies;
};
export default Body;
