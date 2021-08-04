it('getPath returns a correct selector', () => {
    const container = document.querySelector('#container');
    expect(getPath(container)).to.equal('html > body > #container');
  });
  
it('getPath returns a unique selector', () => {
    const div = document.querySelector('.bar');
    expect(document.querySelectorAll(getPath(div)).length).to.equal(1);
});