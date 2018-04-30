import { modifyState, getState, fetchResource } from '../state'
import { copyToClipboard } from '../utils'
import * as backend from './backend'

export async function requestCreateLinkToClipboard({selection}) {
    if (getState('link.progress') !== 'pristine') {
        return
    }

    modifyState('link.progress', 'running')
    
    let result
    try {
        result = await backend.createAnnotationLink()
    } catch (e) {
        modifyState('link.progress', 'error')
        modifyState('link.error', e)
        throw e
    }

    console.log('Received link:', result.url)
    
    modifyState('link.url', result.url)
    modifyState('link.progress', 'done')
}

export function fetchDemoTemplate() {
    return fetchResource({url: '/assets/inner-demo.html', type: 'text', key: 'demoTemplate'})
}

export function fetchDemoAnnotation({id}) {
    console.log('fetching demo annotation', id)
    return fetchResource({url: `/${id}/annotation.json`, type: 'json', key: 'demoAnnotation'})
}
