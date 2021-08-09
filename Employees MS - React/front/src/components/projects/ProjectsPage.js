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
                Projects Page
            </h3>
            <hr/>
            <Link to="/projects/display">
                <button style={{width: "100%"}} className="btn btn-primary">
                    DISPLAY PROJECTS
                </button>
            </Link>
            <Link to="/projects/create">
                <button style={{width: "100%",marginTop: "10px"}} className="btn btn-primary">
                    CREATE PROJECT
                </button>
            </Link>
            <Link to="/projects/read">
                <button style={{width: "100%",marginTop: "10px"}} className="btn btn-primary">
                    READ PROJECT
                </button>
            </Link>
            <Link to="/projects/update">
                <button style={{width: "100%",marginTop: "10px"}} className="btn btn-primary">
                    UPDATE PROJECT
                </button>
            </Link>
            <Link to="/projects/delete">
                <button style={{width: "100%",marginTop: "10px"}} className="btn btn-primary">
                    DELETE PROJECT
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
  