import ChessLogic from "CHESSLOGIC/game-logic";
import game from "CHESSLOGIC/game-instance";

const template = document.createElement("template");
      template.innerHTML =`<style>
      :host {
  display: flex;
  flex-direction: column; }

h2 {
  margin: 0px;
  margin-bottom: 20px; }

h3 {
  margin: 0px;
  margin-bottom: 20px; }
  h3 .versus-label {
    display: none; }

.tabs-links-container {
  display: flex; }
  .tabs-links-container h3 {
    margin: 0px;
    margin-bottom: 20px;
    margin-left: 20px; }
    .tabs-links-container h3:first-child {
      margin-left: 0px; }
    .tabs-links-container h3 a[data-active=true] {
      color: #000; }

.tab {
  display: none; }

.user {
  text-transform: uppercase; }

.join-color-selector-container,
.join-game-selector-container,
.create-color-selector-container,
.create-username-selector-container {
  margin-bottom: 20px; }

.color-selector-container select {
  background-color: #fff;
  width: 170px; }

.list-of-games {
  display: flex;
  width: 200px;
  flex-direction: column; }

      </style>
      
    <h2><span class="id-partida-label">Id Partida: </span><span class="id-partida"></span></h2>
    <h3><span class="user"></span><span class="versus-label"> vs </span><span class="user"></span></h3>
    <div class="tabs-links-container">
      <h3><a href="createGame" class="create-game" data-active="true">Crear Partida</a></h3>
      <h3><a href="joinGame" class="join-game" data-active="false">Unir-se Partida</a></h3>
    </div>
    <div class="create-game-container tab">
      <div class="create-username-selector-container">
        <input type="text" id="createUsername" placeholder="Escriu nom de usuari" />
        <button id="createSetUsername"> Escollir Username</button>
      </div>
      <div class="create-color-selector-container">
        <select id="createColorSelector" disabled>
          <option value="">Escull una opció</option>
          <option value="1">Blanques</option>
          <option value="-1">Negres</option>
        </select>
        <button id="createSetColor" disabled> Escollir Color</button>
      </div>
      <div class="game-selector-container">
        <input type="text" id="createIdPartida" disabled />
        <button id="createInitPartida" disabled> Iniciar Partida</button>
      </div>
    </div>
    <div class="join-game-container tab">
      <div class="join-game-selector-container">
        <input type="text" id="joinIdPartida" disabled />
        <button id="joinSearchPartides"> Buscar partides</button>
        <div class="list-of-games"></div>
      </div>
      <div class="join-color-selector-container">
        <input type="text" id="joinColor" placeholder="Jugaras amb aquest color" disabled />   
      </div>
      <div class="join-username-selector-container">
        <input type="text" id="joinUsername" placeholder="Escriu nom de usuari" disabled />
        <button id="joinSetUsername" disabled> Escollir username</button>
      </div>
    </div>


  `;
