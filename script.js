window.addEventListener("load", () => sinkship.init()); 
const sinkship = { 
  url: "https://www2.hs-esslingen.de/~melcher/internet-technologien/sinkship/",
  token: 0,
  responseX: "",  
  playerfield:[],
  computerfield:[], 
  placeAblePos : new Array(100).fill(-1),  
  placeAblePosCom:new Array(100).fill(-1),
  ships_size:[],
  ships_orien:[],  
  GameStart: false,
  GameFinshed: false, 
  ComputerWater: false, 
  turn: 1,
  winner: "",
  shipsNum: [1,2,3,4],  
  shipsPlaced:0,
  
  init() {
    this.ships_orien[0] = "h"
    this.ships_size[0] = 3 
    const body = document.body;
    const content = document.createElement("div");
    content.classList.add("content");
    body.appendChild(content);
    const header = this.makeHeader();
    content.appendChild(header);
    const main = this.makeMain();
    content.appendChild(main);
    const footer = this.makeFooter();
    content.appendChild(footer);    
  },

  makeHeader() {
    const header = document.createElement("header");
    const limiter = this.makeLimiter();
    const heading = document.createElement("h1");
    heading.textContent = "Sink Ship";
    const paragraph = document.createElement("p");
    paragraph.textContent = "by Jasmin Saleh";

    limiter.appendChild(heading);
    limiter.appendChild(paragraph);
    header.appendChild(limiter);

    return header;
  },

  makeMain() {
    const main = document.createElement("main");
    const limiter = this.makeLimiter();
    const div = document.createElement("div");
    div.classList.add("controls");

    const fieldsDiv = this.makeDiv("fields");
    this.playerfield = this.makeDiv("field");
    this.playerfield.id = "playerfield";
    const computerfield = this.buildMenu("field");
    computerfield.id = "computerfield";
    const controlsDiv = this.makeControls();

    this.createCells(this.playerfield);
    
    fieldsDiv.appendChild(this.playerfield);
    fieldsDiv.appendChild(computerfield);
    
    main.appendChild(limiter);
    limiter.appendChild(controlsDiv);
    limiter.appendChild(div);
    limiter.appendChild(fieldsDiv);

    return main;
  },

  makeFooter() {
    const footer = document.createElement("footer");
    const limiter = this.makeLimiter();
    const paragraph = document.createElement("p");
    paragraph.textContent = "© Jasmin Saleh";

    limiter.appendChild(paragraph);
    footer.appendChild(limiter);

    return footer;
  },

  makeLimiter() {
    const limiter = document.createElement("div");
    limiter.classList.add("limiter");
    return limiter;
  },

  makeDiv(className) {
    const div = document.createElement("div");
    div.className = className;
    return div;
  },

  createCells(playerfield) {
    const cells = [];
    for (let x = 0; x < 10; x++) {
      const row = [];
      for (let y = 0; y < 10; y++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        playerfield.appendChild(cell);  
        const clickHandler = () => {         
          const Cells = document.querySelectorAll("#playerfield .cell");
          let at = x * 10 + y;           
          if(this.removeShip(at,Cells)) {
            console.log("removed at: "+at);
          }
          else{
            this.shipPlacer(at, Cells); 
          }
          if(this.GameStart){ 
            this.startPlaying(at); 
          }                                
        }; 
        cell.clickHandler = clickHandler;  
        cell.addEventListener("click", clickHandler);
        row[y] = cell;
      }
      cells[x] = row;
    }
    return cells;
  },

removeShip(at,Cell){
  for(let i = 0; i < this.shipCoordinate.length; i++){
    for(let j = 0; j < this.shipCoordinate[i].length; j++)
    if(this.shipCoordinate[i][j] == at){
      this.updateShipNum(this.shipCoordinate[i].length);
      for(let j = 0; j < this.shipCoordinate[i].length; j++){ 
         this.updateCell(Cell[this.shipCoordinate[i][j]], this.shipCoordinate[i][j]); 
         const dx = Math.floor(this.shipCoordinate[i][j] / 10); 
         const dy = this.shipCoordinate[i][j] % 10; 
         for(let x = dx-1; x <= dx + 1; x++){
          for(let y = dy-1; y <= dy + 1; y++){
            if(x >= 0 && x < 10 && y >= 0 && y < 10 ){ 
                this.updateCell(Cell[(x*10)+y],(x*10)+y); 
            }
          }
         }
      }
      this.shipCoordinate.pop(i);
      return true;
    }
  }
  return false;
},
updateShipNum(size){
  switch(size){
    case 5: this.shipsNum[0]++; break;
    case 4: this.shipsNum[1]++; break;
    case 3: this.shipsNum[2]++; break;
    case 2: this.shipsNum[3]++; break;
  }
  this.update();
},
  
checker(ships) { 
  if(ships == 5) { if(this.shipsNum[0] > 0) {this.shipsNum[0]--; return true;} else return false; }
  if(ships == 4) { if(this.shipsNum[1] > 0) {this.shipsNum[1]--; return true;} else return false;}
  if(ships == 3) { if(this.shipsNum[2] > 0) {this.shipsNum[2]--; return true;} else return false;}
  if(ships == 2) { if(this.shipsNum[3] > 0) {this.shipsNum[3]--; return true;} else return false;}
  return false;
},
shipCoordinate:[], 
shipPlacer(at, field){
  this.shipsPlaced++;
  if(this.shipsPlaced === 10) playButton.disabled = false;
    const Cells = field;
    var xy = [];
    this.showMessage(this.ships_size[0],"blue");   
    if(this.placeAblePos[at] === 0 && this.checker(this.ships_size[0])){ 
      if(this.ships_orien[0] === "h"){
        for(let i = at, j = 0 ;  j < this.ships_size[0]; i++, j++){ 
            if( i === at ) Cells[i].classList.add("leftShip");
            if( j === this.ships_size[0]-1) Cells[i].classList.add("rightShip");
            else Cells[i].classList.add("ship");
            xy.push(i);
            this.placeAblePos[i] = this.ships_size[0]; 
        }
      }
      else{
        for(let i = at, j = 0; j < this.ships_size[0]; i = i + 10, j++){ 
          if( i === at ) Cells[i].classList.add("topShip");
          if( j === this.ships_size[0]-1) Cells[i].classList.add("bottomShip");
          else Cells[i].classList.add("ship");
          xy.push(i);
            this.placeAblePos[i] = this.ships_size[0];  
        }
      }
      this.shipSecure(Cells);
      this.update();
      this.shipCoordinate.push(xy);
      return true;
    }
    return false
}, 
shipSecure(cell) { 
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      var P = this.placeAblePos[(i * 10) + j];
      fx = P;
      if ( P > 1 && P < 6) {  
        for (let x = i - 1; x <= i + 1; x++) {          
          if (x >= 0 && x < 10) {
            for (let y = j - 1; y <= j + 1; y++) {
              if (y >= 0 && y < 10) {
                var p = this.placeAblePos[(x*10)+y] ;
                if(p !== 2 && p !== 3 && p !== 4 && p !== 5){  
                  this.placeAblePos[(x * 10) + y] = 6; 
                  cell[(x*10)+y].classList.add("usable");  
                }
              }
            }
          }
        }
      }
    }
  }  
   
},


