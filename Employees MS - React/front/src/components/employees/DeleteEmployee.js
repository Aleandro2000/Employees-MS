import {
    useMutation,
    gql,
    useQuery
} from "@apollo/client";
import {useHistory} from "react-router-dom";

import logo from "../../resources/employee.png";

const DELETE_EMPLOYEE = gql`
    mutation DeleteEmployee($_id: ID!) {
        deleteEmployee(
            _id: $_id
        ){
            _id
            name
            adress
            email
            job_title
            hire_date
            salary
        }
    }
`;

const SHOW_EMPLOYEES=gql`
    query {
        employees {
            _id
            name
        }
    }
`;
  
function DeleteEmployee() {
    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);
    const history=useHistory();
    const { data } = useQuery(SHOW_EMPLOYEES);

    const handleSubmit=async (e) => {
        e.preventDefault();
        if(e.target._id.value)
        {
            await deleteEmployee({variables: {
                _id: e.target._id.value
            }})
                .catch(err => alert(err));
            alert("Succeeded!");
            window.location.reload(false);
        }
    }

    return(
        <div className="card">
            <center>
                <img alt="" className="logo" width="100px" height="100px" src={logo}/>
            </center>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <p align="left">Employee name:</p>
                    <select className="form-control" id="_id">
                        {
                            data ? (<>{
                                data.employees.map((employee) => (
                                    <>
                                      <option value={employee._id}>{employee.name}</option>
                                    </>
                                ))
                            }</>) : (<></>)
                        }
                    </select>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary">Submit</button>
                <br/><br/>
                <span className="btn btn-primary" onClick={history.goBack}>Back</span>
            </form>
        </div>
    );
}

export default DeleteEmployee;