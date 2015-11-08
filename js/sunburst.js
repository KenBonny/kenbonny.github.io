$(document).ready(function () {
    var width = 800,
        height = 900,
        radius = Math.min(width, height) / 2;

    var x = d3.scale.linear()
        .range([0, 2 * Math.PI]);

    var y = d3.scale.sqrt()
        .range([0, radius]);

    var color = d3.scale.category20c();

    var svg = d3.select("#sunburst")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

    var partition = d3.layout.partition()
        .value(function (d) { return d.size; });

    var arc = d3.svg.arc()
        .startAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
        .endAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
        .innerRadius(function (d) { return Math.max(0, y(d.y)); })
        .outerRadius(function (d) { return Math.max(0, y(d.y + d.dy)); });

    d3.json("../json_data/projects.json", function (error, root) {
        if (error) throw error;
        var data = partition.nodes(root);

        var path = svg.selectAll("path")
            .data(partition.nodes(root))
            .enter()
            .append("path")
            .attr("d", arc)
            .style("fill", function (d) { return d.color; })
            .on("click", click);

        var text = svg.selectAll("SunburstText")
            .data(data)
            .enter()
            .append("text")
            .classed("label", true)
            .attr("x", function (d) { return d.x; })
            .attr("text-anchor", "middle")
            .attr("class", "SunburstText")
            // translate to the desired point and set the rotation
            .attr("transform", function (d) {
                if (d.depth > 0) {
                    return "translate(" + arc.centroid(d) + ")" +
                        "rotate(" + getAngle(d) + ")";
                } else {
                    return null;
                }
            })
            .attr("dx", "6") // margin
            .attr("dy", ".35em") // vertical-align
            .attr("pointer-events", "none")
            .text(function (d) { return d.name; });

        function click(data) {
            d3.selectAll("SunburstText").remove();
            text = svg.selectAll("SunburstText")
                .data(data)
                .enter()
                .append("text")
                .attr("class", "SunburstText");
        }

        function getAngle(d) {
            // Offset the angle by 90 deg since the '0' degree axis for arc is Y axis, while
            // for text it is the X axis.
            var thetaDeg = (180 / Math.PI * (arc.startAngle()(d) + arc.endAngle()(d)) / 2 - 90);
            // If we are rotating the text by more than 90 deg, then "flip" it.
            // This is why "text-anchor", "middle" is important, otherwise, this "flip" would
            // a little harder.
            return (thetaDeg > 90) ? thetaDeg - 180 : thetaDeg;
        }
    });

    d3.select(self.frameElement).style("height", height + "px");
});