//@ts-check

// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function () {
  // @ts-ignore
  const vscode = acquireVsCodeApi();

  const j = {
    firstName: "John",
    lastName: "Doe",
  };

  const extVarsDefault = [];

  const oldState = vscode.getState() || {extvars: extVarsDefault};

  let extVarName = "";
  let extVarType = "string";
  let extVarValue = "";

  /** @type {Array<{ name:string, type:string, value: string , open?: boolean}>} */
  let extvarsState = oldState.extvars;

  updateExtVars(extvarsState);

  // Setup event listener for the Add New External Variable Button

  document
    ?.getElementById("addextvar-button")
    ?.addEventListener("click", () => {
      addExtvar();
    });

  // Setup event listeners for the Add New External Variable Form

  document
    ?.getElementById("addextvar-name")
    ?.addEventListener("change", function (e) {
      // @ts-ignore
      extVarName = e.target?.value;
    });

  var radioButtons = document.getElementsByClassName("addextvar-radio");
  for (var i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener("change", handleRadioChange);
  }

  document
    ?.getElementById("addextvar-value")
    ?.addEventListener("change", function (e) {
      // @ts-ignore
      extVarValue = e.target.value;
    });

  document
    ?.getElementById("addextvar-cancel")
    ?.addEventListener("click", () => {
      const ev = document.getElementById("addExtvar");
      if (ev) {
        ev.style.display = "none";
      }
    });

  document?.getElementById("addextvar-add")?.addEventListener("click", () => {
    const ev = document.getElementById("addExtvar");
    if (ev) {
      ev.style.display = "none";
    }
    newExtVar();
  });

  // Handle messages sent from the extension to the webview
  window.addEventListener("message", (event) => {
    const message = event.data; // The json data that the extension sent
    switch (message.type) {
      case "addExtVar": {
        addExtvar();
        break;
      }
      case "collapseAll": {
        collapseAll();
        break;
      }
      case "expandAll": {
        expandAll();
        break;
      }
      case "reset": {
        console.log("reset");
        extvarsState = extVarsDefault;
        updateExtVars(extvarsState);
        break;
      }

      case "set": {
        console.log("set");
        extvarsState = message.extVars;
        updateExtVars(extvarsState);
        break;
      }

      case "showIntro": {
        console.log("showIntro");
        showIntro(message.value);
        break;
      }
    }
  });

  /**
   * @param {boolean} value
   */
  function showIntro(value) {
    if (value) {
      let intro = document.getElementById("intro");
      if (intro) {
        intro.style.display = "block";
      }
      let intro_def = document.getElementById("intro_default");
      if (intro_def) {
        intro_def.style.display = "none";
      }
    } else {
      let intro = document.getElementById("intro");
      if (intro) {
        intro.style.display = "none";
      }
      let intro_def = document.getElementById("intro_default");
      if (intro_def) {
        intro_def.style.display = "block";
      }
    }
  }

  /**
   * @param {Array<{ name:string, type:string, value: string , open?: boolean} >} extvars
   */
  function updateExtVars(extvars) {
    console.log("eve=", extvars);

    const ul = document.getElementById("extvarUL");
    if (!ul) {
      console.log("wtf");
      return;
    }

    console.log(extvars.length);

    ul.textContent = "";
    for (const extvar of extvars) {
      const li = document.createElement("li");
      const i1 = document.createElement("i");
      i1.className = "chevron codicon codicon-chevron-right";
      if (extvar.open) {
        i1.classList.add("chevron-down");
      }
      i1.addEventListener("click", function () {
        this?.parentElement
          ?.querySelector(".nested")
          ?.classList.toggle("active");

        this?.parentElement
          ?.querySelector(".trash")
          ?.classList.toggle("trash-hidden");
        this.classList.toggle("chevron-down");

        var result = extvarsState.find((x) => x.name === extvar.name);

        if (result) {
          var index = extvarsState.indexOf(result);
          if (index > -1) {
            extvarsState[index].open = !extvarsState[index].open;
            vscode.setState({extvars: extvarsState});
            vscode.postMessage({type: "stateUpdated", value: extvarsState});
          }
        }
      });
      li.appendChild(i1);

      const i2 = document.createElement("i");
      switch (extvar.type) {
        case "string":
          i2.className = "codicon codicon-symbol-string";
          break;
        case "json":
          i2.className = "codicon codicon-json";
          break;
        case "array":
          i2.className = "codicon codicon-symbol-array";
          break;
        case "int":
          i2.className = "codicon codicon-symbol-numeric";
          break;
        case "double":
          i2.className = "codicon codicon-symbol-numeric";
          break;
        default:
          i2.className = "codicon codicon-error";
          break;
      }
      li.appendChild(i2);

      const span = document.createElement("span");
      span.style.verticalAlign = "top";
      span.textContent = extvar.name;
      li.appendChild(span);

      const i3 = document.createElement("i");
      if (extvar.open) {
        i3.className = "trash codicon codicon-trash";
      } else {
        i3.className = "trash trash-hidden codicon codicon-trash";
      }

      i3.addEventListener("click", function () {
        var result = extvarsState.find((x) => x.name === extvar.name);

        if (result) {
          var index = extvarsState.indexOf(result);
          if (index > -1) {
            extvarsState.splice(index, 1);
            vscode.setState({extvars: extvarsState});
            vscode.postMessage({type: "stateUpdated", value: extvarsState});
          }
        }

        // @ts-ignore
        ul.removeChild(this.parentElement);
      });

      li.appendChild(i3);

      const nestedUl = document.createElement("ul");
      nestedUl.className = "nested";

      if (extvar.open) {
        nestedUl.classList.add("active");
      }

      const nestedLi = document.createElement("li");
      const textarea = document.createElement("textarea");
      textarea.textContent = extvar.value;
      textarea.addEventListener("change", function (e) {
        var result = extvarsState.find((x) => x.name === extvar.name);

        if (result) {
          var index = extvarsState.indexOf(result);
          if (index > -1) {
            // @ts-ignore
            extvarsState[index].value = e.target.value;
            vscode.setState({extvars: extvarsState});
            vscode.postMessage({type: "stateUpdated", value: extvarsState});
          }
        }
      });
      nestedLi.appendChild(textarea);
      nestedUl.appendChild(nestedLi);

      li.appendChild(nestedUl);

      ul.appendChild(li);
    }

    // Update the saved state
    vscode.setState({extvars: extvars});
    vscode.postMessage({type: "stateUpdated", value: extvars});
  }

  function addExtvar() {
    extVarName = "";
    extVarType = "string";
    extVarValue = "";

    // @ts-ignore
    document.getElementById("addextvar-name").value = "";
    // @ts-ignore
    document.getElementById("addextvar-value").value = "";
    var radioButtons = document.getElementsByClassName("addextvar-radio");

    for (var i = 0; i < radioButtons.length; i++) {
      // @ts-ignore
      radioButtons[i].checked = false;
    }
    // @ts-ignore
    radioButtons[0].checked = true;

    const ev = document.getElementById("addExtvar");
    if (ev) {
      ev.style.display = ev.style.display === "block" ? "none" : "block";
    }
  }

  function expandAll() {
    var listitems = document.getElementsByClassName("chevron");
    var j;

    for (j = 0; j < listitems.length; j++) {
      listitems[j].classList.add("chevron-down");
      listitems[j].parentElement
        ?.querySelector(".nested")
        ?.classList.add("active");
      listitems[j].parentElement
        ?.querySelector(".trash")
        ?.classList.remove("trash-hidden");
    }

    for (const extvar of extvarsState) {
      extvar.open = true;
    }
    vscode.setState({extvars: extvarsState});
    vscode.postMessage({type: "stateUpdated", value: extvarsState});
  }

  function collapseAll() {
    var listitems = document.getElementsByClassName("chevron");
    var j;

    for (j = 0; j < listitems.length; j++) {
      listitems[j].classList.remove("chevron-down");
      listitems[j].parentElement
        ?.querySelector(".nested")
        ?.classList.remove("active");
      listitems[j].parentElement
        ?.querySelector(".trash")
        ?.classList.add("trash-hidden");
    }

    for (const extvar of extvarsState) {
      extvar.open = false;
    }
    vscode.setState({extvars: extvarsState});
    vscode.postMessage({type: "stateUpdated", value: extvarsState});
  }

  function handleRadioChange(e) {
    var radioButtons = document.getElementsByClassName("addextvar-radio");

    for (var i = 0; i < radioButtons.length; i++) {
      // @ts-ignore
      radioButtons[i].checked = false;
    }
    extVarType = e.target.name;
    e.target.checked = true;
  }

  function newExtVar() {
    const nameEl = document.getElementById("addextvar-name");

    extvarsState.push({name: extVarName, type: extVarType, value: extVarValue});
    updateExtVars(extvarsState);
  }
})();
