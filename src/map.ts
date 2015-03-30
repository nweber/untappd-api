/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/jquery.cookie/jquery.cookie.d.ts" />
/// <reference path="../typings/d3/d3.d.ts" />
/// <reference path="../typings/d3/topojson.d.ts" />
/// <reference path="../typings/aurelia/aurelia.d.ts" />
/// <reference path="untappd.ts" />

class Key {
    width: number = 960;
    height: number = 70;

    color: D3.Scale.ThresholdScale;
    x: D3.Scale.LinearScale;
    xAxis: D3.Svg.Axis;
    path: D3.Geo.Path;
    svg: D3.Selection;
    g: D3.Selection;

    render(): void {
        this.color = d3.scale.threshold()
            .domain([30, 60, 120, 360])
            .range(["#ffffcc","#c2e699","#78c679","#31a354","#006837"]);

        this.x = d3.scale.linear()
            .domain([0, 390])
            .range([0, 240]);

        this.xAxis = d3.svg.axis()
            .scale(this.x)
            .orient("bottom")
            .tickSize(13)
            .tickValues(this.color.domain());

        this.path = d3.geo.path();

        this.svg = d3.select("body").append("svg")
            .attr("width", this.width)
            .attr("height", this.height);

        this.g = this.svg.append("g")
            .attr("class", "key")
            .attr("transform", "translate(40,40)");

        var self = this;

        this.g.selectAll("rect")
            .data(this.color.range().map(function(d, i) {
                return {
                    x0: i ? self.x(self.color.domain()[i - 1]) : self.x.range()[0],
                    x1: i < self.color.domain().length ? self.x(self.color.domain()[i]) : self.x.range()[1],
                    z: d
                };
            }))
            .enter().append("rect")
            .attr("height", 8)
            .attr("x", function(d) { return d.x0; })
            .attr("width", function(d) { return d.x1 - d.x0; })
            .style("fill", function(d) { return d.z; });

        this.g.call(this.xAxis).append("text")
            .attr("class", "caption")
            .attr("y", -6)
            .text("Population per square mile");
    }
}

class Chart {
    render(): void {
        var width = 960, height = 500;

        var color = d3.scale.log()
            .range(["hsl(62,100%,90%)", "hsl(228,30%,20%)"])
            .interpolate(d3.interpolateHcl);

        var path = d3.geo.path()
            .projection(null);

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

        d3.json("test/us-albers.json", function(error, us) {
            var counties = topojson.feature(us, us.objects.counties).features;

            var densities = counties
                .map(function(d) { return d.properties.density = d.properties.pop / path.area(d); })
                .sort(function(a, b) { return a - b; });

            color.domain([d3.quantile(densities, .01), d3.quantile(densities, .99)]);

            svg.append("g")
                .attr("class", "counties")
                .selectAll("path")
                .data(counties)
                .enter().append("path")
                .style("fill", function(d) { return color(d.properties.density); })
                .attr("d", path);
        });
    }
}

export class Map {

}
