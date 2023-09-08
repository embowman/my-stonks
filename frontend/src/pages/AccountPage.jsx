import { useState, useEffect } from "react";
import { useOutletContext, Link, useNavigate } from "react-router-dom";
import { api } from "../utilities.jsx";
import CardHeader from "../components/CardHeader.jsx";

export default function AccountPage() {
    const [[user, setUser], [watchlist, setWatchlist]] = useOutletContext();
    const navigate = useNavigate();
    const [upToDate, setUpToDate] = useState(false);

    const logout = async (e) => {
        e.preventDefault();
        const response = await api.post("logout/");

        if (response.status === 204) {
            setUser(null);
            localStorage.removeItem("token");
            delete api.defaults.headers.common["Authorization"];

            navigate("/login");
        }
    };

    const update = async () => {
        await api.get("update/");
        setUpToDate(true);
    };

    useEffect(() => {
        async function fetchData() {

            const response = await api.get("lastdate/");
            
            const lastEntryDate = response.data;
            const lastMonth = lastEntryDate.slice(0, 7);
            const lastDay = Number(lastEntryDate.slice(8, 10));

            const today = new Date().toJSON();
            const month = today.slice(0, 7);
            const day = Number(today.slice(8, 10)) - 1;

            setUpToDate(lastMonth === month && lastDay === day);
        };
        fetchData();
    }, []);

    return (
        <>
        <div className="card">

            <CardHeader title="My Account" />

            <div className="card-body">
                {
                    upToDate
                    ? <button className="disabled-button" disabled>Up To Date</button>
                    : <button className="card-button" onClick={update}>Update Data</button>
                }
                <button className="card-button" onClick={(e) => logout(e)}>Logout</button>
            </div>

            {/* Footer */}
            <div className="card-footer">
                <Link to="/watchlist">My Watchlist</Link>
            </div>

        </div>
        </>
    );
}