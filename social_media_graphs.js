//Set the dimensions of the canvas / graph
var margin = {top: 40, right: 34, bottom: 100, left: 70},
    width =650 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

        // append the svg1 obgect to the body of the page
        // appends a 'group' element to 'svg1'
        // moves the 'group' element to the top left margin1
var svg4 = d3.select("#lines2_svg")
             .attr("width", width +margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom)

          .append("g")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
var color = d3.scaleOrdinal(d3.schemeCategory10);

    var line_low_media = d3.line()
        // .curve(d3.curveBasis)
        .x(function(d) { return x(d.Var1); })
        .y(function(d) { return y(d.Freq); })
      ;

    var line_middle_media = d3.line()
            //.curve(d3.curveBasis)
        .x(function(d) { return x(d.Var1); })
        .y(function(d) { return y(d.Freq_y); });

    var line_high_media = d3.line()
                // .curve(d3.curveBasis)
        .x(function(d) { return x(d.Var1); })
        .y(function(d) { return y(d.Freq_x); });
// console.log(line_high_media);

// Get the data1
d3.csv("socialmedia_df.csv", function(error, data2) {
    // console.log(data2)

    if (error) throw error;
    // format the data2
    data2.forEach(function(d1) {
      // d1.Id = +d1.Id;
      d1.Var1 = +d1.Var1;
      d1.Freq_x = +d1.Freq_x;
      d1.Freq_y = +d1.Freq_y;
      d1.Freq = +d1.Freq;
      //console.log(data2)
    });

  var medias = data2.columns.slice(2).map(function(id) {
    return {
      id: id,
      values: data2.map(function(d) {
        return {media: d.Var1, Count: d[id]};
    })
    };
   });


//console.log(data2)
    // Scale the range of the data2
    x.domain(d3.extent(data2, function(d1) { return d1.Var1; }));


    y.domain([
  d3.min(medias, function(c) { return d3.min(c.values, function(d) { return d.Count; }); }),
  d3.max(medias, function(c) { return d3.max(c.values, function(d) { return d.Count; }); })
]);
//
// z.domain(medias.map(function(c) { return c.id; }));

data2.sort(function(a, b){return a.Var1-b.Var1}); // sort data2 in ascending order

                // Add the X Axis
            svg4.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

                // text label for the x axis
            svg4.append("text")
              .attr("transform", "translate(" + 250+ " ," + (height + margin.top ) + ")")
              //.style("text-anchor", "middle")
              .text("Media quantile");

              // Add the Y Axis
            svg4.append("g")
            // .attr("class", "axis")
              .call(d3.axisLeft(y));

              //line
            svg4.append("path")
              .data([data2])
              .attr("class", "line2")
              .attr("id", "blueLine2")
              .attr("d", line_low_media)
              .style("stroke", "lightblue");

              //line
              svg4.append("path")
                .data([data2])
                .attr("class", "line2")
                .attr("d", line_middle_media)
                .attr("id", "redLine2")
                .style("stroke", "red");

                //line
              svg4.append("path")
                .data([data2])
                .attr("class", "line2")
                .attr("d", line_high_media)
                .attr("id", "greenLine2")
                .style("stroke", "lightgreen");

              // text label for the y axis
            svg4.append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 0-70)
              .attr("x",0 - (height / 2))
              .attr("dy", "1em")
              .style("text-anchor", "middle")
              .text("Count of customers");

              // Title
            svg4.append("text")
              .attr("transform", "translate(" + (width/2) + " ," + -15 + ")")
              .attr('stroke', 'black')
              .style("font-size", "25px")
              .style("text-anchor", "middle")
              .text("Impact of Media");

var media = svg4.selectAll(".media")
    .data(medias)
    .enter().append("g")
      .attr("class", "media");
      // console.log(media);


      // add the dots with tooltips
  svg4.selectAll(".shapes")
     .data(data2)
   .enter().append("circle")
     .attr("r", 2)
     .attr("cx", function(d) { return x(d.Var1); })
     .attr("cy", function(d) { return y(d.Freq); })
     .attr("fill","blue")


    svg4.selectAll(".shapes")
       .data(data2)
     .enter().append("circle")
       .attr("r", 2)
       .attr("cx", function(d) { return x(d.Var1); })
       .attr("cy", function(d) { return y(d.Freq_x); })
       .attr("fill","green")

       svg4.selectAll(".shapes")
          .data(data2)
        .enter().append("rect")
        .attr("x", function(d) { return x(d.Var1); })
        .attr("y", function(d) { return y(d.Freq_y); })
        .attr("fill","red")
        .attr("width", 3)
        .attr("height", 3)


        var mouseG2 = svg4
        // .append('g')
             .attr("class", "mouse-over-effects2");
           mouseG2.append("path") // this is the black vertical line to follow mouse
             .attr("class", "mouse-line2")
             .style("stroke", "black")
             .style("stroke-width", "1px")
             .style("opacity", "0");

             var lines2 = document.getElementsByClassName("line2");
            // console.log(lines2);
             var mousePerLine2 = mouseG2.selectAll('.mouse-per-line2')
               .data(medias)
               .enter()
               .append("g")
               .attr("class", "mouse-per-line2");


            //  text
           mousePerLine2.raise().append("text")
            .attr("transform", "translate(10,20)")
             .attr("fill", function(d2) {return color(d2.id);})

           mouseG2.append('svg4:rect') // append a rect to catch mouse movements on canvas
             .attr('width', width) // can't catch mouse events on a g element
             .attr('height', height)
             .attr('fill', 'none')
             .attr('pointer-events', 'all')
             .on('mouseout', function() { // on mouse out hide line and text
               d3.select(".mouse-line2")
                 .style("opacity", "0.5");
               d3.selectAll(".mouse-per-line2 text")
                 .style("opacity", "1");
             })
             .on('mouseover', function() { // on mouse in show line and text
               d3.select(".mouse-line2")
                 .style("opacity", "0.5");
               d3.selectAll(".mouse-per-line2 text")
                 .style("opacity", "0.8")
                 .style("font-size", "15px");
             })
             .on('mousemove', function() { // mouse moving over canvas
               var mouse2 = d3.mouse(this);
               d3.select(".mouse-line2")
                 .attr("d", function() {
                   var m = "M" + mouse2[0] + "," + height;
                   m += " " + mouse2[0] + "," + 0;
                   return m;
                 });

               d3.selectAll(".mouse-per-line2")
                 .attr("transform", function(d,i) {
                              var beginning = 0,
                                  end = lines2[i].getTotalLength(),
                                  target = null;
                              while (true){
                                target = Math.floor((beginning + end) / 2);

                                pos = lines2[i].getPointAtLength(target);

                                if ((target === end || target === beginning) && pos.x !== mouse2[0]) {
                                    break;
                                }
                                if (pos.x > mouse2[0])      end = target;
                                else if (pos.x < mouse2[0]) beginning = target;
                                else break; //position found
                              }

                              d3.select(this).select('text')
                                .text(y.invert(pos.y).toFixed(0));

                                var trans_x = mouse2[0];
                          // if(i == 0  < x.invert(mouse[0])){
                          //  trans_x = trans_x - 50;
                          // }
                                return "translate(" + trans_x + "," + pos.y +")";
                            });
                   });

                   // rectangle for blue legend
                   svg4.append('rect')
                   .attr("x", 0)
                   .attr("y", height + margin.top + 10)
                   .attr("width", 10)
                   .attr("height", 10)
                   .style("fill", "lightblue")
                   //.attr("id", "blueRect");

                   // rectangle for red legend
                   svg4.append('rect')
                   .attr("x", width/2-97)
                   .attr("y", height + margin.top + 10)
                   .attr("width", 10)
                   .attr("height", 10)
                   .style("fill", "red")

                   // rectangle for green legend
                   svg4.append('rect')
                   .attr("x", 385)
                   .attr("y", height + margin.top + 10)
                   .attr("width", 10)
                   .attr("height", 10)
                   .style("fill", "lightgreen")
                   ;


// modified code from http://bl.ocks.org/d3noob/5d621a60e2d1d02086bf
                   // Add the blue line title
                   svg4.append("text")
                   	.attr("x", 15)
                   	.attr("y", height + margin.top + 20)
                   	.attr("class", "legend")
                   	.style("fill", "lightblue")
                    .on("click", function(){
                      // Determine if current line is visible
                      var active   = line_low_media.active ? false : true ,
                      newOpacity = active ? 0 : 1;
                      // Hide or show the elements
                      d3.select("#blueLine").style("opacity", newOpacity);
                      // d3.select("#").style("opacity", newOpacity);
                      // Update whether or not the elements are active
                      line_low_media.active = active;
                    })
                   	.text("Low Propensity Media");

                    // Add the red line title
                    svg4.append("text")
                     .attr("x", width/2-80)
                     .attr("y", height + margin.top + 20)
                     .attr("class", "legend")
                     .style("fill", "red")
                     .on("click", function(){
                       // Determine if current line is visible
                       var active   = line_middle_media.active ? false : true,
                         newOpacity = active ? 0 : 1;
                       // Hide or show the elements
                       d3.select("#redLine").style("opacity", newOpacity);
                      // d3.select("#blueDot").style("opacity", newOpacity);
                       // Update whether or not the elements are active
                       line_middle_media.active = active;
                     })
                     .text("Middle Propensity Media");

                     // Add the green line title
                     svg4.append("text")
                      .attr("x", 400)
                      .attr("y", height + margin.top + 20)
                      .attr("class", "legend")
                      .style("fill", "lightgreen")
                      .on("click", function(){
                        // Determine if current line is visible
                        var active   = line_high_media.active ? false : true,
                          newOpacity = active ? 0 : 1;
                        // Hide or show the elements
                        d3.select("#greenLine").style("opacity", newOpacity);
                        // d3.select("#blueDot").style("opacity", newOpacity);
                        // Update whether or not the elements are active
                        line_high_media.active = active;
                      })
                      .text("High Propensity Media");



});



 // Histogram for low Probability
