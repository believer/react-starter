import chai from 'chai';
let expect = chai.expect;
import React from 'react';
import sd from 'skin-deep';
import proxyquire from 'proxyquire';
let Button = proxyquire('../Button', {
  'react-css-modules': function () { return function () {} },
  './Button.css': {}
})

describe('Button', () => {
  var tree, vdom;

  beforeEach(() => {
    tree = sd.shallowRender(
      <Button text="Skicka" />
    );

    vdom = tree.getRenderOutput();
  });

  it('should render', () => {
    expect(vdom.type).to.eql('button');
  });

  it('should render with type submit', function () {
    expect(vdom.props.type).to.eql('submit');
  });

  it('should render with provided type', function () {
    tree = sd.shallowRender(
      <Button type="button" />
    );

    vdom = tree.getRenderOutput();

    expect(vdom.props.type).to.eql('button');
  });

  it('should render correct styleName', () => {
    expect(vdom.props.styleName).to.eql('button');
  });

  it('should render a text', function () {
    expect(vdom.props.children).to.eql('Skicka');
  });
});
