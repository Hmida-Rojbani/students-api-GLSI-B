const express = require('express');
const config = require('config');
const app_debug=require('debug')('app:log')
const db_debug=require('debug')('app:db')
const morgan = require('morgan');
const student_router=require('./router/students')
const port = process.env.PORT || 3000;
const app = express();

app_debug('Application name :',config.get('app_name'));
app_debug('Application mode :',config.get('app_mode'));
db_debug('Application DB Url :',config.get('db.url'));
db_debug('Application DB password :',config.get('db.password'));

app.use(express.json());
if(app.get('env') === 'development'){
    app.use(morgan('dev'));
}

app.use('/api/students',student_router);


app.listen(port, () => console.log(`Server on ${port}...`));
