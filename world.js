
class world{
  constructor(){
    this.characters = [];
    this.selected = 0;
    this.off_y = 0;
    this.buttons = {
      name: new button(10,10,"name: "),
      x: new button(120,10,"x: "),
      y: new button(190,10,"y: "),
      sx: new button(260,10,"sx: "),
      sy: new button(330,10,"sy: "),
      z: new button(10,40,"z: "),
      hide: new button(70,40,"hide: "),
      rot: new button(150,40,"rot: "),
      selected: new button(230,40,"selected: "),
      saved_state: new button(310,40,"saved: ")
    }
    this.add_obj_button = new button(width-70,height-125,"Add Obj");
    this.add_obj_button.set_fill(c[3]);
    this.del_obj_button = new button(width-75,height-100,"Delete Obj");
    this.del_obj_button.set_fill(c[0],c[1]);
  }
  
  add_character(){
    let obj = new character();
    this.characters.push(obj);
    this.selected = this.characters.length - 1;
  }
  
  delete_character(){
    this.characters = this.characters.filter(e=>e!=this.characters[this.selected]);
    if(this.selected >= this.characters.length) this.selected = this.characters.length-1;
    if(this.selected < 0 ) this.selected = 0;
  }
  
  get_c(){
    return this.characters[this.selected];
  }
  
  rearrange(){
    let p = this.characters[this.selected];
    this.characters.sort((a,b)=>a.z-b.z);
    this.selected = this.characters.findIndex((p1)=>p1 === p);
  }
  
  top_portion(){
    if(this.characters.length > 0){
      let p = this.characters[this.selected];
      this.buttons.x.set_text("x: "+p.pos.x);
      this.buttons.y.set_text("y: "+p.pos.y);
      this.buttons.sx.set_text("sx: "+p.size.x.toFixed(2));
      this.buttons.sy.set_text("sy: "+p.size.y.toFixed(2));
      this.buttons.rot.set_text("rot: "+p.rot.toFixed(2));
      this.buttons.name.set_text("name: "+p.name);
      this.buttons.hide.set_text("hide: "+p.hide);
      this.buttons.selected.set_text("selected: "+p.selected);
      this.buttons.z.set_text("z: "+p.z);
      this.buttons.saved_state.set_text("saved: "+save_state.length);
    }
    
    push();
    fill(c[0])
    rect(0,0,width,80);
    pop();
    
    if(this.characters.length > 0){
      let bts = Object.entries(this.buttons);
      for(let i=0 ; i < bts.length ; i++){
        bts[i][1].draw();
      }
    }
  }
  
  side_portion(){
    push();
    fill(c[1]);
    rect(width-80,80,width,height);
    pop();
    this.characters.forEach((e,i)=>{
      let p = new button(width-80,80+i*25,e.name);
      if(mouseIsPressed && p.collided(mouseX,mouseY)) 
        this.selected = i;
      if(i == this.selected){
        p.set_fill(c[5]);
      }else {
        p.set_fill(c[0],c[1])
      }
      p.draw();
    });
    this.add_obj_button.draw();
    this.del_obj_button.draw();
  }
  
  bottom_portion(){
    push();
    fill(c[4]);
    rect(0,height-80,width,height);
    pop();
    textSize(10);
    text("move obj by 1px left 'a', right 'd', top 'w' and down 's' and by 10px with 'A','D','W' and 'S'\nrotate obj by 1.8 deg with 'r' and by -1.8 deg with 'R' anticlockwise\nscale w or h or both by 0.1 with 'j','l' or 'k' and by -0.1 with 'J','L' or 'K' respectively\nhide or unhide by 'h' or 'H' ,and change z-index by 'z'+ve and 'Z'-ve\nchange the image of an obj by 'v'+ve and 'V'-ve ,and delete selected image by 'x'\n'c' for save_current state ,and 'p','P' for preview run and stop ,and 'b','B' for clicky on and off",2,height-80+12);
  }
  
  draw(){
    push();
    this.characters.forEach((img)=>img.draw());
    this.top_portion();
    this.side_portion();
    this.bottom_portion();
    pop();
  }
}

const key_mapping = function(){
  if(!world_ui.get_c()) return;
  switch(key){
    case "a":
      world_ui.get_c().del_pos(-1,0);
      if(key_click) keypressed = false;
      break;
    case "A":
      world_ui.get_c().del_pos(-10,0);
      if(key_click) keypressed = false;
      break;
    case "d":
      world_ui.get_c().del_pos(1,0);
      if(key_click) keypressed = false;
      break;
    case "D":
      world_ui.get_c().del_pos(10,0);
      if(key_click) keypressed = false;
      break;
    case "w":
      world_ui.get_c().del_pos(0,-1);
      if(key_click) keypressed = false;
      break;
    case "W":
      world_ui.get_c().del_pos(0,-10);
      if(key_click) keypressed = false;
      break;
    case "s":
      world_ui.get_c().del_pos(0,1);
      if(key_click) keypressed = false;
      break;
    case "S":
      world_ui.get_c().del_pos(0,10);
      if(key_click) keypressed = false;
      break;
    case "r":
      world_ui.get_c().del_rot(Math.PI/100);
      if(key_click) keypressed = false;
      break;
    case "R":
      world_ui.get_c().del_rot(-Math.PI/100);
      if(key_click) keypressed = false;
      break;
    case "j":
      world_ui.get_c().del_size(0.1,0);
      if(key_click) keypressed = false;
      break;
    case "J":
      world_ui.get_c().del_size(-0.1,0);
      if(key_click) keypressed = false;
      break;
    case "k":
      world_ui.get_c().del_size(0.1,0.1);
      if(key_click) keypressed = false;
      break;
    case "K":
      world_ui.get_c().del_size(-0.1,-0.1);
      if(key_click) keypressed = false;
      break;
    case "l":
      world_ui.get_c().del_size(0,0.1);
      if(key_click) keypressed = false;
      break;
    case "L":
      world_ui.get_c().del_size(0,-0.1);
      if(key_click) keypressed = false;
      break;
    case "h":
      world_ui.get_c().set_hide(true);
      if(key_click) keypressed = false;
      break;
    case "H":
      world_ui.get_c().set_hide(false);
      if(key_click) keypressed = false;
      break;
    case "z":
      world_ui.get_c().del_z(1);
      world_ui.rearrange();
      keypressed = false;
      break;
    case "Z":
      world_ui.get_c().del_z(-1);
      world_ui.rearrange();
      keypressed = false;
      break;
    case "v":
      world_ui.get_c().del_selected(1);
      keypressed = false;
      break;
    case "V":
      world_ui.get_c().del_selected(-1);
      keypressed = false;
      break;
    // case "x":
    //   world_ui.get_c().delete_img();
    //   keypressed = false;
    //   break;
    case 'c':
      let r = [];
      for(let i = 0; i< world_ui.characters.length; i++){
        let q = world_ui.characters[i];
        let p = {
          pos: {x:q.pos.x,y:q.pos.y},
          size:{x:q.size.x,y:q.size.y},
          rot:q.rot,
          selected:q.selected,
          z:q.z
        }
        r.push(p);
      }
      save_state.push(r);
      keypressed = false;
      break;  
    case 'p':
      preview = true;
      break;
    case 'P':
      preview = false;
      save_state[save_state.length-1]
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
      break;
    case 'b':
      key_click = true;
      break;
    case 'B':
      key_click = false;
      break;
  }
}

/*
this.pos = {x:width/2,y:height/2};
this.size = {x:1,y:1}
this.rot = 0;
this.img = [];
this.selected = 0;
this.hide = false;
this.z = 0;
this.name = "";
*/