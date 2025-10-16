import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { ReviewFormData } from "../types/ReviewModal.types";

interface ReviewModalProps {
  show: boolean;
  onClose: () => void;
  jobId: number;
  onSubmit: (form: ReviewFormData) => Promise<boolean>; // ✅ corrigido aqui
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  show,
  onClose,
  jobId,
  onSubmit,
}) => {
  const initialFormState: ReviewFormData = {
    rating: 0,
    reviewDescription: "",
    userCompany: "",
    verificationType: "email",
    contact: "",
    code: "",
  };

  const [form, setForm] = useState<ReviewFormData>(initialFormState);
  const [codeSent, setCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const resetForm = () => {
    setForm(initialFormState);
    setCodeSent(false);
    setIsVerified(false);
  };
  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.contact) {
      toast.error("Informe o e-mail para verificação.");
      return;
    }

    try {
      const response = await fetch("https://ciclotree.com.br/api/reviews/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          via: form.verificationType,
          contact: form.contact,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setCodeSent(true);
      toast.success("Código enviado com sucesso!");
    } catch (err: any) {
      toast.error("Erro ao enviar código: " + err.message);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://ciclotree.com.br/api/reviews/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact: form.contact,
          code: form.code,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setIsVerified(true);
      toast.success("Verificação concluída!");
    } catch (err: any) {
      toast.error("Código inválido.");
    }
  };

  const handleSubmit = async () => {
    if (form.rating < 1 || form.rating > 5 || !form.reviewDescription) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!isVerified) {
      toast.error("Você precisa verificar sua identidade antes de enviar.");
      return;
    }

    const success = await onSubmit(form);
    if (success) {
      resetForm();
      onClose();
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg" scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Avaliar Serviço</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nota (1 a 5)</Form.Label>
            <Form.Control
              type="number"
              min={1}
              max={5}
              name="rating"
              value={form.rating}
              required
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Comentário</Form.Label>
            <Form.Control
              as="textarea"
              name="reviewDescription"
              required
              value={form.reviewDescription}
              onChange={handleChange}
              rows={3}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Empresa (opcional)</Form.Label>
            <Form.Control
              type="text"
              name="userCompany"
              value={form.userCompany}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>

        <hr />

        <Form onSubmit={handleSendCode}>
          <Form.Group>
            <Form.Label>Método de Verificação</Form.Label>
            <Form.Check
              type="radio"
              label="Email"
              name="verificationType"
              value="email"
              checked
              disabled
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="contact"
              required
              value={form.contact}
              onChange={handleChange}
            />
          </Form.Group>

          <Button className="mt-2" type="submit" disabled={codeSent}>
            Enviar código
          </Button>
        </Form>

        {codeSent && (
          <Form onSubmit={handleVerifyCode}>
            <Form.Group className="mt-3">
              <Form.Label>Código recebido</Form.Label>
              <Form.Control
                type="text"
                name="code"
                required
                value={form.code}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" className="mt-2">
              Verificar código
            </Button>
          </Form>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => { resetForm(); onClose(); }}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!isVerified}>
          Enviar Avaliação
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
