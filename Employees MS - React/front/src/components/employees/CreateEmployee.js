import {
    useMutation,
    useQuery,
    gql
} from "@apollo/client";
import {useHistory} from "react-router-dom";

import logo from "../../resources/employee.png";

const CREATE_EMPLOYEE = gql`
    mutation CreateEmployee($project_id: ID,$name: String!,$adress: String!,$email: String!,$job_title: String!,$hire_date: Date!,$salary: Int!) {
        createEmployee(
            name: $name
            adress: $adress
            email: $email
            job_title: $job_title
            hire_date: $hire_date
            salary: $salary
            project_id: $project_id
        ){
            _id
            project_id
            name
            adress
            email
            job_title
            hire_date
            salary
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
  
function CreateEmployee() {
    const [createEmployee] = useMutation(CREATE_EMPLOYEE);
    const history=useHistory();
    const { data } = useQuery(SHOW_PROJECTS);

    let project_id,name,adress,email,job_title,hire_date,salary;

    const handleSubmit=async (e) => {
        e.preventDefault();
        project_id=e.target.project_id.value;
        await createEmployee({variables: {
            name: name.value.trim(),
            email: email.value.trim(),
            adress: adress.value,
            job_title: job_title.value.trim(),
            hire_date: hire_date.value,
            salary: Math.abs(salary.value),
            project_id: project_id
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
                <p align="left">Project name:</p>
                <select className="form-control" id="project_id">
                    <option value="">NONE</option>
                    {
                        data ? (<>{
                            data.projects.map((project) => (
                                <>
                                  <option value={project._id}>{project.project_name}</option>
                                </>
                            ))
                        }</>) : (<></>)
                    }
                </select>
                <hr/>
                <p align="left">Employee information:</p>
                <div className="form-group">
                    <input type="text" ref={value => name=value} className="form-control" placeholder="Enter name" id="name" required/>
                </div>
                <div className="form-group">
                    <input type="email" ref={value => email=value} className="form-control" placeholder="Enter email" id="email" required/>
                </div>
                <div className="form-group">
                    <input type="text" ref={value => adress=value} className="form-control" placeholder="Enter adress" id="adress" required/>
                </div>
                <div className="form-group">
                    <input type="text" ref={value => job_title=value} className="form-control" placeholder="Enter job title" id="job_title" required/>
                </div>
                <div className="form-group">
                    <input type="date" ref={value => hire_date=value} className="form-control" placeholder="Enter hire date" id="hire_date" required/>
                </div>
                <div className="form-group">
                    <input type="number" ref={value => salary=value} className="form-control" placeholder="Enter salary" id="salary" min="0" required/>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary">Submit</button>
                <br/><br/>
                <span className="btn btn-primary" onClick={history.goBack}>Back</span>
            </form>
        </div>
    );
}

export default CreateEmployee;