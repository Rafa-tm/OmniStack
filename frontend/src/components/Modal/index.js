import React from "react";
import { FiMail, FiMessageSquare, FiX } from "react-icons/fi";
import "./styles.css";

export default function Modal({ content, handleModal }) {
  function sendZap() {}

  function sendMail() {}

  return (
    <div className="detail_wrapper">
      <div className="detail-box">
        <div className="content">
          <strong>CASO:</strong>
          <p>{content.incidentDetail.incident.title}</p>

          <strong>DESCRIÇÃO:</strong>
          <p>{content.incidentDetail.incident.description}</p>

          <strong>VALOR:</strong>
          <p>
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(content.incidentDetail.incident.value)}
          </p>

          <strong>ONG:</strong>
          <p>{content.incidentDetail.ong.name}</p>

          <strong>CIDADE:</strong>
          <p>{content.incidentDetail.ong.city}</p>

          <strong>ESTADO:</strong>
          <p>{content.incidentDetail.ong.uf}</p>

          <div className="buttons">
            <button className="button-social" onClick={sendZap}>
              <FiMessageSquare size={32} color="ffffff" /> WhatsApp
            </button>

            <button className="button-social" onClick={sendMail}>
              <FiMail size={32} color="ffffff" /> E-mail
            </button>
          </div>
        </div>
        <div>
          <button className="button-close" onClick={handleModal}>
            <FiX size={24} color="E02041" />
          </button>
        </div>
      </div>
    </div>
  );
}
