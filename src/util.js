const binByNumeric = (data, accessor, range, numBins) => {
  var bins = []
  var step = (range[1] - range[0]) / numBins

  for (let i = 0; i < numBins; i++) {
    var bin = data.filter((d) => {
      return d[accessor] < (range[0] + ((i + 1) * step)) &&
        d[accessor] >= (range[0] + (i * step))
    })
    bin.key = i * step
    bin.step = step
    bin.count = bin.length
    bins.push(bin)
  }

  return bins
}

const binByValue = (data, accessor, maxBins = 0) => {
  var bins = []
  var allBins = []

  data
    .map((d) => d[accessor]) // Create an array of keys in dataset
    .filter((d, i, arr) => arr.indexOf(d) === i) // Filter repeated keys
    .forEach((d) => { // For each unique key
      var bin = data.filter((f) => {
        return f[accessor] === d
      })
      bin.key = d
      bin.count = bin.length
      allBins.push(bin)
    })

  // Keep top bins if max number of bins specified
  if (maxBins !== 0) {
    bins = allBins.sort((a, b) => {
      return b.count - a.count
    }).slice(0, maxBins)
  }

  return bins
}

const ipToInt = (ip) => {
  var parts = ip.split('.')
  var res = 0
  res += parseInt(parts[0], 10) << 24
  res += parseInt(parts[1], 10) << 16
  res += parseInt(parts[2], 10) << 8
  res += parseInt(parts[3], 10)
  return res
}

export { binByValue, binByNumeric, ipToInt }
