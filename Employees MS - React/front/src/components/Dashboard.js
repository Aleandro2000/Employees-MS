import {
    Link,useHistory
} from "react-router-dom";
import {
    useMutation,
    gql
} from "@apollo/client";
import { decodeToken } from "react-jwt";
import { logout } from '../utils';

import employee from "../resources/employee.png";  

const DELETE_USER = gql`
    mutation deleteUser($email: String!) {
        deleteUser(
            email: $email
        ){
            token
        }
    }
`;

function Dashboard() {
    const history=useHistory();
    const [deleteUser] = useMutation(DELETE_USER);

    const del=async () => {
        const decoded=decodeToken(localStorage.getItem("TOKEN_KEY"));
        await deleteUser({variables: {
            email: decoded.email
        }})
            .catch(err => alert(err));
        logout();
        history.push("/login");
    }

    return (
        <div className="card">
            <center>
                <img alt="" className="logo" width="100px" height="100px" src={employee}/>
            </center>
            <h3>
                Dashboard
            </h3>
            <hr/>
            <Link to="/homepage">
                <button style={{width: "100%"}} className="btn btn-primary">
                    HOMEPAGE
                </button>
            </Link>
            <Link to="/employees">
                <button style={{width: "100%",marginTop: "10px"}} className="btn btn-primary">
                    EMPLOYEES PAGE
                </button>
            </Link>
            <Link to="/projects">
                <button style={{width: "100%",marginTop: "10px"}} className="btn btn-primary">
                    PROJECTS PAGE
                </button>
            </Link>
            <Link to="/login">
                <button style={{width: "100%",marginTop: "10px"}} className="btn btn-primary" onClick={logout}>
                    LOGOUT
                </button>
            </Link>
            <button style={{width: "100%",marginTop: "10px"}} className="btn btn-primary" onClick={del}>
                DELETE ACCOUNT
            </button>
        </div>
    );
}
  
export default Dashboard;