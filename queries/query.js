const query = require('@arangodb').query;

const lemmas = module.context.collection('lemmas')
const lemmaVariants = module.context.collection('isLemmaVariant')
//const assertsTrue = module.context.collection('assertsTrue')
//const assertsFalse = module.context.collection('assertsFalse')

const findLemma = (lemma) => {
  const result = query`
    FOR lemma in ${lemmas}
    FILTER lemma.representation == ${lemma.representation} && lemma.lang == ${lemma.lang} && lemma.pos == ${lemma.pos}
    return lemma
  `.toArray();
  return result;
};

const findLemmaVariant = (lemma,variantLemma) => {
  const result = query`
    FOR tgtLemma IN ${lemmas}
    FILTER tgtLemma.representation == ${lemma.representation} && tgtLemma.lang == ${lemma.lang} && tgtLemma.pos == ${lemma.pos}
      FOR v,e,p in 1..1 INBOUND tgtLemma._id ${lemmaVariants}
      FILTER v.representation == ${variantLemma.representation} && v.lang == ${variantLemma.lang} && v.pos == ${variantLemma.pos}
      RETURN e
  `.toArray();
  return result;
};

module.exports = {
  findLemma: findLemma,
  findLemmaVariant: findLemmaVariant
};
