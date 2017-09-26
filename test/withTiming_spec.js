import withTiming from "../src/withTiming"
import test from 'ava'
const getResourceFn = (fn) => {
    let i = 0
    return withTiming(
        o => new Promise(
            (resolve, reject) => {
                const handle = fn === "resolve" ? resolve : reject
                setTimeout(() => handle(o), i === 0 ? 100 : 10)
                i += 1
            }
        )
    )
}

test("withTiming 先请求的后返回将被抛弃 resolve", async (t) => {
    const resourceFn = getResourceFn("resolve")
    return Promise.all([
        resourceFn(1).then(() => t.fail("promise cancel fail"), () => t.pass("promise cancel success")),
        resourceFn(2).then(() => t.pass("promise reslove success"), () => t.fail("promise should be resolve"))
    ])
})
test("withTiming 先请求的后返回将被抛弃 rejct", async (t) => {
    const resourceFn = getResourceFn("reject")
    return Promise.all([
        resourceFn(2).then(() => t.fail("promise should be resolve"), (rej) => t.is(rej.res, 2)),
        resourceFn(3).then(() => t.fail("promise cancel fail"), (rej) => t.is(rej, 3))
    ])
})