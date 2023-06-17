let c,file_input,world_ui;
let keypressed = false,key_click = false;

let save_state;
let preview = false,state_num=0;


function setup() {
  createCanvas(400, 400);
  c = [color(0),color(255),color(255,0,0),
       color(255,255,0),color(0,255,0),
       color(0,255,255),color(0,0,255)];
  file_input = createFileInput(handler);
  world_ui = new world();
  noStroke();
  world_ui.add_character();world_ui.add_character();
  
  save_state = [];
  world_run = new world();
}

function draw() {
  background(220);
  world_ui.draw();
  if(preview){
    save_state[state_num]
      .forEach((e,j)=>{
        let p = world_ui.characters[j];
        p.pos.x = e.pos.x;
        p.pos.y = e.pos.y;
        p.size.x = e.size.x;
        p.size.y = e.size.y;
        p.z = e.z;
        p.selected = e.selected;
        p.rot = e.rot;
      });
    state_num++;
    state_num = state_num%(save_state.length)
  }else{
    push();
    stroke(c[0]);
    for(let i=0 ; i<13 ; i++){
      line(0,80+i*height/20,width-80,80+i*height/20);
      line(i*width/15,80,i*width/15,height-80)
    }
    pop();
  }
  if(keypressed)
    key_mapping();
}

const image_mapper = function(img,f){
  world_ui.get_c().add_img(img);
  world_ui.get_c().name = f.substring(0,6);
}

function keyPressed(){
  keypressed = true;
}

function keyReleased(){
  keypressed = false;
}

function mouseReleased(){
  if(world_ui.add_obj_button.collided(mouseX,mouseY)){
    world_ui.add_character();
  }
  // if(world_ui.del_obj_button.collided(mouseX,mouseY)){
  //   world_ui.delete_character();
  // }
}
