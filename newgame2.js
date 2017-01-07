//var app = require('express')();
//var http = require('http').Server(app);
//var io = require('socket.io')(http);



    var users = [];
    users.push(socket.id);
    for(i=0;i>users.length;i++){
        users[i].owns = [];
    }

user[0].owns.push(node[0]);

paper.install(window);

      // Only execute our code once the DOM is ready.
      window.onload = function () {
          // Get a reference to the canvas object
          var canvas = document.getElementById('myCanvas');
          // Create an empty project and a view for the canvas:
          paper.setup(canvas);


          function ifplayer(node) {
              for (i = 0; i < users.length; i++) {
                  if(users[i].owns.includes(node)){
                      return true;
                  }

              }
          }

          // TODO: eliminate makeNode
          function makeNode(x, y, size, color) {
              var node = new Node(x, y, size, color);
              node.attacks = 0;

              node.onMouseDown = function (event) {
                  // a user has clicked on a node
                  //this is where we need to add code to make it so only the user can click nodes that he owns
                  //this.owned
                  //for (i=0;i < players.length;i++
                  //forloop(this, players) == true
                  if (this.owned){
                     
                      // if this is a node we own, allow selection or deselection
                      this.selected = !(this.selected);
                  } else {
                      // otherwise, check the node's connections:
                      for (var i = 0; i < this.connectedNodes.length; i++) {
                          // if this node is connected to a selected (attack) node
                          if (this.connectedNodes[i].selected) {
                              // then we want to enable this node as a target
                              var aSelectedNode = this.connectedNodes[i];
                              // TODO: We set the target color for every attacking node
                              this.baseColor = 'orange';
                              // find the connecting line
                              for (n = 0; n < lines.length; n++) {
                                  if ((lines[n].node1 == this) || (lines[n].node2 == this)) {
                                      // we have a line that connects to the click node
                                      // does the other side of the line connect to a selected node?
                                      if ((lines[n].node1 == aSelectedNode) ||
                                          (lines[n].node2 == aSelectedNode)) {

                                          // set the line color and set the line .isAnAttack property
                                          lines[n].isAnAttack = true;
                                          lines[n].strokeColor = 'orange';
                                          players[0].push(this);
                                          console.log(players[0]);
                                      }

                                      
                                  }
                              } // end for (each line)
                              aSelectedNode.selected = false;
                          }
                      } // end for (each connected node)
                  } // end else (potential attack target)
              } // end onMouseDown
              return node;
          } // end MakeNode
          
          


          //origin node
          nodes[0] = makeNode(300, 80, 30, '#e8e8e8');
          //user[0].owns.push(nodes[0])
          players.push(new Array())
          players[0].push(nodes[0]);
          console.log(players[0]);


          nodes[1] = makeNode(500, 80, 30, '#e8e8e8');//top right
          nodes[2] = makeNode(400, 240, 30, '#e8e8e8');//below the green node
          
          // final node
          nodes[3] = makeNode(1000, 540, 30, '#ff2d34');

          lines.push(connectNodes(0, 1, 20));
          lines.push(connectNodes(1, 2, 20));
          lines.push(connectNodes(0, 2, 20));
          lines.push(connectNodes(2, 3, 20));
          


          // Make the score box
          var box = new Path();
          box.add(new Point(200, 50));
          box.add(new Point(20, 50));
          box.add(new Point(20, 140));
          box.add(new Point(200, 140));
          box.add(new Point(200, 50));
          box.strokeWidth = 5;
          box.strokeColor = '#00ff26';

          //make the line that seperates the gameplay from the status
          var seperate = new Path();
          seperate.add(new Point(220, 0));
          seperate.add(new Point(220, 1200));
          seperate.strokeWidth = 5;
          seperate.strokeColor = '#00ff26';

          // Make the score
          var text = new PointText(new Point(30, 110));
          text.fillColor = '#00ff26';
          text.scale(4);
          text.content = "0";


          //#ff5157
          //#ff423f
          view.onFrame = function (event) {
              // event.count is the number of times the frame event has been fired
              if (event.count % 60 == 0) { // 60 frames per second

                  // Check each line ...
                  for (var n = 0; n < lines.length; n++) { 
                      // to see if there is an attack
                      if (lines[n].isAnAttack) {
                          // get the attacking and targeted nodes
                          var targetNode = getTargetNodeFromLine(lines[n]);
                          var attackingNode = getAttackNodeFromLine(lines[n]);

                          // Next we are going to calculate the power divide
                          var count = 0;
                          
                          // find all lines...
                          for (i=0;i < lines.length;i++){
                            // where the attacking node is one of the endpoints
                            if ((lines[i].node1 == attackingNode) ||
                              (lines[i].node2 == attackingNode)) {
                             
                              attackingNode.attacks++;
                              if(attackingNode.attacks == 1){
                                attackingNode.isSelectable = false;
                              }

                              // count the number of lines that are currently attacking
                              if(lines[i].isAnAttack){
                                count++;
                                
                              }

                            }

                          } // end for (each line)
                          console.log(count);
                          
                          // If the health of the node begin attacked has gone below zero
                          if (targetNode.health <= 0) {
                              //set the amount of how many nodes the attacking node is attacking back to 0
                              attackingNode.attacks--;
                              // Set the line back to normal
                              lines[n].isAnAttack = false;
                              lines[n].strokeColor = '#aa02ff'

                              // Set the target to an owned node
                              targetNode.owned = true;
                          } else {
                              targetNode.health = (targetNode.health - (lines[n].rate / count));
                              // targetNode.health = (targetNode.health - 10);
                          }
                      } // end if (an attack)
                  } // end for
              } // end if
          } //end onFrame

          // Draw the view now:
          view.draw();
          

          // Connect the two nodes nodes[n1] and nodes[n2]
          function connectNodes(n1, n2, speed) {
              // TODO: Need to make lines an object type
              var line = new Path();
              line.type = 0;
              //remember if you are going change this you must change it in the lines in the 140s about, in the onframe function
              var fast = 20;
              var medium = 15;
              var slow = 10;

              line.rate = speed
              line.name = "Line";
              line.sendToBack();
              line.add(nodes[n1].position);
              line.add(nodes[n2].position);
              line.strokeWidth = 10;
              //line.strokeColor = '#156011';
              line.strokeColor = '#aa02ff'


              //line.strokeColor.hue += ((10-speed)*10);
              nodes[n1].connectedNodes.push(nodes[n2]);
              nodes[n2].connectedNodes.push(nodes[n1]);
              //line.speed = speed;
              line.isAnAttack = false;
              line.node1 = nodes[n1];
              line.node2 = nodes[n2];

              return line;
          }

          // Return the target (unowned) node given a line object
          function getTargetNodeFromLine(obj) {
              if (obj.name != "Line") {
                  throw "Object is not a line."
              }

              if (obj.node1.owned) {
                  return obj.node2;
              }
              if (obj.node2.owned) {
                  return obj.node1;
              }

              throw "Nether end of line is owned.";
          }

          function getAttackNodeFromLine(obj) {
              if (obj.name != "Line") {
                  throw "Object is not a line."
              }

              if (obj.node1.owned) {
                  return obj.node1;
              }
              if (obj.node2.owned) {
                  return obj.node2;
              }

              throw "Nether end of line is owned.";
          }

      } //end OnLoad

// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/newgame2.html');
// });

// http.listen(6000, function(){
//     console.log('listening on *:6000');
// });




