import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/rpg-character/rpg-character.js";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import { RpgCharacter } from '@lrnwebcomponents/rpg-character/rpg-character.js';

/* tagdata json import */
/* import data from './tagdata.json' assert { type: 'json' };
console.log(data); */

export class TaggingQuestion extends DDD {
    static get tag() {
        return "tagging-question";
    }
  
    constructor() {
        super();
        
        /*this.temp = ['good form', 'poor taste', 'contrasting themes', 'AI', 'shading', 'original work', 'accessible'];*/
        this.answers = ["Calico Jack", "Blackbeard", "Bartholomew Roberts", "Captain Kidd"];
        this.reset = false;
        this.correct = false;
        this.image = "https://cdn.freebiesupply.com/logos/large/2x/penn-state-lions-logo-png-transparent.png";
        this.message = "This is a defualt message: Feedback will be displayed here once the your answer(s) are checked.";
        this.question = "";
        this.questionNumber = 1;

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
                height: 720px;
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

            #solutionArea {
                position: absolute;
                top: 30%;
                left: 26%;
                background-color: var(--ddd-theme-default-skyMaxLight);
                width: 200px;
                height: 75px;
                margin: var(--ddd-spacing-1);
                padding: var(--ddd-spacing-1);
                border: 2px dashed var(--ddd-theme-default-potentialMidnight);

            }

            .feedbackContainer {
                display: inline-flex;
                background-color: white;
                width: 65%;
                height: 100px;
                border: 3px solid black;
                margin: var(--ddd-spacing-2);
                padding: var(--ddd-spacing-2);
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
                position: relative;
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

            #empty {
                background-color: transparent;
                width: 110px;
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
                border: 2px dashed white;
            }

            .feedback {
                font-family: georgia;
                color: black;
                margin: 4px;
                font-size: 12px;
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
                top: 48%;
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
                background-color: var(--ddd-theme-default-futureLime);
                position: absolute;
                top: 58%;
                left: 67%;
                
            }

            #funnybutton {
                font-family: "Press Start 2P", system-ui;
                font-size: 24px;
                color: black;
                width: 100px;
                height: 50px;
                margin: var(--ddd-spacing-1);
                padding: var(--ddd-spacing-1);
                border: var(--ddd-border-sm);
                border-color: var(--ddd-theme-default-nittanyNavy);
                background-color: var(--ddd-theme-default-pughBlue);
                position: absolute;
                top: 68%;
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
            /*#div1,
            #div2 {
                width: 100px;
                height: 50px;
                padding: 10px;
                border: 1px solid #aaaaaa;
                font-family: Arial;
            } */
            .div1 {
                background-image: url('https://source.unsplash.com/random/150x150');
                position: relative;
                height: 150px;
                width: 150px;
                top: 5px;
                left: 5px;
                cursor: pointer;
                }
                .div1:hover {
                outline: 2px solid blue;
            }

            .hold1 {
                border: solid 5px #ccc;
            }

            .div2 {
                display: inline-block;
                height: 160px;
                width: 160px;
                margin: 10px;
                border: solid 3px salmon;
                background: white;
            }

            .hovered1 {
                background: #f4f4f4;
                border-style: dashed;
            }




          
          
        `];
    }

    /* dragStart() {
        dragging = this;
        this.className += ' hold';
        setTimeout(() => (this.className = 'invisible'), 0);
        
    }

    dragEnd() {
        this.className = 'fills';
    }

    dragOver(e) {
        e.preventDefualt();
    }

    dragEnter(e){
        e.preventDefualt();
        this.className += ' hovered';

    }

    dragLeave() {
        this.className = 'solutionArea';
    }

    dragDrop() {
        this.className = 'solutionArea';
        this.append(dragging);
    } */

    chipsReset() {
        this.reset != this.reset;
        
    }

    solve() {
        this.correct != this.correct;
        

    }

    displayChips(item) {
        return html`
            <div id="empty">
                <div id="fill"><p class="answerText" draggable="true" ondragstart="drag(event)">${item}</p></div>
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
            <script>
                /*allowDrop(allowdropevent) {
                    allowdropevent.target.style.color = "blue";
                    allowdropevent.preventDefault();
                }

                drag(dragevent) {
                    dragevent.dataTransfer.setData("text", dragevent.target.id);
                    dragevent.target.style.color = "green";
                }

                drop(dropevent) {
                    dropevent.preventDefault();
                    const data = dropevent.dataTransfer.getData("text");
                    dropevent.target.appendChild(document.getElementById(data));
                    document.getElementById("drag").style.color = "black";


                }*/

                const div1s = document.querySelectorAll('.div1');
                const div2s = document.querySelectorAll('.div2');
                var dragging = {};
                // Loop through empty boxes and add listeners
                for (const div2 of div2s) {
                    div2.addEventListener('dragover', dragOver);
                    div2.addEventListener('dragenter', dragEnter);
                    div2.addEventListener('dragleave', dragLeave);
                    div2.addEventListener('drop', dragDrop);
                }
                // Loop through fills and add listeners
                for (const div1 of div1s) {
                    div1.addEventListener('dragstart', dragStart);
                    div1.addEventListener('dragend', dragEnd);
                }

                // Drag Functions
                function dragStart() {
                    dragging = this;
                    this.className += ' hold1';
                    setTimeout(() => (this.className = 'invisible'), 0);
                }

                function dragEnd() {
                    this.className = 'div1';
                }

                function dragOver(e) {
                    e.preventDefault();
                }

                function dragEnter(e) {
                    e.preventDefault();
                    this.className += ' hovered2';
                }

                function dragLeave() {
                    this.className = 'div2';
                }

                function dragDrop() {
                    this.className = 'div2';
                    this.append(dragging);
                }
            </script>
            <!-- <div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)">
                <span id="drag" draggable="true" ondragstart="drag(event)"
                    >drag me to the other box</span
            >
            </div>
            <div id="div2" ondrop="drop(event)" ondragover="allowDrop(event)"></div> -->
            <!--
            <div>
            <div class="div2">
                <div class="div1" draggable="true"> </div>
            </div>

            <div class="div2">
                <div class="div1" draggable="true"> </div>
            </div>

            <div class="div2">
            </div>

            <div class="div2">
            </div>

            <div class="div2">
            </div>
            </div>
            -->
            <confetti-container id="confetti">
                <div class="questionContainer">
                    <div class="solutionContainer">
                        <img class="image" src="${this.image}" alt=""></img>
                        <div class="promptContainer">
                            <slot><p class="questionText">${this.question}</p></slot>
                        </div>
                        
                        <div id="solutionArea" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
                    </div>

            
                    <div class="tagContainer">
                        ${this.answers.map((item) => this.displayChips(item))}

                    </div>

                    <div class="buttonContainer">
                        <button id="resetChips" @click="${this.chipsReset}">Reset</button>
                        <button id="checkAnswer" @click="${this.solve}">Check Answers</button>
                        <button id="funnybutton" @click="${this.makeItRain}">🎉</button>
                    </div>

                    <div class="feedbackContainer">
                        <p class="feedback">${this.message}</p>
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
            questionNumber: { type: Number },
                  
        };
    }
  }

globalThis.customElements.define(TaggingQuestion.tag, TaggingQuestion);