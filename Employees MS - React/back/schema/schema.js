const {GraphQLObjectType,GraphQLString,GraphQLInt,GraphQLID,GraphQLSchema,GraphQLNonNull,GraphQLList}=require("graphql");
const {GraphQLDate}=require("graphql-iso-date");
const md5=require("md5");
const jsonwebtoken=require("jsonwebtoken");

const EmployeesModel=require("../models/employeesModel");
const ProjectsModel=require("../models/projectsModel");
const UsersModel=require("../models/usersModel");

const UsersType=new GraphQLObjectType({
    name: "Users",
    fields:{
        _id: {
            type: GraphQLID
        },
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        token: {
            type: GraphQLString
        }
    }
});

const ProjectsType=new GraphQLObjectType({
    name: "Projects",
    fields:{
        _id:{
            type: GraphQLID
        },
        project_name:{
            type: GraphQLString
        },
        start_date:{
            type: GraphQLDate
        },
        planned_end_date:{
            type: GraphQLDate
        },
        description:{
            type: GraphQLString
        },
        project_code:{
            type: GraphQLString
        }
    }
});

const BasicInfoEmployees=new GraphQLObjectType({
    name: "BasicInfoEmployees",
    fields: {
        _id:{
            type: GraphQLID
        },
        project_id:{
            type: GraphQLID
        },
        name:{
            type: GraphQLString
        },
        adress:{
            type: GraphQLString
        },
        email:{
            type: GraphQLString
        },
        job_title:{
            type: GraphQLString
        },
        hire_date:{
            type: GraphQLDate
        },
        salary:{
            type: GraphQLInt
        }
    }
});

const EmployeesType=new GraphQLObjectType({
    name: "Employees",
    fields: {
        _id:{
            type: GraphQLID
        },
        project_id:{
            type: GraphQLID
        },
        project: {
            type: ProjectsType,
            resolve: (employees) => {
                return ProjectsModel.findOne({_id: employees.project_id},(project,err)=>{
                    if(err)
                        console.log(err);
                });
            }
        },
        name:{
            type: GraphQLString
        },
        adress:{
            type: GraphQLString
        },
        email:{
            type: GraphQLString
        },
        job_title:{
            type: GraphQLString
        },
        hire_date:{
            type: GraphQLDate
        },
        salary:{
            type: GraphQLInt
        }
    }
});

const RootQuery=new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        users: {
            type: new GraphQLList(UsersType),
            resolve(parents,args){
                return UsersModel.find({},(err,user)=>{
                    if(err)
                        console.log(err);
                });
            }
        },
        employees: {
            type: new GraphQLList(EmployeesType),
            resolve(parent,args){
                return EmployeesModel.find({},(project,err)=>{
                    if(err)
                        console.log(err);
                });
            }
        },
        projects: {
            type: new GraphQLList(ProjectsType),
            resolve(parent,args){
                return ProjectsModel.find({},(project,err)=>{
                    if(err)
                        console.log(err);
                });
            }
        }
    }
});

