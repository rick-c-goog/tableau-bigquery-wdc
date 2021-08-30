# tableau-bigquery-wdc
This repository is an example how to bring BigQuery Geospatial data into Tableau. 

## Requirements:
. Tableau Desktop
. node.js 
. deploy the bigquery-getgeometry application(https://github.com/rick-c-goog/bigquery-getgeometry) first, since this connector needs to pull data from the getgeometry server app

## Instructions:
### Deploy the bigquery-geometry server app
Download and follow instructions from https://github.com/rick-c-goog/bigquery-getgeometry/README.md
test out http://hostname:3000/stations and make sure it generates json output

### Deploy the tableau webdataconnect client app
Install prerequisite packages:

#### npm and node.js
Download and install Node.js (this includes NPM) here: https://nodejs.org.
#### http-server
npm install http-server -g

git clone https://github.com/rick-c-goog/tableau-bigquery-wdc.git
Update js/wdc.js, 
line 27, qeuryUrl="http://localhost:3000?name="+tableau.connectionData;
replace the localhost with proper deployed hostname from "Deploy the bigquery-geometry server app"

If run it from local machine, start the app with the following:
http-server -p 8080
open browser, http://localhost;8080 and make sure the webpage shows up.

### Use the webdataconnector inside Tableau Desktop
1. Install Tableau Desktop
2. Open Tableau Desktop
3. In Connect screen, choose "More...>" ,then click "Web Data Connector"
4. In Web Data Connector screen, enter deployed WDC app address: e.g. http://hostname:8080, 
5. Once the wdc screen showing up, choose the Data type from dropdown list and Click the button "Get Bigquery Geography data"
6. Once the datasource connected , verify table object created with 2 fields Id and Geom, with Geom field showing Geometry type.
7. click Sheet 1, wait till the sheet opens. Right click Geom item in the left side, add click "Add to sheet", you will see the map. 

### Join Bigquery live connect tabular data with Geography data
