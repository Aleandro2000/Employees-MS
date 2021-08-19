import {
    useMutation,
    gql
} from "@apollo/client";
import {useHistory} from "react-router-dom";
import { login } from '../utils';

import logo from "../resources/employee.png";

const LOGIN_USER = gql`
    mutation loginUser($email: String!,$password: String!) {
        loginUser(
            email: $email,
            password: $password
        ){
            token
        }
    }
`;
  
function LoginUser() {
    const [loginUser] = useMutation(LOGIN_USER);
    const history=useHistory();

    let email,password;

    const handleSubmit=async (e) => {
        e.preventDefault();
        await loginUser({variables: {
            email: email.value.replaceAll(' ',''),
            password: password.value
        }})
            .then(result => login(result.data.loginUser.token))
            .catch(err => alert(err));
        history.push("/dashboard");
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
                <button type="submit" className="btn btn-primary">LOGIN</button>
                <br/><br/>
                <span className="btn btn-primary" onClick={()=>history.push("/homepage")}>Back</span>
            </form>
        </div>
    );
}

export default LoginUser;