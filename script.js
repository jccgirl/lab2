window.addEventListener("load", () => sinkship.init());

const sinkship = {
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
    const playerfield = this.makeDiv("field");
    playerfield.id = "playerfield";
    const computerfield = this.makeDiv("field");
    computerfield.id = "computerfield";

    this.createCells(playerfield, 100);
    this.createCells(computerfield, 100);

    fieldsDiv.appendChild(playerfield);
    fieldsDiv.appendChild(computerfield);
    
    main.appendChild(limiter);
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

  createCells(field, count) {
    for (let i = 0; i < count; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      field.appendChild(cell);
    }
  }

};
