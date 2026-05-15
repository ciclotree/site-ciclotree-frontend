import React from "react";
import { Link } from "react-router-dom";
import JobCardModel from "../../../models/JobCardModel";

type ReturnJobProps = {
  job: JobCardModel;
  priority?: boolean;
};

export const ReturnJob: React.FC<ReturnJobProps> = ({ job, priority = false }) => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        <img
          className="img-job"
          src={job.imageUrl}
          width="120"
          height="200"
          alt={job.title}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />

        <h6 className="mt-2">{job.title}</h6>

        <p>{job.resume}</p>

        <Link
          className="btn main-color text-white btn-outline"
          to={`/details/${job.id}`}
        >
          Solicite um orçamento
        </Link>
      </div>
    </div>
  );
};