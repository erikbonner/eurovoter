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
    'Czechia',
    'Romania',
    'Portugal',
    'Finland',
    'Switzerland',
    'France',
    'Norway',
    'Armenia',
    'Italy',
    'Spain',
    'Netherlands',
    'Ukraine',
    'Germany',
    'Lithuania',
    'Azerbaijan',
    'Belgium',
    'Greece',
    'Iceland',
    'Moldova',
    'Sweden',
    'Australia',
    'United Kingdom',
    'Poland',
    'Serbia',
    'Estonia',
].map(finalist => {
    const countryInfo = countryRegionalCodes.find(c => c.name.includes(finalist));
    return { name: finalist, code: countryInfo && countryInfo['alpha-2'] }
});

async function main() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    const db = getFirestore();
    for(const finalist of finalists) {
        console.log('pushing finalist', finalist)
        await db.collection("countries2022").doc(finalist.name).set(finalist)
    }
}

main()