//@ts-check

// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function () {
  // @ts-ignore
  const vscode = acquireVsCodeApi();

  const extVarsDefault = [];

  console.log("vscode.getState()");

  let state = vscode.getState() || {extVars: extVarsDefault};

  // if (!state.extVars) {
  //   state = {extVars: extVarsDefault};
  //   vscode.setState(state);
  // }

  showIntro(state.playgroundSelected || false);

  let extVarName = "";
  let extVarType = "string";
  let extVarValue = "";

  // /** @type {Array<{ name:string, type:string, value: string , open?: boolean}>} */

  // if (oldState.extvars) {
  //   vscode.setState(oldState.extvars);
  //   extvarsState = oldState.extvars;
  // } else {
  //   extvarsState = oldState;
  // }

  if (state.playgroundSelected) {
    updateExtVars(state.extVars);
  }

  // Setup event listener for the Add New External Variable Button

  document
    ?.getElementById("addextvar-button")
    ?.addEventListener("click", () => {
      addExtvar();
      document.getElementById("addextvar-name")?.focus();
    });

  // Setup event listeners for the Add New External Variable Form

  // document
  //   ?.getElementById("addextvar-name")
  //   ?.addEventListener("change", function (e) {
  //     console.log("wtf");

  //     // @ts-ignore
  //     extVarName = e.target?.value;

  //   });

  document
    ?.getElementById("addextvar-name")
    ?.addEventListener("input", function (e) {
      console.log("input");

      // @ts-ignore
      extVarName = e.target?.value;
      const addBtn = document?.getElementById("addextvar-add");
      if (addBtn) {
        if (extVarName) {
          // @ts-ignore
          addBtn.disabled = false;
          addBtn.style.backgroundColor = "#0077D4";
        } else {
          // @ts-ignore
          addBtn.disabled = true;
          addBtn.style.backgroundColor = "#666666";
        }
      }
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
      const panel = document.getElementById("addextvar-panel");
      if (panel) {
        panel.style.display = "none";
      }
    });

  document?.getElementById("addextvar-add")?.addEventListener("click", () => {
    if (extVarName) {
      const panel = document.getElementById("addextvar-panel");
      if (panel) {
        panel.style.display = "none";
      }
      newExtVar();
    }
  });

  // Handle messages sent from the extension to the webview
  window.addEventListener("message", (event) => {
    const message = event.data; // The json data that the extension sent
    switch (message.type) {
      case "addExtVar": {
        addExtvar();
        document.getElementById("addextvar-name")?.focus();
        vscode.setState(state);
        vscode.postMessage({type: "stateUpdated", value: state});
        break;
      }
      case "collapseAll": {
        collapseAll();
        vscode.setState(state);
        vscode.postMessage({type: "stateUpdated", value: state});
        break;
      }
      case "expandAll": {
        expandAll();
        vscode.setState(state);
        vscode.postMessage({type: "stateUpdated", value: state});
        break;
      }
      // case "reset": {
      //   console.log("reset");
      //   extvarsState = extVarsDefault;
      //   updateExtVars(extvarsState);
      //   break;
      // }

      case "set": {
        console.log("set");
        // let extvarsState = message.extVars;
        showIntro(message.playgroundSelected);
        updateExtVars(message.extVars);
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

      const ev = document.getElementById("addextvar-panel");
      if (ev) {
        ev.style.display = "none";
      }
    }
  }

  /**
   * @param {Array<{ name:string, type:string, value: string , open?: boolean} >} extVars
   */
  function updateExtVars(extVars) {
    const ul = document.getElementById("extvarUL");
    if (!ul) {
      return;
    }

    ul.textContent = "";
    for (const extVar of extVars) {
      const li = document.createElement("li");
      const i1 = document.createElement("i");
      i1.className = "chevron codicon codicon-chevron-right";
      if (extVar.open) {
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

        var result = state.extVars.find((x) => x.name === extVar.name);

        if (result) {
          var index = state.extVars.indexOf(result);
          if (index > -1) {
            state.extVars[index].open = !state.extVars[index].open;
            vscode.setState(state);
            vscode.postMessage({type: "stateUpdated", value: state});
          }
        }
      });
      li.appendChild(i1);

      const i2 = document.createElement("i");
      switch (extVar.type) {
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
      span.textContent = extVar.name;
      li.appendChild(span);

      const i3 = document.createElement("i");
      if (extVar.open) {
        i3.className = "trash codicon codicon-trash";
      } else {
        i3.className = "trash trash-hidden codicon codicon-trash";
      }

      i3.addEventListener("click", function () {
        var result = state.extVars.find((x) => x.name === extVar.name);

        if (result) {
          var index = state.extVars.indexOf(result);
          if (index > -1) {
            state.extVars.splice(index, 1);
            vscode.setState(state);
            vscode.postMessage({type: "stateUpdated", value: state});
          }
        }

        // @ts-ignore
        ul.removeChild(this.parentElement);
      });

      li.appendChild(i3);

      const nestedUl = document.createElement("ul");
      nestedUl.className = "nested";

      if (extVar.open) {
        nestedUl.classList.add("active");
      }

      const nestedLi = document.createElement("li");
      const textarea = document.createElement("textarea");
      textarea.textContent = extVar.value;
      textarea.addEventListener("change", function (e) {
        console.log("change", state.extVars);
        var result = state.extVars.find((x) => x.name === extVar.name);

        if (result) {
          var index = state.extVars.indexOf(result);
          if (index > -1) {
            // @ts-ignore
            state.extVars[index].value = e.target.value;
            vscode.setState(state);
            vscode.postMessage({type: "stateUpdated", value: state});
          }
        }
      });
      nestedLi.appendChild(textarea);
      nestedUl.appendChild(nestedLi);

      li.appendChild(nestedUl);

      ul.appendChild(li);
    }

    // Update the state
    state.extVars = extVars;
  }

  function addExtvar() {
    extVarName = "";
    extVarType = "string";
    extVarValue = "";

    // @ts-ignore
    document.getElementById("addextvar-name").value = "";
    document.getElementById("addextvar-name")?.focus();

    // @ts-ignore
    document.getElementById("addextvar-add").style.backgroundColor = "#666666";
    // @ts-ignore
    document.getElementById("addextvar-add").disabled = true;

    // @ts-ignore
    document.getElementById("addextvar-value").value = "";
    var radioButtons = document.getElementsByClassName("addextvar-radio");

    for (var i = 0; i < radioButtons.length; i++) {
      // @ts-ignore
      radioButtons[i].checked = false;
    }
    // @ts-ignore
    radioButtons[0].checked = true;

    const ev = document.getElementById("addextvar-panel");
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

    for (const extvar of state.extVars) {
      extvar.open = true;
    }
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

    for (const extvar of state.extVars) {
      extvar.open = false;
    }
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
    state.extVars.push({
      name: extVarName,
      type: extVarType,
      value: extVarValue,
    });
    updateExtVars(state.extVars);
  }
})();
