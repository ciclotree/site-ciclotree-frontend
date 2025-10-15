import React, { useState } from "react";
import JobModel from "../../models/JobModel";
import { EstimateModal } from "./modals/EstimateModal";
import { ReviewModal } from "./modals/ReviewModal";
import { EstimateFormData } from "./types/EstimateModal.types";
import { ReviewFormData } from "./types/ReviewModal.types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Props {
  job: JobModel;
  mobile: boolean;
  onJobUpdated?: () => void;
  onReviewsUpdated?: () => void;
}

export const EstimateAndReviewBox: React.FC<Props> = ({
  job,
  mobile,
  onJobUpdated,
  onReviewsUpdated,
}) => {
  const [showEstimateModal, setShowEstimateModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const navigate = useNavigate();

  const handleEstimateSubmit = async (form: EstimateFormData): Promise<boolean> => {
    const payload = {
      ...form,
      service: job.title,
      jobId: job.id,
    };

    try {
      const response = await fetch("http://localhost:8080/api/email/sendEstimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(await response.text());

      toast.success("Orçamento enviado com sucesso!");

      if (onJobUpdated) onJobUpdated();

      return true;
    } catch (error: any) {
      toast.error("Erro ao enviar orçamento: " + error.message);
      return false;
    }
  };

  const handleReviewSubmit = async (form: ReviewFormData): Promise<boolean> => {
    const payload = {
      ...form,
      date: new Date().toISOString(),
      jobId: job.id,
    };

    try {
      const response = await fetch("http://localhost:8080/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(await response.text());

      toast.success("Avaliação enviada com sucesso!");

      if (onReviewsUpdated) onReviewsUpdated();
      return true;
    } catch (error: any) {
      toast.error("Erro ao enviar avaliação: " + error.message);
      return false;
    }
  };

  return (
    <>
      <div className={mobile ? "card d-flex mt-5" : "card col-3 container d-flex mb-5"}>
        <div className="card-body container">
          <p><b>{job.estimates ?? 0}</b> Orçamentos já solicitados</p>
          <hr />
          <h4 className="text-success">Serviço disponível para orçamento</h4>
        </div>

        <button
          className="btn-orcamento btn"
          onClick={() => setShowEstimateModal(true)}
        >
          Solicitar orçamento
        </button>

        <br />
        <button
          className="btn main-color text-white btn-outline"
          onClick={() => setShowReviewModal(true)}
        >
          Avaliar este serviço
        </button>
      </div>

      <EstimateModal
        show={showEstimateModal}
        onClose={() => setShowEstimateModal(false)}
        onSubmit={handleEstimateSubmit}
        selectedService={{ id: job.id, title: job.title }} // ✅ Passa o serviço bloqueado
      />

      <ReviewModal
        show={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        jobId={job.id}
        onSubmit={handleReviewSubmit}
      />
    </>
  );
};
