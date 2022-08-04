/**
 * Scene ONE
 */
var changeOnBrand;
async function loadScene1() {
    var scene1 = d3.select('#scene1')
    d3.csv("https://flunky.github.io/cars2017.csv").then(function (data_given) {
        var makeScene1XScale = d3.scaleBand()
            .range([0, 850])
            .domain(data_given.map(function (d) { return d.Make; }))

        var makeScene1XAxis = d3.axisBottom()
           .scale(makeScene1XScale)
           .ticks(5);

        var makeScene1YScale = d3.scaleLinear()
            .domain([0, 150])
            .range([740, 0]);

        var scene1YAxis = d3.axisLeft()
            .scale(makeScene1YScale)
            .ticks(10);

        scene1.append("g")
            .attr("transform", "translate(50,20)")
            .attr("class", "axis")
            .call(scene1YAxis);

        scene1.append("g")
            .attr("transform", "translate(50,750)")
            .attr("class", "axis")
            .call(makeScene1XAxis)
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-30)")
            .style("text-anchor", "end");
        
        scene1.append('text')
            .attr('x', -400)
            .attr('y', 15)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Mileage')
        
        scene1.append('text')
            .attr('x', 500)
            .attr('y', 850)
            .attr('text-anchor', 'middle')
            .text('Car Makers')

        scene1.append('g')
            .selectAll("dot")
            .data(data_given)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return makeScene1XScale(d.Make) + 50; })
            .attr("cy", function (d) { return makeScene1YScale(d.AverageHighwayMPG) + 20; })
            .attr("r", 5)
            .style("fill", function (d) { return "#3288BD"; })
            .attr("stroke", "black")
            .on("mouseover", function (d) {
                scatter_tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                scatter_tooltip.html(d.Make + ' ' + d.Fuel)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                scatter_tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        // This function is called by the buttons on top of the plot
        changeOnBrand = function (setting) {
            if (setting === "AverageHighwayMPG") {
                scene1.selectAll("circle")
                    .transition()
                    .duration(2000)
                    .attr("cx", function (d) { return makeScene1XScale(d.Make) + 50; })
                    .attr("cy", function (d) { return makeScene1YScale(d.AverageHighwayMPG) + 20; })
                    .attr("r", 5)
                    .style("fill", function (d) { return "#3288BD"; })
                    .attr("stroke", "black")
            } else {
                scene1.selectAll("circle")
                    .transition()
                    .duration(2000)
                    .attr("cx", function (d) { return makeScene1XScale(d.Make) + 50; })
                    .attr("cy", function (d) { return makeScene1YScale(d.AverageCityMPG) + 20; })
                    .attr("r", 5)
                    .style("fill", function (d) { return "#66C2A5"; })
                    .attr("stroke", "black")
            }
        }
    })
}


/**
 * Scene Two
 */
var bar_tooltip = d3.select("body")
    .append("div")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("padding", "15px")
    .style("color", "white")
