'use babel';

import AnyPointDeployer from '../lib/any-point-deployer';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('AnyPointDeployer', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('any-point-deployer');
  });

  describe('when the any-point-deployer:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.any-point-deployer')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'any-point-deployer:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.any-point-deployer')).toExist();

        let anyPointDeployerElement = workspaceElement.querySelector('.any-point-deployer');
        expect(anyPointDeployerElement).toExist();

        let anyPointDeployerPanel = atom.workspace.panelForItem(anyPointDeployerElement);
        expect(anyPointDeployerPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'any-point-deployer:toggle');
        expect(anyPointDeployerPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.any-point-deployer')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'any-point-deployer:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let anyPointDeployerElement = workspaceElement.querySelector('.any-point-deployer');
        expect(anyPointDeployerElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'any-point-deployer:toggle');
        expect(anyPointDeployerElement).not.toBeVisible();
      });
    });
  });
});
