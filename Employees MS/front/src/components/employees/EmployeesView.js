import {
    useQuery,
    gql
} from "@apollo/client";
import {useHistory} from "react-router-dom";

import employee from "../../resources/employee.png";  

const SHOW_EMPLOYEES=gql`
    query {
        employees {
            _id
            name
            adress
            email
            job_title
            hire_date
            salary
            project {
              project_name
              start_date
              planned_end_date
              description
              project_code
            }
        }
    }
`;

function EmployeesView()
{
    const history=useHistory();

    function EmployeesTableContent(){
        const { loading, error, data } = useQuery(SHOW_EMPLOYEES);
        if (loading)
          return <tr><td colSpan="8"><b>Loading...</b></td></tr>;
        if (error)
          return <tr><td colSpan="8"><b>Error :(</b></td></tr>;
      
        return data.employees.map((employee) => (
          <tr key={employee._id}>
            <td id={employee._id}>{employee._id}</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.adress}</td>
            <td>{employee.hire_date}</td>
            <td>{employee.job_title}</td>
            <td>{employee.salary}</td>
            {
              (employee.project) ? (
                <>
                  <td>{employee.project.project_name}</td>
                  <td>{employee.project.start_date}</td>
                  <td>{employee.project.planned_end_date}</td>
                  <td>{employee.project.description}</td>
                  <td>{employee.project.project_code}</td>
                </>
              ) : 
              (
                <>
                  <td/>
                  <td/>
                  <td/>
                  <td/>
                  <td/>
                </>
              )
            }
          </tr>
        ));
      }
    
      return(
        <div className="card">
          <center>
            <img alt="" className="logo" width="100px" height="100px" src={employee}/>
            <table className="table" style={{display: "block",overflow: "scroll",border: "3px solid #cccccc"}}>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Adress</th>
                  <th scope="col">Hire Date</th>
                  <th scope="col">Job Title</th>
                  <th scope="col">Salary</th>
                  <th scope="col">Project Name</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">Planned End Date</th>
                  <th scope="col">Description</th>
                  <th scope="col">Project Code</th>
                </tr>
              </thead>
              <tbody>
                <EmployeesTableContent/>
              </tbody>
            </table>
            <button className="btn btn-primary" style={{margin: "5px",maxWidth: "100px"}} onClick={()=>window.location.reload(false)}>Refresh</button>
            <button className="btn btn-primary" style={{margin: "5px",maxWidth: "100px"}} onClick={history.goBack}>Back</button>
          </center>
        </div>
      );
    
}

export default EmployeesView;