var changeOnFuel;
async function loadScene2() {
    var scene2 = d3.select('#scene2')
    d3.csv("https://flunky.github.io/cars2017.csv").then(function (data_given) {
        var fuleHighwayMpgs = {
            'Gasoline': [],
            'Diesel': [],
            'Electricity': []
        };
        var fuleCityMpgs = {
            'Gasoline': [],
            'Diesel': [],
            'Electricity': []
        }
        data_given.forEach(data => {
            fuleHighwayMpgs[data.Fuel].push(parseInt(data.AverageHighwayMPG));
            fuleCityMpgs[data.Fuel].push(parseInt(data.AverageCityMPG));
        });
        const average = array => array.reduce((a, b) => a + b) / array.length;
        fuleHighwayMpgs['Gasoline'] = average(fuleHighwayMpgs['Gasoline']);
        fuleHighwayMpgs['Diesel'] = average(fuleHighwayMpgs['Diesel']);
        fuleHighwayMpgs['Electricity'] = average(fuleHighwayMpgs['Electricity']);
        fuleCityMpgs['Gasoline'] = average(fuleCityMpgs['Gasoline']);
        fuleCityMpgs['Diesel'] = average(fuleCityMpgs['Diesel']);
        fuleCityMpgs['Electricity'] = average(fuleCityMpgs['Electricity']);

        var makeScene2XScale = d3.scaleBand()
            .range([0, 850])
            .domain(data_given.map(function (d) { return d.Fuel; }))

        var makeScene2XAxis = d3.axisBottom()
            .scale(makeScene2XScale)
            .ticks(5);

        var makeScene2YScale = d3.scaleLinear()
            .domain([0, 150])
            .range([740, 0]);

        var scene2YAxis = d3.axisLeft()
            .scale(makeScene2YScale)
            .ticks(10);

        scene2.append("g")
            .attr("transform", "translate(50,20)")
            .attr("class", "axis")
            .call(scene2YAxis);

        scene2.append("g")
            .attr("transform", "translate(50,750)")
            .attr("class", "axis")
            .call(makeScene2XAxis)
            .selectAll("text")
            .style("text-anchor", "end");

        scene2.append('text')
            .attr('x', 300)
            .attr('y', 790)
            .attr('text-anchor', 'middle')
            .text('Fuel type')
        
        scene2.append('text')
            .attr('x', -400)
            .attr('y', 15)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Mileage')
        
        scene2.selectAll("highwaybar")
            .data(data_given)
            .enter()
            .append("rect")
            .attr("x", function (d, i) { return makeScene2XScale(d.Fuel) + 150; })
            .attr("y", function (d, i) { return makeScene2YScale(fuleHighwayMpgs[d.Fuel]) - 190; })
            .attr("width", 50)
            .attr("height", function (d, i) { return 940 - makeScene2YScale(fuleHighwayMpgs[d.Fuel]); })
            .attr("fill", "#3288BD").on("mouseover", function (d, i) {
                bar_tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                bar_tooltip.html(d.Fuel)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px");
            })
            .on("mouseout", function (d) {
                bar_tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
        
        // This function is called by the buttons on top of the plot
        changeOnFuel = function (setting) {
            if (setting === "AverageHighwayMPG") {
                scene2.selectAll("rect")
                    .transition()
                    .duration(2000)
                    .attr("x", function (d, i) { return makeScene2XScale(d.Fuel) + 150; })
                    .attr("y", function (d, i) { return makeScene2YScale(fuleHighwayMpgs[d.Fuel]) - 190; })
                    .attr("width", 50)
                    .attr("height", function (d, i) { return 940 - makeScene2YScale(fuleHighwayMpgs[d.Fuel]); })
                    .attr("fill", "#3288BD")
            } else {
                scene2.selectAll("rect")
                    .transition()
                    .duration(2000)
                    .attr("x", function (d, i) { return makeScene2XScale(d.Fuel) + 150; })
                    .attr("y", function (d, i) { return makeScene2YScale(fuleCityMpgs[d.Fuel]) - 190; })
                    .attr("width", 50)
                    .attr("height", function (d, i) { return 940 - makeScene2YScale(fuleCityMpgs[d.Fuel]); })
                    .attr("fill", "#66C2A5")
            }
        }
    })
}

/**
 * Scene Three
 */
var changeOnCyl;
async function loadScene3() {
    var scene3 = d3.select('#scene3')
    d3.csv("https://flunky.github.io/cars2017.csv").then(function (data_given) {
        var keys_cyls = ["0", "2", "3", "4", "6", "8", "10", "12"]
        var cylHighwayMpgs = {};
        var cylCityMpgs = {};
        keys_cyls.forEach(function (cyl) {
            cylHighwayMpgs[cyl] = [];
            cylCityMpgs[cyl] = [];
        });
        data_given.forEach(data => {
            cylHighwayMpgs[data.EngineCylinders].push(parseInt(data.AverageHighwayMPG));
            cylCityMpgs[data.EngineCylinders].push(parseInt(data.AverageCityMPG));
        });
        const average = array => array.reduce((a, b) => a + b) / array.length;
        keys_cyls.forEach(function (cyl) {
            cylHighwayMpgs[cyl] = average(cylHighwayMpgs[cyl]);;
            cylCityMpgs[cyl] = average(cylCityMpgs[cyl]);;
        });

        var makeScene3XScale = d3.scaleBand()
            .range([0, 850])
            .domain(keys_cyls)

        var makeScene3XAxis = d3.axisBottom()
            .scale(makeScene3XScale)
            .ticks(5);

        var makeScene3YScale = d3.scaleLinear()
            .domain([0, 150])
            .range([740, 0]);

        var scene3YAxis = d3.axisLeft()
            .scale(makeScene3YScale)
            .ticks(10);

        scene3.append("g")
            .attr("transform", "translate(50,20)")
            .attr("class", "axis")
            .call(scene3YAxis);

        scene3.append("g")
            .attr("transform", "translate(50,750)")
            .attr("class", "axis")
            .call(makeScene3XAxis)
            .selectAll("text")
            .style("text-anchor", "end");

        scene3.append('text')
            .attr('x', 500)
            .attr('y', 790)
            .attr('text-anchor', 'middle')
            .text('Number of Cylinders')
        
        scene3.append('text')
            .attr('x', -400)
            .attr('y', 15)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Mileage')
        
        scene3.selectAll("highwaybar")
            .data(data_given)
            .enter()
            .append("rect")
            .attr("x", function (d, i) { return makeScene3XScale(d.EngineCylinders) + 80; })
            .attr("y", function (d, i) { return makeScene3YScale(cylHighwayMpgs[d.EngineCylinders]) - 190; })
            .attr("width", 50)
            .attr("height", function (d, i) { return 940 - makeScene3YScale(cylHighwayMpgs[d.EngineCylinders]); })
            .attr("fill", "#3288BD").on("mouseover", function (d, i) {
                bar_tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                bar_tooltip.html(d.EngineCylinders)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px");
            })
            .on("mouseout", function (d) {
                bar_tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        // This function is called by the buttons on top of the plot
        changeOnCyl = function (setting) {
            if (setting === "AverageHighwayMPG") {
                scene3.selectAll("rect")
                    .transition()
                    .duration(2000)
                    .attr("x", function (d, i) { return makeScene3XScale(d.EngineCylinders) + 80; })
                    .attr("y", function (d, i) { return makeScene3YScale(cylHighwayMpgs[d.EngineCylinders]) - 190; })
                    .attr("width", 50)
                    .attr("height", function (d, i) { return 940 - makeScene3YScale(cylHighwayMpgs[d.EngineCylinders]); })
                    .attr("fill", "#3288BD")
            } else {
                scene3.selectAll("rect")
                    .transition()
                    .duration(2000)
                    .attr("x", function (d, i) { return makeScene3XScale(d.EngineCylinders) + 80; })
                    .attr("y", function (d, i) { return makeScene3YScale(cylCityMpgs[d.EngineCylinders]) - 190; })
                    .attr("width", 50)
                    .attr("height", function (d, i) { return 940 - makeScene3YScale(cylCityMpgs[d.EngineCylinders]); })
                    .attr("fill", "#66C2A5")
            }
        }
    })
}