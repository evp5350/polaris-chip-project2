import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/rpg-character/rpg-character.js";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import { RpgCharacter } from '@lrnwebcomponents/rpg-character/rpg-character.js';

export class PartyUI extends DDD {
    static get tag() {
        return "haxcms-party-ui";
    }
  
    constructor() {
        super();

        this.delete = false;
        this.changed = false;
        this.saved = false;
        this.party = localStorage.getItem("party") != null ? localStorage.getItem("party").split(",") : ["evp5350", "test1234"];
        this.selectedUser = "";
    }
  
    static get styles() {
        return [
        super.styles,
        css`
            :host {
                display: flex;
                font-family: "Press Start 2P", system-ui;
            }
            .partyList {
                background-color: var(--ddd-theme-default-beaverBlue);
                min-width: 100vh;
                height: 620px;
                padding: var(--ddd-spacing-4);
                color: white;
                overflow-y: scroll;

            }

            .title {
                font-family: system-ui;
                text-align: center;
                color: white;

            }

            .username {
                font-family: system-ui;
                margin: var(--ddd-spacing-8);
                padding: var(--ddd-spacing-8);
                
            }

            .userSlot {
                display: flex;
                margin-left: var(--ddd-spacing-4);
                
            }

            .buttonWrapper {
                display: flex;
                margin-left: 0px;
                
            }
            
            .rules {
                margin: var(--ddd-spacing-3);
                padding: var(--ddd-spacing-6);
                width: 92%;
                background-color: var(--ddd-theme-default-nittanyNavy);

            }

            .ruleText {
                font-family: system-ui;
                font-size: 12px;
                margin: 0px;
                padding: 0px;

            }

            .partyDisplay {
                text-align: left;
            }

            #partyInvite {
                font-family: system-ui;
                font-size: var(--ddd-font-size-3xs);
                font-weight: 500;
                color: blue;
                min-width: 190px;
                margin: var(--ddd-spacing-3);
                padding: var(--ddd-spacing-6);
                border: var(--ddd-border-sm);
                border-color: var(--ddd-theme-default-nittanyNavy);
                background-color: var(--ddd-theme-default-roarMaxlight);
                position: sticky;
                left: 55%;

            }

            .removeMember {
                font-family: system-ui;
                font-size: var(--ddd-font-size-3xs);
                font-weight: 500;
                color: blue;
                min-width: 150px;
                margin: var(--ddd-spacing-3);
                padding: var(--ddd-spacing-6);
                border: var(--ddd-border-sm);
                border-color: var(--ddd-theme-default-nittanyNavy);
                background-color: var(--ddd-theme-default-roarMaxlight);
                position: sticky;
                left: 90%;

            }
            
            #saveParty {
                font-family: system-ui;
                font-size: var(--ddd-font-size-3xs);
                font-weight: 500;
                color: blue;
                min-width: 190px;
                margin: var(--ddd-spacing-3);
                padding: var(--ddd-spacing-6);
                border: var(--ddd-border-sm);
                border-color: var(--ddd-theme-default-nittanyNavy);
                background-color: var(--ddd-theme-default-roarMaxlight);
                position: sticky;
                left: 90%;
                
            }

            #partyInvite:focus,
            #partyInvite:hover {
                background-color: var(--ddd-theme-default-nittanyNavy);
                color: var(--ddd-theme-default-roarMaxlight);
                transform: scale(1.1);
                transition: 0.3s ease-in-out;
            }

            .removeMember:focus,
            .removeMember:hover {
                background-color: var(--ddd-theme-default-nittanyNavy);
                color: var(--ddd-theme-default-roarMaxlight);
                transform: scale(1.1);
                transition: 0.3s ease-in-out;
            }

            #saveParty:focus,
            #saveParty:hover {
                background-color: var(--ddd-theme-default-nittanyNavy);
                color: var(--ddd-theme-default-roarMaxlight);
                transform: scale(1.1);
                transition: 0.3s ease-in-out;
            }

            #search-input {
                font-family: system-ui;
                min-width: 43%;
                margin: var(--ddd-spacing-3);
                padding: var(--ddd-spacing-6);
                background-color: var(--ddd-theme-default-slateMaxLight);
            }



          
          
        `];
    }

    
    addItem() {
        //recieve user input
        const entry = this.shadowRoot.getElementById("search-input");
        const username = entry.value.trim();

        if (username !== "") { //checks if the input is empty
            if (this.party.length < 5) { //check if the party is full
                if (/^[a-z0-9]{1,10}$/.test(username)) { //checks if the input has lowercase letters, numbers, and is under 10 characters.
                    if (!this.party.includes(username)) { //checks if the input is in the party.
                        this.party = [...this.party, username];
                        this.toggleChanged();
                        console.log(this.party);

                    } else {
                        alert("Username is already in the party.");
                    }
                } else {
                    alert("Username must contain lowercase letters, numbers, and a maximum of 10 characters only.");
                }
            } else {
                alert("The party has the maximum number of members. Please remove atleast one member to add the user.");
            }
        } else {
            alert("Text imput is empty.");
        }
    }

