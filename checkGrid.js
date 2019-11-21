class Candy{
    colors;
    constructor(colors){
        this.color = colors[Math.floor(Math.random()*3)];
        this.type = 'normal';
    }
    colors = ['R','G','B'];
}

//returns an array of coordinates to delete
function checkGrid(arr){   
    let removeCandyArr = [];
    var vdict = {}; var hcount = 0; var hArr = []; let colorMarker = "";
   //iterate through 2d matrix
    for(let i = 0;i<arr.length;i++){
        for(let k = 0;k<arr.length;k++){
            //console.log(hArr); 

            //if dict doesnt exist, put in first entry
            // dict = { 
            //    '0' : ['G', 2, [[0,0], [1,0]]
            // }
            //checking for horizontal 3 in a row
            if(arr[i][k].color != colorMarker){
                if(hcount >= 3){
                    for(let j = 0;j<hArr.length;j++){
                        removeCandyArr.push(hArr[j]);
                    }
                }
                hArr = [];
                hArr.push([i,k]);
                hcount = 1;
                colorMarker = arr[i][k].color;
            }
            else{
                hArr.push([i,k]);
                hcount+=1;
            }
            //check for vertical 3 or more using hashmap w/ array
            //uses k index as key and 1st index of value is letter, 2nd is count, 3rd is array of coordinates
            if(typeof vdict[k] == "undefined"){
                vdict[k] = [];
                vdict[k][0] = arr[i][k].color;
                vdict[k][1] = 1;
                vdict[k][2] = [[i,k]];
            }
            else{
                if(vdict[k][0] == arr[i][k].color){
                    vdict[k][1] +=1;
                    vdict[k][2].push([i,k]);
                }
                else{
                    if(vdict[k][1] >= 3){
                        for(let j = 0; j< vdict[k][2].length;j++){
                            removeCandyArr.push(vdict[k][2][j]);
                        }
                    }
                    vdict[k][0] = arr[i][k].color;
                    vdict[k][1] = 1;
                    vdict[k][2] = [[i,k]];
                }
            }
        }
        if(hcount >= 3){
            for(let j = 0;j <hArr.length;j++){
                removeCandyArr.push(hArr[j]);
            }
        }
        colorMarker = "";
        hArr = [];
        hcount = 0;
    }
    //another checker after finish iterating through 2d matrix. final checker to see if last element creates 3 or more in a vertical row
    for(let i = 0;i<arr.length;i++){
        if(vdict[i][1] >= 3){
            for(let j = 0; j< vdict[i][2].length;j++){
                removeCandyArr.push(vdict[i][2][j]);
            }
        }
    }
    //final checker to see if last element makes a 3 or more in a horizontal row
    if (hcount >=3 ){
        for(let j = 0; j<hArr.length;j++){
            removeCandyArr.push(hArr[j]);
        }
    }
    return removeCandyArr;
}

function localCheck(arr, direction, x, y, sum, color) {
    var up = 0;
    var down = 0;
    var left = 0;
    var right = 0;
    var success = false;
    
    if(direction == 0) {
        up = localCheck(arr, 1, x, (y+1), 0, arr[x][y].color);
        down = localCheck(arr, 2, x, (y-1), 0, arr[x][y].color);
        left = localCheck(arr, 3, (x-1), y, 0, arr[x][y].color);
        right = localCheck(arr, 4, (x+1), y, 0, arr[x][y].color);

    }else if(direction == 1) {
        
        if(y < arr.length) {
            
            if(arr[x][y].color == color){
                
                sum += 1;
                return localCheck(arr, 1, x, (y+1), sum, arr[x][y].color);
            
            }else {
                return sum;
            }
        }else {
            return sum;
        }
        
    }else if(direction == 2){
        if(y >= 0) {
            
            if(arr[x][y].color == color){
                
                sum += 1;
                return localCheck(arr, 2, x, (y-1), sum, arr[x][y].color);
            
            }else {
                return sum;
            }
            
        }else {
            return sum;
        }
    }else if(direction == 3){
        if(x >= 0) {
            
            if(arr[x][y].color == color){
                
                sum += 1;
                return localCheck(arr, 3, (x-1), y, sum, arr[x][y].color);
            
            }else {
                return sum;
            }
            
        }else {
            return sum;
        }
        
    }else if(direction == 4){
        if(x < arr.length) {
            
            if(arr[x][y].color == color){
                
                sum += 1;
                return localCheck(arr, 4, (x+1), y, sum, arr[x][y].color);
            
            }else {
                return sum;
            }
            
        }else {
            return sum;
        }
        
    }

        if((up+down) >= 2) {
            for(var i = 0; i <= up; i++) {
                arr[x][y + i].color = "N";
            }
            for(var i = 0; i <= down; i++) {
                arr[x][y - i].color = "N";
            }
            success = true;
        }
        if((left + right) >= 2) {
            for(var i = 0; i <= left; i++) {
                arr[x - i][y].color = "N";
            }
            for(var i = 0; i <= right; i++) {
                arr[x + i][y].color = "N";
                success = true;
            }
        }

    
    if(success == true) {
        return 1;
    }
    return 0;
    
}

