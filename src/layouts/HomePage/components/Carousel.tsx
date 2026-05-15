import { ReturnJob } from "./ReturnJob";
import {useEffect, useState} from 'react';
import JobModel from "../../../models/JobModel";
import { SpinnerLoading } from "../../utils/SpinnerLoading";
import { Link } from "react-router-dom";
import JobCardModel from "../../../models/JobCardModel";

export const Carousel = () => {
    const [jobs, setJobs] = useState<JobCardModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const fetchJobs = async () => {
            const baseUrl: string = API_BASE_URL + "/api/jobImage";
            const url: string = `${baseUrl}?page=0&size=6`;
            const response = await fetch(url);

            if(!response.ok) {
                throw new Error("Algo deu errado.");
            }

            const responseJson = await response.json();

            const responseData = responseJson;

            const loadedJobs: JobCardModel[] = responseData.map((job: any) => {
                return new JobCardModel(
                job.id,
                job.title,
                job.estimates,
                job.resume,
                `${API_BASE_URL}${job.imageUrl}`
                );
            });

            setJobs(loadedJobs);
            setIsLoading(false);
        };
        fetchJobs().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if(isLoading){
        return (
            <SpinnerLoading />
        );
    }
    if(httpError){
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }
    return (
        <div className="container mt-5 card" style={{ height: 550 }}>
            <div className="homepage-carousel-title">
                <h3 className="text-center text-md-start">Nossos Serviços</h3>
            </div>
            <div id="carouselExampleControls" className="carousel carousel-dark slide mt-5 d-none d-lg-block" data-bs-interval="false">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row d-flex justify-content-center align-items-center">
                            {jobs.slice(0,3).map(job => (
                                <ReturnJob job={job} key={job.id} />
                            ))}

                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {jobs.slice(3,6).map(job => (
                                <ReturnJob job={job} key={job.id} />
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
                <ReturnJob job={jobs[0]} key={jobs[0].id}/>
                </div>
            </div>
            <div className="homepage-carousel-button mt-3">
                <Link className="btn btn-outline-secondary btn-lg" to="/search">Ver mais</Link>
            </div> 
        </div> 
    );
}
