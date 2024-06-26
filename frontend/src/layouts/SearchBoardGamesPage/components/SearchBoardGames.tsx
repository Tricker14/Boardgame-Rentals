import BoardGameModel from "../../../models/BoardGameModel";

export const SearchBoardGames: React.FC<{ boardGame: BoardGameModel }> = (props) => {
    return (
        <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
            <div className="row g-0">
                <div className="col-md-2">
                    <div className="d-none d-lg-block">
                        {props.boardGame.imageURL ?
                            <img src={props.boardGame.imageURL}
                                width="120"
                                height="190"
                                alt="Board Game"
                            />
                            :
                            <img src={require("../../../Images/GamesImages/game-1.jpg")}
                                width="120"
                                height="190"
                                alt="Board Game"
                            />
                        }
                    </div>
                    <div className='d-lg-none d-flex justify-content-center 
                        align-items-center'>
                        {props.boardGame.imageURL ?
                            <img src={props.boardGame.imageURL}
                                width="120"
                                height="190"
                                alt="Board Game"
                            />
                            :
                            <img src={require("../../../Images/GamesImages/game-1.jpg")}
                                width="120"
                                height="190"
                                alt="Board Game"
                            />
                        }
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-name">
                            {props.boardGame.designer}
                        </h5>
                        <h4>
                            {props.boardGame.name}
                        </h4>
                        <p className="card-text">
                            {props.boardGame.description}
                        </p>
                    </div>
                </div>
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <a href="#" className="btn btn-md main-color text-white">
                        View Details
                    </a>
                </div>
            </div>
        </div>
    );
}