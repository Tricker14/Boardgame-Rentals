import { useEffect, useState } from "react";
import BoardGameModel from "../../models/BoardGameModel";
import axios from "axios";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBoardGames } from "./components/SearchBoardGames";

export const SearchBoardGamesPage = () => {
    const [boardGames, setBoardGames] = useState<BoardGameModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchBoardGames = async () => {
            try {
                const url: string = "http://localhost:8080/api/boardGames?page=0&size=5";
                const response = await axios.get(url);
    
                if (response.status !== 200) {
                    throw new Error('Something went wrong!');
                }
    
                const data = response.data._embedded.boardGames;

                const loadedBoardGames: BoardGameModel[] = [];
                for(let key in data){
                    loadedBoardGames.push({
                        id: data[key].id,
                        title: data[key].title,
                        designer: data[key].designer,
                        description: data[key].description,
                        copies: data[key].copies,
                        copiesAvailable: data[key].copiesAvailable,
                        category: data[key].category,
                        imageURL: data[key].imageURL,
                    });
                }

                setBoardGames(loadedBoardGames);
                setIsLoading(false);
            }
            catch(error: any) {
                setIsLoading(false);
                setHttpError(error.message);
            }
        };

        fetchBoardGames();
    }, []);

    if(isLoading){
        return(
            <SpinnerLoading/>
        )
    }

    if(httpError){
        return(
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }
    return(
        <div className="container">
            <div>
                <div className="row mt-5">
                    <div className="col-6">
                        <div className="d-flex">
                            <input type="search" className="form-control" 
                                placeholder="Search" aria-labelledby="Search"/>
                            <button className="btn btn-outline-success">
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button"
                                id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                Category
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a href="#" className="dropdown-item">
                                    All
                                </a>
                                <a href="#" className="dropdown-item">
                                    FrontEnd
                                </a>
                                <a href="#" className="dropdown-item">
                                    BackEnd
                                </a>
                                <a href="#" className="dropdown-item">
                                    Data
                                </a>
                                <a href="#" className="dropdown-item">
                                    Devops
                                </a>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h5>Number of results: {9}</h5>
                    </div>
                    <p>
                        1 to 5 of 9 items
                    </p>
                    {boardGames.map(boardGame => (
                        <SearchBoardGames boardGame={boardGame} key={boardGame.id}/>
                    ))}
                </div>
            </div>
        </div>
    );
}