showMessage(txt, textColor) {
  if (textSpan) {
    textSpan.textContent = txt; 
    textSpan.classList.add("text-span");
    textSpan.style.color = textColor; }
},

makeControls() {
  const div = this.makeDiv("controls");
  const buildButton = document.createElement("button");
  buildButton.textContent = "Build";
  buildButton.id = "build";
  playButton = document.createElement("button");
  playButton.textContent = "Play";
  const autoButton = document.createElement("button");
  autoButton.textContent = "Auto Place";
  textSpan = document.createElement("span");
  textSpan.textContent = "Your text goes here";
  textSpan.style.backgroundColor = "white";
  textSpan.style.display = "none" 
  playButton.disabled = true;

  div.appendChild(buildButton);
  div.appendChild(playButton);
  div.appendChild(autoButton);
  div.appendChild(textSpan); 
  buildButton.addEventListener("click", () => {
    location.reload();
  });
  
  playButton.addEventListener("click", () => {  
   // this.showMessage("Let Play the Game ", "brown"); 
    this.remote();         
    this.readyToplay();
    this.GameStart = true;
    const oldcells = document.querySelectorAll("#playerfield .cell");
    this.updateClickablity(oldcells);  
    const computerField = document.getElementById("computerfield");
    if (computerField) {
      while (computerField.firstChild) {
        computerField.firstChild.remove();
      }
    }    
    div.removeChild(buildButton);
    div.removeChild(playButton);
    div.removeChild(autoButton); 
    textSpan.style.display = "inline-block"; 
    this.createCells(computerfield);  
 
  });
  autoButton.addEventListener("click", () => { 
    const Cells = document.querySelectorAll("#playerfield .cell"); 
    for(let i = 0; i < 100; i++){
      this.placeAblePos[i] = -1; 
      Cells[i].classList.remove("usable"); 
      Cells[i].classList.remove("ship");
      Cells[i].classList.remove("water");  
      Cells[i].classList.remove("topShip");
      Cells[i].classList.remove("bottomShip");
      Cells[i].classList.remove("leftShip");
      Cells[i].classList.remove("rightShip");       
    } 
    this.update();
    this.autoPlacing(Cells); 
    autoButton.disabled = true; // Make the button unclickable
    playButton.disabled = false;
  });
  return div;
}, 

  makeTableHeader(textContent) {
  const tableHeader = document.createElement("th");
  tableHeader.textContent = textContent;
  return tableHeader;  
},

  buildMenu() {
    const div = document.createElement("div");
    div.className = "field";
    div.id = "computerfield";    
    
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tableRow = document.createElement("tr");

    tableRow.appendChild(this.makeTableHeader("Zahl"));
    tableRow.appendChild(this.makeTableHeader(""));
    tableRow.appendChild(this.makeTableHeader(""));
    tableRow.appendChild(this.makeTableHeader("Typ"));
    tableRow.appendChild(this.makeTableHeader("Grösse"));

    const tbody = document.createElement("tbody");

    const row1 = this.createTableRow(["1", "","", "Schlachtschiff", "5"], "schlachtschiff");
    const row2 = this.createTableRow(["2", "","", "Kreuzer", "4"], "kreuzer");
    const row3 = this.createTableRow(["3", "","", "Zerstörer", "3"], "zerstörer");
    const row4 = this.createTableRow(["4", "","", "U-Boot", "2"], "uboot");

  
    tbody.appendChild(row1);
    tbody.appendChild(row2);
    tbody.appendChild(row3);
    tbody.appendChild(row4);
    
    table.appendChild(thead);
    thead.appendChild(tableRow);
    table.appendChild(tbody);
    div.appendChild(table);
    
    return div;

  },
