const fs = require('fs');
const filePath = process.argv[2];
const limit = parseInt(process.argv[3]);

const STOP_WORDS = [
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'by',
  'for',
  'from',
  'has',
  'he',
  'i',
  'in',
  'is',
  'it',
  'its',
  'of',
  'on',
  'that',
  'the',
  'to',
  'were',
  'will',
  'with',
];

function printWordFreq(file, limit, callback) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      process.exit(1);
    }

    const words = data.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);

    const wordFreq = {};
    words.forEach((word) => {
      if (!STOP_WORDS.includes(word)) {
        if (wordFreq[word]) {
          wordFreq[word]++;
        } else {
          wordFreq[word] = 1;
        }
      }
    });

    const wordFreqArray = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);

    callback(wordFreqArray);
  });
}

if (isNaN(limit) || limit <= 0) {
  console.error('Please provide a valid limit as the third argument (a positive number).');
  process.exit(1);
}

printWordFreq(filePath, limit, (wordFreqArray) => {
  console.log(`Top ${limit} Word frequency:`);
  wordFreqArray.forEach(([word, frequency]) => {
    const asterisks = '*'.repeat(frequency);
    console.log(`${word} | ${frequency} ${asterisks}`);
  });
});
