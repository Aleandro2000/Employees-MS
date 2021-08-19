import {
    useQuery,
    gql
} from "@apollo/client";
import {useHistory} from "react-router-dom";

import employee from "../../resources/employee.png";  

const SHOW_PROJECTS=gql`
    query {
      projects {
        _id
        project_name
        start_date
        planned_end_date
        description
        project_code
      }
    }
`;

function ProjectsView()
{
    const history=useHistory();

    function ProjectsTableContent(){
        const { loading, error, data } = useQuery(SHOW_PROJECTS);
        if (loading)
          return <tr><td colSpan="8"><b>Loading...</b></td></tr>;
        if (error)
          return <tr><td colSpan="8"><b>Error :(</b></td></tr>;
      
        return data.projects.map((project) => (
          <tr key={project._id}>
            <td>{project._id}</td>
            <td>{project.project_name}</td>
            <td>{project.start_date}</td>
            <td>{project.planned_end_date}</td>
            <td>{project.description}</td>
            <td>{project.project_code}</td>
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
                  <th scope="col">Project Name</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">Planned End Date</th>
                  <th scope="col">Description</th>
                  <th scope="col">Project Code</th>
                </tr>
              </thead>
              <tbody>
                <ProjectsTableContent/>
              </tbody>
            </table>
            <button className="btn btn-primary" style={{margin: "5px",maxWidth: "100px"}} onClick={()=>window.location.reload(false)}>Refresh</button>
            <button className="btn btn-primary" style={{margin: "5px",maxWidth: "100px"}} onClick={history.goBack}>Back</button>
          </center>
        </div>
      );
    
}

export default ProjectsView;