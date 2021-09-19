const express =  require('express');
const app = express();
const port = 4440;

const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.get('/api/customers', (req,res) => {

    const customers = [ {id: 1, firstName: 'John', lastName: 'Doe' },
                        {id: 2, firstName: 'Steve', lastName: 'Smith'},
                        {id: 3, firstName: 'Mary', lastName: 'Swan' },];

    res.json(customers);

} )


app.get('/api/gasData', (req,res) => {

    const emmisions = [{date:"2021-07-01",gas:"CO",amount:"0.1"},
                        {date:"2021-07-02",gas:"CO",amount:"0.3"},
                        {date:"2021-07-03",gas:"CO",amount:"0.2"},
                        {date:"2021-07-04",gas:"CO",amount:"0.4"},
                        {date:"2021-07-01",gas:"CO2",amount:"0.25"},
                        {date:"2021-07-02",gas:"CO2",amount:"0.35"},
                        {date:"2021-07-03",gas:"CO2",amount:"0.1"},
                        {date:"2021-07-04",gas:"CO2",amount:"0.35"}];


    res.json(emmisions);

} )


app.listen(port, () => console.log(`Server Started on port ${port}`));

