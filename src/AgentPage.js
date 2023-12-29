import React, { useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import './AgentPage.css';


export default function AgentPage() {
    const {id}= useParams();
    const [agents, setAgents] = useState(null);
    useEffect(() => {
        fetch('https://bymykel.github.io/CSGO-API/api/en/agents.json')
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            data = data.filter((agent)=> agent.id === id)[0];
            console.log(data.description);
            data.description = data.description.replaceAll("\\n"," ");
            data.description = data.description.replaceAll("\\n\\n"," "); 
            data.description = data.description.replaceAll("\\","");
            data.description = data.description.replaceAll("</i>"," ");
            data.description = data.description.split("<i>");
            setAgents(data);
          });
      }, []);

return(
    <div className="AgentPage">
        <div className="navbarA">
            <a href="/" className="tituloA">⬅ BACK TO AGENTS</a>
        </div>
        {agents ? (
        <div className="grid">
            <div className="left">
                <div className="above">
                    <img alt={agents.id} src={agents.image}></img>
                    <h1>{agents.name}</h1>
                    <div className="backgroundAgent"></div> 
                </div>
                
            </div>
            <div className="right">
            <div className="under">
                    <div className="collection">
                        <img alt={agents.collections[0].id} src={agents.collections[0].image}></img>
                        <h5>{agents.collections[0].name}</h5>
                    </div>
                    <div className="otherInfo">
                        
                        <h2 className="h2rarity">Rarity: {agents.rarity.name}<br></br><br></br>{agents.team.name}</h2>
                        
                    </div>
                </div>
                
                <text>{agents.description[0]}<br></br><br></br><i>{agents.description[1]}</i></text>
                
                
            </div>
        </div>  
        ): (
            <p>Loading...</p>
        )}    
        </div>
);
}
