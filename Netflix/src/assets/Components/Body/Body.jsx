import Bodyitem from "./Bodyitem";
import './Body.module.css'

function Body({movies}) {
 

  return (
    <>
    <div className="movie_container">
      {movies.map((movie)=>(
        // console.log(movie);
        <Bodyitem key={movie._id} movie={movie} ></Bodyitem>
      ))}
     </div> 
    </>
  );
}
export default Body;
