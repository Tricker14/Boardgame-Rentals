import { Link } from "react-router-dom";

export const ExploreTopGames = () => {
    return(
        <div className="p-5 mb-4 bg-dark header">
            <div className="container-fluid py-5 text-white 
                d-flex justify-content-center align-items-center">
                <div>
                    <h1 className="display-5 fw-bold">
                        Find your next adventure
                    </h1>
                    <p className="col-md fs-4">
                        Where would you like to go next?
                    </p>
                    <Link className="btn main-color btn-lg text-white" type="button" to={"/search"}>
                        Explore top board games
                    </Link>
                </div>
            </div>
        </div>
    );
}