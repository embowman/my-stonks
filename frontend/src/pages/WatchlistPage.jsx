import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { api } from "../utilities.jsx";
import CardHeader from "../components/CardHeader.jsx";
import StonkSummary from "../components/StonkSummary.jsx";

export default function WatchlistPage() {
    const [[user, setUser], [watchlist, setWatchlist]] = useOutletContext();
    const [stonkSymbol, setStonkSymbol] = useState("");
    const [symbolFound, setSymbolFound] = useState(false);
    const [fetchWatchlist, setFetchWatchlist] = useState(true);

    async function addStonk() {
        await api.put("watchlist/", {
            'req': 'add',
            'symbol': stonkSymbol,
        })
        setStonkSymbol("")
        setSymbolFound(false)
        setFetchWatchlist(true)
    }

    async function removeStonk(symbol) {
        await api.put("watchlist/", {
            'req': 'rem',
            'symbol': symbol,
        })
        setFetchWatchlist(true)
    }

    useEffect(() => {
        async function getWatchlist() {
            const response = await api.get("watchlist/");
            setWatchlist(response.data);
            setFetchWatchlist(false);
        };
        if (fetchWatchlist && user) {
            getWatchlist();
        }
    }, [fetchWatchlist, user]);

    const search = async (e, symbol) => {
        e.preventDefault();
        setStonkSymbol(symbol);

        const response = await api.post("search/", {
            'symbol': symbol,
        })

        if (response.status === 200) {
            setSymbolFound(false);
        }
        
        if (response.status === 204) {
            setSymbolFound(true);
            for (let i=0; i < watchlist.length; i++) {
                if (symbol === watchlist[i]) {
                    setSymbolFound(false);
                    break;
                }
                
            }
        }
    };

    const enterListener = (event) => {
        event.preventDefault()
        addStonk()
    }

    return (
        <>
        <div className="card">

            <CardHeader title="Watchlist" />

            <div className="card-body">

                {
                    
                    watchlist.map((stonk_info) => {
                        return (
                            <div key={stonk_info.symbol} className="sum-container">
                            <StonkSummary stonk_info={stonk_info} />
                            <button className="sum-button" onClick={() => removeStonk(stonk_info.symbol)}>X</button>
                            </div>
                        );
                    })
                }

                

                <form onSubmit={enterListener}>

                    {/* Input stonk */}
                    <div className="sym-search">
                        {
                            symbolFound
                            ? <div className="sym-suggestion found" onClick={addStonk}><h3>{stonkSymbol}</h3></div>
                            : <div className="sym-suggestion"><h3>UNKNOWN</h3></div>
                        }

                        <input 
                          type="search"
                          value={stonkSymbol}
                          onChange={(e) => search(e, e.target.value.toUpperCase())}
                          id="sym-input"
                          className="form-control"
                        />

                        <label htmlFor="sym-input" className="form-label">Search Ticker</label>
                    </div>
                    
                </form>

            </div>

            {/* Footer */}
            <div className="card-footer">
                <Link to="/account">My Account</Link>
            </div>

        </div>
        </>
    );
}