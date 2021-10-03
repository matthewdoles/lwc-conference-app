import { LightningElement } from 'lwc';
import { getSessionsAPI, getSessionsSF } from 'data/sessionService';
export default class SessionList extends LightningElement {
  sessionsAPI = [];
  sessionsSF = [];
  allSessions = [];

  connectedCallback() {
    getSessionsAPI().then((result) => {
      this.sessionsAPI = result;
      this.allSessions.push(...result);
    });
    getSessionsSF().then((result) => {
      this.sessionsSF = result;
      this.allSessions.push(...result);
    });
  }

  handleSearchKeyInput(event) {
    const searchKey = event.target.value.toLowerCase();
    this.sessionsAPI = this.allSessions.filter((session) =>
      session.name.toLowerCase().includes(searchKey)
    );
    this.sessionsSF = this.allSessions.filter((session) =>
      session.name.toLowerCase().includes(searchKey)
    );
  }

  handleSessionClickAPI(event) {
    const index = event.currentTarget.dataset.index;
    const navigateEvent = new CustomEvent('navigate', {
      detail: {
        state: 'details',
        sessionId: this.sessionsAPI[index].id
      }
    });
    this.dispatchEvent(navigateEvent);
  }

  handleSessionClickSF(event) {
    const navigateEvent = new CustomEvent('navigate', {
      detail: {
        state: 'details',
        sessionId: event.currentTarget.dataset.id
      }
    });
    this.dispatchEvent(navigateEvent);
  }
}
