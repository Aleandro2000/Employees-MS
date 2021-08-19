import {
    Link
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from "../redux/store";

import employee from "../resources/employee.png";
import { Counter } from "../redux/counter";
  
function Homepage() {
    return (
        <Provider store={store}>
            <nav className="navbar-expand-sm navbar navbar-dark bg-primary">
                <div className="scollapse navbar-collapse">
                    <center className="navbar-nav ml-auto">
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>
                        <Link className="nav-link" to="/register">
                            Register
                        </Link>
                    </center>
                </div>
            </nav>
            <div className="card">
                <center>
                    <img alt="" className="logo" width="100px" height="100px" src={employee}/>
                </center>
                <h1>
                    EMPLOYEES - MS
                </h1>
                <hr/>
                <p align="justify">
                    Employees - MS, an intuitive project management web platform that is useful for small, mid-size and big-size organizations to track and manage various types of work with employees.
                </p>
                <Counter/>
            </div>
        </Provider>
    );
}
  
export default Homepage;