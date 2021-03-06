import React from 'react'
import HabitChart from '../../HabitChart'
import CompletedTicketsChart from '../CompletedTicketsChart/CompletedTicketsChart'

export default class Statistics extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history: JSON.parse(localStorage.getItem('history')) ? JSON.parse(localStorage.getItem('history')) : [],
        }
    }
    render(){
        return (
            <div>
                <div className={"fullscreen-popup d-flex p-0"}>
                    <p className="close-popup" onClick={this.props.statisticsClose}>x</p>
                    <div className='d-flex m-auto w-100 outer-chart-holder px-5'>
                        <div className='col-md-6 d-flex chart-holder'>
                            <div className='m-auto w-100'>
                                <HabitChart/>
                                <h2 className='text-center pt-3 white chart-title'>Habits (30 Days)</h2>
                            </div>
                        </div>
                        <div className='col-md-6 d-flex chart-holder'>
                            <div className='m-auto w-100'>
                                <CompletedTicketsChart history={this.state.history}/>
                                <h2 className='text-center pt-3 white chart-title'>Completed Tickets (30 days)</h2>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}