var margin1 = {top: 40, right: 10, bottom: 100, left: 45},
    width1 = 600  - margin1.right,
    height1 = 600- margin1.top - margin1.bottom;


    var xl = d3.scaleBand().rangeRound([0, width1]).padding(0.1),
        yl = d3.scaleLinear().rangeRound([height1, 0]);


var svg5 = d3.select("#bar4_svg")
      .attr("width", width1 + margin1.left + margin1.right)
      .attr("height", height1 + margin1.top + margin1.bottom);

var g5 = svg5.append("g")
    .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

d3.csv("low_media.csv", function(d) {
      // d.Id = d.Id;
       d.Var1 = +d.Var1;
       d.Freq = +d.Freq;
  return d;
}, function(error, data) {
  if (error) throw error;

// console.log(data);

  var low_media_bar = data.columns.slice(2).map(function(id) {
    return {
      key: id,
      values: data.map(function(d) {
        return {Var1: d.Var1, Count: d[id]};
    })
    };
   });
  //  console.log(low_media_bar);

  xl.domain(data.map(function(d) { return d.Var1; }));
  yl.domain([0, d3.max(data, function(d) { return d.Freq; })]);

      //x-axis
  g5.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height1 + ")")
      .call(d3.axisBottom(xl));

    // text for x-axis
    g5.append("text")
        .attr("transform", "translate(" + width1/2+ " ," + (height1 + margin1.top ) + ")")
        .style("text-anchor", "middle")
        .text("Social Media Usage Percentile");


      // y-axis
  g5.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(yl))

      // text for y-axis
      g5.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0-45)
      .attr("x",0 - (height1 / 2))
      .attr("dy", "0.71em")
      .attr("text-anchor", "middle")
      .text("Count of Customers");

  g5.append("text")
      .attr("transform", "translate(" + (width1/2) + " ," + -15 + ")")
      .attr('stroke', 'black')
      .style("font-size", "25px")
      .style("text-anchor", "middle")
      .text("Customer Distribution on Social Media Variable");

  g5.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return xl(d.Var1); })
      .attr("y", function(d) { return yl(d.Freq); })
      .attr("width", xl.bandwidth())
      .attr("height", function(d) { return height1 - yl(d.Freq); })
      .attr("fill", "lightblue")
      .on("mouseover", function() { tooltip1.style("display", null); })
      .on("mouseout", function() { tooltip1.style("display", "none"); })
      .on("mousemove", function(d) {
        var xPosition = d3.mouse(this)[0] - 5;
        var yPosition = d3.mouse(this)[1] - 5;
        tooltip1.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
        tooltip1.select("text").text(d.Freq);
      });


