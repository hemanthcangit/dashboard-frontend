import React,{useEffect,useState} from 'react';

import {
    getAllDashboards,
    createDashboard,
    deleteDashboard
} from '../services/dashboardService';

const DashboardPage = () => {
    const [dashboards, setDashboards] = useState([]);

    const [formData, setFormData] = useState({
        dashboardName: "",
        description: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        loadDashboards();
    },[]);

    const loadDashboards = async () => {
        const response = await getAllDashboards();

        setDashboards(response.data);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        await createDashboard(formData);
        
        setFormData({
            departmentName: '',
            description: ''
        });

        loadDashboards();
    };

    const handleDelete = async (id) => {
        await deleteDashboard(id);
        loadDashboards();
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Dashboard Management</h2>

            {/* Form */}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input 
                    type="text" 
                    className="form-control"
                    placeholder="Dashboard Name"
                    name="dashboardName"
                    value={formData.dashboardName}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div className="mb-3">
                    <textarea name="description"
                    className="form-control"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    ></textarea>

                </div>
                <button className="btn btn-primary">
                    Add Dashboard
                </button>
            </form>

            {/* TABLE */}
            <table className="table table-bordered table-scripted mt-5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Dashboard Name</th>
                        <th>Description</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        dashboards.map((dashboard) => (
                            <tr key={dashboard.id}>
                                <td>{dashboard.id}</td>
                                <td>{dashboard.dashboardName}</td>
                                <td>{dashboard.description}</td>
                                <td>
                                    <button className="btn btn-danger"
                                    onClick ={()=>handleDelete(dashboard.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
};

export default DashboardPage;