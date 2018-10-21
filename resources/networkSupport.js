function display_network(class_name, width, height, network)
{

    var colorNode = d3.scale.category20(),
        colorLink = d3.scale.category10();

    var force = d3.layout.force()
        .charge(-120)
        .linkDistance(35)
        .size([width, height]);

    var svg = d3.select(class_name).append("svg")
        .attr("width", width)
        .attr("height", height);

    force
        .nodes(network.nodes)
        .links(network.links)
        .start();

    var link = svg.selectAll(".link")
        .data(network.links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", 2)
        .style("stroke", function(d) { return colorLink(d.value); });

    var node = svg.selectAll(".node")
        .data(network.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 20)
        .style("fill", function(d) { return colorNode(d.group); })
        .call(force.drag);

    force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
    
        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
        });
}