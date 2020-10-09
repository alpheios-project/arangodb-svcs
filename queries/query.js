const query = require('@arangodb').query;

const lemmas = module.context.collection('lemmas')
const lemmaVariants = module.context.collection('isLemmaVariant')
const assertsTrue = module.context.collection('assertsTrue')

const findLemma = (lemma) => {
  const result = query`
    FOR lemma in ${lemmas}
    FILTER lemma.representation == ${lemma.representation} && lemma.lang == ${lemma.lang} && lemma.pos == ${lemma.pos} && tgtLemma.principalParts == ${lemma.principalParts}
    return lemma
  `.toArray();
  return result;
};

const findAllLemmaVariants = (lemma) => {
  const result = query`
    FOR tgtLemma in ${lemmas}
    FILTER tgtLemma.representation == ${lemma.representation} && tgtLemma.lang == ${lemma.lang} && tgtLemma.pos == ${lemma.pos} && tgtLemma.principalParts == ${lemma.principalParts}
      FOR v,e,p in 1..1 ANY tgtLemma._id ${lemmaVariants}
      LET assertions = (
        FOR v2, e2, p2 in 1..1 INBOUND e._id ${assertsTrue}
        FILTER e2.isPublic == true
        RETURN p2
      )
      FILTER length(assertions) > 0
      RETURN { subject: document(e._to), predicate: 'isLemmaVariant', object: document(e._from), authority: assertions[*]._from  }
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
  findLemma: findLemma,
  findSpecificLemmaVariant: findSpecificLemmaVariant,
  findAllLemmaVariants: findAllLemmaVariants
};
