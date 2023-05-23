window.onload = function() {
    var sinkship = {
      makeLimiter: function() {
        var limiter = document.createElement("div");
        limiter.className = "limiter";
        return limiter;
      },
  
      createHeader: function() {
        var header = document.createElement("header");
        var limiter = this.makeLimiter();
        var heading = document.createElement("h1");
        heading.textContent = "Sink Ship";
        var paragraph = document.createElement("p");
        paragraph.textContent = "by Jasmin Saleh";
  
        header.appendChild(heading);
        header.appendChild(paragraph);
        document.body.appendChild(header);
        header.appendChild(limiter);
      },
  
      createMain: function() {
        var main = document.createElement("main");
        document.body.appendChild(main);
        var limiter = this.makeLimiter();
        main.appendChild(limiter);
      },
  
      createFooter: function() {
        var footer = document.createElement("footer");
        var limiter = this.makeLimiter();
        var paragraph = document.createElement("p");
        paragraph.textContent = "©Jasmin Saleh";
  
        limiter.appendChild(paragraph);
        footer.appendChild(limiter);
        document.body.appendChild(footer);
      },
    };
  
    window.addEventListener("sinkshipLoaded", function() {
      sinkship.createHeader();
      sinkship.createMain();
      sinkship.createFooter();
    });
  
    window.dispatchEvent(new Event("sinkshipLoaded"));
  };
  