Ships:[],
Ships_Size:[],
Ships_Ori:[],
  createTableRow(cellContents, shipType) {
    const row = document.createElement("tr"); 
    cellContents.forEach((content, index) => {
      const cell = document.createElement("td");
      cell.textContent = content;
      if (index === 1 || index === 2) {
        cell.classList.add(shipType, index === 1 ? "hori" : "verti");
        // Adding the logic for the Eventhandler when clicking on the images in the table  
        cell.addEventListener("click", () => { 
          const typ = row.childNodes[3].textContent;
          const size = row.childNodes[4].textContent;
          const orientation = event.currentTarget.classList.contains("hori") ? "h" : "v";
          console.log(`Typ: ${typ}, Grösse: ${size}, Orientation: ${orientation}`);    
          this.Ships_Ori.push(orientation);
          if(this.shipsNum[5-size] !== 0)
            this.showPositions(size, orientation); 
      });       
    this.Ships_Size = [5,5,4,4,3,3,2,2];
    this.Ships.push(cell);
    }  
    row.appendChild(cell);
  });
    return row;
  },  

  
  
  showPositions(size, orientation) {
    this.ships_orien[0] = orientation;
    this.ships_size[0] = size;
    const cells = document.querySelectorAll("#playerfield .cell");
  
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cellIndex = i * 10 + j;
  
        if (this.placeAblePos[cellIndex] < 2) {
          if (orientation === 'v') {
            if (i > 10 - size) {
              cells[cellIndex].classList.add("usable");
              cells[cellIndex].classList.remove("water");
              this.placeAblePos[cellIndex] = 1; 
            } else {
              cells[cellIndex].classList.add("water");
              cells[cellIndex].classList.remove("usable");
              this.placeAblePos[cellIndex] = 0; 
            }
          } else if (orientation === 'h') {
            if (j > 10 - size) {
              cells[cellIndex].classList.add("usable");
              cells[cellIndex].classList.remove("water");
              this.placeAblePos[cellIndex] = 1; 
            } else {
              cells[cellIndex].classList.add("water");
              cells[cellIndex].classList.remove("usable");
              this.placeAblePos[cellIndex] = 0; 
            }
          }
        }
      }
    }
    for(let i = 0; i < 10; i++){
      for(let j = 0; j < 10; j++){
        let at = (i*10)+j 
        if(this.placeAblePos[at] >= 2){
           if(orientation === 'h'){
            at--
            for(let q = 1, k = j; q < size && k >= 0; q++, k--){
              if(this.placeAblePos[at] < 2){
                cells[at].classList.add("usable");
                cells[at].classList.remove("water");
                this.placeAblePos[at] = 1; 
                if(at-1 >= 0)
                  at--
              }
            }
           }
           else if(orientation === 'v'){
            at = at-10
            for(let q = 1, k = i; q < size && k >= 0; k--, q++){
              if(this.placeAblePos[at] < 2){
                cells[at].classList.add("usable"); 
                cells[at].classList.remove("water");
                this.placeAblePos[at] = 1; 
                if(at-10 >= 0)
                  at = at-10
                  else
                    break          
              }
            }
           }           
        }
      }
    }
  },
  
 update(){
  const cells = document.querySelectorAll("#playerfield .cell");
  for(let i = 0; i < 100; i ++){
    const p = this.placeAblePos[i] ;
    if(p !== 2 && p !== 3 && p !== 4 && p !== 5 &&(p === 1 || p === 0)){  
      this.updateCell(cells[i],i);
      }      
  }

  for(let i = 0; i <= this.Ships.length; i++){ 
    if (this.Ships[i] && this.Ships[i].classList && this.Ships[i+1] && this.Ships[i+1].classList) {
    if(this.Ships_Size[i] == 5) {
      if(this.shipsNum[0] == 0) {
        this.Ships[i].classList.add("usable");this.Ships[i+1].classList.add("usable");}
      else{
         this.Ships[i].classList.remove("usable"); this.Ships[i+1].classList.remove("usable");}
    }
    else if(this.Ships_Size[i] == 4) {
      if(this.shipsNum[1] == 0) {
         this.Ships[i].classList.add("usable");  this.Ships[i+1].classList.add("usable");}
      else {
        this.Ships[i].classList.remove("usable"); this.Ships[i+1].classList.remove("usable");}
    }
    else if(this.Ships_Size[i] == 3) {
      if(this.shipsNum[2] == 0) {
        this.Ships[i].classList.add("usable");  this.Ships[i+1].classList.add("usable");}
      else {
        this.Ships[i].classList.remove("usable");  this.Ships[i+1].classList.remove("usable");}
    }
    else if(this.Ships_Size[i] == 2) {
      if(this.shipsNum[3] == 0) {
        this.Ships[i].classList.add("usable");  this.Ships[i+1].classList.add("usable");}
      else {
        this.Ships[i].classList.remove("usable"); this.Ships[i+1].classList.remove("usable");}
    }
  }
}
  
},
updateCell(cell,i){
  cell.classList.add("water");      
  cell.classList.remove("ship");
  cell.classList.remove("topShip");
  cell.classList.remove("bottomShip");
  cell.classList.remove("leftShip");
  cell.classList.remove("rightShip");
  cell.classList.remove("usable"); 
  this.placeAblePos[i] = -1;     
},
readyToplay(){ 
  this.update();
  const cells = document.querySelectorAll("#playerfield .cell");
  for(let i = 0; i < 100; i ++){
    const p = this.placeAblePos[i] ;
    if(p === 6){    
      cells[i].classList.add("water");      
      cells[i].classList.remove("usable");  
      this.placeAblePos[i] = -1;     
      }      
  }
},
autoPlacing(player){      
  this.update();
  let ships = [5,4,4,3,3,3,2,2,2,2];
  let ori = ['v','h'];
  let i = 0;
  while(i < 10){ 
    this.ships_size[0] = ships[i]
    var o = Math.floor(Math.random() * 2);
    this.showPositions(this.ships_size[0], ori[o]);
    var j = Math.floor(Math.random() * 100);
    if(this.shipPlacer(j,player)){
      i++;
    } 
  }
 
},
updateClickablity(Cells){ 
  Cells.forEach(cell => {
    cell.removeEventListener("click", cell.clickHandler);
  });
},
shipHit(at, filled, turn){  
  if (filled[at].classList.contains("water")) {
    filled[at].classList.remove("water");
  } 
  if(turn === 2){
    if(this.placeAblePos[at] >= 2 && this.placeAblePos[at] <= 5){
      filled[at].classList.add("hitShip");
      this.placeAblePos[at] = -5;
      return true;
    }else { 
      filled[at].classList.add("hitWater");
      return false;
    }
  }else{ 
    if(this.placeAblePosCom[at] >= 2 && this.placeAblePosCom[at] <= 5){      
      filled[at].classList.add("hitShip");
      this.placeAblePosCom[at] = -10;
      return true;
    }    
    else{       
      filled[at].classList.add("hitWater");
      this.placeAblePosCom[at] = 1; 
      return false;   
    } 
  }
},
winnerChecker(turn){ 
  for(let i = 0; i < 100; i++){ 
    if(turn===2){
      if(this.placeAblePos[i] >= 2 && this.placeAblePos[i] <= 5) 
      {  return false; }
    }
    else{
      if(this.placeAblePos[i] >= 2 && this.placeAblePos[i] <= 5)
      {  return false;}
    }
  }
  if(turn === 2) this.winner = "Player";
  if(turn === 1) this.winner = "Computer"; 
  this.GameFinshed = true;  
    return true;
},
isContain(grid, that){
  for(let i = 0; i < grid.length; i++){
}
},

