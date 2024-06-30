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
    const [search, setSearch] = useState("");
    const [searchURL, setSearchURL] = useState("");
    const [category, setCategory] = useState("BoardGame category");

    useEffect(() => {
        const fetchBoardGames = async () => {
            try {
                const baseURL: string = "http://localhost:8080/api/boardGames";
                let url: string = "";
                if(searchURL === ""){
                    url = `${baseURL}?page=${currentPage - 1}&size=${boardGamesPerPage}`;
                }
                else{
                    let searchPage = searchURL.replace("<pageNumber>", `${currentPage - 1}`);
                    url = baseURL + searchPage;
                }

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
                        name: data[key].name,
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
    }, [currentPage, searchURL]);

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

    const searchHandleChange = () => {
        setCurrentPage(1);
        if(search === ""){
            setSearchURL("");
        }
        else{
            setSearchURL(`/search/findByNameContaining?name=${search}&page=<pageNumber>&size=${boardGamesPerPage}`);
        }
        setCategory("Board Game category")
    }

    const categoryField = (value: string) => {
        setCurrentPage(1);
        if(
            value.toLocaleLowerCase() === "strategy" || 
            value.toLocaleLowerCase() === "party" || 
            value.toLocaleLowerCase() === "cooperative" ||
            value.toLocaleLowerCase() === "deck-building"){
                setCategory(value);
                setSearchURL(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${boardGamesPerPage}`)
            }
            else{
                setCategory("All");
                setSearchURL(`&page=<pageNumber>&size=${boardGamesPerPage}`)
            }
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
                                placeholder="Search" aria-labelledby="Search"
                                onChange={e => setSearch(e.target.value)}/>
                            <button className="btn btn-outline-success" onClick={() => searchHandleChange()}>
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button"
                                id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                {category}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li onClick={() => categoryField("All")}>
                                    <a href="#" className="dropdown-item">
                                        All
                                    </a>
                                </li>
                                <li onClick={() => categoryField("Strategy")}>
                                    <a href="#" className="dropdown-item">
                                        Strategy
                                    </a>
                                </li>
                                <li onClick={() => categoryField("Party")}>
                                    <a href="#" className="dropdown-item">
                                        Party
                                    </a>
                                </li>
                                <li onClick={() => categoryField("Cooperative")}>
                                    <a href="#" className="dropdown-item">
                                        Cooporative
                                    </a>
                                </li>
                                <li onClick={() => categoryField("Deck-Building")}>
                                    <a href="#" className="dropdown-item">
                                        Deck-Building
                                    </a>
                                </li> 
                            </ul>
                        </div>
                    </div>
                    {totalBoardGames > 0 ?
                        <>
                            <div className="mt-3">
                                <h5>Number of results: {totalBoardGames}</h5>
                            </div>
                            <p>
                                {indexFirstBoardGame + 1} to {lastItem} of {totalBoardGames} items
                            </p>
                            {boardGames.map(boardGame => (
                                <SearchBoardGames boardGame={boardGame} key={boardGame.id}/>
                            ))}
                        </>
                        :
                        <>
                            <div className="m-5">
                                <h3>Can't find what you are looking for?</h3>
                                <a href="#" className="btn main-color btn-md px-4 me-md-4 fw-bold text-white" type="button">
                                    BoardGame Rentals Services
                                </a>
                            </div>
                        </>
                    }
                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>
                    }
                </div>
            </div>
        </div>
    );
}