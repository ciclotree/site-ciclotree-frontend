import {ExploreTopJobs} from './components/ExploreTopJobs';
import { Carousel } from './components/Carousel';
import { Heros } from './components/Heros';
import { SystemServices } from './components/SystemServices';

export const HomePage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return (
        <>
            <ExploreTopJobs />
            <Carousel />
            <Heros />
            <SystemServices />
        </>
    );
}