import {
    Link
} from "react-router-dom";

import employee from "../../resources/employee.png";  
  
function App() {
    return (
        <div className="card">
            <center>
                <img alt="" className="logo" width="100px" height="100px" src={employee}/>
            </center>
            <h3>
                Employees Page
            </h3>
            <hr/>
            <Link to="/employees/display">
                <button style={{width: "100%"}} className="btn btn-primary">
                    DISPLAY EMPLOYEES
                </button>
            </Link>
            <Link to="/employees/create">
                <button style={{width: "100%",marginTop: "10px"}} className="btn btn-primary">
                    CREATE EMPLOYEE
                </button>
            </Link>
            <Link to="/employees/read">
                <button style={{width: "100%",marginTop: "10px"}} className="btn btn-primary">
                    READ EMPLOYEE
                </button>
            </Link>
            <Link to="/employees/update">
                <button style={{width: "100%",marginTop: "10px"}} className="btn btn-primary">
                    UPDATE EMPLOYEE
                </button>
            </Link>
            <Link to="/employees/delete">
                <button style={{width: "100%",marginTop: "10px"}} className="btn btn-primary">
                    DELETE EMPLOYEE
                </button>
            </Link>
            <Link to="/dashboard">
                <button style={{width: "100%",marginTop: "10px"}} className="btn btn-primary">
                    Back
                </button>
            </Link>
        </div>
    );
}
  
  export default App;
  