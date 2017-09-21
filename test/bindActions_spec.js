import bindActionsCreator from "../src/bindActionsCreator"
import test from 'ava'

test("bindActionsCreator can help bind actionsCreator with less code", t => {
    const dispatch = x => t.deepEqual(x, { type: "run", payload: "xiaomin" })
    const bindedAcs = bindActionsCreator({
        runActCreator(a) {
            return {
                type: "run",
                payload: a
            }
        }
    })(dispatch)
    bindedAcs.runActCreator("xiaomin")
})