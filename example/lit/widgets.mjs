import $ from "cash-dom";
import { LitElement, html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import "./panel.mjs";

import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-json";

const cData = require("../../tokens/chords.json");

export class JSONBuilder extends LitElement {
  static properties = {
    version: { type: String },
    name: { type: String },
    jsonData: { type: String },
    tabs: { type: Object },
  };

  constructor() {
    super();
    this.version = "STARTING";
    this.name = "Somebody";
    this.jsonData = "";
    this.tabs = { one: true, two: false, three: false };
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="row gx-5">
        <p>Checkout this Chords customizer. Harmonize your text today!</p>
        <p class="version">This is v.${this.version} of the code.</p>
        <p class="name">Hello, ${this.name}!</p>
      </div>
      <div class="row gx-5">
        <div class="col-xs-12 col-sm-6">
          <div class="displayBox">
            <pre><code>${unsafeHTML(this.jsonData)}</code></pre>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6">
          <div class="buildBox">
            <nav class="nav nav-pills nav-fill tab-centered mb-3">
              <a
                href="#"
                id="baseTab"
                @click=${this.changeBaseTab}
                class="nav-link active"
                >BASE</a
              >
              <a
                href="#"
                id="chordTab"
                @click=${this.changeChordTab}
                class="nav-link"
                >CHORDS</a
              >
            </nav>

            <div id="baseCard" class="form-card">
              <div class="mainForm">
                <div class="form-group">
                  <label class="form-label" for="input-example-1">Name</label>
                  <input
                    @input=${this.changeName}
                    class="form-input"
                    type="text"
                    id="input-example-1"
                    placeholder="Name"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label" for="input-example-1">Name</label>
                  <input
                    @input=${this.changeName}
                    class="form-input"
                    type="text"
                    id="input-example-1"
                    placeholder="Name"
                  />
                </div>
                <button
                  class="btn btn-primary mt-3"
                  @click=${this.highlightChords}
                >
                  Update!
                </button>
              </div>
            </div>
            <div id="chordCard" class="form-card hidden">
              <form-panel></form-panel>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  changeBaseTab(event) {
    if ($("#baseTab").hasClass("active") !== true) {
      $(".nav-link").removeClass("active");
      $(".form-card").addClass("hidden");
      $("#baseTab").addClass("active");
      $("#baseCard").removeClass("hidden");
    } else {
      console.log("already active");
    }
  }

  changeChordTab(event) {
    if ($("#chordTab").hasClass("active") !== true) {
      $(".nav-link").removeClass("active");
      $(".form-card").addClass("hidden");
      $("#chordTab").addClass("active");
      $("#chordCard").removeClass("hidden");
    } else {
      console.log("already active");
    }
  }

  changeName(event) {
    const input = event.target;
    this.name = input.value;
  }

  highlightChords() {
    console.log(JSON.stringify(cData));
    //console.log(FORMPanel.theme);
    let baseObj = cData;
    let jString = JSON.stringify(baseObj, null, 2);
    this.jsonData = Prism.highlight(jString, Prism.languages.json, "json");
    this.requestUpdate();
  }
}
customElements.define("json-builder", JSONBuilder);
