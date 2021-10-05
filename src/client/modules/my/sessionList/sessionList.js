import { LightningElement } from 'lwc';
import { getSessions } from 'data/sessionService';
export default class SessionList extends LightningElement {
  sessionsAPI = [];
  sessionsSF = [];
  allSessions = [];

  connectedCallback() {
    getSessions('api').then((result) => {
      this.sessionsAPI = result;
      this.allSessions.push(...result);
    });
    getSessions('salesforce').then((result) => {
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

  handleSessionClick(event) {
    const navigateEvent = new CustomEvent('navigate', {
      detail: {
        state: 'details',
        sessionId: event.currentTarget.dataset.id
      }
    });
    this.dispatchEvent(navigateEvent);
  }
}
