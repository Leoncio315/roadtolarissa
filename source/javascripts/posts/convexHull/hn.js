function drawHN(){
  var numPoints = 20,
      points = _.sortBy(uniformRandom(numPoints), f('x'))

  var svg = d3.select('#hn').html('')
    .append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  var circles = svg.append('g').selectAll('circle')
      .data(points).enter()
    .append('circle').classed('point', true)
      .attr('r', 5)
      .attr('cx', f('x'))
      .attr('cy', f('y'))
      .each(function(d){ d.circle = d3.select(this) })

  var mLine = svg.append('line').classed('mline', true)
      .attr({x1: points[0].x, y1: points[0].y})

  svg.append('path')
      .attr('d', ['M', points[0].x, '0L', points[0].x, height].join(' '))
      .style('stroke', 'red')

  points.forEach(function(d){
    d.angle = calcAngle({x: points[0].x, y:height}, points[0], d)
    svg.append('text')
        .attr({x: d.x, y: d.y, dy: '.33em'})
        .text(Math.round(d.angle))
  })

  svg.append('rect')
      .style('fill-opacity', 0)
      .attr({width: width, height: height})
      .on('mousemove', function(){
        var pos = d3.mouse(this)
        mLine.attr({x2: pos[0], y2: pos[1]})
      })




}
drawHN()