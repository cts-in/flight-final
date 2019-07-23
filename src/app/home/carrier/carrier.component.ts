import { Component, OnInit ,AfterContentInit,ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { CarrierService } from './carrier.service';

import * as d3 from 'd3';

import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-carrier',
  templateUrl: './carrier.component.html',
  styleUrls: ['./carrier.component.scss'],
  providers:[ CarrierService ]
})

export class CarrierComponent implements OnInit, AfterContentInit {
  title = 'app';
  radius = 10;
  response: any;
  data: any;
  offsetWidth = 1000;
  offsetHeight = 1000;
   margin = {top: 20, right: 20, bottom: 30, left: 40};
  color: any;
  pack: any;
  svg: any;
  chart: any;
  root: any;
  nodes: any;
  g: any;
  view: any;
  circle: any;
  node: any;
  
  constructor (private http: HttpClient,private CarrierService: CarrierService) {}

  ngOnInit() {
    
    this.http.get('http://localhost:4200/assets/FlightData.json').subscribe((data) => {
      console.log(data)
      this.data=data;
      this.clicked1();
    });
  }

  loadCarrier() {
    this.CarrierService.getCarrier().subscribe((response) => {
      this.response=response;
      console.log(this.response);
      // console.log(this.response.name);
      // console.log(this.response.children[0].name);
    });
  }

  ngAfterContentInit(){

  }

    clicked1(){
    const data = this.data;

    const svg = d3.select("#chart").append('svg')
        .attr('width', this.offsetWidth)
        .attr('height', this.offsetHeight);

    const contentWidth = this.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = this.offsetHeight - this.margin.top - this.margin.bottom;

     

    this.svg = d3.select('#chart').append('svg')
        .attr("width", this.offsetWidth)
        .attr("height", this.offsetHeight);
        
    this.g =this.svg.append("g")
        .attr("transform", "translate(" + this.offsetWidth / 2 + "," + this.offsetHeight / 2 + ")");


   this.color = d3.scaleLinear()
        .domain([-1, 5])
        .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
        .interpolate(d3.interpolateHcl);


  var pack = d3.pack()
      .size(contentWidth,contentHeight)
      .padding(2);

   this.root = d3.hierarchy(data)
      .sum(function(d) { return d.size; })
      .sort(function(a, b) { return b.value - a.value; });
 

      this.nodes = pack(this.root).descendants();

     this.circle = this.g.selectAll("circle")
        .data(this.nodes)
        .enter().append("circle")
        .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
        .style("fill", function(d) { return d.children ? d3.color(d.depth) : null; })
        .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

   var text = this.g.selectAll("text")
      .data(this.nodes)
      .enter().append("text")
      .attr("class", "label")
      .style("fill-opacity", function(d) { return d.parent === this.root ? 1 : 0; })
      .style("display", function(d) { return d.parent === this.root ? "inline" : "none"; })
      .text(function(d) { return d.data.name; });
      
   this.node = this.g.selectAll("circle,text");

    this.svg.style("background", this.color(-1)).on("click", function() { zoom(this.root); });

  // zoomTo([this.root.x, this.root.y, root.r * 2 +20]);
    }
}

     function zoom(d) {
      this.focus = d;
  
      var transition = d3.transition()
          .duration(d3.event.altKey ? 7500 : 750)
          .tween("zoom", function(d) {
            var i = d3.interpolateZoom(this.view, [this.focus.x, this.focus.y, this.focus.r * 2 + 20]);
            return function(t) { zoomTo(i(t)); };
          });
  
      transition.selectAll("text")
        .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
          .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
          .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
          .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; })
    }

    function zoomTo(v) {
      var k = this.offsetWidth / v[2]; 
      this.view = v;
      this.node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
      this.circle.attr("r", function(d) { return d.r * k; });
      
    }

    // var text = this.g.selectAll("text")
    //   .data(this.nodes)
    //   .enter().append("text")
    //   .attr("class", "label")
    //   .style("fill-opacity", function(d) { return d.parent === this.root ? 1 : 0; })
    //   .style("display", function(d) { return d.parent === this.root ? "inline" : "none"; })
    //   .text(function(d) { return d.data.name; })
      


      

  // clicked() {

  //   this.margin = 20;
  //   this.diameter = 960;
  //    this.color = d3.scaleLinear()
  //    .domain([-1, 5])
  //    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
  //    .interpolate(d3.interpolateHcl);

  //   this. pack = d3.pack()
  //       .padding(2)
  //       .size([this.diameter - this.margin, this.diameter - this.margin]);

  // this.svg = d3.select('#chart').append('svg')
  //       .attr("width", this.diameter)
  //       .attr("height", this.diameter)
  //       .append("g")
  //       .attr("transform", "translate(" + this.diameter / 2 + "," + this.diameter / 2 + ")");

  //   this.chart = d3.json("http://192.168.1.54:8080/incs/get/data/by/carrier", (error, root) => {
  //     console.log("this.response.name "+root);
      
  //       if (error) throw error;

  //       var focus = root,
  //           nodes = this.pack.nodes(root),
  //           view;

  //       var circle = this.svg.selectAll("circle")
  //           .data(nodes)
  //           .enter().append("circle")
  //           .attr("class", function (d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
  //           .style("fill", (d) => { return d.children ? this.color(d.depth) : null; })
  //           .on("click", (d) => { if (focus !== d) zoom.call(this, d), d3.event.stopPropagation(); });

  //       var text = this.svg.selectAll("text")
  //           .data(nodes)
  //           .enter().append("text")
  //           .attr("class", "label")
  //           .style("fill-opacity", function (d) { return d.parent === root ? 1 : 0; })
  //           .style("display", function (d) { return d.parent === root ? "inline" : "none"; })
  //           .text(function (d) { return d.name; });

  //       var node = this.svg.selectAll("circle,text");

  //       d3.select('#chart')
  //           .style("background", this.color(-1))
  //           .on("click", () => { zoom.call(this, root); });

  //       zoomTo.call(this, [root.x, root.y, root.r * 2 + this.margin]);

  //       function zoom(d) {
  //           var focus0 = focus; focus = d;

  //           var transition = d3.transition()
  //               .duration(d3.event.altKey ? 7500 : 750)
  //               .tween("zoom", (d) => {
  //                   var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + this.margin]);
  //                   return (t) => { zoomTo.call(this, i(t)); };
  //               });

  //           transition.selectAll("text")
  //               .filter(function (d) { return d.parent === focus || this.style.display === "inline"; })
  //               .style("fill-opacity", function (d) { return d.parent === focus ? 1 : 0; })
  //               .each("start", function (d) { if (d.parent === focus) this.style.display = "inline"; })
  //               .each("end", function (d) { if (d.parent !== focus) this.style.display = "none"; });
  //       }

  //       function zoomTo(v) {
  //           var k = this.diameter / v[2]; view = v;
  //           node.attr("transform", function (d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
  //           circle.attr("r", function (d) { return d.r * k; });
  //       }
  //   });

    
  // }