const Mutation=new GraphQLObjectType({
    name: "Mutation",
    fields: {
        registerUser: {
            type: UsersType,
            args: {
                email:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                password:{
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent,args){
                UsersModel.findOne({email: args.email},(err,user)=>{
                    if(err)
                        console.log(err);
                    else if(!user)
                    {
                        let user=new UsersModel({
                            email: args.email,
                            password: md5(args.password),
                            token: jsonwebtoken.sign({ email: args.email }, "secrettoken")
                        });
                        return user.save();
                    }
                });
            }
        },
        loginUser: {
            type: UsersType,
            args: {
                _id:{
                    type: GraphQLID
                },
                email:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                password:{
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parents,args){
                return UsersModel.findOne({email: args.email,password: md5(args.password)},(err,user)=>{
                    if(err)
                        console.log(err);
                });
            }
        },
        deleteUser: {
            type: UsersType,
            args: {
                email:{
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent,args){
                return UsersModel.findOneAndDelete({email: args.email},(err,user)=>{
                    if(err)
                        console.log(err);
                });
            }
        },
        createEmployee: {
            type: EmployeesType,
            args: {
                project_id: {
                    type: GraphQLID
                },
                name:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                adress:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                email:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                job_title:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                hire_date:{
                    type: new GraphQLNonNull(GraphQLDate)
                },
                salary:{
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve(parent,args){
                let employee;
                if(args.project_id)
                    employee=new EmployeesModel({
                        project_id: args.project_id,
                        name: args.name,
                        adress: args.adress,
                        email: args.email,
                        job_title: args.job_title,
                        hire_date: args.hire_date.toISOString(),
                        salary: args.salary
                    });
                else
                    employee=new EmployeesModel({
                        name: args.name,
                        adress: args.adress,
                        email: args.email,
                        job_title: args.job_title,
                        hire_date: args.hire_date.toISOString(),
                        salary: args.salary
                    });
                return employee.save();
            }
        },
        readEmployee: {
            type: BasicInfoEmployees,
            args: {
                _id:{
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent,args){
                return EmployeesModel.findById(args._id,(employee,err)=>{
                    if(err)
                        console.log(err);
                });
            }
        },
        updateEmployee: {
            type: EmployeesType,
            args: {
                _id:{
                    type: new GraphQLNonNull(GraphQLID)
                },
                project_id:{
                    type: GraphQLID
                },
                name:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                adress:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                email:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                job_title:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                hire_date:{
                    type: new GraphQLNonNull(GraphQLDate)
                },
                salary:{
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve(parent,args){
                if(args.project_id)
                    return EmployeesModel.findOneAndUpdate({_id: args._id},{project_id: args.project_id,name: args.name,adress: args.adress,email: args.email,job_title: args.job_title, hire_date: args.hire_date, salary: args.salary},(employee,err)=>{
                        if(err)
                            console.log(err);
                    });
                else 
                    return EmployeesModel.findOneAndUpdate({_id: args._id},{project_id: null,name: args.name,adress: args.adress,email: args.email,job_title: args.job_title, hire_date: args.hire_date, salary: args.salary},(employee,err)=>{
                        if(err)
                            console.log(err);
                    });
            }
        },
        deleteEmployee: {
            type: EmployeesType,
            args: {
                _id:{
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent,args){
                return EmployeesModel.findOneAndDelete({_id: args._id},(employee,err)=>{
                    if(err)
                        console.log(err);
                });
            }
        },
        createProject: {
            type: ProjectsType,
            args: {
                project_name:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                start_date:{
                    type: new GraphQLNonNull(GraphQLDate)
                },
                planned_end_date:{
                    type: new GraphQLNonNull(GraphQLDate)
                },
                description:{
                    type: GraphQLString
                },
                project_code:{
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent,args){
                let project=new ProjectsModel({
                    project_name: args.project_name,
                    start_date: args.start_date,
                    planned_end_date: args.planned_end_date,
                    description: args.description,
                    project_code: args.project_code
                });
                return project.save();
            }
        },
        readProject: {
            type: ProjectsType,
            args: {
                _id:{
                    type: GraphQLID
                }
            },
            resolve(parents,args){
                return ProjectsModel.findOne({_id: args._id},(project,err)=>{
                    if(err)
                        console.log(err);
                });
            }
        },
        updateProject: {
            type: ProjectsType,
            args: {
                _id:{
                    type: new GraphQLNonNull(GraphQLID)
                },
                project_name:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                start_date:{
                    type: new GraphQLNonNull(GraphQLDate)
                },
                planned_end_date:{
                    type: new GraphQLNonNull(GraphQLDate)
                },
                description:{
                    type: GraphQLString
                },
                project_code:{
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parents,args){
                return ProjectsModel.findOneAndUpdate({_id: args._id},{project_name: args.project_name,start_date: args.start_date,planned_end_date: args.planned_end_date,description: args.description,project_code: args.project_code},(project,err)=>{
                    if(err)
                        console.log(err);
                });
            }
        },
        deleteProject: {
            type: ProjectsType,
            args: {
                _id:{
                    type: GraphQLID
                }
            },
            resolve(parents,args){
                return ProjectsModel.findOneAndDelete({_id: args._id},(project,err)=>{
                    if(err)
                        console.log(err);
                });
            }
        }
    }
});

module.exports=new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});