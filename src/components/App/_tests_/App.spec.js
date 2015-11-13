import chai from 'chai';
let expect = chai.expect;
import React from 'react';
import sd from 'skin-deep';
import proxyquire from 'proxyquire';
let File, { App } = proxyquire('../App', {
  'react-css-modules': function () { return function () {} },
  './App.css': {}
})

describe('App', () => {
  var tree, vdom;

  beforeEach(() => {
    tree = sd.shallowRender(
      <App />
    );

    vdom = tree.getRenderOutput();
  });

  it('should render', () => {
    expect(vdom.type).to.eql('div');
  });
});
