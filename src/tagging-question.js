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

        this.answers = ["Calico Jack", "Blackbeard", "Bartholomew Roberts", "Captain Kidd"];
        this.reset = false;
        this.correct = false;
        this.incorrect = true;


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
                margin: 4px;

            }

            .promptContainer {
                background-color: white;
                width: 500px;
                height: 200px;
                border: 3px solid black;
            }

            .tagContainer {
                display: flex;
                background-color: white;
                width: 500px;
                height: 200px;
                border: 3px solid black;
            }
            
            .answerZone {
                background-color: gray;
                width: 350px;
                height: 100px;
                margin: 4px;
                padding: 4px;

            }

            .questionText {
                font-family: "system.ui";
                color: black;
                margin: 4px;
            }

            .answerText {
                font-family: "system.ui";
                color: black;
                margin: 4px;
                font-size: 12px;
            }

            .chip {
                background-color: white;
                width: 100px;
                height: 50px;
                border: 3px solid black;
                margin: 4px;
            }

            #resetChips {
                font-family: "Press Start 2P", system-ui;
                font-size: 9px;
                font-weight: 500;
                color: blue;
                min-width: 190px;
                margin: var(--ddd-spacing-3);
                padding: var(--ddd-spacing-6);
                border: var(--ddd-border-sm);
                border-color: var(--ddd-theme-default-nittanyNavy);
                background-color: var(--ddd-theme-default-roarMaxlight);

            }

            #checkAnswer {
                font-family: "Press Start 2P", system-ui;
                font-size: 9px;
                font-weight: 500;
                color: blue;
                min-width: 190px;
                margin: var(--ddd-spacing-3);
                padding: var(--ddd-spacing-6);
                border: var(--ddd-border-sm);
                border-color: var(--ddd-theme-default-nittanyNavy);
                background-color: var(--ddd-theme-default-roarMaxlight);
                
            }

            #resetChips:focus,
            #resetChips:hover {
                background-color: var(--ddd-theme-default-nittanyNavy);
                color: var(--ddd-theme-default-roarMaxlight);
                transform: scale(1.1);
                transition: 0.3s ease-in-out;
            }

            #checkAnswer:focus,
            #checkAnswer:hover {
                background-color: var(--ddd-theme-default-nittanyNavy);
                color: var(--ddd-theme-default-roarMaxlight);
                transform: scale(1.1);
                transition: 0.3s ease-in-out;
            }



          
          
        `];
    }

    chipsReset() {
        this.reset != this.reset;
        
    }

    solve() {
        this.correct != this.correct;
        

    }

    displayChips(item) {
        return html`<div class="chip" draggable="true"><p class="answerText">${item}</p></div>`;
    }

    
    makeItRain() {
        import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
            (module) => {
                setTimeout(() => {
                this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
            }, 0);
          }
        );
    }

    render() {
        return html`
            <confetti-container id="confetti">
                <div class="questionContainer">
                    <div class="promptContainer">
                        <p class="questionText">In 1718, which pirate died in battle off the coast of what is now North Carolina?</p>
                        <div class="answerZone"><p class="answerText">answer is dragged here.</p></div>
                    </div>
            
                    <div class="tagContainer">
                        ${this.answers.map((item) => this.displayChips(item))}           
                    </div>

                    <button id="resetChips" @click="${this.chipsReset}">Reset</button>
                    <button id="checkAnswer" @click="${this.solve}">check Answers</button>

                </div>
            </confetti-container>

            `;
    }
    
   
    static get properties() {
        return {
            ...super.properties,
            answers: { type: Array, reflect: true },
            correct: { type: Boolean, reflect: true },
            incorrect: { type: Boolean, reflect: true },
            reset: { type: Boolean, reflect: true },
                  
        };
    }
  }

globalThis.customElements.define(TaggingQuestion.tag, TaggingQuestion);