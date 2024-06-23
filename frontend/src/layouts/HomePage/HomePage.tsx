import { BoardGameService } from "./components/BoardGameService";
import { Carousel } from "./components/Carousel";
import { ExploreTopGames } from "./components/ExploreTopGames";
import { Heros } from "./components/Heros";

export const HomePage = () => {
    return(
        <>
            <ExploreTopGames/>
            <Carousel/>
            <Heros/>
            <BoardGameService/>
        </>
    );
}