// Data for jsTree
const jsTreeData = [
  { "id": "1", "parent": "#", "text": "Root" },
  { "id": "2", "parent": "1", "text": "Child 1" },
  { "id": "3", "parent": "1", "text": "Child 2" },
  { "id": "4", "parent": "2", "text": "Grandchild 1" },
  { "id": "5", "parent": "2", "text": "Grandchild 2" }
];

$(function() {
  $('#jstree').jstree({
    'core': {
      'data': jsTreeData
    }
  });
});

// Data for D3.js tree
const d3TreeData = {
  "name": "Root",
  "children": [
    {
      "name": "Child 1",
      "children": [
        {"name": "Grandchild 1"},
        {"name": "Grandchild 2"}
      ]
    },
    {
      "name": "Child 2",
      "children": [
        {"name": "Grandchild 3"}
      ]
    }
  ]
};

const width = 960;
const height = 500;
const margin = {top: 20, right: 120, bottom: 20, left: 120};

const svg = d3.select("svg")
              .attr("width", width)
              .attr("height", height)
              .append("g")
              .attr("transform", `translate(${margin.left},${margin.top})`);

const treeLayout = d3.tree().size([height - margin.top - margin.bottom, width - margin.left - margin.right]);
const root = d3.hierarchy(d3TreeData);
treeLayout(root);

svg.selectAll(".link")
   .data(root.links())
   .enter()
   .append("path")
   .attr("class", "link")
   .attr("d", d3.linkHorizontal()
                 .x(d => d.y)
                 .y(d => d.x));

const node = svg.selectAll(".node")
                .data(root.descendants())
                .enter()
                .append("g")
                .attr("class", "node")
                .attr("transform", d => `translate(${d.y},${d.x})`);

node.append("circle")
    .attr("r", 10);

node.append("text")
    .attr("dy", ".35em")
    .attr("x", d => d.children ? -13 : 13)
    .attr("text-anchor", d => d.children ? "end" : "start")
    .text(d => d.data.name);