import chai from 'chai';
let expect = chai.expect;
import React from 'react';
import sd from 'skin-deep';
import proxyquire from 'proxyquire';
let Input = proxyquire('../Input', {
  'react-css-modules': function () { return function () {} },
  './Input.css': {}
})

describe('Input', () => {
  var input, tree, vdom;

  beforeEach(() => {
    tree = sd.shallowRender(
      <Input
        label="läjbel"
        name="test"
        pattern="[0-9]*"
        placeholder="Skriv något fint" />
    );

    vdom = tree.getRenderOutput();
    input = tree.findNode('input');
  });

  it('should render', () => {
    expect(vdom.type).to.eql('div');
  });

  it('should render a placeholder', function () {
    expect(input.props.placeholder).to.eql('Skriv något fint');
  });

  it('should render with type text', function () {
    expect(input.props.type).to.eql('text');
  });

  it('should set id to be name', () => {
    expect(input.props.id).to.eql('test');
  });

  it('should render with a label', () => {
    var label = tree.findNode('label');

    expect(label.props.children).to.eql('läjbel');
    expect(label.props.htmlFor).to.eql('test');
    expect(label.props.styleName).to.eql('label');
  });

  it('should render with provided type', function () {
    tree = sd.shallowRender(
      <Input type="tel" />
    );

    vdom = tree.getRenderOutput();
    input = tree.findNode('input');
    expect(input.props.type).to.eql('tel');
  });

  it('should render with a pattern', function () {
    expect(input.props.pattern).to.eql('[0-9]*');
  });

  it('should send styleName to input', () => {
    expect(input.props.styleName).to.eql('input');
  });
});
