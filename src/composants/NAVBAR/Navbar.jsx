import React from "react";
import { NavLink } from 'react-router-dom';
import {assets} from '../../assets/assets'


const Navbar = () =>{
    return(
        <div>
            <section id="sidebar">
                <div className="logo">
                    <img src={assets.logo} />
                </div>
                    <ul className="side-menu top">
                        <li>
                            <NavLink to="/dashboard"><i className='bx bx-home-alt'></i><span className="text">Tableau de board</span></NavLink>
                        </li>

                         <li>
                            <NavLink to="/faciale"><i className='bx bxs-file-find'></i><span className="text">Reconnaissance faciale</span></NavLink>
                        </li>

                        <li>
                            <NavLink to="/recherche"><i className='bx bxs-file-find'></i><span className="text">Liste de surveillance</span></NavLink>
                        </li>

                        <li>
                            <NavLink to="/alerte"><i className='bx bx-alarm'></i><span className="text">Alerte intelligente</span></NavLink>
                        </li>

                        <li>
                            <NavLink to="/dossier"><i className='bx bxs-file-archive'></i><span className="text">Nouveau dossier</span></NavLink>
                        </li>

                        <li>
                            <NavLink to="/dossier"><i className='bx bxs-file-archive'></i><span className="text">Nouvelle alerte</span></NavLink>
                        </li><br /><br />

                        <li>
                            <span className="text1"><hr /><br /> Configuration</span>
                        </li><br />
                        <li>
                            <NavLink to="/Etablissement"><i className='bx bx-cog'></i><span className="text">Pamamètre</span></NavLink>
                        </li>

                        <li>
                            <NavLink to="/historique-vente"><i className='bx bx-log-out'></i><span className="text">Se deconnecter</span></NavLink>
                        </li>
                    </ul>


            </section>
        </div>
    )
}

export default Navbar