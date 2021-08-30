(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "geom",
            dataType: tableau.dataTypeEnum.geometry
        }];

        var tableSchema = {
            id: "NYCPublicData"+tableau.connectionData,
            alias: "NYCPublicData"+tableau.connectionData,
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
          //url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
          qeuryUrl="http://localhost:3000?name="+tableau.connectionData;
          tableData = [];
          var xmlRequest=$.ajax({
            methos: 'GET',
            url: qeuryUrl,
            dataType: 'json',
            cache: false,
            contentType: 'application/json; charset=utf-8'
          });
          xmlRequest.done(function(data,textStatus,jqXHR) {
            //var dataObj=JSON.parse(data);
            $.each(data, function(id, field) {
            tableData.push( {"id": field.id, "geom": JSON.parse(field.geom) });
            // });
            });
            
            table.appendRows(tableData);  
            doneCallback();  
         }) ;
         xmlRequest.fail(function(jqXHR,textStatus) {
            //alert( "fetch error" );
            tableData.push( { "id": textStatus, "geom": {"type":"Point","coordinates":[-25.4705,-59.4176,50.47]} });
            table.appendRows(tableData);  
            doneCallback();
          });
         //.fail(function(resp){
         //   $.each(resp, function(key,value){
         //       tableData.push({ "id": key+"="+value, "geom": value});
         //    });
         //   table.appendRows(tableData);
         //   doneCallback();  
         //});
         
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "NewYorkCityPublicData"; // This will be the data source name in Tableau
            //alert("select:"+ $("#dropdownmenu").val());
            tableau.connectionData = $("#dropdownmenu").val().trim();
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();