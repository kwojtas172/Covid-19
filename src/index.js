import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';


const urlAllCountriesInfo = 'https://coronavirus-19-api.herokuapp.com/countries';

class PrintInfo extends React.Component {

    constructor() {
        super();
        this.state = {
            value: false,
            color: "red",
            list: [],
            color1: "",
            color2: "",
            color3: "",
            color4: "",
            color5: ""
        }
    }


    componentDidMount() {
        fetch(urlAllCountriesInfo).then(res => res.json()).then(json => {
            json.splice(0, 1);
            let sortArr = json.sort((a, b) => {
                return b.cases - a.cases
            })
            this.setState({
                value: true,
                color: "white",
                list: sortArr
            })
        })

        this.sortByCases = () => {
            let arr = [...this.state.list];
            arr.sort((a, b) => {
                return b.cases - a.cases
            });
            this.setState({
                list: arr,
                color1: "yellow",
                color2: "",
                color3: "",
                color4: "",
                color5: ""
            })
        }

        this.sortByTodayCases = () => {
            let arr = [...this.state.list];
            arr.sort((a, b) => {
                return b.todayCases - a.todayCases
            });
            this.setState({
                list: arr,
                color1: "",
                color2: "yellow",
                color3: "",
                color4: "",
                color5: ""
            })
        }

        this.sortByDeaths = () => {
            let arr = [...this.state.list];
            arr.sort((a, b) => {
                return b.deaths - a.deaths
            });
            this.setState({
                list: arr,
                color1: "",
                color2: "",
                color3: "yellow",
                color4: "",
                color5: ""
            })
        }

        this.sortByTodayDeaths = () => {
            let arr = [...this.state.list];
            arr.sort((a, b) => {
                return b.todayDeaths - a.todayDeaths
            });
            this.setState({
                list: arr,
                color1: "",
                color2: "",
                color3: "",
                color4: "yellow",
                color5: ""
            })
        }

        this.sortByTests = () => {
            let arr = [...this.state.list];
            arr.sort((a, b) => {
                return b.testsPerOneMillion - a.testsPerOneMillion
            });
            this.setState({
                list: arr,
                color1: "",
                color2: "",
                color3: "",
                color4: "",
                color5: "yellow"
            })
        }
    }


    render() {
        if (this.state.value) {
            return (
                <div>
                    <h1 style={{ color: this.state.color }}>Koronawirus - statystyki :-(</h1>
                    <div className="container_btns">
                        <button onClick={this.sortByCases}>Sortuj wg liczby wszystkich przypadków</button>
                        <button onClick={this.sortByTodayCases}>Sortuj wg liczby dzisiejszych przypadków</button>
                        <button onClick={this.sortByDeaths}>Sortuj wg liczby wszystkich zgonów</button>
                        <button onClick={this.sortByTodayDeaths}>Sortuj wg liczby dzisiejszych zgonów</button>
                        <button onClick={this.sortByTests}>Sortuj wg liczby testów</button>
                    </div>
                    <table align="center">
                        <thead>
                            <tr align="center">
                                <td>Pozycja</td>
                                <td>Kraj</td>
                                <td style={{ color: this.state.color1 }}>Liczba wszystkich zachorowań</td>
                                <td style={{ color: this.state.color2 }}>Liczba dzisiejszych zachorowań</td>
                                <td style={{ color: this.state.color3 }}>Liczba wszystkich zgonów</td>
                                <td style={{ color: this.state.color4 }}>Liczba dzisiejszych zgonów</td>
                                <td style={{ color: this.state.color5 }}>Liczba testów (na 1 milion mieszkańców)</td>
                            </tr>
                        </thead>
                        <tbody> {
                            this.state.list.map((country, idx) => {
                                if (country.country == "Poland") {
                                    return (
                                        <tr align="center" key={country.country} className="poland">
                                            <td>{idx + 1}</td>
                                            <td>{country.country}</td>
                                            <td style={{ color: this.state.color1 }}>{country.cases}</td>
                                            <td style={{ color: this.state.color2 }}>{country.todayCases}</td>
                                            <td style={{ color: this.state.color3 }}>{country.deaths}</td>
                                            <td style={{ color: this.state.color4 }}>{country.todayDeaths}</td>
                                            <td style={{ color: this.state.color5 }}>{country.testsPerOneMillion}</td>
                                        </tr>
                                    )
                                } else {
                                    return (
                                        <tr align="center" key={country.country}>
                                            <td>{idx + 1}</td>
                                            <td>{country.country}</td>
                                            <td style={{ color: this.state.color1 }}>{country.cases}</td>
                                            <td style={{ color: this.state.color2 }}>{country.todayCases}</td>
                                            <td style={{ color: this.state.color3 }}>{country.deaths}</td>
                                            <td style={{ color: this.state.color4 }}>{country.todayDeaths}</td>
                                            <td style={{ color: this.state.color5 }}>{country.testsPerOneMillion}</td>
                                        </tr>
                                    )
                                }
                            })
                        }
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return <h1 style={{ color: this.state.color }}>Ładowanie danych...</h1>
        }
    }
}



function App() {
    return <PrintInfo />
}

ReactDOM.render(<App />, document.getElementById('app'));