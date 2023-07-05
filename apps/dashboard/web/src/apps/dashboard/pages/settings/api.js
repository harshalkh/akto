import request from "@/util/request"

const settingRequests = {
    fetchApiTokens: async function() {
        const resp = await request({
            url: '/api/fetchApiTokens',
            method: 'post',
            data: {}
        })
        return resp
    },
    addApiToken(tokenUtility) {
        return request({
            url: '/api/addApiToken',
            method: 'post',
            data: {tokenUtility}
        }).then((resp) => {
            return resp
        })
    },
    deleteApiToken(apiTokenId) {
        return request({
            url: '/api/deleteApiToken',
            method: 'post',
            data: {apiTokenId}
        }).then((resp) => {
            return resp
        })
    },

    fetchPostmanWorkspaces(api_key) {
        return request({
            url: '/api/fetchPostmanWorkspaces',
            method: 'post',
            data: {api_key}
        }).then((resp) => {
            return resp
        })
    },
    addOrUpdatePostmanCred(api_key, workspace_id) {
        return request({
            url: '/api/addOrUpdatePostmanCred',
            method: 'post',
            data: {api_key,workspace_id}
        }).then((resp) => {
            return resp
        })
    },
    getPostmanCredentials() {
        return request({
            url: '/api/getPostmanCredential',
            method: 'post',
            data: {}
        }).then((resp) => {
            return resp
        })
    },
}

export default settingRequests