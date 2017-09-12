


(function() {


"use strict";

angular
    .module('app')
    .controller('mapaComunicacional',mapaComunicacional);

function mapaComunicacional($filter) {

	var self = this;
	var nodes = [
    { id: 1, label: 'This is a\nsingle-font label', x: -120, y: -120 },
    { id: 2, font: { multi: true }, label: '<b>This</b> is a\n<i>default</i> <b><i>multi-</i>font</b> <code>label</code>', x: -40, y: -40 },
    { id: 3, font: { multi: 'html', size: 20 }, label: '<b>This</b> is an\n<i>html</i> <b><i>multi-</i>font</b> <code>label</code>', x: 40, y: 40 },
    { id: 4, font: { multi: 'md', face: 'georgia' }, label: '*This* is a\n_markdown_ *_multi-_ font* `label`', x: 120, y: 120}
  ];

  var edges = [
    {from: 1, to: 2, label: "single to default"},
    {from: 2, to: 3, font: { multi: true }, label: "default to <b>html</b>" },
    {from: 3, to: 4, font: { multi: "md" }, label: "*html* to _md_" }
  ];

 
  self.data = {
    nodes: nodes,
    edges: edges
  };

  self.options = {
  	height: '800',
    width: '100%',
    nodes: {
      shape: 'box'
    },
     physics: {
      enabled: false
    }
  };
   

}
})();