function swap(x1, y1, x2, y2, arr) {
    
    if(Math.abs(x1-x2) != 1 && Math.abs(y1-y2) != 1){
        
        console.log("failed")
        return;
        
    }
    
    var a = arr[x1][y1];
    var b = arr[x2][y2];
    arr[x1][y1] = b;
    arr[x2][y2] = a;
    var success = localCheck(arr, 0, x1, y1, 0, arr[x1][y1].color);
    var success2 = localCheck(arr, 0, x2, y2, 0, arr[x2][y2].color);
    
    
    if((success == 0) && (success2 == 0)) {
        a = arr[x1][y1];
        b = arr[x2][y2];
        arr[x1][y1] = b;
        arr[x2][y2] = a;
    }
    
}

//returns an array with 'E' marked candies to delete 
function removeCandy(arr, removeCandyArr){
    // let set = new Set(removeCandyArr.map(JSON.stringify));
    // let newRemoveCandyArr = Array.from(set).map(JSON.parse);
    let newRemoveCandyArr = removeCandyArr;

    //take in 2d matrix and arr of coordinates to replace value with 'E'
    for(let i =0;i <newRemoveCandyArr.length;i++){
        arr[newRemoveCandyArr[i][0]][newRemoveCandyArr[i][1]].color = 'E';
    }
    return arr;
}

///returns an array that has shifted and replaced candies 
function shiftCandy(arr){
    let temporary = 0;
    //loop through 2d matrix from bottom right to top left
    for(let i = arr.length-1;i >=0;i--){
        for(let k = arr.length-1;k>=0;k--){
            //iterate through 2dmatrix, if you find an 'E' colored candy:
            let temp = i;
            let mark = i;
            while((arr[temp][k].color == 'E') && (temp-1>=0)){
                //if u find a colored candy above E, swap them
                if(arr[temp-1][k].color != 'E'){
                    //couldnt swap for some reason so just decided to swap colors
                    arr[mark][k].color = arr[temp-1][k].color;
                    arr[temp-1][k].color = 'E';
                    break;
                }
                //if u find another E on top, keep going up
                else{
                    temp--;
                }
            }
            //if you made it all the way up to the top, make the whole row random candies
            if(temp <= 0){
                for(let j = mark; j>=0;j--){
                    arr[j][k] = new Candy(colors);
                }
            }
            else{
                for(let j = 0; j<arr.length;j++){
                    if(arr[0][j].color == 'E'){
                        arr[0][j] = new Candy(colors);
                    }  
                }
            }
              
        }
    }
    return arr;
}
function output2DMatrix(arr){
    //print 2d matrix line by line
    let str = "";
    for(let i = 0;i <arr.length;i++){
        for(let k =0;k<arr.length;k++){
            str = str + " " +arr[i][k].color;
        }
        console.log(str );
        str = "";
    }
}
function createMatrix(length){
    let grid = [...Array(length)].map(x=>Array(length))  
    for(let i = 0;i<length;i++){
        for(let k =0;k<length;k++){
            grid[i][k] = new Candy(colors);
        }
    }       
    return grid
}

let test = new createMatrix(8)
output2DMatrix(test);
console.log(checkGrid(test));

console.log("---------------")

let removeCandyArray = removeCandy(test, checkGrid(test));
output2DMatrix(removeCandyArray);
console.log("---------------")

let output = shiftCandy(removeCandyArray); 
output2DMatrix(output);

//console.log(checkGrid(test));

// console.log("---------------")



let tester = 
[['G','B','R'],
 ['G','R','B'],
 ['G','R','B']]

 let tester2 = 
[['B','B','B'],
 ['G','R','G'],
 ['G','R','B']]
 let tester3 = 
[['G','R','B'],
 ['G','R','B'],
 ['G','R','B']]
 let tester4 = 
[['G','B','R'],
 ['R','R','R'],
 ['G','R','B']]
 let tester5 = 
[['B','B','B'],
 ['G','R','B'],
 ['G','R','B']]
 let tester6 = 
[['G','B','R'],
 ['B','R','B'],
 ['G','R','B']]
 let tester7 = 
[['G','G','G'],
 ['R','R','R'],
 ['B','B','B']]