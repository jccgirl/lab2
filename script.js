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
    div.textContent = "Tessstttt";

    limiter.appendChild(div);
    main.appendChild(limiter);

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
};
