import {
    useMutation,
    gql,
    useQuery
} from "@apollo/client";
import {useHistory} from "react-router-dom";

import logo from "../../resources/employee.png";

const READ_EMPLOYEE = gql`
    mutation ReadEmployee($_id: ID!) {
        readEmployee(
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
  
function ReadEmployee() {
    const [readEmployee] = useMutation(READ_EMPLOYEE);
    const history=useHistory();
    const { data }=useQuery(SHOW_EMPLOYEES);

    const handleSubmit=async (e) => {
        e.preventDefault();
        if(e.target._id.value)
            await readEmployee({variables: {
                _id: e.target._id.value
            }})
                .then(response => alert(JSON.stringify(response.data.readEmployee)))
                .catch(err => alert(err));
        history.goBack();
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
                        <option value="">NONE</option>
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
            </form>
        </div>
    );
}

export default ReadEmployee;