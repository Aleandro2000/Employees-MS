import {
    useMutation,
    useQuery,
    gql
} from "@apollo/client";
import {useHistory} from "react-router-dom";

import logo from "../../resources/employee.png";

const READ_PROJECT = gql`
    mutation ReadProject($_id: ID!) {
        readProject(
            _id: $_id
        ){
            _id
            project_name
            start_date
            planned_end_date
            description
            project_code
        }
    }
`;

const SHOW_PROJECTS=gql`
    query {
      projects {
        _id
        project_name
      }
    }
`;
  
function ReadProject() {
    const [readProject] = useMutation(READ_PROJECT);
    const history=useHistory();
    const { data }=useQuery(SHOW_PROJECTS);

    const handleSubmit=async (e) => {
        e.preventDefault();
        if(e.target._id.value)
            await readProject({variables: {
                _id: e.target._id.value
            }})
                .then(response => alert(JSON.stringify(response.data.readProject)))
                .catch(err => alert(err));
        history.goBack();
    }

    return(
        <div className="card">
            <center>
                <img alt="" className="logo" width="100px" height="100px" src={logo}/>
            </center>
            <form onSubmit={handleSubmit}>
                <p align="left">Projects Name:</p>
                <select className="form-control" id="_id">
                    <option value="">NONE</option>
                    {
                        data ? (<>{
                            data.projects.map((employee) => (
                                <>
                                  <option value={employee._id}>{employee.project_name}</option>
                                </>
                            ))
                        }</>) : (<></>)
                    }
                </select>
                <br/>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default ReadProject;