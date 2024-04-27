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
        
        this.answers = "defualt";
        this.image = "https://cdn.freebiesupply.com/logos/large/2x/penn-state-lions-logo-png-transparent.png";
        this.message = "This is a defualt message: Feedback will be displayed here once the your answer(s) are checked.";
        this.question = "";
        this.currentTag;
        this.checked = false;
        this.dataSheet = new URL('../src/tagdata.json', import.meta.url).href;
        this.zoomToggle = true;

        
        const statusDetails = localStorage.getItem('zoomStatus');
        if (statusDetails === '+') {
            this.style.setProperty('--details-vision','0');
            
        }
        

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
                min-width: 175vh;
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
            #dropTagHint {
                display: flex;
                font-family: Georgia;
                justify-content: center;
                align-items: center;
                opacity: 50%;
                color: var(--ddd-theme-default-beaverBlue);
                font-weight: bold;
                pointer-events: none;
                user-select: none;
                margin: var(--ddd-spacing-3);
                padding: var(--ddd-spacing-3);
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

            #tagContainer {
                display: flex;
                background-color: var(--ddd-theme-default-navy80);
                width: 65%;
                height: 200px;
                border: 3px solid black;
                margin: var(--ddd-spacing-2);
                padding: var(--ddd-spacing-2);
                overflow-y: scroll;
                
            }
            #panel {
                display: flex;
                margin-left: 0px;
                
            }

            #solutionArea {
                background-color: var(--ddd-theme-default-skyMaxLight);
                width: 95.5%;
                height: 75px;
                margin: var(--ddd-spacing-2);
                padding: var(--ddd-spacing-2);
                border: 3px dashed var(--ddd-theme-default-potentialMidnight);
                overflow-y: scroll;

            }

            #feedbackContainer {
                display: flex;
                background-color: white;
                width: 65%;
                height: 100px;
                border: 3px solid black;
                margin: var(--ddd-spacing-2);
                padding: var(--ddd-spacing-2);
                overflow-y: scroll;
                align-content: left;
                
            }

            
            .questionText {
                font-family: georgia;
                color: white;
                margin: 4px;
            }

            .chip {
                background-color: var(--ddd-theme-default-beaverBlue);
                width: 100px;
                height: 50px;
                border: 3px solid black;
                margin: var(--ddd-spacing-1);
                padding: var(--ddd-spacing-1);
                cursor: pointer;
                color: white;
                font-family: georgia;
            }
            
            .chip:hover {
                border: 3px solid blue;
            }


            .image {
                width: 300px;
                height: 300px;
                position: absolute;
                top: 3%;
                left: 75%;
                border: 2px dashed white;
            }

            #feedback {
                display: flex;
                font-family: georgia;
                color: black;
                margin: 4px;
                font-size: 12px;
                flex-direction: column;
            }

            #panel #resetChips {
                font-family: georgia;
                font-size: 12px;
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
                font-weight: bold;

            }

            #panel #checkAnswer {
                font-family: georgia;
                font-size: 12px;
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
                font-weight: bold;
                
            }

            #funnybutton {
                font-family: georgia;
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
                font-weight: bold;
            }

            #zoomButton {
                height: 30px;
                width: 30px;
                background-color: var(--ddd-theme-default-navy60);
                font-family: georgia;
                position: absolute;
                top: 4%;
                left: 91.5%;
                margin: var(--ddd-spacing-0);
                padding: var(--ddd-spacing-0);
                align-content: center;
                border: 1px solid white;
                
                

            }

            #panel #resetChips:focus,
            #panel #resetChips:hover {
                background-color: red;
                color: var(--ddd-theme-default-roarMaxlight);
                transform: scale(1.1);
                transition: 0.3s ease-in-out;
            }

            #panel #checkAnswer:focus,
            #panel #checkAnswer:hover {
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

            #zoomButton:focus,
            #zoomButton:hover {
                background-color: var(--ddd-theme-default-navy40);
                color: var(--ddd-theme-default-roarMaxlight);
                transform: scale(1.1);
                transition: 0.3s ease-in-out;
            }

            .correct {
                border: solid 1px var(--correct-col);
                color: var(--correct-col);
                background: var(--bg);
            }
            .correct:nth-child(n):focus, .correct:nth-child(n):hover {
                background: var(--correct-col);
                color: var(--bg);
            }

            .incorrect {
                border: solid 1px var(--incorrect-col);
                color: var(--incorrect-col);
                background: var(--bg-color);
            }
            .incorrect:nth-child(n):focus, .incorrect:nth-child(n):hover {
                background: var(--incorrect-col);
                color: var(--bg-color);
            }

            .disabled {
                opacity: 50% !important;
                pointer-events: none !important;
                user-select: none !important;
                background-color: var(--bg-color) !important;
                color: var(--text-1) !important;
            }

            .noPointerEvents {
                pointer-events: none;
                user-select: none;
            }


            .zoomedImgContainer {
                position: absolute;
                top: 8%;
                left: 8%;
                background-color: black;
                min-width: 85%;
                height: 85%;
                padding: var(--ddd-spacing-0);
                margin: var(--ddd-spacing-0);
                opacity: var(--details-vision, 0);
                
            }

            .zoomedImg {
                position: relative;
                top: 5%;
                left: 16%;
                opacity: var(--details-vision, 0);
                height: 90%;
                width: 70%;
                padding: var(--ddd-spacing-0);
                margin: var(--ddd-spacing-0);
            }


          
        `];
    }

    connectedCallback() {
        super.connectedCallback();
    
        const answers = this.answers;
    
        fetch(this.dataSheet)
          .then((response) => response.json())
          .then((json) => {
            const tags = this.shadowRoot.getElementById('tagContainer');
            const entries = json[answers];
    
            const buttons = [];
            for (const key in entries) {
              const option = entries[key];
              const button = document.createElement('button');
              button.classList.add('chip');
              button.draggable = true;
              button.textContent = key;
              button.dataset.correct = option.correct;
              button.dataset.feedback = option.feedback;
              button.addEventListener('dragstart', this.handleDragStart.bind(this));
              buttons.push(button);
            }

            for (let i = buttons.length - 1; i > 0; i--) {
              const x = Math.floor(Math.random() * (i + 1));
              [buttons[i], buttons[x]] = [buttons[x], buttons[i]];
            }
    
            buttons.forEach(button => {
              tags.appendChild(button);
            });
        });
    
        const slottedImage = this.querySelector('img');
        if(slottedImage) {
          this.image = slottedImage.src;
        }

        const slotPara = this.querySelector('p');
        if(slotPara) {
          this.question = slotPara.innerText;
        }
    
    }

    handleDragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.textContent);
        this.currentTag = event.target;
    }

    handleDragOver(event) {
        event.preventDefualt();
    }

    droppedClicked (event){
        this.currentTag = event.target;
        if(this.checked === false) {
            const solutions = this.shadowRoot.getElementById('solutionArea');
            const tags = this.shadowRoot.getElementById('tagContainer');

            if (this.currentTag.classList.contains('chip')) {
                this.currentTag.remove();
                tags.append(this.currentTag);

                if (solutions.querySelectorAll('.chip').length === 0) {
                    this.shadowRoot.querySelector('#dropTagHint').style.display = 'flex';

                    const controlBtns = this.shadowRoot.querySelectorAll('.controlBtn');
                    controlBtns.forEach(btn => {
                        btn.style.visibility = 'hidden';
                    });
                }
            }
        }
    }

    handleDrop(event) {
        event.preventDefualt();
        const solutions = this.shadowRoot.getElementById('solutionArea');
        const button = this.currentTag;

        if (button && this.checked === false) {
            button.remove();
            solutions.appendChild(button);

            this.shadowRoot.querySelector('#dropTagHint').style.display = 'none';
            const controlBtns = this.shadow.querySelectorAll('controlBtn');
            controlBtns.forEach(btn => {
                btn.style.visibility = 'visible';
            });
        }
    }

    handleDragStartReverse(event) {
        event.dataTransfer.setData('text/plain', event.target.textContent);
        this.currentTag = event.target;
    }

    handleDragOverReverse(event) {
        event.prevenDefualt();
    }

    bankedClicked(event) {
        this.currentTag = event.target;
        if(this.checked === false) {
            const solutions = this.shadowRoot.getElementById('solutionArea');

            if(this.currentTag.classList.contains('chip')) {
                this.currentTag.remove();
                solutions.append(this.currentTag);

                this.shadowRoot.querySelector('#dropTagHint').style.display = 'none';

                const controlBtns = this.shadowRoot.querySelectorAll('.controlBtn');
                controlBtns.forEach(btn => {
                    btn.style.visibility = 'visible';
                }); 
            }
        }
    }

    handleDropReverse(event) {
        event.preventDefualt();
        const solutions = this.shadowRoot.getElementById('solutionArea');
        const tags = this.shadowRoot.getElementById('tagContainer');
        const button = this.currentTag;

        if(button && this.checked === false) {
            button.remove();
            tags.appendChild(button);

            if(solutions.querySelectorAll('.chip').length === 0) {
                this.shadowRoot.querySelector('#dropTagHint').style.display = 'flex';

                const controlBtns = this.shadowRoot.querySelectorAll('controlBtn');
                controlBtns.forEach(btn => {
                    btn.style.visibility = 'hidden';
                });
            }
        }
    }

    chipsReset() {
        this.checked = false;

        this.shadowRoot.querySelector('#checkAnswer').classList.remove('disabled');

        this.shadowRoot.querySelector('#feedback').style.display = 'flex';
        this.shadowRoot.querySelector('#feedback').innerHTML = `<p id="feedback">${this.message}</p>`;

        const solutions = this.shadowRoot.getElementById('solutionArea');
        const tags = this.shadowRoot.getElementById('tagContainer');
        const shifter = Array.from(solutions.children).filter(ans => ans.id !== 'dropTagHint');

        shifter.forEach(sol => {
            tags.appendChild(sol);
            sol.classList.remove("correct");
            sol.classList.remove("incorrect");
            sol.title = "";

            this.shadowRoot.querySelector('#feedback').innerHTML = `<p id="feedback">${this.message}</p>`;
        });

        const droppedSolutions = this.shadowRoot.querySelectorAll('#solutionArea .chip');
            for (const tag of droppedSolutions) {
                tag.classList.remove("noPointerEvents");
                tag.removeAttribute('tabindex');
            }

        const droppedTags = this.shadowRoot.querySelectorAll('#tagContainer .chip');
            for (const tag of droppedTags) {
                tag.classList.remove("noPointerEvents");
                tag.removeAttribute('tabindex');
            }

        const buttons = Array.from(tags.children);
            for (let i = buttons.length - 1; i > 0; i--) {
                const x = Math.floor(Math.random() * (i + 1));
                tags.insertBefore(buttons[x], buttons[i]);
            }

        this.shadowRoot.querySelector('#dropTagHint').style.display = 'flex';

        const controlBtns = this.shadowRoot.querySelectorAll('.controlBtn');
        controlBtns.forEach(btn => {
            btn.style.visibility = 'hidden';
        })
        
    }

    solve() {
        if(this.checked == false){
            this.checked = true;

            let allSolutionsCorrect = true;
            let allTagsCorrect = true;

            this.shadowRoot.querySelector('#checkAnswer').classList.add('disabled');

            this.shadowRoot.querySelector('#feedback').style.display = '';
            this.shadowRoot.querySelector('#feedback').innerHTML = ``;

            const solutions = this.shadowRoot.querySelectorAll('#solutionArea .chip');
            for (const tag of solutions) {
                const isCorrect = tag.dataset.correct === 'true';
                if(isCorrect) {
                    tag.classList.add("correct");

                    this.shadowRoot.querySelector('#feedback').innerHTML += `<li style="color: green;">${tag.dataset.feedback}</li>`;
                } else {
                    tag.classList.add("incorrect");
                    allSolutionsCorrect = false;
                    tag.title = tag.dataset.feedback;

                    this.shadowRoot.querySelector('#feedback').innerHTML += `<li style="color: red;">${tag.dataset.feedback}</li>`;
                }
                tag.classList.add("noPointerEvents");
                tag.setAttribute('tabindex', -1);
            }
            
            const tags = this.shadowRoot.querySelectorAll('#tagContainer .chip');
            for (const tag of tags){
                const isCorrect = tag.dataset.correct === 'true';
                if(isCorrect) {
                    allTagsCorrect = false;
                }
                tag.classList.add("noPointerEvents");
                tag.setAttribute('tabindex', -1);
            }

            if (allSolutionsCorrect && allTagsCorrect) {
                this.makeItRain();

                this.shadowRoot.querySelector('#feedback').innerHTML = ``;
                const tags = this.shadowRoot.querySelectorAll('#solutionArea .chip');
                for (const tag of tags){
                    allTagsCorrect = false;
                    tag.title = tag.dataset.feedback;

                    this.shadowRoot.querySelector('#feedback').innerHTML += `<li style="color: green;">${tag.dataset.feedback}</li>`;
                }
            }
        }
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

    funnyButton() {
        alert("Funny Button!!! 🎉🎉🎉");
        import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
            (module) => {
                setTimeout(() => {
                this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
            }, 0);
          }
        );
    }

    toggleZoom() {
        this.zoomToggle = !this.zoomToggle;

        if(!this.zoomToggle) {
            
            this.style.setProperty('--details-vision','1');
            
        } else {
            this.style.removeProperty('--details-vision');
            localStorage.removeItem('zoomStatus');
            
        }
    }

    render() {
        return html`
            <confetti-container id="confetti">
                <div class="questionContainer">
                    <div class="solutionContainer">
                            <img class="image" src="${this.image}" alt=""></img>
                            
                            <button id="zoomButton" @click="${this.toggleZoom}">
                                ${this.zoomToggle ? '+' : '-'}
                            </button>

                        <div class="promptContainer">
                            <p class="questionText">${this.question}</p>
                        </div>
                        
                        <div id="solutionArea" @click=${this.droppedClicked} @dragover=${this.handleDragOver} @drop=${this.handleDrop}>
                            <div id="dropTagHint">---- Solution Area ----</div>
                        </div>
                    </div>
            
                    <div id="tagContainer" @click=${this.bankedClicked} @dragover=${this.handleDragOverReverse} @drop=${this.handleDropReverse}>    
                        
                    </div>

                    <div id="panel">
                        <button id="resetChips" @click="${this.chipsReset}">Reset</button>
                        <button id="checkAnswer" @click="${this.solve}">Check Answers</button>
                        <button id="funnybutton" @click="${this.funnyButton}">🎉</button>
                    </div>

                    <div id="feedbackContainer">
                        <li id="feedback">${this.message}</li>
                        ${Array.from(this.shadowRoot.querySelectorAll('#solutionArea .chip')).map(tag => {
                            const isCorrect = tag.dataset.correct === 'true';
                            return html`
                            <li>
                                <span class="chip ${isCorrect ? 'correct' : 'incorrect'}">${tag.textContent}</span>
                                ${isCorrect ? html`<span class="chip" style="color: green;">CORRECT: ${tag.dataset.feedback}</span>` : html`<span class="chip" style="color: red;">INCORRECT: ${tag.dataset.feedback}</span>`}
                            </li>
                            `;
                        })}
                    </div>

                    <div class="zoomedImgContainer">
                        <img class="zoomedImg" src="${this.image}" alt=""></img>

                    </div>

                </div>
            </confetti-container>
            
            `;
    }
    
   
    static get properties() {
        return {
            ...super.properties,
            answers: { type: String },
            image: { type: String },
            question: { type: String },
                  
        };
    }
  }

globalThis.customElements.define(TaggingQuestion.tag, TaggingQuestion);