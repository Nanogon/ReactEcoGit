
import { useContext, useEffect } from 'react';
import GasDataContext from '../../store/gasdata-context';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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

function GasUsageChart_Ui() {
  const gasDataCtx = useContext(GasDataContext);
  const gasUsageChartData = gasDataCtx.gasDataChart;
  const classes = useStyles();

  useEffect(() => {
    gasDataCtx.getGasDataChart();
  }, []);

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
        <p >{gasDataCtx.thresholdBreach ? 'WARNING: Threshold Breach' : ''}</p>
          <ResponsiveContainer width="100%" aspect={3}>
            <BarChart
              width={500}
              height={300}
              data={gasUsageChartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="co" fill="#8884d8" />
              <Bar dataKey="co2" fill="#82ca9d" />
              <ReferenceLine y={0.25} stroke="red" strokeDasharray="3 3" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  )
}
export default GasUsageChart_Ui;




