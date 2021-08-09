import {
    useMutation,
    useQuery,
    gql
} from "@apollo/client";
import {useHistory} from "react-router-dom";

import logo from "../../resources/employee.png";

const DELETE_PROJECT = gql`
    mutation DeleteProject($_id: ID!) {
        deleteProject(
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
  
function DeleteProject() {
    const [deleteProject] = useMutation(DELETE_PROJECT);
    const history=useHistory();
    const { data }=useQuery(SHOW_PROJECTS);

    const handleSubmit=async (e) => {
        e.preventDefault();
        if(e.target._id.value)
        {
            await deleteProject({variables: {
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
                <br/><br/>
                <span className="btn btn-primary" onClick={history.goBack}>Back</span>
            </form>
        </div>
    );
}

export default DeleteProject;