// Prep the tooltip bits, initial display is hidden
  var tooltip1 = g5.append("g")
  .attr("class", "tooltip")
  .style("display", "none");
  //console.log(tooltip);
  tooltip1.append("rect")
  .attr("width", 60)
  .attr("height", 20)
  .attr("fill", "white")
  .style("opacity", 0.5);

  tooltip1.append("text")
  .attr("x", 30)
  .attr("dy", "1.2em")
  .style("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("font-weight", "bold");
});



 // Histogram for middle Probability
var margin_m = {top: 40, right: 10, bottom: 100, left: 45},
    width_m = 600 - margin_m.right- margin_m.left,
    height_m = 600- margin_m.top - margin_m.bottom;

var x_m = d3.scaleBand().rangeRound([0, width_m]).padding(0.1),
    y_m = d3.scaleLinear().rangeRound([height_m, 0]);

var svg6 = d3.select("#bar5_svg")
      .attr("width", width_m + margin_m.left + margin_m.right)
      .attr("height", height_m + margin_m.top + margin_m.bottom);

var g6 = svg6.append("g")
    .attr("transform", "translate(" + margin_m.left + "," + margin_m.top + ")");


d3.csv("mid_media.csv", function(d) {
      // d.Id = +d.Id;
       d.Var1 = +d.Var1;
       d.Freq = +d.Freq;
  return d;
}, function(error, data) {
  if (error) throw error;
  console.log(data);

  var mid_media_bar = data.columns.slice(2).map(function(id) {
    return {
      key: id,
      values: data.map(function(d) {
        return {Var1: d.Var1, Count: d[id]};
    })
    };
   });


  x_m.domain(data.map(function(d) { return d.Var1; }));
  y_m.domain([0, d3.max(data, function(d) { return d.Freq; })]);

      //x-axis
  g6.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height_m + ")")
      .call(d3.axisBottom(x_m));

    // text for x-axis
    g6.append("text")
        .attr("transform", "translate(" + width1/2+ " ," + (height_m + margin_m.top ) + ")")
        .style("text-anchor", "middle")
        .text("Social Media Usage Percentile");


      // y-axis
  g6.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y_m))

      // text for y-axis
      g6.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0-45)
      .attr("x",0 - (height_m / 2))
      .attr("dy", "0.71em")
      .attr("text-anchor", "middle")
      .text("Count of Customers");

  g6.append("text")
      .attr("transform", "translate(" + (width_m/2) + " ," + -15 + ")")
      .attr('stroke', 'black')
      .style("font-size", "25px")
      .style("text-anchor", "middle")
      .text("Customer Distribution on Social Media Variable");

  g6.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x_m(d.Var1); })
      .attr("y", function(d) { return y_m(d.Freq); })
      .attr("width", x_m.bandwidth())
      .attr("height", function(d) { return height_m - y_m(d.Freq); })
      .attr("fill", "lightblue")
      .on("mouseover", function() { tooltip_m.style("display", null); })
      .on("mouseout", function() { tooltip_m.style("display", "none"); })
      .on("mousemove", function(d) {
        var xPosition = d3.mouse(this)[0] - 5;
        var yPosition = d3.mouse(this)[1] - 5;
        tooltip_m.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
        tooltip_m.select("text").text(d.Freq);
      });


