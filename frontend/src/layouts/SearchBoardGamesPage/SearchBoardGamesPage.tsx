import { useEffect, useState } from "react";
import BoardGameModel from "../../models/BoardGameModel";
import axios from "axios";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBoardGames } from "./components/SearchBoardGames";
import { Pagination } from "../Utils/Pagination";

export const SearchBoardGamesPage = () => {
    const [boardGames, setBoardGames] = useState<BoardGameModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [boardGamesPerPage] = useState(5);
    const [totalBoardGames, setTotalBoardGames] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchBoardGames = async () => {
            try {
                const url: string = `http://localhost:8080/api/boardGames?page=${currentPage - 1}&size=${boardGamesPerPage}`;
                const response = await axios.get(url);
    
                if (response.status !== 200) {
                    throw new Error('Something went wrong!');
                }
    
                const data = response.data._embedded.boardGames;

                setTotalBoardGames(response.data.page.totalElements);
                setTotalPages(response.data.page.totalPages);

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
        window.scrollTo(0, 0);
    }, [currentPage]);

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

    const indexLastBoardGame: number = currentPage * boardGamesPerPage;
    const indexFirstBoardGame: number = indexLastBoardGame - boardGamesPerPage;
    let lastItem = currentPage * boardGamesPerPage <= totalBoardGames ? currentPage * boardGamesPerPage : totalBoardGames;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
                        <h5>Number of results: {totalBoardGames}</h5>
                    </div>
                    <p>
                        {indexFirstBoardGame + 1} to {lastItem} of {totalBoardGames} items
                    </p>
                    {boardGames.map(boardGame => (
                        <SearchBoardGames boardGame={boardGame} key={boardGame.id}/>
                    ))}
                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>
                    }
                </div>
            </div>
        </div>
    );
}