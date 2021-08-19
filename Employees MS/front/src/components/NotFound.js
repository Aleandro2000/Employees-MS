import employee from "../resources/employee.png";
import {useHistory} from "react-router-dom";

function NotFound()
{
    const history=useHistory();

    return(
        <div className="card">
            <center>
                <img alt="" className="logo" width="100px" height="100px" src={employee}/>
            </center>
            <h3>
                <b>
                    PAGE NOT FOUND! :(
                </b>
                <br/><br/>
                <button className="btn btn-primary" onClick={history.goBack}>
                    Back
                </button>
            </h3>
        </div>
    )
}

export default NotFound;