import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { EstimateFormData } from "../types/EstimateModal.types";

interface JobModel {
  id: number;
  title: string;
  resume?: string;
  description?: string;
  estimates?: any[];
  img?: string;
}

interface EstimateModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (form: EstimateFormData) => Promise<boolean>;
  selectedService?: { id: number; title: string } | null;
}

export const EstimateModal: React.FC<EstimateModalProps> = ({
  show,
  onClose,
  onSubmit,
  selectedService = null,
}) => {
  const initialFormState: EstimateFormData = {
    name: "",
    email: "",
    phone: "",
    message: "",
    service: selectedService ? selectedService.title : "",
  };

  const [formData, setFormData] = useState<EstimateFormData>(initialFormState);
  const [jobs, setJobs] = useState<JobModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(!selectedService);
  const [httpError, setHttpError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedService) {
      const fetchJobs = async () => {
        try {
          const baseUrl = "https://ciclotree.com.br/api/jobs";
          const url = `${baseUrl}?page=0&size=50`;
          const response = await fetch(url);

          if (!response.ok) throw new Error("Erro ao buscar serviços.");

          const responseJson = await response.json();
          const responseData = responseJson._embedded.jobs;

          const loadedJobs: JobModel[] = [];

          for (const key in responseData) {
            loadedJobs.push({
              id: responseData[key].id,
              title: responseData[key].title,
              estimates: responseData[key].estimates,
              resume: responseData[key].resume,
              description: responseData[key].description,
              img: responseData[key].img,
            });
          }

          setJobs(loadedJobs);
          setIsLoading(false);
        } catch (error: any) {
          setHttpError(error.message);
          setIsLoading(false);
        }
      };

      fetchJobs();
    } else {
      setIsLoading(false);
    }
  }, [selectedService]);

  const resetForm = () => setFormData(initialFormState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const cleaned = value.replace(/\D/g, "");
      let formatted = "";

      if (cleaned.length > 0) formatted += `(${cleaned.substring(0, 2)}`;
      if (cleaned.length >= 3) formatted += `) ${cleaned.substring(2, 3)} `;
      if (cleaned.length >= 4) formatted += `${cleaned.substring(3, 7)}`;
      if (cleaned.length >= 8) formatted += `-${cleaned.substring(7, 11)}`;

      setFormData((prev) => ({ ...prev, phone: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSubmit(formData);
    if (success) {
      resetForm();
      onClose();
    }
  };

  if (isLoading) {
    return (
      <Modal show={show} onHide={onClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Solicitar Orçamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Carregando serviços...</p>
        </Modal.Body>
      </Modal>
    );
  }

  if (httpError) {
    return (
      <Modal show={show} onHide={onClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Solicitar Orçamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-danger">{httpError}</p>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Solicitar Orçamento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              required
              placeholder="(XX) X XXXX-XXXX"
              value={formData.phone}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Serviço</Form.Label>
            <Form.Select
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              disabled={!!selectedService} // ✅ Bloqueia se vier pré-selecionado
            >
              {!selectedService && <option value="">Selecione um serviço</option>}
              {selectedService ? (
                <option value={selectedService.id}>{selectedService.title}</option>
              ) : (
                jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Mensagem</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-between mt-4">
            <Button variant="success" type="submit">
              Enviar
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                resetForm();
                onClose();
              }}
            >
              Cancelar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
