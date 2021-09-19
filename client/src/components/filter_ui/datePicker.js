import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import GasDataContext from '../../store/gasdata-context';
import "./inputDate.css"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 800,
    maxWidth: 800,
    marginTop: 20,
    marginLeft:20,
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
 
});


const DateFilter = () => {
  const classes = useStyles();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const gasDataCtx = useContext(GasDataContext);
 
 //Function to update start and end date 

  function updateStartDate(newStartDate) {
    setStartDate(newStartDate);
    gasDataCtx.setDateFilter({ startDate: newStartDate, endDate })
  }
  function updateEndDate(newEndDate) {
    console.log("Setting New End")
    setEndDate(newEndDate);
    gasDataCtx.setDateFilter({ startDate, endDate: newEndDate })
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Start Date
          </Typography>
          <DatePicker selected={startDate} onChange={(date) => updateStartDate(date)} />
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            End Date
          </Typography>
          <DatePicker selected={endDate} onChange={(date) => updateEndDate(date)} />
          
        </CardContent>
      </Card>

      


    </div>

  );
};

export default DateFilter;