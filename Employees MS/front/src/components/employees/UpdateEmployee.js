import {
    useMutation,
    useQuery,
    gql
} from "@apollo/client";
import {useHistory} from "react-router-dom";

import logo from "../../resources/employee.png";

const CREATE_EMPLOYEE = gql`
    mutation UpdateEmployee($project_id: ID,$_id: ID!,$name: String!,$adress: String!,$email: String!,$job_title: String!,$hire_date: Date!,$salary: Int!) {
        updateEmployee(
            _id: $_id,
            name: $name,
            adress: $adress,
            email: $email,
            job_title: $job_title,
            hire_date: $hire_date,
            salary: $salary
            project_id: $project_id
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

const SHOW_PROJECTS=gql`
    query {
      projects {
        _id
        project_name
      }
    }
`;
  
function UpdateEmployee() {
    const [updateEmployee] = useMutation(CREATE_EMPLOYEE);
    const history=useHistory();

    const Employees = () => {
        const { data }=useQuery(SHOW_EMPLOYEES);
        if(data)
            return(
                <>
                    <option value="">NONE</option>
                    {
                        data.employees ? (<>{
                            data.employees.map((employee) => (
                                <>
                                  <option value={employee._id}>{employee.name}</option>
                                </>
                            ))
                        }</>) : (<></>)
                    }
                </>
            );
        else
            return(
                <>
                    <option value="">NONE</option>
                </>
            );
    }

    const Projects = () => {
        const { data }=useQuery(SHOW_PROJECTS);
        if(data)
            return(
                <>
                    <option value="">NONE</option>
                    {
                        data.projects ? (<>{
                            data.projects.map((project) => (
                                <>
                                  <option value={project._id}>{project.project_name}</option>
                                </>
                            ))
                        }</>) : (<></>)
                    }
                </>
            );
        else
            return(
                <>
                    <option value="">NONE</option>
                </>
            );
    }

    let project_id,_id,name,adress,email,job_title,hire_date,salary;

    const handleSubmit=async (e) => {
        e.preventDefault();
        await updateEmployee({variables: {
            _id: _id.value.replaceAll(' ',''),
            name: name.value.trim(),
            email: email.value.trim(),
            adress: adress.value.trim(),
            job_title: job_title.value.trim(),
            hire_date: hire_date.value,
            salary: Math.abs(salary.value),
            project_id: project_id.value.replaceAll(' ','')
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
                <select className="form-control" id="_id">
                    <Employees/>
                </select>
                <hr/>
                <select className="form-control" id="project_id">
                    <Projects/>
                </select>
                <br/>
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

export default UpdateEmployee;