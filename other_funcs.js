const handler = (file)=>{
  let img = null;
  if(file.type === 'image'){
    img = createImg(file.data,file.name);
    img.hide();
  }else{
    
  }
  image_mapper(img,file.name);
}



class character{
  constructor(){
    this.pos = {x:width/2,y:height/2};
    this.size = {x:1,y:1}
    this.rot = 0;
    this.img = [];
    this.selected = 0;
    this.hide = false;
    this.z = 0;
    this.name = "";
  }
  
  add_img(img){
    this.img.push(img);
    this.name = "name";
    this.selected++;
  }
  
  set_pos(x,y){
    this.pos.x = x;
    this.pos.y = y;
    return this;
  }
  
  del_pos(delx,dely){
    this.pos.x += delx;
    this.pos.y += dely;
    return this;
  }
  
  set_size(x,y){
    this.size.x = x;
    this.size.y = y;
    return this;
  }
  
  del_size(delx,dely){
    this.size.x += (delx != null && (this.size.x + delx != 0 )) ? delx : 0;
    this.size.y += (dely != null && (this.size.y + dely != 0 )) ? dely : 0;
  }
  
  set_rot(rot){
    this.rot = rot%360;
    return this;
  }
  
  del_rot(delrot){
    this.rot += delrot;
    this.rot = this.rot%(2*Math.PI);
    return this;
  }
  
  set_selected(i){
    this.selected = i;
    return this;
  }
  
  del_selected(dels){
    this.selected += (this.selected + dels >= 0 && this.selected +dels < this.img.length) ? dels : 0; 
  }
  
  set_hide(hide){
    this.hide = hide;
    return this;
  }
  
  set_z(z){
    this.z = z;
    return this;
  }
  
  del_z(delz){
    this.z += parseInt(delz);
    return this;
  }
  
  set_name(name){
    this.name = name;
    return this;
  }
  
  delete_img(){
    this.img = this.img.filter(e=>e!=this.img[this.selected]);
    if(this.selected >= this.img.length) this.selected = this.img.length-1;
    if(this.selected < 0) this.selected = 0;
  }
  
  draw(){
    if(this.img.length > 0 && !this.hide){
      let p = this.selected<this.img.length?this.selected:0;
      push();
      translate(this.pos.x,this.pos.y);
      rotate(this.rot);
      image(this.img[p],
            -this.img[p].width/(2*this.size.x),
            -this.img[p].height/(2*this.size.y),
            this.img[p].width/this.size.x,
            this.img[p].height/this.size.y);
      pop();
    }
  }
}

class button{
  constructor(x,y,t){
    this.pos = {x:x,y:y};
    this.pad = {x:8,y:4,r:4};
    this.t = t;
    this.t_w = textWidth(t);
    this.f = {r:color(255),t:color(0)};
  }
  
  set_text(t){
    this.t = t;
    this.t_w = textWidth(this.t);
    return this;
  }
  
  set_pos(x,y){
    this.pos.x = x;
    this.pos.y = y;
    return this;
  }
  
  del_pos(delx,dely){
    this.pos.x += delx;
    this.pos.y += dely;
    return this;
  }
  
  set_pad(x,y,r){
    this.pad.x = x;
    this.pad.y = y;
    this.pad.r = r!=null?r:this.pad.r;
    return this;
  }
  
  set_fill(r,t){
    this.f.r = r!=null?r:this.f.r;
    this.f.t = t!=null?t:this.f.t;
    return this;
  }
  
  collided(mx,my){
    return (mx>=this.pos.x && mx<=this.pos.x+this.t_w+2*this.pad.x && my>=this.pos.y && my<=this.pos.y+14+2*this.pad.y);
  }
  
  draw(){
    push();
    noStroke();
    fill(this.f.r);
    translate(this.pos.x,this.pos.y);
    rect(0,0,this.t_w+2*this.pad.x,14+this.pad.y*2,this.pad.r);
    translate(this.pad.x,12+this.pad.y);
    fill(this.f.t);
    text(this.t,0,0);
    pop();
  }
}