
// 1. Use D3 library to read in 'samples.json'

function createcharts(id){ 
    console.log(id)
    d3.json("samples.json").then ((data)=> {
        console.log(data);
var results = data.samples.filter(obj => obj.id == id)[0]
console.log(results)
//2.  Create a horizontal bar chart with dropdown menus to display top 10 OTUs found
    var trace1 = {
        x: results.otu_ids.slice(0,10),
        y: results.sample_values.slice(0,10),
        text: results.otu_labels.slice(0,10),
        type: "bar",
        orientation: 'h'

    };
var layout = {
title: "'Belly Button Biodiversity",
xaxis: { title: "OTUs"},
yaxis: { title: "People"}
};
data1 = [trace1]
Plotly.newPlot("bar", data1, layout);
    

    var trace2 = {
        x: results.otu_ids,
        y: results.sample_values,
        text: results.otu_labels,
        mode: "markers",
        marker: {
            size: results.sample_values, 
            color: results.otu_id
        }
        
        

    };
    var layout2 = {
        title: "'Belly Button Biodiversity",
        xaxis: { title: "OTUs"},
        yaxis: { title: "People"}
        };
data2 = [trace2]
Plotly.newPlot("bubble", data2, layout2);

var metadata = data.metadata.filter(obj => obj.id == id)[0]
var panel = d3.select("#sample-metadata")
panel.html("")
Object.entries(metadata).forEach(([key,value]) =>{
    panel.append("h5").text(`${key}: ${value}`)
})
    })

//   var data = [trace1];
  
//   var layout = {
//     title: "'Bar' Chart"
//   };
  



// var data = [trace1];



// Plotly.newPlot("plot", data, layout);
}
d3.json("samples.json").then ((data)=> {
    console.log(data);
    var dropdown = d3.select("#selDataset")
    data.names.forEach((id)=>{
        dropdown.append("option").text(id).property("value",id)

})
var sampleid =data.names[0]
createcharts(sampleid)
});

function optionChanged(id){
 createcharts(id)
    
}

 

 









