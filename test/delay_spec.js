import delay from "../src/delay"
import test from 'ava'

test("delay", async (t) => {
    const start = Date.now()
    await delay(300)
    const end = Date.now()
    t.true(end - start >= 300)
})