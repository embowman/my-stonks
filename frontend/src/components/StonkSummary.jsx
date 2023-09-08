import { useNavigate } from "react-router-dom";

export default function StonkSummary({ stonk_info }) {

    const navigate = useNavigate();

    return (
        <div className={`stonk-summary ${stonk_info.diff > 0 ? "green" : "red"}`} onClick={() => navigate(`/watchlist/${stonk_info.symbol}`)}>
            <h3 className="sum-symb">{stonk_info.symbol}</h3>
            <h3 className="buffer"></h3>
            <h3 className="sum-data">{stonk_info.curr} {stonk_info.diff.toFixed(2)}</h3>
        </div>
    )
}