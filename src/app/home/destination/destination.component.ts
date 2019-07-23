import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {

  margin = {top: 20, right: 20, bottom: 30, left: 40};
  data: any;
  offsetWidth = 1000;
  offsetHeight = 500;
  svg: any;

  constructor (private http: HttpClient) {}

  ngOnInit() {
    this.http.get('https://raw.githubusercontent.com/jplemieux66/angular-d3-responsive/master/src/assets/data.json').subscribe((data) => {
      console.log(data)
      this.data=data;
      this.clicked();
    });
  }

  clicked(){
    const data = this.data;

    const svg = d3.select("#chart").append('svg')
        .attr('width', this.offsetWidth)
        .attr('height', this.offsetHeight);

    const contentWidth = this.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = this.offsetHeight - this.margin.top - this.margin.bottom;

     

  this.svg = d3.select('#chart').append('svg')
        .attr("width", this.offsetWidth)
        .attr("height", this.offsetHeight)
        .append("g")
        .attr("transform", "translate(" + this.offsetWidth / 2 + "," + this.offsetHeight / 2 + ")");


    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(data.map(d => d.letter));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(data, d => d.frequency)]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10, '%'))
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Frequency');

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.letter))
        .attr('y', d => y(d.frequency))
        .attr('width', x.bandwidth())
.attr('height', d => contentHeight - y(d.frequency));
     }

}
