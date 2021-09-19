//import GasUsageTableUi from "./components/tables_ui/gasUsageTable";
import GasUsageTableMUi from "./components/tables_ui/gasUsageTableMUI";
import GasUsageChartUi from "./components/charts_ui/gasUsageChart";
import DatePicker from "./components/filter_ui/datePicker"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  grid: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));


function App() {

  const classes = useStyles();

  return (
    
     
     <Grid container className={classes.grid} >
      
      <Grid container justifyContent="flex-start" alignItems="center" spacing={1}>
        <DatePicker></DatePicker>
      </Grid>
       
       <Grid container justifyContent="flex-start" alignItems="center" spacing={1}>    
        <GasUsageChartUi></GasUsageChartUi>
       </Grid>

       <Grid container justifyContent="flex-start" alignItems="center" spacing={1}>        
        <GasUsageTableMUi></GasUsageTableMUi>
       </Grid>
     </Grid>
    
  );
}

export default App;
