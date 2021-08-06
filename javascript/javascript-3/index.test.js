it('getPath returns correct selector', () => {
    const container = document.querySelector('#container');
    expect(getPath(container)).to.equal('body > #container');
  });
  
it('getPath returns unique selector', () => {
    const div = document.querySelector('.bar');
    expect(document.querySelectorAll(getPath(div)).length).to.equal(1);
});

it('getPath returns correct nth child', () => {
  const div = document.querySelector('.bar');
  expect(getPath(div)).to.equal('body > #container > div:nth-child(2) > div:nth-child(2)');
});