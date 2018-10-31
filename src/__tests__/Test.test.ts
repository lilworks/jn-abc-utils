
import { Octaver } from '../index';
import { Enharmo } from '../index';
import { WskeyToneToAbc } from '../index';
import { JnToAbc } from '../index';
import { AbcSequence } from '../index';
import { AbcSequenceElementResult } from '../index';
import { AbcArrayToString } from '../index';
import { Init } from '../index';
import { Params  } from '../index';
import { KeyDef  } from '../index';


var jnInBars = [
    {toneList:[]},
    {toneList:[]}
]


var wskeyTone1 = {name:"F#",octave:4}
var wskeyTone2 = {name:"Bbb",octave:3}

var testJnInput = [
  {octave:3,toneName:"F"},
  {octave:1,toneName:"G"},
  {octave:2,toneName:"F"},
  {octave:2,toneName:"Bb"},
  {octave:2,toneName:"D"},

]
var testJnInputR = [
  {octave:"'",toneName:"F",enharmo:""},
  {octave:",",toneName:"G",enharmo:""},
  {octave:"",toneName:"F",enharmo:""},
  {octave:"",toneName:"B",enharmo:"_"},
  {octave:"",toneName:"D",enharmo:""}
]
test('My test', () => {
  expect(Enharmo("C")).toBe(""),
  expect(Enharmo("Gb")).toBe("_"),
  expect(Octaver(2)).toBe(""),
  expect(Octaver(1)).toBe(","),
  expect(Octaver(5)).toBe("'''")
  ;
});
test('My test Init', () => {
  expect(Init({K:"E"})).toBe(true),
  expect(Params.K).toBe("E")
  ;
});




var testAbcSequence = [
  {octave:",",toneName:"F",enharmo:""},
  {octave:"",toneName:"F",enharmo:"_"},
  {octave:"",toneName:"F",enharmo:""},
  {octave:"",toneName:"G",enharmo:"_"}
]
var testAbcSequenceR = [
  {
    previous:undefined,
    current:{octave:",",toneName:"F",enharmo:""},
    result:{octave:",",toneName:"F",enharmo:""}
  },
  {
    previous:{octave:",",toneName:"F",enharmo:""},
    current:{octave:"",toneName:"F",enharmo:"_"},
    result:{octave:"",toneName:"F",enharmo:"_"}
  },
  {
    previous:{octave:"",toneName:"F",enharmo:"_"},
    current:{octave:"",toneName:"F",enharmo:""},
    result:{octave:"",toneName:"F",enharmo:"="}
  },
  {
    previous:undefined,
    current:{octave:"",toneName:"G",enharmo:"_"},
    result:{octave:"",toneName:"G",enharmo:"_"}
  }
]
var testAbcSequenceRR = "F,_F=F_G"
test('My AbcSequenceElementResult', () => {
  expect(AbcSequence(testAbcSequence)).toEqual(testAbcSequenceR);
});
test('My AbcSequenceElementResult', () => {
  expect(AbcArrayToString(testAbcSequenceR)).toBe(testAbcSequenceRR);
});


var abcSequenceElementResult = [
  {toneName:"C",enharmo:""},
  {toneName:"D",enharmo:""},
  {toneName:"E",enharmo:"_"},
  {toneName:"F",enharmo:""},
  {toneName:"G",enharmo:""},
  {toneName:"A",enharmo:""},
  {toneName:"B",enharmo:"_"}
]
test('My AbcSequenceElementResult', () => {
  expect(KeyDef(["C","D","Eb","F","G","A","Bb"])).toEqual(abcSequenceElementResult);
});
