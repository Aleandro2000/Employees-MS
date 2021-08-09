import {
    useMutation,
    useQuery,
    gql
} from "@apollo/client";
import {useHistory} from "react-router-dom";

import logo from "../../resources/employee.png";

const UPDATE_PROJECT = gql`
    mutation UpdateProject($_id: ID!,$project_name: String!,$start_date: Date!,$planned_end_date: Date!,$description: String,$project_code: String!) {
        updateProject(
            _id: $_id
            project_name: $project_name
            start_date: $start_date
            planned_end_date: $planned_end_date
            description: $description
            project_code: $project_code
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

function UpdateProject() {
    const [updateProject] = useMutation(UPDATE_PROJECT);
    const history=useHistory();
    const { data }=useQuery(SHOW_PROJECTS);

    let project_name,start_date,planned_end_date,description,project_code;

    const handleSubmit=async (e) => {
        e.preventDefault();
        if(e.target._id.value&&start_date.value<=planned_end_date.value)
        {
            await updateProject({variables: {
                _id: e.target._id.value,
                project_name: project_name.value.trim(),
                start_date: start_date.value,
                planned_end_date: planned_end_date.value,
                description: description.value,
                project_code: project_code.value
            }})
                .catch(err => alert(err));
            alert("Succeeded!");
            window.location.reload(false);
        }
        else
            alert("Please select a project or check if exists an error in data input!");
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
                <hr/>
                <div className="form-group">
                    <input type="text" ref={value => project_name=value} className="form-control" placeholder="Enter project name" id="project_name" required/>
                </div>
                <div className="form-group">
                    <input type="date" ref={value => start_date=value} className="form-control" placeholder="Enter start date" id="start_date" required/>
                </div>
                <div className="form-group">
                    <input type="date" ref={value => planned_end_date=value} className="form-control" placeholder="Enter hire date" id="planned_end_date" required/>
                </div>
                <div className="form-group">
                    <input type="text" ref={value => project_code=value} className="form-control" placeholder="Enter project code" id="project_code" required/>
                </div>
                <div className="form-group">
                    <textarea type="text" ref={value => description=value} className="form-control" placeholder="Description" id="description"/>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary">Submit</button>
                <br/><br/>
                <span className="btn btn-primary" onClick={history.goBack}>Back</span>
            </form>
        </div>
    );
}

export default UpdateProject;