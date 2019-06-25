
// node.sj

const log = msg => () => console.log(`NEXT TICK ${msg}`)

const timeout = (time, msg) => {
  setTimeout(() => {
    console.log(`TIMEOUT ${msg}`)
  }, time)
}

process.nextTick(log('ONE'))
timeout(0, 'AFTER-ONE')
process.nextTick(log('TWO'))
timeout(0, 'AFTER-TWO')