//Server Communication
async startPlaying(at) { 
  const y = at%10
  const x = (at -y)/10
  //const response = await this.fetchAndDecode("?request=shoot&x="+y+"&y="+x)
  console.log("click: x="+y+" y="+x)
  result = await this.shoot(at);
  this.readyToplay();
  // if (this.turn === 1) {
  //   if (!this.shipHit(at, fieldCom, this.turn)) {
  //         this.turn = 2;
  //         this.showMessage();
  //      }
  //  }
},
async shoot(at) {
  const filled = document.querySelectorAll("#computerfield .cell");
  const y = at%10
  const x = (at -y)/10
  const response = await this.fetchAndDecode("?request=shoot&x="+y+"&y="+x+"&token="+this.token)
  switch (response.result) {
    case 0:
      filled[at].classList.add("hitWater");
      break;
    case 1:
      filled[at].classList.add("hitShip");
      break;
    case 2:
      filled[at].classList.add("sunkShip");
      break;
    default:
      break;
  }
  this.showMessage(response.statusText);
  console.log(response)
  return response;
},
  
async remote() {
  const request = `?request=start&userid=jasait02`;
  const response = await this.fetchAndDecode(request);
  console.log(response)
  this.token = response.token;
  console.log(this.token)
  this.showMessage(response.statusText);
},

