import React from "react";
import axios from "axios";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { lightTheme, darkTheme } from "./Theme";
import "./Home.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countrties: [],
      searchResult: null,
      selectedRegion: null,
      loaded: false,
      theme: "light",
    };
    this.onSearch = this.onSearch.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }
  onSearch(e) {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${e.target.value}`)
      .then((res) => {
        if (res.status === 400) {
          this.setState({ searchResult: null });
        } else {
          console.log("search", res);
          this.setState({ searchResult: res.data });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  toggleTheme(e) {
    if (this.state.theme === "light") {
      this.setState({ theme: "dark" });
      console.log("Clicked", this.state.theme);
    } else {
      this.setState({ theme: "light" });
      console.log("Clicked", this.state.theme);
    }
  }
  onSelect(e) {
    axios
      .get(`https://restcountries.eu/rest/v2/region/${e.target.value}`)
      .then((res) => {
        this.setState({ selectedRegion: res.data });
        console.log("region", res.data);
      })
      .catch((err) => {
        console.log(err);
        this.setState({ selectedRegion: null });
      });
  }
  componentDidMount(props) {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => {
        console.log(res);
        this.setState({ countrties: res.data });
        this.setState({ loaded: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <ThemeProvider
        theme={this.state.theme === "light" ? lightTheme : darkTheme}
      >
        <>
          <GlobalStyles />
          <div>
            <Router>
              <nav>
                <h1>Where in the world</h1>
                <button className="dark" onClick={this.toggleTheme}>
                  Dark mode
                </button>
              </nav>
              <div className="nav-bar">
                <input
                  type="text"
                  className="search-box"
                  placeholder="Search Country"
                  onChange={this.onSearch}
                />
                <select
                  name="Fileter"
                  id="Filter"
                  className="filter"
                  onChange={this.onSelect}
                >
                  <option value="default">Select a region</option>
                  <option value="AFrica">Africa</option>
                  <option value="Asia">Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="Americas">Americas</option>
                  <option value="Oceania">Oceania</option>
                </select>
              </div>
              {this.state.loaded ? (
                <div>
                  {this.state.searchResult ? (
                    <div className="container">
                      {this.state.searchResult.map((result) => (
                        <div className="card" key={result.name}>
                          <Link to={result.name}>
                            <img src={result.flag} alt="Flag" />
                          </Link>
                          <h1>{result.name}</h1>
                          <ul className="details">
                            <li>Population: {result.population}</li>
                            <li>Region: {result.region}</li>
                            <li>Capital: {result.capital}</li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : this.state.selectedRegion ? (
                    <div className="container">
                      {this.state.selectedRegion.map((region) => (
                        <div className="card" key={region.numericCode}>
                          <Link to={region.name}>
                            <img src={region.flag} alt="Flag" />
                          </Link>
                          <h1>{region.name}</h1>
                          <ul className="details">
                            <li>Population: {region.population}</li>
                            <li>Region: {region.region}</li>
                            <li>Capital: {region.capital}</li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="container">
                      {this.state.countrties.map((country) => (
                        <div className="card" key={country.numericCode}>
                          <Link to={country.name}>
                            <img src={country.flag} alt="Flag" />
                          </Link>
                          <h1>{country.name}</h1>
                          <ul className="details">
                            <li>Population: {country.population}</li>
                            <li>Region: {country.region}</li>
                            <li>Capital: {country.capital}</li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="filler">
                  <h1>Loading</h1>
                </div>
              )}
            </Router>
          </div>
        </>
      </ThemeProvider>
    );
  }
}

export default Home;
