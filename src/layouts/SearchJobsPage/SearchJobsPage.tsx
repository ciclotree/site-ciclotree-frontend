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
    useEffect(() => {
        const fetchJobs = async () => {
            const baseUrl: string = "https://ciclotree.com.br:8080/api/jobs";
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

            const responseData = responseJson._embedded.jobs;

            setTotalAmountOfJobs(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            const loadedJobs: JobModel[] = [];

            for(const key in responseData){
                loadedJobs.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    estimates: responseData[key].estimates,
                    resume: responseData[key].resume,
                    description: responseData[key].description,
                    img: responseData[key].img
                });
            }

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
        if(search === "") {
            indexOfFirstJob = 1;
            setSearchUrl("");
        }else {
            indexOfFirstJob = 1;
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=0&size=${jobsPerPage}`);
        }
    }
    
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    return (
        <div>
            <div className="container">
                <div>
                <div className="row mt-5">
                    <div className="col-12 col-md-6">
                        <div className="d-flex search-container">
                        <input
                            className="form-control me-4 search-input"
                            type="search"
                            placeholder="Procurar"
                            aria-labelledby="Procurar"
                            onChange={e => setSearch(e.target.value)}
                        />
                        <button
                            className="btn main-color text-white btn-outline search-button"
                            onClick={() => searchHandleChange()}
                        >
                            Procurar
                        </button>
                        </div>
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