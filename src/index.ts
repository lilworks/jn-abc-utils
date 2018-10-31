export const Params = {
  K: '',
  octaverCenter: 2,
};

export const Init = (params: any) => {
  Params.K = params.K;
  return true;
};
// eg ["C","D","E","F#","G","A","B"]
export const KeyDef = keyDef => {
  const o = [];
  keyDef.forEach(k => {
    o.push({
      enharmo: Enharmo(k),
      toneName: RootName(k),
    });
  });
  return o;
};
export const Octaver = (octave: number) => {
  if (octave - Params.octaverCenter === 0) {
    return '';
  }
  let replaceChar;
  octave - Params.octaverCenter > 0 ? (replaceChar = "'") : (replaceChar = ',');
  let s = '';
  for (let i = 0; i < Math.abs(octave - Params.octaverCenter); i++) {
    s = s + replaceChar;
  }
  return s;
};

export const Enharmo = (toneName: string) => {
  const countB = (toneName.match(/b/g) || []).length;
  const countS = (toneName.match(/#/g) || []).length;
  let replaceChar;
  let c;
  if (countB > 0) {
    c = countB;
    replaceChar = '_';
  } else if (countS > 0) {
    c = countS;
    replaceChar = '^';
  } else {
    return '';
  }
  let o = '';
  for (let i = 0; i < c; i++) {
    o = o + replaceChar;
  }
  return o;
};

export const RootName = (toneName: string) => {
  toneName = toneName.replace(new RegExp('#', 'g'), '');
  return toneName.replace(new RegExp('b', 'g'), '');
};

export const WskeyToneToAbc = (toneName: string, octave: number) => {
  return { enharmo: Enharmo(toneName), toneName: RootName(toneName), octave: Octaver(octave) };
};

export const JnToAbc = jn => {
  const s = [];
  jn.forEach(t => {
    s.push(WskeyToneToAbc(t.toneName, t.octave));
  });
  return s;
};

export const AbcSequenceElementResult = (previous: any, current: any) => {
  // first time
  if (!previous) {
    return current;
  }
  // not the first time but same value so dont change anything
  if (current.enharmo === previous.enharmo) {
    return { toneName: current.toneName, octave: current.octave, enharmo: '' };
  }

  // Value are different so enharmo must change
  if (current.enharmo !== previous.enharmo && previous.enharmo !== '=') {
    if (previous.enharmo === '' && current.enharmo !== '') {
      return { toneName: current.toneName, octave: current.octave, enharmo: current.enharmo };
    }
    if (previous.enharmo !== '' && current.enharmo === '') {
      return { toneName: current.toneName, octave: current.octave, enharmo: '=' };
    }
  } else if (previous.enharmo === '=') {
    if (current.enharmo === '') {
      return { toneName: current.toneName, octave: current.octave, enharmo: '' };
    }
    if (current.enharmo === '') {
      return { toneName: current.toneName, octave: current.octave, enharmo: current.enharmo };
    }
  }
};

export const AbcSequence = (abcs: any) => {
  const mem = [];
  const o = [];
  abcs.forEach(abc => {
    let last;
    const r = mem.filter(x => x.toneName === abc.toneName);
    if (r.length > 0) {
      last = r[r.length - 1];
    }

    o.push({
      current: abc,
      previous: last,
      result: AbcSequenceElementResult(last, abc),
    });
    mem.push(abc);
  });
  return o;
};

export const AbcArrayToString = (abcArray: any) => {
  let o = '';
  abcArray.forEach(abc => {
    o = o + abc.result.enharmo + abc.result.toneName + abc.result.octave;
  });
  return o;
};
