'use babel';

import AnyPointDeployerView from './anypoint-deployer-view';
import { CompositeDisposable } from 'atom';

export default {

  anyPointDeployerView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.anyPointDeployerView = new AnyPointDeployerView(state.anyPointDeployerViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.anyPointDeployerView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'any-point-deployer:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.anyPointDeployerView.destroy();
  },

  serialize() {
    return {
      anyPointDeployerViewState: this.anyPointDeployerView.serialize()
    };
  },

  toggle() {
    console.log('AnyPointDeployer was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
