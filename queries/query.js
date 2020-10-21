const query = require('@arangodb').query;

const lexicalEntities_lat = module.context.collection('lexicalEntities_lat');
const lexicalEntities_grc = module.context.collection('lexicalEntities_grc');
const lexicalRelations = module.context.collection('lexicalRelations');

const _getEntities = (lang) => {
    return lang === 'lat' ? lexicalEntities_lat : lexicalEntities_grc; // TODO do this better
};

const findSpellingVariants = (word) => {
    const entities = _getEntities(word.lang);
    const result = query`
    FOR tgtWord in ${entities}
    FILTER tgtWord.type == 'alpheios:word' && tgtWord.representation == ${word.representation}
      FOR v,e,p in 1..1 INBOUND tgtWord._id ${lexicalRelations}
      FILTER e.isPublic == true && e.type == 'isSpellingVariant'
      RETURN { subject: document(e._to), predicate: e.type, object: document(e._from), authorities: [e.createdBy], qualifiers: [] }
    `.toArray();
    return result;
};

const findLemmasForWord = (word) => {
  const entities = _getEntities(word.lang);
  const result = query`
    FOR tgtWord in ${entities}
    FILTER tgtWord.type == 'alpheios:word' && tgtWord.representation == ${word.representation}
      FOR v,e,p in 1..1 INBOUND tgtWord._id ${lexicalRelations}
      FILTER e.isPublic == true && e.type == 'isLemmaOf'
      RETURN { subject: document(e._to), predicate: 'hasLemma', object: document(e._from), authorities: [e.createdBy], qualifiers: {} }
  `.toArray();
  return result;
};

const findLemmaNegations = (word,lemma) => {
  const entities = _getEntities(word.lang);
  const result = query`
    FOR tgtWord in ${entities}
    FILTER tgtWord.type == 'alpheios:word' && tgtWord.representation == ${word.representation}
      FOR v,e,p in 1..1 INBOUND tgtWord._id ${lexicalRelations}
      FILTER e.isPublic == true && e.type == 'isNotLemmaOf' && v.representation == ${lemma.representation} && v.pos == ${lemma.pos} && v.principalParts == ${lemma.principalParts}
      RETURN { subject: document(e._to), predicate: 'doesNotHaveLemma', object: document(e._from), authorities: [e.createdBy], qualifiers: {} }
  `.toArray();
  return result;
}


const findAllInflections = (lemma) => {
  const entities = _getEntities(lemma.lang);
  const result = query`
    FOR tgtLemma in ${entities}
    FILTER tgtLemma.type == 'alpheios:lemma' && tgtLemma.representation == ${lemma.representation} && tgtLemma.pos == ${lemma.pos} && tgtLemma.principalParts == ${lemma.principalParts}
      FOR v,e,p in 1..1 INBOUND tgtLemma._id ${lexicalRelations}
      FILTER e.isPublic == true && ( e.type == 'canBeInflectionOf' || e.type == 'canNotBeInflectionOf')
      RETURN { subject: document(e._to), predicate: e.type, object: document(e._from), authorities: [e.createdBy], qualifiers: {} }
  `.toArray();
  return result;

}

const findAllLemmaVariants = (lemma) => {
  const entities = _getEntities(lemma.lang);
  const result = query`
    FOR tgtLemma in ${entities}
    FILTER tgtLemma.type == 'alpheios:lemma' && tgtLemma.representation == ${lemma.representation} && tgtLemma.pos == ${lemma.pos} && tgtLemma.principalParts == ${lemma.principalParts}
      FOR v,e,p in 1..1 ANY tgtLemma._id ${lexicalRelations}
      FILTER e.isPublic == true && e.type == 'isLemmaVariant'
      RETURN { subject: document(e._to), predicate: 'isLemmaVariant', object: document(e._from), authorities: [e.createdBy], qualifiers: { prefer: e.prefer } }
  `.toArray()
  return result;
};

module.exports = {
  findLemmasForWord: findLemmasForWord,
  findAllLemmaVariants: findAllLemmaVariants,
  findAllInflections: findAllInflections,
  findLemmaNegations: findLemmaNegations,
  findSpellingVariants: findSpellingVariants
};
