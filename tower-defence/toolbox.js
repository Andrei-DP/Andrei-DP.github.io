function collides(object1, object2) {
  var obj1 = {};
  obj1.left = object1.x - object1.width/2;
  obj1.right = object1.x + object1.width/2;
  obj1.top = object1.y - object1.height/2;
  obj1.bottom = object1.y + object1.height/2;
  var obj2 = {};
  obj2.left = object2.x - object2.width/2;
  obj2.right = object2.x + object2.width/2;
  obj2.top = object2.y - object2.height/2;
  obj2.bottom = object2.y + object2.height/2;

  if(obj1.left > obj2.right || obj1.right < obj2.left || obj1.top > obj2.bottom || obj1.bottom < obj2.top) {
    return false;
  }
    return true;
}
