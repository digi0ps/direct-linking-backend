import * as clipboard from 'clipboard-polyfill'

// For things that must only happen once
export function loader(promiseCreator) {
    let promise
    
    return (...args) => {
        if (!promise) {
            promise = promiseCreator(...args).then(res => {
                promise.loaded = true
                return res
            })
        }

        return promise
    }
}

export const bodyLoader = loader(() => {
    return new Promise(resolve => {
        document.addEventListener("DOMContentLoaded", () => {
            resolve()
        })
    })
})

export function delayed(f, delay) {
    let timeout = null
    const clear = () => {
        timeout && clearTimeout(timeout)
        timeout = null
    }

    return (...args) => {
        clear()
        timeout = setTimeout(() => {
            f(...args)
            clear()
        }, delay)
    }
}

export function copyToClipboard(text){
    clipboard.writeText(text)
}
