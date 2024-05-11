const admin = require('firebase-admin');

const { getFirestore } = require('firebase-admin/firestore');

/**
 * Note this is not checked into the repository. Each project will generate and keep
 * its own local version of this file.
 */
const serviceAccount = require('./firebase-private-key.json');

// from https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes/tree/master/slim-2
const countryRegionalCodes = require('./slim-2.json')

/**
 * This year's finalists in a form that is easy to push to our db.
 * Finalists taken from here: https://eurovisionworld.com/eurovision/2022
 */
const finalists = [
  "Sweden",
  "Ukraine",
  "Germany",
  "Luxembourg",
  "Netherlands",
  "Israel",
  "Lithuania",
  "Spain",
  "Estonia",
  "Ireland",
  "Latvia",
  "Greece",
  "United Kingdom",
  "Norway",
  "Italy",
  "Serbia",
  "Finland",
  "Portugal",
  "Armenia",
  "Cyprus",
  "Switzerland",
  "Slovenia",
  "Croatia",
  "Georgia",
  "France",
  "Austria"
].map(finalist => {
    const countryInfo = countryRegionalCodes.find(c => c.name.includes(finalist));
    return { name: finalist, code: countryInfo && countryInfo['alpha-2'] }
});

async function deleteCollection(db, collectionPath) {
  const collectionRef = db.collection(collectionPath);
  const docs = await collectionRef.listDocuments();

  docs.forEach((doc) => {
    doc.delete();
  });
}

const collectionName = 'countries2024';

async function main() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    const db = getFirestore();

    // clear out the collection first
    await deleteCollection(db, collectionName);

    for(const finalist of finalists) {
        console.log('pushing finalist', finalist)
        await db.collection(collectionName).doc(finalist.name).set(finalist)
    }
}

main()