class GameList extends HTMLElement {
  constructor() {
    super();
    this.chessLogic = new ChessLogic();
    this.createSubscribe = {};
    this.joinSubscribe = {};
    this.createGameConfig = {};
    this.joinGameConfig = {};
    this.bindUsernamEvent = {};
    this.bindSetColorEvent = {};
    this.bindInitPartidaEvent = {};
    this.bindTabClick = {};
    this.bindJoinSearchPartidesEvent = {};
    this.bindJoinSetUsernameEvent = {};
    this.listGamesLinks = [];
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  userNameEvent() {
    console.log(this);
    const val = this.shadowRoot.querySelector("#createUsername").value;
    if (val !== "") {
      this.tabLinksRemoveEvents();
      this.createGameConfig.username = val;
      this.shadowRoot.querySelector("#createUsername").disabled = true;
      this.shadowRoot.querySelector("#createSetUsername").disabled = true;
      this.shadowRoot.querySelector("#createColorSelector").disabled = false;
      this.shadowRoot.querySelector("#createSetColor").disabled = false;
    }
  }
  setColorEvent() {
    const val = this.shadowRoot.querySelector("#createColorSelector").value;
    if (val != "") {
      this.createGameConfig.usercolor = val;
      this.shadowRoot.querySelector("#createColorSelector").disabled = true;
      this.shadowRoot.querySelector("#createSetColor").disabled = true;
      this.shadowRoot.querySelector("#createInitPartida").disabled = false;
    }
  }
  async initPartidaEvent() {
    const val = this.shadowRoot.querySelector("#createIdPartida").value;
    if (val === "") {
      let docRef = {};
      const data = {
        user: []
      };
      data.user.push(this.createGameConfig);
      docRef = await this.chessLogic.createGame(data);
      this.writeUsernameTitle(data);
      this.chessLogic.idGame = docRef.id;
      this.shadowRoot.querySelector("h2 .id-partida").innerHTML = this.chessLogic.idGame;
      this.shadowRoot.querySelector("#createInitPartida").disabled = true;
      this.tabLinksRemoveEvents();
      this.shadowRoot.querySelector("#createIdPartida").value = this.chessLogic.idGame;
      game.set("idGame", this.chessLogic.idGame);
      this.connectGame();
    }/* else {
      this.chessLogic.idGame = val;
      await this.chessLogic.updateGame(val, this.gameConfig);
    }*/

    //this.shadowRoot.querySelector(".list-of-games").style.display = "none";

    /*const movementStatus = await this.chessLogic.getMovementStatus();
    console.log(movementStatus.data())
    const gameData = movementStatus.data();
    const dataMovementStatus = gameData["movement-status"] + 1;
    gameData["movement-status"] = dataMovementStatus;
    const res = await this.chessLogic.updateGameData(gameData);
    console.log(res);
    const event = new CustomEvent("movement-status-changed", {
      "detail": {
        "movement-status": dataMovementStatus
      }
    });
    document.dispatchEvent(event);*/
  }
  createGame() {
    console.log("ENTRO EN EVENTS")
    this.bindUsernamEvent = this.userNameEvent.bind(this);
    this.bindSetColorEvent = this.setColorEvent.bind(this);
    this.bindInitPartidaEvent = this.initPartidaEvent.bind(this);
    this.shadowRoot.querySelector("#createSetUsername").addEventListener("click", this.bindUsernamEvent);
    this.shadowRoot.querySelector("#createSetColor").addEventListener("click", this.bindSetColorEvent);
    this.shadowRoot.querySelector("#createInitPartida").addEventListener("click", this.bindInitPartidaEvent);
  }
  createGameRemoveEvents() {
    console.log("ENTRO EN REMOVE EVENTS")
    this.shadowRoot.querySelector("#createSetUsername").removeEventListener("click", this.bindUsernamEvent, false);
    this.shadowRoot.querySelector("#createSetColor").removeEventListener("click", this.bindSetColorEvent, false);
    this.shadowRoot.querySelector("#createInitPartida").removeEventListener("click", this.bindInitPartidaEvent, false);
    //this.createSubscribe();
  }
  async joinSetUsernameEvent(){
    this.joinGameConfig.username = this.shadowRoot.querySelector("#joinUsername").value;
    this.shadowRoot.querySelector("#joinUsername").disabled = true;
    await this.chessLogic.updateGame(this.chessLogic.idGame, this.joinGameConfig);
  }
  removeListGamesEvent(){
    this.shadowRoot.querySelectorAll(".list-of-games a").forEach((listLink, i) => {
      listLink.removeEventListener("click", this.listGamesLinks[i], false);
    });
    this.shadowRoot.querySelector(".list-of-games").style.display = "none";
  }
  joinSearchPartidesEvent(){
    this.tabLinksRemoveEvents();
    const ref = this.chessLogic.listAllGames();
    this.joinSubscribe = ref.onSnapshot(async () => {
      const data = await ref.get();
      this.shadowRoot.querySelector(".list-of-games").innerHTML = "";
      data.forEach((doc) => {
        const gameData = doc.data();
        const link = document.createElement("A");
        link.setAttribute("href", "#");
        link.innerHTML = doc.id;
        this.shadowRoot.querySelector(".list-of-games").appendChild(link);
        const linkClickEvent=(e) => {
          e.preventDefault();
          this.shadowRoot.querySelector("#joinIdPartida").value = doc.id;
          this.chessLogic.idGame = doc.id;
          if (gameData.user[0].usercolor === 1){
            this.shadowRoot.querySelector("#joinColor").value = "Negres";
            this.joinGameConfig.usercolor = -1;
          } else {
            this.shadowRoot.querySelector("#joinColor").value = "Blanques";
            this.joinGameConfig.usercolor = 1;
          }
          this.shadowRoot.querySelector(".list-of-games").style.display = "none";
          this.removeListGamesEvent();
          this.shadowRoot.querySelector("#joinUsername").disabled = false;
          this.shadowRoot.querySelector("#joinSetUsername").disabled = false;
          this.shadowRoot.querySelector("#joinSearchPartides").disabled = true;
          this.bindJoinSetUsernameEvent = this.joinSetUsernameEvent.bind(this);
          this.shadowRoot.querySelector("h2 .id-partida").innerHTML = this.chessLogic.idGame;
          this.shadowRoot.querySelector("#joinSetUsername").addEventListener("click", this.bindJoinSetUsernameEvent);
          this.joinSubscribe();
          this.connectGame();
        }
        this.listGamesLinks.push(linkClickEvent);
        link.addEventListener("click", linkClickEvent);
      });
    });
  }

  joinGame() {
    this.bindJoinSearchPartidesEvent = this.joinSearchPartidesEvent.bind(this);
    this.shadowRoot.querySelector("#joinSearchPartides").addEventListener("click", this.bindJoinSearchPartidesEvent);
  }
  joinGameRemoveEvents() {
    //this.shadowRoot.querySelector("#joinSetUsername").removeEventListener("click", this.bindJoinSetUsernameEvent, false);
    this.shadowRoot.querySelector("#joinSearchPartides").removeEventListener("click", this.bindJoinSearchPartidesEvent, false);
    //this.removeListGamesEvent();
  }
  tabLinksRemoveEvents(){
    this.shadowRoot.querySelectorAll(".tabs-links-container h3 a").forEach(tabLink => {
      tabLink.removeEventListener("click", this.bindTabClick, false);
      tabLink.setAttribute("href","#");
    });
  }

  writeUsernameTitle(gameData) {
    this.shadowRoot.querySelectorAll("h2 .user").forEach((span, i) => {
      if (i < gameData.user.length) {
        span.innerHTML = gameData.user[i].username;
      }
    })
  }
  tabClick(e) {
    const target = e.target;
    const selectedTabLink = this.shadowRoot.querySelector(".tabs-links-container h3 a[data-active=true]");
    const activeLink = this.shadowRoot.querySelector(".tabs-links-container h3 a[data-active=true]");
    console.log(target)
    e.preventDefault();
    this.shadowRoot.querySelector("."+selectedTabLink.className + "-container").style.display="none";
    this.shadowRoot.querySelector("."+target.className + "-container").style.display="block";
    this[activeLink.getAttribute("href") + "RemoveEvents"]();
    activeLink.setAttribute("data-active", "false");
    target.setAttribute("data-active", "true");
    this[target.getAttribute("href")]();
  }
  tabs() {
    this.bindTabClick=(e)=>{
      this.tabClick(e);
    }
    const activeLink = this.shadowRoot.querySelector(".tabs-links-container h3 a[data-active=true]");
    this.shadowRoot.querySelectorAll(".tabs-links-container h3 a").forEach(tabLink => {
      tabLink.addEventListener("click", this.bindTabClick);
      if (tabLink.getAttribute("data-active") === "true") {
        console.log(tabLink.className);
        this.shadowRoot.querySelector("." + tabLink.className + "-container").style.display = "block";
      }
    })
    this[activeLink.getAttribute("href")]();
  }
  async connectGame() {
    const ref = this.chessLogic.listAllGames();
    const refDoc = ref.doc(this.chessLogic.idGame);
    this.createSubscribe = refDoc.onSnapshot((doc) => {
      const data = doc.data();
      this.shadowRoot.querySelectorAll("h3 .user").forEach((u,i)=>{
        let color = "Blanques - ";
        if (i < data.user.length){
          if (data.user[i].usercolor==="-1"){
            color = "Negres - ";
          }
          u.innerHTML = color + data.user[i].username;
        }
      });
      this.shadowRoot.querySelector("h3 .versus-label").style.display = "inline";
    });
  }

  connectedCallback() {
    this.tabs();
  }
}
customElements.define('game-list', GameList);
