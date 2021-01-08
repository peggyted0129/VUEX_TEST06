export default {
    namespaced: true,
    state: {
        messages: [],
    },
    getters: {
        messages: (state) => state.messages,
    },
    mutations: {
        UPDATE_MESSAGE(state, payload) {
          state.messages.push(payload);
        },
        REMOVE_MESSAGE(state, payload) {
          state.messages.splice(payload, 1);
        },
    },
    actions: {
        updateMessage(context, { message, status }) {
            const timestamp = Math.floor(new Date() / 1000);
            context.commit('UPDATE_MESSAGE', { message, status, timestamp });
            context.dispatch('removeMessageWithTiming', timestamp);
        },
        removeMessageWithTiming(context, timestamp) {
            setTimeout(() => {
                context.state.messages.forEach((item, index) => {
                    if (item.timestamp === timestamp) {
                        context.commit('REMOVE_MESSAGE', index);
                    }
                });
            }, 5000);
        },
        removeMessage(context, index) {
            context.commit('REMOVE_MESSAGE', index);
        },
    },
}