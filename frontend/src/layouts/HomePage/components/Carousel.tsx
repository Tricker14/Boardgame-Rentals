import { useEffect, useState } from "react";
import { ReturnBoardGame } from "./ReturnBoardGame";
import BoardGameModel from "../../../models/BoardGameModel";
import axios from "axios";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";

export const Carousel = () => {
    const [boardGames, setBoardGames] = useState<BoardGameModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchBoardGames = async () => {
            try {
                const url: string = "http://localhost:8080/api/boardGames?page=0&size=9";
                const response = await axios.get(url);
    
                if (response.status !== 200) {
                    throw new Error('Something went wrong!');
                }
    
                const data = response.data._embedded.boardGames;

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

    return (
        <div className="container mt-5" style={{ height: 550 }}>
            <div className="homepage-carousel-name">
                <h3>Find your next board games.</h3>
            </div>

            {/* Desktop */}
            <div id="carouselExampleControls" className="carousel carousel-dark slide mt-5 
                d-none d-lg-block" data-bs-interval="false">

                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row d-flex justify-content-center align-items-center">
                            {boardGames.slice(0, 3).map((boardGame) => (
                                <ReturnBoardGame boardGame={boardGame} key={boardGame.id}/>
                            ))}
                        </div>
                    </div>

                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {boardGames.slice(3, 6).map((boardGame) => (
                                <ReturnBoardGame boardGame={boardGame} key={boardGame.id}/>
                            ))}
                        </div>
                    </div>

                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {boardGames.slice(6, 9).map((boardGame) => (
                                <ReturnBoardGame boardGame={boardGame} key={boardGame.id}/>
                            ))}
                        </div>
                    </div>
                </div>

                <button className="carousel-control-prev" type="button"
                    data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button"
                    data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* Mobile */}
            <div className="d-lg-none mt-3">
                <div className="row d-flex justify-content-center align-items-center">
                    <ReturnBoardGame boardGame={boardGames[7]} key={boardGames[7].id}/>
                </div>
            </div>

            <div className="homepage-carousel-name mt-3">
                <Link className="btn btn-outline-secondary btn-lg" to={"/search"}>View More</Link>
            </div>
        </div>
    );
}