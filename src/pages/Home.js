import React from "react";
import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { FaCalendarAlt, FaSortAlphaDown } from 'react-icons/fa';


import CardRepository from "../components/CardRepository/CardRepository";
import { useFetch } from "../hooks/useFetch";

const urlRepositories = "https://api.github.com/users/gabrielnicodemos/repos";
const urlProfile = "https://api.github.com/users/gabrielnicodemos";

const Home = () => {
  const [search, setSearch] = useState("");
  const [repositories, setRepositories] = useState([]);
  const { data: items } = useFetch(urlRepositories);
  const { data: user } = useFetch(urlProfile);


  useEffect(() => {
    if (items) {
      if (search.length > 0) {
        const repositoySearh = items.filter((repository) =>
          repository.name.toUpperCase().includes(search.toUpperCase())
        );
        setRepositories(repositoySearh);
      } else {
        setRepositories(items);
      }
    }
  }, [items, search]);

  const handleOrderDate = () => {
    const sortedDates = repositories
      .map((obj) => {
        return { ...obj, updated_at: new Date(obj.updated_at) };
      })
      .sort((a, b) => b.updated_at - a.updated_at);
    setRepositories(sortedDates);
  };

  const handleOrderAlfa = () => {
    const sortedName = [...repositories].sort((a, b) =>
      a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
    );

    setRepositories(sortedName);
  };

  const handleFilter = () => {
    let filterChecknox = document.getElementsByName("optionsFilter");
    let filterOptions = [];

    for (var i = 0; i < filterChecknox.length; i++) {
      if (filterChecknox[i].checked) {
        if (filterChecknox[i].value === "javascript") {
          filterOptions.push("JavaScript");
        } else if (filterChecknox[i].value === "kotlin") {
          filterOptions.push("Kotlin");
        } else if (filterChecknox[i].value === "vue") {
          filterOptions.push("Vue");
        }
      }
    }

    let repositoriesFilters = [];
    if (filterOptions.length > 0) {
      console.log(filterOptions);
      repositoriesFilters = repositories.filter((data) =>
        filterOptions.includes(data.language)
      );
    } else {
      repositoriesFilters = items;
    }
    setRepositories(repositoriesFilters);
  };

  return (
    <div className={styles.container}>
      {user && (
        <div className={styles.user}>
          <img src={user.avatar_url} alt="" />
          <div className={styles.infos}>
            <p>{user.login}</p>
            <p>{user.location}</p>
            <p>Repositórios ({user.public_repos})</p>
            <img src="" alt="" srcset="" />
          </div>

        </div>
      )}
      <div className={styles.filters}>
        <input
          className={styles.input_search}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="find a repository.."
        />

        <div className={styles.groups}>
          <div>
            <FaSortAlphaDown className={styles.icons} onClick={handleOrderAlfa} />
            <FaCalendarAlt className={styles.icons} onClick={handleOrderDate} />
          </div>

          <div className={styles.option_Filter}>
              <div className={styles.options}> 
                <p>JavaScript:</p>
                <input
                  type="checkbox"
                  name="optionsFilter"
                  value="javascript"
                  onClick={handleFilter}
                />
              </div>
              <div className={styles.options}>
                <p>Kotlin:</p>
                <input
                  type="checkbox"
                  name="optionsFilter"
                  value="kotlin"
                  onClick={handleFilter}
                />
              </div>
              <div className={styles.options}>
                <p>Vue:</p>
                <input
                  type="checkbox"
                  name="optionsFilter"
                  value="vue"
                  onClick={handleFilter}
                />
              </div>
          </div>
        </div>
      </div>
      
      {repositories &&
        repositories.map((repository) => (
          <CardRepository key={repository.id} repository={repository} />
        ))}
    </div>
  );
};

export default Home;
