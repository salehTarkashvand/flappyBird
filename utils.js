export function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  export function getRandomNumberBytowNumber (min , max){
    return Math.floor(Math.random()*(max - min) + min);
}


  export function DEGREE(RADIAN){
    const degree = RADIAN * Math.PI / 180
    return degree
  }