    toggleChanged() {
        this.changed = !this.changed; //indicates if the party has changed.
    }

    removeUser(e){
        //recieves remove member id
        const id = e.target.id;
        this.selectedUser = id;
        this.delete = true;

        const position = this.party.indexOf(this.selectedUser); //searches for the party member that is linked to the remove button id.
        let deleteRequest = "Are you sure you want to remove the member: " + this.selectedUser + "?"; //confirm alert message

        if(confirm(deleteRequest) == true){ //when OK is pressed
            this.party.splice(position, 1);
            this.selectedUser = '';
            this.deleteUserPending = false;
            console.log(localStorage.getItem("party").split(","));
            this.toggleChanged();
            this.requestUpdate();
            
        } else {
            alert("User removal canceled."); //when CANCEL is pressed
            console.log(localStorage.getItem("party").split(","));
            this.userToDelete = '';
            this.selectedUser = false;
            this.requestUpdate();
        }
        this.delete = false; 
    }

    saveData() {
        if (this.changed) { //checks if the party array has changed
            alert("Party saved!");
            const partyArray = this.party.toString();
            localStorage.setItem("party", partyArray);
            console.log(localStorage.getItem("party").split(","));
            this.saved = true;
            this.makeItRain();
            this.toggleChanged();
        } else {
            alert("No changes were made to the party or the party is empty.");
            this.toggleChanged();
        }
    }
    
    displayItem(item) {  
        if (this.saved) { //checks is the party array was changed.
            return html`<div class="userSlot"><rpg-character walking seed=${item}></rpg-character><p class="username">${item}</p><button class="removeMember" id="${item}" @click="${this.removeUser}">Remove Member</button></div>`;
        } else {
            return html`<div class="userSlot"><rpg-character seed=${item}></rpg-character><p class="username">${item}</p><button class="removeMember" id="${item}" @click="${this.removeUser}">Remove Member</button></div>`;
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

    render() {
        return html`
            <confetti-container id="confetti">
                <div class="partyList">
                    <h2 class="title">Party Creation</h2>
                    <p class="ruleText" style="font-family: comic sans ms; text-align: center;">"where we droppin?"</p>
                    <div class="rules">
                            <p class="ruleText">Input Rules:</p>
                            <p class="ruleText">- Maximum of 10 characters.</p>
                            <p class="ruleText">- Only lowercase letters and numbers.</p>
                            <p class="ruleText">- No special characters.</p>
                            <p class="ruleText">- The party can only have a maximum of 5 members.</p>
                            <p class="ruleText">- No duplicate members.</p>
                            <p></p>
                            <details><summary class="ruleText" style="color: white;">Current Array:</summary><div><p class="ruleText" style="color: white;">${this.party}</p></div></details>
                    </div>
                    
                    <div class="buttonWrapper">
                        <input id="search-input" type="text" placeholder="Add a party member."/>
                        <button id="partyInvite" @click="${this.addItem}">Invite Friend</button>
                        <button id="saveParty" @click="${this.saveData}">Save Party</button>
                        
                        <script>
                            var input = document.getElementById("search-input");
                            input.addEventListener("keypress", function(e) {
                            if (e.key === "enter") {
                                document.getElementById("partyInvite").click();
                            }
                            });
                        </script>

                    </div>

                    <div class="partyDisplay">
                        ${this.party.map((item) => this.displayItem(item))}           
                    </div>
                
                </div>

            </confetti-container>     

            `;
    }
    
   
    static get properties() {
        return {
            ...super.properties,
            delete: { type: Boolean, reflect: true },
            changed: { type: Boolean, reflect: true },
            saved: { type: Boolean, relect: true },
            party: { type: Array, reflect: true },
            selectedUser: { type: String, reflect: true },        
        };
    }
  }

globalThis.customElements.define(PartyUI.tag, PartyUI);