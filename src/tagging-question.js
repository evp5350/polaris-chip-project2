import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/rpg-character/rpg-character.js";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import { RpgCharacter } from '@lrnwebcomponents/rpg-character/rpg-character.js';

export class TaggingQuestion extends DDD {
    static get tag() {
        return "tagging-question";
    }
  
    constructor() {
        super();

    }
  
    static get styles() {
        return [
        super.styles,
        css`
            :host {
                display: flex;
                font-family: "Press Start 2P", system-ui;
            }

            .questionContainer {
                background-color: var(--ddd-theme-default-beaverBlue);
                min-width: 100vh;
                height: 620px;
                padding: var(--ddd-spacing-4);
                color: white;
                border: 3px solid black;

            }

            .promptContainer {
                background-color: white;
                width: 100px;
                height: 200px;
                border: 3px solid black;
            }

            .tagContainer {
                background-color: white;
                width: 100px;
                height: 200px;
                border: 3px solid black;
            }

            .questionText {
                font-family: "system.ui";
                color: black;
            }

            .answerText {
                font-family: "system.ui";
                color: black;
            }



          
          
        `];
    }

    render() {
        return html`
             <div class="questionContainer">
                <div class="tagContainer">
                </div>

                <div class="promptContainer">
                    <p class="questionText">What's nine plus 10?</p>
                </div>

             </div>

            `;
    }
    
   
    static get properties() {
        return {
            ...super.properties,
                  
        };
    }
  }

globalThis.customElements.define(TaggingQuestion.tag, TaggingQuestion);