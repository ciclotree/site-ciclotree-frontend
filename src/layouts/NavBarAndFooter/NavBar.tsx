import { useRef, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import imageLogo from "../../Images/ciclotreelogo.png";
import { EstimateModal } from "../JobDetailsPage/modals/EstimateModal";
import { EstimateFormData } from "../JobDetailsPage/types/EstimateModal.types";

export const NavBar = () => {
  const collapseRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [showEstimateModal, setShowEstimateModal] = useState(false);

  // --- Fecha menu ao clicar ---
  const handleNavLinkClick = () => {
    if (collapseRef.current?.classList.contains("show")) {
      collapseRef.current.classList.remove("show");
    }
  };

  const handleLogoClick = () => {
    handleNavLinkClick();
    navigate("/home");
  };

  const handleOpenModal = () => setShowEstimateModal(true);
  const handleCloseModal = () => setShowEstimateModal(false);

  // --- Lógica de envio do orçamento ---
  const handleEstimateSubmit = async (form: EstimateFormData): Promise<boolean> => {
    const payload = {
      ...form,
      jobId: form.service, // o ID do serviço selecionado
    };

    try {
      const response = await fetch("https://ciclotree.com.br/api/email/sendEstimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(await response.text());

      toast.success("Orçamento enviado com sucesso!");
      return true;
    } catch (error: any) {
      toast.error("Erro ao enviar orçamento: " + error.message);
      return false;
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light navbar-color py-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* --- Logo --- */}
          <span
            className="navbar-brand d-flex align-items-center"
            style={{ cursor: "pointer" }}
            onClick={handleLogoClick}
          >
            <img
              src={imageLogo}
              alt="CicloTree"
              className="img-fluid"
              style={{ height: "60px", objectFit: "contain" }}
            />
          </span>

          {/* --- Botão menu mobile --- */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle Navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* --- Links --- */}
          <div
            className="collapse navbar-collapse justify-content-center align-items-center"
            id="navbarNavDropdown"
            ref={collapseRef}
          >
            <ul className="navbar-nav d-flex align-items-center text-center">
              <li className="nav-item shadow-on-hover">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link nav-text-ciclo-tree ${isActive ? "fw-bold" : ""}`
                  }
                  to="/home"
                  onClick={handleNavLinkClick}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item shadow-on-hover">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link nav-text-ciclo-tree ${isActive ? "fw-bold" : ""}`
                  }
                  to="/search"
                  onClick={handleNavLinkClick}
                >
                  Serviços
                </NavLink>
              </li>
              <li className="nav-item shadow-on-hover">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link nav-text-ciclo-tree ${isActive ? "fw-bold" : ""}`
                  }
                  to="/about"
                  onClick={handleNavLinkClick}
                >
                  Sobre Nós
                </NavLink>
              </li>
              <li className="nav-item shadow-on-hover">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link nav-text-ciclo-tree ${isActive ? "fw-bold" : ""}`
                  }
                  to="/mission"
                  onClick={handleNavLinkClick}
                >
                  Missão
                </NavLink>
              </li>
              <li className="nav-item shadow-on-hover">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link nav-text-ciclo-tree ${isActive ? "fw-bold" : ""}`
                  }
                  to="/contact"
                  onClick={handleNavLinkClick}
                >
                  Contato
                </NavLink>
              </li>
            </ul>
          </div>

          {/* --- Botão global de orçamento --- */}
          <button className="btn btn-orcamento" onClick={handleOpenModal}>
            Orçamento
          </button>
        </div>
      </nav>

      {/* --- Modal global --- */}
      <EstimateModal
        show={showEstimateModal}
        onClose={handleCloseModal}
        onSubmit={handleEstimateSubmit}
      />
    </>
  );
};