// Prep the tooltip bits, initial display is hidden
 var tooltip_m = g6.append("g")
   .attr("class", "tooltip")
   .style("display", "none");
   //console.log(tooltip);
 tooltip_m.append("rect")
   .attr("width", 60)
   .attr("height", 20)
   .attr("fill", "white")
   .style("opacity", 0.5);

 tooltip_m.append("text")
   .attr("x", 30)
   .attr("dy", "1.2em")
   .style("text-anchor", "middle")
   .attr("font-size", "12px")
   .attr("font-weight", "bold");
});




// Histogram for High Probability
var margin3 = {top: 40, right: 10, bottom: 100, left: 45},
   width3 = 600- margin3.right,
   height3 = 600- margin3.top - margin3.bottom;

var x3 = d3.scaleBand().rangeRound([0, width3]).padding(0.1),
   y3 = d3.scaleLinear().rangeRound([height3, 0]);

var svg7 = d3.select("#bar6_svg")
     .attr("width", width3 + margin3.left + margin3.right)
     .attr("height", height3 + margin3.top + margin3.bottom);

var g7 = svg7.append("g")
   .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

d3.csv("high_media.csv", function(d) {
     // d.Id = +d.Id;
      d.Var1 = +d.Var1;
      d.Freq = +d.Freq;
 return d;
}, function(error, data) {
 if (error) throw error;


 var high_media_bar = data.columns.slice(2).map(function(id) {
   return {
     id: id,
     values: data.map(function(d) {
       return {Var1: d.Var1, Count: d[id]};
   })
   };
  });


 x3.domain(data.map(function(d) { return d.Var1; }));
 y3.domain([0, d3.max(data, function(d) { return d.Freq; })]);

     //x-axis
 g7.append("g")
     .attr("class", "axis")
     .attr("transform", "translate(0," + height3 + ")")
     .call(d3.axisBottom(x3));

   // text for x-axis
   g7.append("text")
       .attr("transform", "translate(" + width1/2+ " ," + (height3 + margin3.top ) + ")")
       .style("text-anchor", "middle")
       .text("Social Media Usage Percentile");


     // y-axis
 g7.append("g")
     .attr("class", "axis")
     .call(d3.axisLeft(y3))

     // text for y-axis
     g7.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0-45)
     .attr("x",0 - (height3 / 2))
     .attr("dy", "0.71em")
     .attr("text-anchor", "middle")
     .text("Count of Customers");

 g7.append("text")
     .attr("transform", "translate(" + (width3/2) + " ," + -15 + ")")
     .attr('stroke', 'black')
     .style("font-size", "25px")
     .style("text-anchor", "middle")
     .text("Customer Distribution on Social Media Variable");

 // var tooltip = d3.select("body").append("div").attr("class", "toolTip");

 g7.selectAll(".bar")
   .data(data)
   .enter().append("rect")
     .attr("class", "bar")
     .attr("x", function(d) { return x3(d.Var1); })
     .attr("y", function(d) { return y3(d.Freq); })
     .attr("width", x3.bandwidth())
     .attr("height", function(d) { return height3 - y3(d.Freq); })
     .attr("fill", "lightgreen")
     .on("mouseover", function() { tooltip3.style("display", null); })
     .on("mouseout", function() { tooltip3.style("display", "none"); })
     .on("mousemove", function(d) {
       var xPosition = d3.mouse(this)[0] - 5;
       var yPosition = d3.mouse(this)[1] - 5;
       tooltip3.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
       tooltip3.select("text").text(d.Freq);
     });

    // Prep the tooltip bits, initial display is hidden
      var tooltip3 = g7.append("g")
        .attr("class", "tooltip")
        .style("display", "none");
        //console.log(tooltip);
      tooltip3.append("rect")
        .attr("width", 60)
        .attr("height", 20)
        .attr("fill", "white")
        .style("opacity", 0.5);

      tooltip3.append("text")
        .attr("x", 30)
        .attr("dy", "1.2em")
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font-weight", "bold");
});




