import { useRef } from "react";
import "./Signup.css";
import store, { userAction, userApi } from "../../Store/Mainstore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Signup() {
  const {loggedin,signed }= useSelector(store => store.user);
  const dispatch= useDispatch();
  const navigate= useNavigate();
  // console.log(loggedin);
  const email=useRef();
  const password=useRef();
  const Confirmpassword=useRef();
  const image=useRef();
  const name=useRef();
  const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTViYzhkNTEzNDAyNjEzZjgxYzE3NCIsImlhdCI6MTcwOTU1NDgzNCwiZXhwIjoxNzA5NTU4NDM0fQ.LC4oBfOSjgqoWvDLxgPTxb0LRboklQ1K-fFps4Dibso";
  const handleSubmit=(e)=>{
    // console.log(name.current.value);
    e.preventDefault();
    console.log(e);
    if(password.current.value=== Confirmpassword.current.value ){
    console.log('hello');
      const data={
        "username": name.current.value,
        "email":email.current.value,
        "photo": image.current.value,
        "password": password.current.value,
        "confirmPassword": Confirmpassword.current.value,
        "role": "admin1"
      };
      // name.current.value="";
      // image.current.value="";
      // password.current.value="";
      // Confirmpassword.current.value="";
      // email.current.value="";
      dispatch(userApi({data,type:'signup'}));
      navigate('/');
      console.log('111111111111111');
      // dispatch(userAction.)
    // dispatch(userApi());
  }
else return}

  return (
    <>
      <div className="Auth-form-container conatiner">
        <form className="Auth-form needs-validation" onSubmit={handleSubmit} >
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3><div>
            <div className="form-group mt-3">
              <label>Name</label>
              <input 
                type="text" ref={name}
                className="form-control mt-1"
                placeholder="Name" required
              />
            </div>
            
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email" ref={email}
                className="form-control mt-1"
                placeholder="Enter email" required
              />
            </div>
            <div className="form-group mt-3">
              <label>Image</label>
              <input
                type="file" ref={image}
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password" ref={password}
                className="form-control mt-1"
                placeholder="Enter password"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Confirm Password</label>
              <input
                type="password" ref={Confirmpassword}
                className="form-control mt-1"
                placeholder="Confirm passsword again" required
              />
            </div>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary"  >
                SignUp
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Already have an <a href="/login">account?</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
export default Signup;
