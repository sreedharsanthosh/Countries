import React from "react";
import axios from "axios";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { lightTheme, darkTheme } from "./Theme";
import { BrowserRouter as Router, Link } from "react-router-dom";

class Country extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: null,
      languages: [],
      currencies: [],
      TLD: [],
      theme: "light",
    };
    this.toggleTheme = this.toggleTheme.bind(this);
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
  componentDidMount(props) {
    axios
      .get(
        `https://restcountries.eu/rest/v2/name/${this.props.match.params.countryNumber}?fullText=true`
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ country: res.data });
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
          <Router>
            <div>
              <nav>
                <h1>Where in the world</h1>
                <button onClick={this.toggleTheme} className="dark">
                  Dark mode
                </button>
              </nav>
              <div className="nav-bar">
                <Link to="/">
                  <button className="back">Go back</button>
                </Link>
              </div>
              {this.state.country ? (
                <div>
                  {this.state.country.map((Country) => {
                    Country.languages.forEach((lang) => {
                      this.state.languages.push(lang.name);
                      console.log(this.state.languages);
                    });
                    Country.currencies.forEach((currency) => {
                      this.state.currencies.push(currency.name);
                      console.log(this.state.currencies);
                    });
                    Country.topLevelDomain.forEach((domain) => {
                      this.state.TLD.push(domain);
                      console.log(this.state.TLD);
                    });

                    return (
                      <div className="country">
                        <img src={Country.flag} alt="" />
                        <div className="country-details">
                          <h1>{Country.name}</h1>
                          <div className="country-status">
                            <ul>
                              <li>Native Name: {Country.nativeName}</li>
                              <li>Population: {Country.population}</li>
                              <li>Region: {Country.region}</li>
                              <li>Sub Region: {Country.subRegion}</li>
                              <li>Capital: {Country.capital}</li>
                              <li>
                                Laguages: {this.state.languages.toString()}
                              </li>
                              <li>
                                Currency: {this.state.currencies.toString()}
                              </li>
                              <li>
                                Top Level Domains: {this.state.TLD.toString()}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <h1>Loading</h1>
              )}
            </div>
          </Router>
        </>
      </ThemeProvider>
    );
  }
}

export default Country;
