
//
// Joe Orr - https://github.com/kaleguy
//           https://gist.github.com/kaleguy/
//           file-words.js


const fs = require('fs');
const lineReader = require('line-reader');
const _ = require('lodash');

const {flow, values, uniq, orderBy, reverse, slice, each} = require('lodash/fp');

const counts = {};
const freq = {}
function report() {
   // for a given word frequency, print out the terms with that frequency
   function print(frequency) {
       _.each(counts, (v, k) => {
          (v === frequency) && k && console.log(`${k}: ${v}`)
       })
   }
   // get the top 10 word frequencies (and print)
   const topTenCounts = flow(values, uniq, orderBy(_.identity, 'desc'), slice(0, 9), each(print))(counts)
}
function getCounts(line, last) {
    line.toLowerCase()
        .split(/\s+/)
        .forEach(word => {
            counts[word]
                ? counts[word] = counts[word] + 1
                : counts[word] = 1
        })
    last && report()
}

lineReader.eachLine('text.txt', getCounts);
