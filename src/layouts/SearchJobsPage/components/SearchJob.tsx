import JobModel from "../../../models/JobModel";
import './SearchJob.css';
export const SearchJob: React.FC<{ job: JobModel }> = (props) => {

    return (
        <div className="card mt-3 shadow p-3 mb-3  rounded job-color">
            <div className="row g-0">
                <div className="col-md-2">
                    <div className="d-none d-lg-block">
                            <img className="img-job" src={props.job.img}
                                width="123"
                                height="196"
                                alt="Serviço"
                            />
                    </div>
                    <div className="d-lg-none d-flex justify-content-center
                    align-items-center">
                        <img className="img-job" src={props.job.img}
                                width="123"
                                height="196"
                                alt="Serviço"
                            />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h4>{props.job.title}</h4>
                        <h5 className="card-title">{props.job.resume}</h5>
                        <p className="card-text">
                            {(props.job.description ?? "").length > 200
                                ? (props.job.description ?? "").substring(0, 200) + "..."
                                : (props.job.description ?? "")
                            }
                        </p>
                    </div>
                </div>
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <a className="btn main-color text-white btn-outline" href={`/details/${props.job.id}`}>
                        Ver detalhes
                    </a>
                </div>
            </div>
        </div>
    );
}