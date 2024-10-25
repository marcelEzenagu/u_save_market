import React, { Component } from "react";

export default class DateRangeFilter extends Component {
  // constructor(props){
  //   super(props)
  // }

  render() {
    return (
      <div>
        <select className="mb-2 flex flex-wrap"
          onChange={(e)=>this.props.showDate(e.target.value)}

        >
          {["All", "Today", "Last 7 Days", "Last 30 Days", "Custom Date"].map(
            (i, index) => (
              <option
                key={index}
                value={i}
                className="p-2 focus:bg-customBlue active:bg-customBlue border bg-gray-200 ZZ mx-2 my-2 rounded"
              >{i}</option>
            )
          )}
          <option defaultChecked={true} value="#" selected>
            Pick a filter
          </option>
        </select>

        <div  className={` ${this.props.openDate?"block":"hidden"} flex flex-row items-center gap-4 mt-4`} 
        >

          <div className="flex flex-row items-center gap-2">
            <h6 className="text-sm text-regal-light-gray">Form:</h6>
            <input
              type="date"
              className="text-xs text-regal-light-gray border rounded-[4px] px-2 py-1"
            />
          </div>

          <div className="flex flex-row items-center gap-2">
            <h6 className="text-sm text-regal-light-gray">To:</h6>
            <input
              type="date"
              className="text-xs text-regal-light-gray border rounded-[4px] px-2 py-1"
            />
          </div>
        </div>
      </div>
    );
  }
}
