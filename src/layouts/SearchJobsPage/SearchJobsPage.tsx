import { useEffect, useState } from "react";
import JobModel from "../../models/JobModel";
import { SpinnerLoading } from "../utils/SpinnerLoading";
import { SearchJob } from "./components/SearchJob";
import { Pagination } from "../utils/Pagination";

export const SearchJobsPage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const [jobs, setJobs] = useState<JobModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(5);
    const [totalAmountOfJobs, setTotalAmountOfJobs] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [searchUrl, setSearchUrl] = useState("");
    const indexOfLastJob: number = currentPage * jobsPerPage;
    var indexOfFirstJob: number = indexOfLastJob - jobsPerPage;
    let lastItem = jobsPerPage * currentPage <= totalAmountOfJobs ?
        jobsPerPage * currentPage : totalAmountOfJobs;

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    useEffect(() => {
        const fetchJobs = async () => {
            const baseUrl: string = API_BASE_URL + "/api/jobs";
            let url: string = "";

            if(searchUrl === "") {
                url = `${baseUrl}?page=${currentPage-1}&size=${jobsPerPage}`;
            } else {
                url = baseUrl + searchUrl;
            }

            const response = await fetch(url);

            if(!response.ok) {
                throw new Error("Algo deu errado.");
            }

            const responseJson = await response.json();

            const responseData = responseJson.content ?? [];

            setTotalAmountOfJobs(responseJson.totalElements);
            setTotalPages(responseJson.totalPages);

            const loadedJobs: JobModel[] = responseData.map((job: any) => ({
            id: job.id,
            title: job.title,
            estimates: job.estimates,
            resume: job.resume,
            description: job.description,
            img: `${API_BASE_URL}${job.imageUrl}`
        }));

            setJobs(loadedJobs);
            setIsLoading(false);
        };
        fetchJobs().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        });

        window.scrollTo(0,0);
    }, [currentPage, searchUrl, jobsPerPage]);

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

    const searchHandleChange = () => {
        setCurrentPage(1);

        if (search.trim() === "") {
            setSearchUrl("");
        } else {
            setSearchUrl(`?title=${encodeURIComponent(search.trim())}&page=0&size=${jobsPerPage}`);
        }
    };
    
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    return (
        <div>
            <div className="container">
                <div>
                <div className="row mt-5">
                    <div className="col-12 col-md-6">
                        <form
                            className="d-flex search-container"
                            onSubmit={(e) => {
                                e.preventDefault();
                                searchHandleChange();
                            }}
                        >
                            <input
                                className="form-control me-4 search-input"
                                type="search"
                                placeholder="Procurar"
                                aria-label="Procurar"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />

                            <button
                                className="btn main-color text-white btn-outline search-button"
                                type="submit"
                            >
                                Procurar
                            </button>
                        </form>
                    </div>
                    </div>

                    {totalAmountOfJobs > 0 ?
                    <>
                        <div className="mt-3">
                            <h5>Numero de resultados: ({totalAmountOfJobs})</h5>
                        </div>
                        <p>
                            {indexOfFirstJob + 1} a {lastItem} de {totalAmountOfJobs} resultados
                        </p>
                        
                        {jobs.map(job => (
                            <SearchJob job ={job} key={job.id} />
                        ))}
                    </>
                    :
                    <div style={{ height: '45vh' }}> 
                        <br />
                        <h3>Não encontrou o que procurava?</h3>
                        <a type="button" className="btn main-color text-white btn-outline" href="/contact">Entre em contato conosco!</a>
                    </div>
                    }
                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    }
                </div>
            </div>
        </div>
    );
}