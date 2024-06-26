import React from "react";

export const ReturnBoardGame = () => {
    return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="text-center">
                <img
                    src={require("../../../Images/GamesImages/game-1.jpg")}
                    width="150"
                    height="230"
                    alt="game"
                />
                <h6 className="mt-2">Game</h6>
                <p>Luv2Code</p>
                <a href="#" className="btn main-color text-white">Reserve</a>
            </div>
        </div>
    );
}