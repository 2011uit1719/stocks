import React from 'react';
import './App.css';
import ViewTable from './components/ViewTable';
class App extends React.Component {
    constructor(){
        super();
        this.state = {stockData : []};
    }
    updatedStockData = {};

    componentDidMount() {
        let url = 'ws://stocks.mnet.website';
        const socket = new WebSocket(`${url}`);
        socket.addEventListener('open',(event)=>{
            socket.send('Hello Server !');
        });
        socket.addEventListener('message', (event)=>{
            this.handleStockUpdate(event.data);
        });
    }

    handleStockUpdate(updatedData) {
        updatedData = JSON.parse(updatedData);
        updatedData.forEach((stock) => {
            this.updatedStockData[stock[0]] = {price : stock[1], lastUpdated: new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"})};
            if(this.state.stockData[stock[0]]) {
                if(this.state.stockData[stock[0]].price > this.updatedStockData[stock[0]].price) {
                    this.updatedStockData[stock[0]].change = 'negative';
                }
                else {
                    this.updatedStockData[stock[0]].change = 'positive';
                }

            }
        });
        this.setState({ stockData: JSON.parse(JSON.stringify(this.updatedStockData)) });
    }
    render() {
        return(
            <div className ='ui container'>
                <h2 className='ui header center aligned orange'>Stock Data</h2>
                <table className='ui celled table center aligned unstackable'>
                    <thead>
                    <tr>
                        <th>Stock Name</th>
                        <th>Price</th>
                        <th>Last Updated</th>
                    </tr>
                    </thead>
                    <tbody>
                    <ViewTable stockList = {this.state.stockData} />
                    </tbody>
                </table>
            </div>

        );
    }
}

export default App;
