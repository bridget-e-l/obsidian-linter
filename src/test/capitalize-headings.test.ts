import dedent from 'ts-dedent';
import {rulesDict} from '../rules';

describe('Capitalize Headings', () => {
  it('Ignores not words', () => {
    const before = dedent`
        # h1
        ## a c++ lan
        ## this is a sentence.
        ## I can't do this
        ## comma, comma, comma
        ## 1.1 the Header
        `;
    const after = dedent`
        # h1
        ## A c++ Lan
        ## This is a Sentence.
        ## I Can't Do This
        ## Comma, Comma, Comma
        ## 1.1 The Header
        `;
    const options = Object.assign({
      'Style': 'Title Case',
    }, rulesDict['capitalize-headings'].getDefaultOptions());
    expect(rulesDict['capitalize-headings'].apply(before, options)).toBe(after);
  });
  it('Ignores tags', () => {
    const before = dedent`
        #tag not line
        `;
    const after = dedent`
        #tag not line
        `;
    expect(rulesDict['capitalize-headings'].apply(before, {'Style': 'Title Case'})).toBe(after);
  });
  it('Can capitalize only first letter', () => {
    const before = dedent`
        # this Is A Heading
        `;
    const after = dedent`
        # This is a heading
        `;
    expect(rulesDict['capitalize-headings'].apply(before, {'Style': 'First letter'})).toBe(after);
  });
  it('Can capitalize only first letter that is a - Z', () => {
    const before = dedent`
        # 1. heading attempt
        # 1 John
        `;
    const after = dedent`
        # 1. Heading attempt
        # 1 John
        `;
    expect(rulesDict['capitalize-headings'].apply(before, {'Style': 'First letter'})).toBe(after);
  });
  it('Can capitalize to all caps', () => {
    const before = dedent`
        # this Is A Heading
        `;
    const after = dedent`
        # THIS IS A HEADING
        `;
    expect(rulesDict['capitalize-headings'].apply(before, {'Style': 'ALL CAPS'})).toBe(after);
  });
  it('Link in heading is still present with first letter capitalization rules on', () => {
    const before = dedent`
    # Heading [[docker]]
    # Heading [docker](docker)
    # Heading ![docker](docker)
    `;

    const after = dedent`
    # Heading [[docker]]
    # Heading [docker](docker)
    # Heading ![docker](docker)
    `;

    expect(rulesDict['capitalize-headings'].apply(before, {'Style': 'First letter'})).toBe(after);
  });
});
