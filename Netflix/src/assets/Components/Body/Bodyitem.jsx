import styles from "./Bodyitem.module.css";
import { FcShare } from "react-icons/fc";
import { FaMobileAlt } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";

function Bodyitem({ movie }) {
  return (
    <>
      <div className={`${styles.card_container}`}>
        <div className={styles.movie_card} id={styles.bright}>
          <div className={styles.info_section}>
            <div className={styles.movie_header}>
              <img
                className={styles.locandina}
                src="https://movieplayer.net-cdn.it/t/images/2017/12/20/bright_jpg_191x283_crop_q85.jpg"
              />
              <h1>{movie.title}</h1>
              <h4>{`${movie.releaseYear}, ${movie.directors}`}</h4>
              <span className={styles.minutes}>
                {Math.round(movie.totalhoures)}hr
              </span>
              <p className={styles.type}>{movie.genres.join(" | ")}</p>
            </div>
            <div className={styles.movie_desc}>
              <p className={styles.text}>{movie.description}</p>
            </div>
            <div className={styles.movie_social}>
              <ul>
                <li>
                  <i className={styles.icons}>
                    <FcShare />
                  </i>
                </li>
                <li>
                  <i className={styles.icons}>
                    <FaMobileAlt />
                  </i>
                </li>
                <li>
                  <i className={styles.icons}>
                    <IoMdChatbubbles />
                  </i>
                </li>
              </ul>
            </div>
          </div>
          <div className={`${styles.blur_back} ${styles.bright_back}`}></div>
        </div>
      </div>
    </>
  );
}
export default Bodyitem;
