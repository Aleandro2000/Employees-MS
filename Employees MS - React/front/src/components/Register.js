import {
  useMutation,
  gql
} from "@apollo/client";
import {useHistory} from "react-router-dom";

import logo from "../resources/employee.png";

const REGISTER_USER = gql`
  mutation registerUser($email: String!,$password: String!) {
      registerUser(
          email: $email,
          password: $password
      ){
          _id
      }
  }
`;

function RegisterUser() {
  const [registerUser] = useMutation(REGISTER_USER);
  const history=useHistory();

  let email,password;

  const handleSubmit=async (e) => {
      e.preventDefault();
      let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      if(strongRegex.test(password.value))
      {
        await registerUser({variables: {
            email: email.value.replaceAll(' ',''),
            password: password.value
        }})
            .catch(err => alert(err));
        history.push("/login");
      }
      else
        alert("Weak password!");
  }

  return(
      <div className="card">
        <center>
            <img alt="" className="logo" width="100px" height="100px" src={logo}/>
        </center>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="email" ref={value => email=value} className="form-control" placeholder="Enter email" id="email" required/>
            </div>
            <div className="form-group">
                <input type="password" ref={value => password=value} className="form-control" placeholder="Enter password" id="password" required/>
            </div>
            <br/>
            <button type="submit" className="btn btn-primary">REGISTER</button>
            <br/><br/>
            <span className="btn btn-primary" onClick={()=>history.push("/homepage")}>Back</span>
        </form>
      </div>
  );
}

export default RegisterUser;