async getshotcoordinates() {
  const request_xy = "?request=getshotcoordinates&token=&token="+this.token;
  const response_xy = await this.fetchAndDecode(request_xy);
  this.showMessage(response_xy.statusText);
  return response_xy;
},

async sendingresult() {
  const request_result = "?request=sendingresult&token="+this.token+"&result="+result;
  const response_result = await this.fetchAndDecode(request_result);
  this.showMessage(response_result.statusText);
  return response_result;
},

async fetchAndDecode(request) {
  let resp 
  await fetch(`${this.url}` + `${request}`).then(async function(response){
    await response.json().then(text=> resp=text)
    }
  );
  return resp;
},

// startPlaying(at) { 
//   if(this.winnerChecker(this.turn)) 
//   {this.showMessage((this.winner+" won the Game"), "green"); return;}
//   const fieldCom = document.querySelectorAll("#computerfield .cell");
//   const fieldPly = document.querySelectorAll("#playerfield .cell");
//   if (this.turn === 1) {
//     if (!this.shipHit(at, fieldCom, this.turn)) {
//       this.turn = 2;
//       this.showMessage("It's Server's turn. I hit the water.", "red");
//     }
//   }

//   if (this.turn === 2) {
//     let still = true;

//     const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//     (async () => {
//       while (still) {
//         await delay(2000);
//         const randomAt = Math.floor(Math.random() * 100);

//         if (!this.shipHit(randomAt, fieldPly, 2)) {
//           still = false;
//           this.turn = 1;
//           this.showMessage("It's Player's turn. I hit the water.", "red");
//         } else {
//           this.showMessage("It's Server's turn. I hit the Ship.", "green");
//         }
//       }
//     })();
//   }
// },

};
