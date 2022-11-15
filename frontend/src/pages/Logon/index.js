import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';

import "./styles.css";
import logoIMG from '../../assets/logo.svg'
import heroesIMG from '../../assets/heroes.png';

export default function Logon(){
  const [id, setID] = useState('');
  const history = useNavigate();

  async function handleLogin(e){
    e.preventDefault();

    try{
      const response = await api.post('sessions', { id });

      localStorage.setItem('ongID', id);
      localStorage.setItem('ongName', response.data.name);
      history('/profile');

    } catch(err) {
      alert('Falha no login, tente novamente.');
    }
  }

  return(
    <div className="logon-container">
      <section className="form">
        <img src={logoIMG} alt="Be The Hero" />
        <form onSubmit={handleLogin}>

          <h1>Faça seu logon</h1>
          <input 
          placeholder="Sua ID"
          value={id}
          onChange={e => setID(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041"/> 
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesIMG} alt="Heroes" />
    </div>
  );
}