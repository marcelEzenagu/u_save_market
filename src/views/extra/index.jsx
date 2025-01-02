import React, { Component } from 'react'
import DonationPage from '../donation'
import Header from './Header'
import News from '../news'

export default class Extra extends Component {
    constructor(){
        super()
        this.state= {
            tab:"donations"
        }
    }

    changeState = (state)=>{
        this.setState({tab:state})
    }

  render() {


    const {tab}= this.state
      console.log("====State===",tab)

    return (
      

      <div>
        <Header 
          isActive={tab} 
          changeState={data => this.changeState(data)} 
        />

        <div>
          {
          tab == "donations" ?
            <DonationPage />
          :tab == "news" ?
            <News />
          : "" 
        }
        </div>
      </div>
    )
  }
}
