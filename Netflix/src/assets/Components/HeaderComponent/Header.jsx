import { useDispatch, useSelector } from "react-redux";
import { moviesAction, userAction, userApi } from "./../../Store/Mainstore";
import { moviesApi } from "./../../Store/Mainstore";
import { useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
function Header() {
  const { fetched, fetching } = useSelector((store) => store.movies);
  const { loggedin, signed, user, loggedout,token } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();
  const search = useRef();
  const filter = useRef();
  const Sort = useRef();
  const Field = useRef();
  const handleSearch = (e) => {
    e.preventDefault();
    const headers = {
      authorization:
        `Bearer ${token}`,
    };
    const searchquery = search.current.value;
    const filterquery = filter.current.value;
    const Sortquery = Sort.current.value;
    const Fieldquery = Field.current.value;
    console.log(searchquery, filterquery, Sortquery, Fieldquery);

    if (!fetching) {
      dispatch(moviesApi({ searchquery, filterquery ,Sortquery,Fieldquery,headers}));
      dispatch(moviesAction.fetchingStateControl({fetching:true}));
    }
    search.current.value="";
    filter.current.value="";
    Sort.current.value="";
    Field.current.value="";
  }
  function handellogout(e){
    e.preventDefault();
    dispatch(userAction.Logout());
  }
  return (
    <><nav
        className="navbar navbar-expand-lg bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            NETFLIX
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
         
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <div className="btn btn-outline-light text-decoration-none">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle text-decoration-none" 
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></button>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li className="dropdown-item ">
                      Filter
                      <select ref={filter} name="Filter" id="Filter">
                        <option value="">all</option>
                        <option value="releaseYear=2013">2013</option>
                        <option value="releaseYear=2018">2018</option>
                      </select>
                    </li>
                    <li className="dropdown-item ">
                      Sort
                      <select ref={Sort} id="Sort" name="Sort">
                        <option value="">None</option>
                        <option value="price">price</option>
                        <option value="duration">duration</option>
                      </select>
                    </li>
                    <li className="dropdown-item ">
                      Field
                      <select ref={Field} name="Field" id="Field">
                        <option value="">None</option>
                        <option value="title">title</option>
                        <option value="genres">genres</option>
                        <option value="totalRating">totalRating</option>
                      </select>
                    </li>
                  </ul>
                </div>
              </div>
              <input
                className="form-control me-2"
                type="search"
                ref={search}
                placeholder="Search . . ."
                aria-label="Search"
              />
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
               <div className="btn-group dropstart">
           {user? <div>  <a
                href="#"
                className=" btn-group dropstart-toggle text-decoration-none "
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                <img
                  src="https://github.com/mdo.png"
                  alt="mdo"
                  width={32}
                  height={32}
                  className="rounded-circle"
                />
              </a>
              
              <ul className="dropdown-menu text-small">
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    {user.username}
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button onClick={handellogout} className="dropdown-item" href="#">
                    Log out
                  </button>
                </li>
              </ul> </div>:<a href="/signup" className="btn btn-primary btn-outline-light ">Sign-in</a>}
            </div>
            </form>
          </div>
          
        </div>
      </nav>
    </>
  );
}
export default Header;
