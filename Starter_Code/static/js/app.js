   // Build the metadata panel
   //get the metadata field
   function buildMetadata(cases)
  {
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
      let casesDemoInfo=data.metadata;
      //Filter the metadata for the object with the desired sample number
      let response= casesDemoInfo.filter(caseslist=>caseslist.id==cases);
      let responseList = response[0];
      //use d3 to select the panel with id of`#sample-metadata
      //Use `.html("")to clear any existing metadata
      d3.select("#sample-metadata").html("");
      //Inside a loop,you will need to use d3 to append new
      Object.entries(responseList).forEach(([key,value])=>{
        d3.select("#sample-metadata")
        //tags for each key-value in the filtered metadata.
        .append("h6").text(`${key}:${value}`);

      });
  });

  }
  //fuction to build both charts 
  function Barcreate(cases)
  {
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data)=>{
      //get the sample field
      let barInfo= data.samples;
      //get the samples for the object with the desired sample number
      let response= barInfo.filter(casesList=>casesList.id==cases);
      let responseList= response[0];
      //Get the otu)ids,otu_labels, and sample_values
      let barChart={
        
        x:(responseList.sample_values).slice(0,10).reverse(),
        y:(responseList.otu_ids).slice(0,10).map(id=>`OTU${id}`).reverse(),
        text:(responseList.otu_labels).slice(0,10).reverse(),
        type:"bar",
        orientation:"h"
      }
      //Render of bar chart
      let layoutBar={
        title:"10 Top cultural bacteria",
      }
    

      Plotly.newPlot("bar",[barChart],layoutBar);
    })

  }
  //create bubble chart 
  function createBubbles(cases){
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data)=>{
      //Get the sample field
      let bubbleInfo= data.samples;
      //Filter the samples for the object with the desired sample number
      let response= bubbleInfo.filter(casesList=>casesList.id==cases);
      let responseList= response[0];
     //Get the otu_ids,otu_labels,sample_value
      let bubbleChart={
        x:responseList.otu_ids,
          y:responseList.sample_values,
          text:responseList.otu_labels,
          mode:"markers",
          marker:{
            size:responseList.sample_values,
            color:responseList.otu_ids,
            clorscale:"Blured"
          }
        

      }
      //Render the Bubble chart
      
      let layoutBubble={
        title:"Bacteria Culture per Sample",
        hovermode:"closest",
        xaxis:{title:"Operational Tax Units (OTU) ID"}

      };
      Plotly.newPlot("bubble",[bubbleChart],layoutBubble);

    })
  }
  //Function to run on page load
  //get the names field
  function startDashboard()
  {
    //use d3 to select the dropdown with id of`#selDataset`
    var dropdown= d3.select("#selDataset");
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data)=>{
      let dropdownIds=data.names;
      //use the list of sample names to populate the select options
      //hint :Inside a loop,you will need to use d3 to append a new
      //option for each name
      dropdownIds.forEach((cases)=>{
        dropdown.append("option")
        .text(cases)
        .property("value",cases);

      });
      //get the first sample from the list
      //build charts and metadata panel with the first sample 
      let starts= dropdownIds[0];
      buildMetadata(starts);
      Barcreate(starts);
      createBubbles(starts);
    });

  }
  //Function for event listener
  function optionChanged(cases)
  {
    //Build charts and metadata panel each time a new sample is selected
    buildMetadata(cases);
    Barcreate(cases);
    createBubbles(cases);
  }
  //initalise the dashboard
  startDashboard();


















    
      



    






