// modified code from https://bl.ocks.org/mbostock/3887051
var marginm = {top: 40, right: 10, bottom: 100, left: 45},
    widthm = 600- marginm.left - marginm.right,
    heightm = 650 - marginm.top - marginm.bottom,


     svgm = d3.select("#multibar_svg")
         .attr("width", widthm + marginm.left + marginm.right)
         .attr("height", heightm + marginm.top + marginm.bottom);
    g8 = svgm.append("g").attr("transform", "translate(" + marginm.left + "," + marginm.top + ")");

var xm0 = d3.scaleBand()
    .rangeRound([0, widthm])
    .paddingInner(0.1);

var xm1 = d3.scaleBand()
    .padding(0.05);

var ym1 = d3.scaleLinear()
    .rangeRound([heightm, 0]);

var z = d3.scaleOrdinal()
    .range(["lightblue", "red", "lightgreen"]);

d3.csv("media_bind.csv", function(d, i, columns) {
  for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
  return d;
}, function(error, data) {
  if (error) throw error;

// console.log(data);

  var keys = data.columns.slice(1);
// console.log(keys);

  xm0.domain(data.map(function(d) { return d.Var1; }));
  xm1.domain(keys).rangeRound([0, xm0.bandwidth()]);
  ym1.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

  g8.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + heightm + ")")
      .call(d3.axisBottom(xm0));

      // text for x-axis
      g8.append("text")
          .attr("transform", "translate(" + widthm/2+ " ," + (heightm + marginm.top ) + ")")
          .style("text-anchor", "middle")
          .text("Media Percentile");


       // y-axis
   g8.append("g")
       .attr("class", "axis")
       .call(d3.axisLeft(ym1))

       // text for y-axis
       g8.append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", 0-45)
       .attr("x",0 - (heightm / 2))
       .attr("dy", "0.71em")
       .attr("text-anchor", "middle")
       .text("Count of Customers");

  var legend2 = g8.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend2.append("rect")
      .attr("x", widthm - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend2.append("text")
      .attr("x", widthm - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });



       var tooltip3 = d3.select("body").append("div").attr("class", "toolTip");


         g8.append("g")
           .selectAll("g")
           .data(data)
           .enter().append("g")
             .attr("transform", function(d) { return "translate(" + xm0(d.Var1) + ",0)"; })
           .selectAll("rect")
           .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
           .enter().append("rect")
             .attr("x", function(d) { return xm1(d.key); })
             .attr("y", function(d) { return ym1(d.value); })
             .attr("width", xm1.bandwidth())
             .attr("height", function(d) { return heightm - ym1(d.value); })
             .attr("fill", function(d) { return z(d.key); })
             .on("mouseover", function() { tooltip_m.style("display", null); })
             .on("mouseout", function() { tooltip_m.style("display", "none"); })
             .on("mousemove", function(d) {
               var xPosition1 = d3.mouse(this)[0] +20;
               var yPosition1 = d3.mouse(this)[1] - 40;
               tooltip_m.attr("transform", "translate(" + xPosition1 + "," + 0 + ")");
              tooltip_m.select("text").text("Count:"+d.value);
               });


             // Prep the tooltip bits, initial display is hidden
               var tooltip_m = g8.append("g")
                 .attr("class", "tooltip")
                 .style("display", "none");
                 //console.log(tooltip);
               tooltip_m.append("rect")
                 .attr("width", 600)
                 .attr("height", 20)
                 .attr("fill", "none")
                 .style("opacity", 0.5);

               tooltip_m.append("text")
                 .attr("x", 30)
                 .attr("dy", "1.2em")
                 .style("text-anchor", "middle")
                 .attr("font-size", "20px")
                 .attr("font-weight", "bold");


});
