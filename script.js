window.addEventListener("load", () => sinkship.init());

const sinkship = {
  playerfield:[],
  computerfield:[],

  init() {
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
    //this.createCells(computerfield);

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
    paragraph.textContent = "©Jasmin Saleh";

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
      row[y] = cell;
    }
    cells[x] = row;
  }
  return cells;
},

  makeControls() {
    const div = this.makeDiv("controls");
    const buildButton = document.createElement("button");
    buildButton.textContent = "Build";
    const playButton = document.createElement("button");
    playButton.textContent = "Play";

    div.appendChild(buildButton);
    div.appendChild(playButton);
    
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

  createTableRow(cellContents, shipType) {
    const row = document.createElement("tr");
    
    cellContents.forEach((content, index) => {
      const cell = document.createElement("td");
      cell.textContent = content;

      if (index === 1 || index === 2) {
        cell.classList.add(shipType, index === 1 ? "hori" : "verti");
      }

      row.appendChild(cell);
    });
    
    return row;
  },

  showPositions(Grösse, shipType) {
    this.playerfield[0][0].style.backgroundColor = "green";
    
  }


};
