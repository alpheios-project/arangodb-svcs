const query = require('@arangodb').query;

const words = module.context.collection('words');
const lemmas = module.context.collection('lemmas');
const hasLemma = module.context.collection('hasLemma');
const lemmaVariants = module.context.collection('isLemmaVariant');
const assertsTrue = module.context.collection('assertsTrue');
const assertsFalse = module.context.collection('assertsFalse');
const inflections = module.context.collection('inflections');
const inflectionsOf = module.context.collection('canBeInflectionOf');

const findLemmasForWord = (word) => {
  const result = query`
    FOR tgtWord in ${words}
    FILTER tgtWord.representation == ${word.representation} && tgtWord.lang == ${word.lang}
      FOR v,e,p in 1..1 OUTBOUND tgtWord._id ${hasLemma}
      LET assertions = (
        FOR v2, e2, p2 in 1..1 INBOUND e._id ${assertsTrue}
        FILTER e2.isPublic == true
        RETURN e2
      )
      FILTER length(assertions) > 0
      FOR assertion in assertions
        RETURN { subject: document(e._from), predicate: 'hasLemma', object: document(e._to), authorities: assertions[*]._from, qualifiers: {} }
  `.toArray();
  return result;
};

const findLemmaNegations = (word,lemma) => {
  const result = query`
    FOR tgtWord in ${words}
    FILTER tgtWord.representation == ${word.representation} && tgtWord.lang == ${word.lang}
      FOR v,e,p in 1..1 OUTBOUND tgtWord._id ${hasLemma}
      FILTER v.representation == ${lemma.representation} && v.lang == ${lemma.lang} && v.pos == ${lemma.pos} && v.principalParts == ${lemma.principalParts}
      LET assertions = (
        FOR v2, e2, p2 in 1..1 INBOUND e._id ${assertsFalse}
        FILTER e2.isPublic == true
        RETURN e2
      )
      FILTER length(assertions) > 0
      FOR assertion in assertions
        RETURN { subject: document(e._to), predicate: 'isNotLemmaOf', object: document(e._from), authorities: assertions[*]._from, qualifiers: {} }
  `.toArray();
  return result;
}


const findAllInflections = (lemma) => {
  const result = query`
    FOR tgtLemma in ${lemmas}
    FILTER tgtLemma.representation == ${lemma.representation} && tgtLemma.lang == ${lemma.lang} && tgtLemma.pos == ${lemma.pos} && tgtLemma.principalParts == ${lemma.principalParts}
      FOR v,e,p in 1..1 INBOUND tgtLemma._id ${inflectionsOf}
      LET assertions = (
        FOR v2, e2, p2 in 1..1 INBOUND e._id ${assertsTrue}
        FILTER e2.isPublic == true
        RETURN e2
      )
      FILTER length(assertions) > 0
      FOR assertion in assertions
        RETURN { subject: document(e._to), predicate: 'hasInflection', object: document(e._from), authorities: assertions[*]._from, qualifiers: {} }
  `.toArray();
  return result;

}

const findAllLemmaVariants = (lemma) => {
  const result = query`
    FOR tgtLemma in ${lemmas}
    FILTER tgtLemma.representation == ${lemma.representation} && tgtLemma.lang == ${lemma.lang} && tgtLemma.pos == ${lemma.pos} && tgtLemma.principalParts == ${lemma.principalParts}
      FOR v,e,p in 1..1 ANY tgtLemma._id ${lemmaVariants}
      LET assertions = (
        FOR v2, e2, p2 in 1..1 INBOUND e._id ${assertsTrue}
        FILTER e2.isPublic == true
        RETURN e2
      )
      FILTER length(assertions) > 0
      FOR assertion in assertions
        RETURN { subject: document(e._to), predicate: 'isLemmaVariant', object: document(e._from), authorities: assertions[*]._from, qualifiers: { prefer: e.prefer } }
  `.toArray()
  return result;
};

const findSpecificLemmaVariant = (lemma,variantLemma) => {
  const result = query`
    FOR tgtLemma IN ${lemmas}
    FILTER tgtLemma.representation == ${lemma.representation} && tgtLemma.lang == ${lemma.lang} && tgtLemma.pos == ${lemma.pos} && tgtLemma.principalParts == ${lemma.principalParts}
      FOR v,e,p in 1..1 INBOUND tgtLemma._id ${lemmaVariants}
      FILTER v.representation == ${variantLemma.representation} && v.lang == ${variantLemma.lang} && v.pos == ${variantLemma.pos} && v.principalParts == ${variantLemma.principalParts}
      RETURN e
  `.toArray();
  return result;
};

module.exports = {
  findLemmasForWord: findLemmasForWord,
  findSpecificLemmaVariant: findSpecificLemmaVariant,
  findAllLemmaVariants: findAllLemmaVariants,
  findAllInflections: findAllInflections,
  findLemmaNegations: findLemmaNegations
};
