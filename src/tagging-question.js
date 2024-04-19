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
        this.image = "https://cdn.freebiesupply.com/logos/large/2x/penn-state-lions-logo-png-transparent.png";
        this.message = "----";
        this.question = "";

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
                position: relative;
                background-color: var(--ddd-theme-default-potentialMidnight);
                min-width: 150vh;
                height: 620px;
                padding: var(--ddd-spacing-4);
                color: white;
                border: 3px solid black;
                margin: var(--ddd-spacing-1);
                padding: var(--ddd-spacing-1);
                overflow-y: scroll;

            }

            .solutionContainer {
                background-color: var(--ddd-theme-default-beaverBlue);
                width: 65%;
                height: 300px;
                border: 3px solid black;
                margin: var(--ddd-spacing-2);
                padding: var(--ddd-spacing-2);
            }

            .promptContainer {
                background-color: var(--ddd-theme-default-nittanyNavy);
                width: 95.5%;
                height: 150px;
                border: 3px solid black;
                margin: var(--ddd-spacing-2);
                padding: var(--ddd-spacing-2);
                overflow-y: auto;
            }

            .tagContainer {
                display: inline-flex;
                background-color: var(--ddd-theme-default-navy80);
                width: 65%;
                height: 200px;
                border: 3px solid black;
                margin: var(--ddd-spacing-2);
                padding: var(--ddd-spacing-2);
                overflow-y: scroll;
                
            }
            .buttonContainer {
                display: flex;
                margin-left: 0px;
                
            }

            .solutionArea {
                position: absolute;
                top: 35%;
                left: 26%;
                background-color: var(--ddd-theme-default-skyMaxLight);
                width: 200px;
                height: 75px;
                margin: var(--ddd-spacing-1);
                padding: var(--ddd-spacing-1);
                border: 5px dashed var(--ddd-theme-default-potentialMidnight);

            }

            
            .questionText {
                font-family: georgia;
                color: white;
                margin: 4px;
            }

            .answerText {
                font-family: georgia;
                color: white;
                margin: 8px;
                padding: 8px;
                font-size: 12px;
                text-align: center; 
                
            }

            #fill {
                display: inline-block;
                background-color: var(--ddd-theme-default-beaverBlue);
                width: 100px;
                height: 50px;
                border: 3px solid black;
                margin: var(--ddd-spacing-0);
                padding: var(--ddd-spacing-0);
                cursor: pointer;
            }
            
            #fill:hover {
                border: 3px solid blue;
            }

            .hold {
                border: solid 5px #ccc;
            }

            .empty {
                background-color: gray;
                width: auto;
                height: 65px;
                margin: var(--ddd-spacing-4);
                padding: var(--ddd-spacing-0);

            }


            .hovered {
                background: #f4f4f4;
                border-style: dashed;
            }


            .image {
                width: 300px;
                height: 300px;
                position: absolute;
                top: 3%;
                left: 73%;
            }

            .feedback {
                font-family: "system.ui";
                color: black;
                margin: 4px;
                font-size: 12px;
                text-align: center;
            }

            #resetChips {
                font-family: "Press Start 2P", system-ui;
                font-size: 9px;
                color: black;
                width: 100px;
                height: 50px;
                margin: var(--ddd-spacing-1);
                padding: var(--ddd-spacing-1);
                border: var(--ddd-border-sm);
                border-color: var(--ddd-theme-default-nittanyNavy);
                background-color: var(--ddd-theme-default-keystoneYellow);
                position: absolute;
                top: 54%;
                left: 67%;

            }

            #checkAnswer {
                font-family: "Press Start 2P", system-ui;
                font-size: 9px;
                color: black;
                width: 100px;
                height: 50px;
                margin: var(--ddd-spacing-1);
                padding: var(--ddd-spacing-1);
                border: var(--ddd-border-sm);
                border-color: var(--ddd-theme-default-nittanyNavy);
                background-color: var(--ddd-theme-default-pughBlue);
                position: absolute;
                top: 63%;
                left: 67%;
                
            }

            #funnybutton {
                font-family: "Press Start 2P", system-ui;
                font-size: 15px;
                color: black;
                width: 100px;
                height: 50px;
                margin: var(--ddd-spacing-1);
                padding: var(--ddd-spacing-1);
                border: var(--ddd-border-sm);
                border-color: var(--ddd-theme-default-nittanyNavy);
                background-color: var(--ddd-theme-default-futureLime);
                position: absolute;
                top: 73%;
                left: 67%;
            }

            #resetChips:focus,
            #resetChips:hover {
                background-color: red;
                color: var(--ddd-theme-default-roarMaxlight);
                transform: scale(1.1);
                transition: 0.3s ease-in-out;
            }

            #checkAnswer:focus,
            #checkAnswer:hover {
                background-color: green;
                color: var(--ddd-theme-default-roarMaxlight);
                transform: scale(1.1);
                transition: 0.3s ease-in-out;
            }

            #funnybutton:focus,
            #funnybutton:hover {
                background-color: var(--ddd-theme-default-nittanyNavy);
                color: var(--ddd-theme-default-roarMaxlight);
                transform: scale(1.1);
                transition: 0.3s ease-in-out;
            }



          
          
        `];
    }

    /*dragStart() {
        dragging = this;
        this.className += ' hold';
        setTimeout(() => (this.className = 'invisible'), 0);
        
    }

    dragEnd() {
        this.className = 'fill';
    }

    dragOver(e) {
        e.preventDefualt();
    }

    dragEnter(e){
        e.preventDefualt();
        this.className += ' hovered';

    }

    dragLeave() {
        this.className = 'empty';
    }

    dragDrop() {
        this.className = 'empty';
        this.append(dragging);
    } */

    allowDrop(e) {
        e.preventDefualt();
    }

    dragStart(e) {
        e.dataTransfer.setData("text", e.target.id);
    }

    dragDrop(e){
        e.preventDefualt();
        var data = e.dataTransfer.getData("text");
        e.target.appendChild(document.getElementById(data));
    }
    

    chipsReset() {
        this.reset != this.reset;
        
    }

    solve() {
        this.correct != this.correct;
        

    }

    displayChips(item) {
        return html`
            <div class="empty" style= "background-color: transparent;" ondrop="dragDrop(e)" ondragover="allowDrop(e)">
                <div id="fill" draggable="true" ondragstart="dragStart(e)"><p class="answerText">${item}</p></div>
            </div>
        `;
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
                <script>
                    /*const fills = document.querySelectorAll('.fill');
                    const empties = document.querySelectorAll('.empty');
                    var dragging = {};

                    for (const empty of empties) {
                        empty.addEventListener('dragover', dragOver);
                        empty.addEventListener('dragenter', dragEnter);
                        empty.addEventListener('dragleave', dragLeave);
                        empty.addEventListener('drop', dragDrop);
                    }

                    for (const fill of fills) {
                        fill.addEventListener('dragstart', dragStart);
                        fill.addEventListener('dragend', dragEnd);
                    }*/



                </script>

                <div class="questionContainer">
                    <div class="solutionContainer">
                        <img class="image" src="${this.image}" alt=""></img>
                        <div class="promptContainer">
                            <p class="questionText">${this.question}</p>
                        </div>
                        <p class="feedback">${this.message}</p>
                        <div class="solutionArea" ondrop="dragDrop(e)" ondragover="allowDrop(e)"></div>
                    </div>

            
                    <div class="tagContainer">
                        ${this.answers.map((item) => this.displayChips(item))}

                    </div>

                    <div class="buttonContainer">
                        <button id="resetChips" @click="${this.chipsReset}">Reset</button>
                        <button id="checkAnswer" @click="${this.solve}">Check Answers</button>
                        <button id="funnybutton" @click="${this.makeItRain}">🎉</button>
                    </div>

                </div>
            </confetti-container>

            `;
    }
    
   
    static get properties() {
        return {
            ...super.properties,
            answers: { type: Array, reflect: true },
            correct: { type: Boolean, reflect: true },
            reset: { type: Boolean, reflect: true },
            image: { type: String },
            question: { type: String },
                  
        };
    }
  }

globalThis.customElements.define(TaggingQuestion.tag, TaggingQuestion);