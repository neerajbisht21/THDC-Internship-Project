import React, { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export const AdminContext = createContext(null);

export const AdminAllComplaintsProvider = ({ children }) => {
    const [allEmployeeComplaints, setAllEmployeeComplaints] = useState([]);
    const [allWorkers, setAllWorkers] = useState([]);
    const [loadingComplaints, setLoadingComplaints] = useState(true);

    // Extract necessary state from Redux
    const { isGetEmployeeComplaint, allComplaints } = useSelector((state) => state.allEmployeeComplaints);
    const { isGetWorkers, workers } = useSelector((state) => state.allWorkers);

    // Populate allEmployeeComplaints from Redux (initial load)
    useEffect(() => {
        if (isGetEmployeeComplaint) {
            setAllEmployeeComplaints(Array.isArray(allComplaints) ? allComplaints : []);
        }
    }, [isGetEmployeeComplaint, allComplaints]);

    // Fetch pending complaints dynamically from backend
    useEffect(() => {
        const fetchPendingComplaints = async () => {
            try {
                setLoadingComplaints(true);
                const { data } = await axios.get('/api/complaints/pending'); // your backend route
                // Only keep complaints with status "Processing"
                setAllEmployeeComplaints(data.allComplaints.filter(c => c.status === "Processing"));
                setLoadingComplaints(false);
            } catch (error) {
                console.error("Error fetching pending complaints:", error);
                setLoadingComplaints(false);
            }
        };

        fetchPendingComplaints();
    }, []);

    return (
        <AdminContext.Provider value={{ 
            allEmployeeComplaints, 
            setAllEmployeeComplaints, 
            isGetWorkers, 
            workers,
            loadingComplaints
        }}>
            {children}
        </AdminContext.Provider>
    );
};
