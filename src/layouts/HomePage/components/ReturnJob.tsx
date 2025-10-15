import React from 'react';
import JobModel from '../../../models/JobModel';
import { Link } from 'react-router-dom';

export const ReturnJob: React.FC<{job: JobModel}> = (props) => {
    return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
                                <div className="text-center">
                                    
                                    <img className="img-job" src={props.job.img}
                                        width="120"
                                        height="200"
                                        alt="Serviço" />
                                    <h6 className="mt-2">{props.job.title}</h6>
                                    <p>{props.job.resume}</p>
                                    <Link className="btn main-color text-white btn-outline" to={`/details/${props.job.id}`} >Solicite um orçamento</Link>
                                </div>
        </div>
    );
}