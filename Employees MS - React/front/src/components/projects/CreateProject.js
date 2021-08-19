import {
    useMutation,
    gql
} from "@apollo/client";
import {useHistory} from "react-router-dom";

import logo from "../../resources/employee.png";

const CREATE_PROJECT = gql`
    mutation CreateProject($project_name: String!,$start_date: Date!,$planned_end_date: Date!,$description: String,$project_code: String!) {
        createProject(
            project_name: $project_name,
            start_date: $start_date,
            planned_end_date: $planned_end_date,
            description: $description,
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
  
function CreateProject() {
    const [createProject] = useMutation(CREATE_PROJECT);
    const history=useHistory();

    let project_name,start_date,planned_end_date,description,project_code;

    const handleSubmit=async (e) => {
        e.preventDefault();
        await createProject({variables: {
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

    return(
        <div className="card">
            <center>
                <img alt="" className="logo" width="100px" height="100px" src={logo}/>
            </center>
            <form onSubmit={handleSubmit}>
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

export default CreateProject;