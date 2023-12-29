import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';


export default function App() {
  const [agents, setAgents] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const rarities = ['Distinguished', 'Exceptional', 'Superior', 'Master'];

  useEffect(() => {
    fetch('https://bymykel.github.io/CSGO-API/api/en/agents.json')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAgents(data);
        setFilteredAgents(data);
      });
  }, []);


  function onChangeSearch(value) {
    setSearch(value);
    if (value === '') {
      if (filters.length > 0) {
        const tempAgents = filters.map((rarity) => {
          const temp = agents.filter((agent) => agent.rarity.name === rarity);
          return temp;
        });
        setFilteredAgents(tempAgents.flat());
      } else {
        setFilteredAgents([...agents]);
      }
    } else {
      setFilteredAgents(filteredAgents.filter((agent) => agent.name.toLowerCase().includes(value.toLowerCase())));
    }
  }


  function onClickFilter(category,event) {
  
    onChangeSearch('');
    let filtersLocal = filters;
    if (filters.includes(category)) {
      const temp = filters.filter((el) => el !== category);
      setFilters(temp);
      filtersLocal = temp;
      event.currentTarget.classList.toggle("btnE");
    } else if (filtersLocal.length === 0) {
      event.currentTarget.classList.toggle("btnE");
      setFilters([...filters, category]);
      filtersLocal = ([...filters, category]);
    }
    if (filtersLocal.length > 0) {
      const tempAgents = filtersLocal.map((rarity) => {
        const temp = agents.filter((agent) => agent.rarity.name === rarity);
        return temp;
      });
      setFilteredAgents(tempAgents.flat());
    } else {
      setFilteredAgents([...agents]);
    }
  }


  function sortAgentsByName(value) {
    console.log(value);
    const sortedAgents = agents.sort((a, b) => {
      if (value === 1) {
        return a.name > b.name ? 1 : -1;
      } else if (value === -1) {
        return a.name < b.name ? 1 : -1;
      }
    });

    const sortedFilteredAgents = filteredAgents.sort((a, b) => {
      if (value === 1) {
        return a.name > b.name ? 1 : -1;
      } else if (value === -1) {
        return a.name < b.name ? 1 : -1;
      }
    });
    setAgents([...sortedAgents]);
    setFilteredAgents([...sortedFilteredAgents]);
    console.log(filteredAgents);
  }


  return (
    <div className="App">
      <div className="navbar">
          <a href="/" className="titulo">AGENTS</a>
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => onChangeSearch(e.target.value)}
          />
            <div className="buttons">
            {rarities.map((rarity, idx) => (
              <button
                onClick={(e) => onClickFilter(rarity,e)}
                className={`button`}
                key={`rarities-${idx}`}
              >
                {rarity}
              </button>

            ))}
            </div>
         
            <select onChange={(e) => sortAgentsByName(parseInt(e.target.value))}>
              <option>Order:</option>
              <option value="1">A-Z</option>
              <option value="-1">Z-A</option>
            </select>
          
        </div>
        <div className="grid">
          {filteredAgents.map((agent) => (
            <Link to={`/agent/${agent.id}`} className="container">
              <img key={agent.id} src={agent.image} alt={agent.name} />
              <text  className="nome">{agent.name}</text>
              <div className="background"></div>
            </Link>
          ))}
        </div>
      </div>
    
  );
}

