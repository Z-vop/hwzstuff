// ## Hacknode Drawing Functions ## //
paper.install(window);
window.nodes = [];
window.lines = [];

function Node(x, y, r, c) {
    this.connections = [];
    this.health = 100;
    this.name = "Node at " + x + "," + y + " with color " + c;

    var w = 15; // border width

    var outerNode = new Path.Circle({
        center: new Point(x, y),
        radius: r + w,
        fillColor: c,
        shadowColor: c,
        shadowBlur: 80,
        shadowOffset: new Point(0, 0)
    });

    // Make the shadow
    // If the node color is a shade of grey (no saturation) shadow color must be white
    if (outerNode.fillColor.saturation == 0) {
        outerNode.shadowColor = new Color(.7);
    } else {
        outerNode.shadowColor.brightness = 1; // Boost the shadow brightness to max
        outerNode.shadowColor.saturation = 1; // Boost the shadow color saturation
    }

    var innerNode = new Path.Circle({
        center: new Point(x, y),
        radius: r
    });
    innerNode.fillColor = new Color(c);
    innerNode.fillColor.brightness += .07;
    innerNode.fillColor.saturation -= .1;

    var arcNode = createArc(x, y, r + w, c);

    // Make the damage indicator (text)
    this.damageText = new PointText(new Point(x, y+10));
    this.damageText.fontFamily = "Gill Sans";
    this.damageText.fontSize = 24;
    this.damageText.justification = 'center';
    this.damageText.fillColor = 'white';
    this.damageText.opacity = 0.5;
    this.damageText.content = this.health;

    // Make a transparent circle over the node as a consistent target for mouse events
    this.mouseTarget = new Path.Circle({
        center: new Point(x, y),
        radius: r + w,
        fillColor: new Color(1, 0.001)
    });

    Group.call(this, [outerNode, innerNode, arcNode, this.damageText, this.mouseTarget]);

    var r = this.bounds.width / 2; // radius

    // Make the select circle and hide it
    this.selectNode = new Path.Circle({
        center: new Point(this.position.x, this.position.y),
        radius: r,
        strokeColor: 'white',
        strokeWidth: 3,
        shadowColor: 'white',
        shadowBlur: 40,
        shadowOffset: new Point(0, 0)
    });
    this.selectNode.visible = false;

    // Make the target circle and hide it
    var r = this.bounds.width / 2 + 10; // radius
    this.targetCircle = new Path.Circle({
        center: new Point(this.position.x, this.position.y),
        radius: r,
        strokeColor: 'orange',
        strokeWidth: 3,
        shadowColor: 'orange',
        shadowBlur: 40,
        shadowOffset: new Point(0, 0)
    });
    this.targetCircle.visible = false;


}

Node.prototype = Object.create(Group.prototype);
Node.prototype.constructor = Group;

// Change this node's hue. Hue is from 0 to 360.
Node.prototype.setHue = function(h) {
    this.children[0].fillColor.hue = h;
    this.children[0].shadowColor.hue = h;
    this.children[1].fillColor.hue = h;
    this.children[2].fillColor.hue = h;
};

// Set the node's base color.
Node.prototype.setBaseColor = function(c) {
    // TODO: DRY up this code
    this.children[0].fillColor = c;
    this.children[0].shadowColor = new Color(c);
    this.children[0].shadowColor.brightness = 1; // Boost the shadow brightness to max
    this.children[0].shadowColor.saturation = 1; // Boost the shadow color saturation
    //this.children[1].fillColor = new Color(c).hue; // TODO: rafactor code with constructor
    this.children[1].fillColor = new Color(c);
    this.children[1].fillColor.brightness += .07;
    this.children[1].fillColor.saturation -= .1;
    //this.children[2].fillColor = new Color(c).hue; // TODO: compute color as in constructor
    this.children[2].fillColor = new Color(c);
    this.children[2].fillColor.alpha = 0.3;
};

Node.prototype.selectOn = function() {
    this.selectNode.visible = true;
};
Node.prototype.selectOff = function() {
    this.selectNode.visible = false;
};
Node.prototype.isSelected = function() {
    return this.selectNode.visible;
}
Node.prototype.targetOn = function() {
    this.targetCircle.visible = true;
};
Node.prototype.targetOff = function() {
    this.targetCircle.visible = false;
};
Node.prototype.isTargeted = function() {
    return this.targetCircle.visible;
}
Node.prototype.setHealth = function(amount) {
    this.health = amount;
    this.damageText.content = this.health;
}


// Does this node's connections include the node with id number n?
// usage: node.isConnected(2);
Node.prototype.isConnected = function(n) {
    return this.connections.includes(n);
}

// ### Standalone functions

// Connect two nodes in nodes[] with the index numbers n1 and n2



// Draws the half circle
function createArc(x, y, r, c) {
    // Draw the outside curve of a half-circle
    var start = new Point(x, y - r);
    var through = new Point(x - r, y);
    var to = new Point(x, y + r);
    var arcNode = Path.Arc(start, through, to);
    // Draw the flat line
    arcNode.add(new Point(x, y));
    arcNode.add(new Point(x, y - r));
    arcNode.fillColor = c;
    arcNode.fillColor.alpha = 0.3;
    arcNode.blendMode = 'multiply';
    arcNode.rotate(45, new Point(x, y));
    return arcNode;
}
