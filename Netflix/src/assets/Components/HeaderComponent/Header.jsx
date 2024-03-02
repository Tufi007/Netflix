import { useDispatch, useSelector } from "react-redux";
import { moviesAction } from "./../../Store/Mainstore";
import { moviesApi } from "./../../Store/Mainstore";
import { useEffect } from "react";
import { useRef } from "react";
function Header() {
  // const mov= useSelector(store => store.movies);
  // const dispatch= useDispatch();
  // useEffect(()=>{
  //   const fetch=  mov.fetching;
  //   if (!fetch){
  //     dispatch(moviesApi('highestRated'));
  //     // console.log(mov);
  //   }
  // },[]);
  //  function handleclick (Event){
  //   // Event.preventDefault();
  //   // dispatch(highest(47));
  // }
  // // dispatch(highest(1234));
  // // console.log(mov.fetching);
  const dispatch= useDispatch();
  const search = useRef();
  const filter = useRef();
  const handleSearch = (e) => {
    e.preventDefault();
    const searchquery= search.current.value;
    const filterquery= filter.current.value;
    dispatch(moviesApi({searchquery,filterquery}));
  };
  const fromSearch = (e) => {
    console.log(e);
  };
  return (
    <>
      <header className="p-3 mb-3 border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
            >
              <svg
                className="bi me-2"
                width={40}
                height={32}
                role="img"
                aria-label="Bootstrap"
              >
                <use xlinkHref="#bootstrap" />
              </svg>
            </a>
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <a href="#" className="nav-link px-2 link-secondary">
                  click
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 link-body-emphasis">
                  Inventory
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 link-body-emphasis">
                  Customers
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 link-body-emphasis">
                  Products
                </a>
              </li>
            </ul>
            <form
              className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
              onSubmit={handleSearch}
              role="search"
            >
              <div className="search_bar">
                <input
                  onChange={handleSearch}
                  ref={search}
                  type="search"
                  className="form-control"
                  placeholder="Search..."
                  aria-label="Search"
                />
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Filter
                  </button>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li className="dropdown-item ">
                      Filter
                      <select ref={filter}  name="filter" id="filter" >
                        <option   value='ratings[lte]=8' >all</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                      </select>
                    </li>
                  </ul>
                </div>
              </div>
            </form>
            <div className="dropdown text-end">
              <a
                href="#"
                className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
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
                    New project...
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
