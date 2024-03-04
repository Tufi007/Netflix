import { useEffect, useRef } from "react";
import { userApi } from "../../Store/Mainstore";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Login() {
  const{loggedin,error}=useSelector(store=> store.user);
  const dispatch= useDispatch();
  // console.log(loggedin,error);
  const navigate= useNavigate();
  const email=useRef();
  const password=useRef();
 useEffect(()=>{
  if(loggedin){
    console.log(loggedin,"jingaaaa");
    navigate("/");
  }
 },[loggedin])
  function handlelogin(e){
    e.preventDefault();
    const data={
      "email":email.current.value,
      "password": password.current.value,}
      if(email.current.value && password.current.value){
      dispatch(userApi({data,type:'login'}));}
      else return
  }
  return (
    <>
    {error? <h1>{error}</h1> :
      <div className="Auth-form-container conatiner">
        <form className="Auth-form" onSubmit={handlelogin}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Log In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email" ref={email} required
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password" ref={password} required
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                LogIn
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>}
    </>
  );
}
export default Login;
