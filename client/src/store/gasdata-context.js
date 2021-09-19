import { createContext, useState } from "react";
import axios from "axios";

const GasDataContext = createContext({
    gasDataIsLoading: false,
    thresholdBreach: false,
    dateFilterObj: {},
    gasData: [],
    gasDataChart: [],
    gasDataOriginal: [],
    getGasByDate: () => { },
    setDateFilter: () => { },
});

export function GasDataContextProvider(props) {

    //declare states
    const [gasDataIsLoading, setGasDataIsLoading] = useState(false)
    const [thresholdBreach, setThresholdBreach] = useState(false)
    const [dateFilterObj, setDateFilterObj] = useState({ startData: '2021-07-01 ', endDate: '2021-07-04' })
    const [gasDataTable, setGasDataTable] = useState([])
    const [gasDataChart, setGasDataChart] = useState([])
    const [gasDataOriginal, setGasDataOriginal] = useState([])
    const [gasDataChartOriginal, setGasDataChartOriginal] = useState([])

    //declare context
    const context = {
        gasDataIsLoading: gasDataIsLoading,
        dateFilterObj: dateFilterObj,
        gasDataTable: gasDataTable,
        gasDataChart: gasDataChart,
        gasDataOriginal: gasDataOriginal,
        thresholdBreach: thresholdBreach,

        getGasByDate: getGasDataHandler,
        getGasDataChart: getGasDataHandler,
        getGasDataTable: getGasDataHandler,
        setDateFilter: setDateFilterNew, 

    };

    function setGasDataTableNew(newGasData){

        setGasDataTable(newGasData);
        checkThresholdBreach(newGasData);


    }

    function setDateFilterNew(newDateFilterIn){
        console.log("Data Filter in new filter functions:  " , newDateFilterIn);
        setDateFilterObj(newDateFilterIn);
        filterByDate(newDateFilterIn);
    }

    function checkThresholdBreach(dataTableToCheck){
        console.log("Check Threshold of table " , dataTableToCheck);
        //Check data to see if any record above threshold
        if(dataTableToCheck.some(el =>  parseFloat(el.amount) > parseFloat("0.26"))) {
            
            setThresholdBreach(true);
            console.log("Threshold Breached" );
         } 
         else{
            console.log("Threshold OK ");
            setThresholdBreach(false);
         } 
        }  
  
    function filterByDate(dateFilterIn){
        //Check filter date 
        console.log("Date filter in: ",dateFilterIn)

        const start =  new Date(dateFilterIn.startDate)
        const end   =  new Date(dateFilterIn.endDate)
        end.setHours(23,59,59,999);
        console.log("Date filter",start ," to ",end)
        
        
        //Firstly lets sort the data for the chart
        let filteredDataChart = [];
        filteredDataChart = gasDataChartOriginal.filter(item => {
            let date = new Date(item.date);
            console.log("Item Date",start ," to ",end)
            if(start > 1 && end > 1){
                return date >= start && date <= end;
            }
            else if(start > 1 ){
                return date >= start;

            }else if( end > 1){
                return date <= end;
            }
            else{
               return true;
            }
         
            
         })
         
         setGasDataChart(filteredDataChart);

         //Now lets sort the data for the table
          
         let filteredDataTable = [];
        filteredDataTable = gasDataOriginal.filter(item => {
            let date = new Date(item.date);
            console.log("Item Date",start ," to ",end)
            if(start > 1 && end > 1){
                return date >= start && date <= end;
            }
            else if(start > 1 ){
                return date >= start;

            }else if( end > 1){
                return date <= end;
            }
            else{
               return true;
            }
         
            
         })
         
         setGasDataTableNew(filteredDataTable);
        }


    //functions
    function getGasDataHandler() {
        setGasDataIsLoading(true);
        let gasDataReworkForChart = [];
        let gasDataAPI = [];
      
        axios.get('http://localhost:4440/api/gasData')
            .then(res => {
                console.log("Response from API", res.data)
               
                   gasDataAPI = res.data;    
                   setGasDataOriginal(gasDataAPI); //This is used for the table display
                   setGasDataTableNew(gasDataAPI);
                    //Loop the orignal data and create array used for the chart
                    gasDataAPI.forEach(function (arrayItem, i) {                   
                    //Check if date exists
                    if(gasDataReworkForChart.some(el => el.date === arrayItem.date)){
                        
                        let index = gasDataReworkForChart.findIndex(x => x.date === arrayItem.date);

                       //Check Gas Type and update values
                        switch(arrayItem.gas) {
                            case "CO":
                                gasDataReworkForChart[index].co = arrayItem.amount;
                              break;
                            case "CO2":
                                gasDataReworkForChart[index].co2 = arrayItem.amount;
                              break;
                            default:
                              //Do Nothing
                          }
                        
                    }else{
                       
                       //Check Gas Type and add new record
                        switch(arrayItem.gas) {
                            case "CO":
                                gasDataReworkForChart.push({ date: arrayItem.date , co: arrayItem.amount , co2: '' });
                              break;
                            case "CO2":
                                gasDataReworkForChart.push({ date: arrayItem.date , co: '' , co2: arrayItem.amount });
                              break;
                            default:
                              // Do Nothing
                          }                    
                    }
                    

                });
                
                //Filter the data by date
                // Push to array
                setGasDataChart(gasDataReworkForChart); 
                setGasDataChartOriginal(gasDataReworkForChart); 
                 

                //Filter the data by gas type.
                //dataCO = apiData.filter(apiData => apiData.gas === 'CO');
                //setCoGasData(dataCO);
                //dataCO2 = apiData.filter(apiData => apiData.gas === 'CO2');
                //setCo2GasData(dataCO2)
                     
                //Set the data values for the types of gasses
                //labelUsageCO2 = dataCO2.map(a => a.amount);
                //labelUsageCO = dataCO.map(a => a.amount);
                
            })
            .catch(err => {
                console.log("Error: ", err)
            })
    }


    return <GasDataContext.Provider value={context}>
             {props.children}
           </GasDataContext.Provider>
}

export default GasDataContext;
