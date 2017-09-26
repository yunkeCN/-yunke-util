/**
 * 
 */
const warning = "不是最新的promise返回"
const withTiming = resourceFn => {
    let timing = 0;
    return (...o) => {
        const promise = resourceFn(...o)
        timing += 1
        const currentTiming = timing
        return promise.then(
            res => currentTiming === timing ? res : Promise.reject({ warning, res }),
            res => Promise.reject(currentTiming === timing ? res : { warning, res })
        )
    }
 }
 export default withTiming;
 