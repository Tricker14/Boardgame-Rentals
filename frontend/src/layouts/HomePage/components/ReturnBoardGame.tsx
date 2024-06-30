import React from "react";
import BoardGameModel from "../../../models/BoardGameModel";

export const ReturnBoardGame: React.FC<{boardGame: BoardGameModel}> = (props) => {
    return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="text-center">
                {
                    props.boardGame.imageURL ?
                    <img
                        src={props.boardGame.imageURL}
                        width="150"
                        height="230"
                        alt="game"
                    />
                    :
                    <img
                        src={require("../../../Images/GamesImages/game-1.jpg")}
                        width="150"
                        height="230"
                        alt="game"
                    />
                }
                <h6 className="mt-2">{props.boardGame.name}</h6>
                <p>{props.boardGame.designer}</p>
                <a href="#" className="btn main-color text-white">Reserve</a>
            </div>
        </div>
    );
}